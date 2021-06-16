import React, {useEffect, useState} from "react";
import {TextField, Button, makeStyles} from '@material-ui/core';
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Checkbox from "@material-ui/core/Checkbox";
import Alert from "@material-ui/lab/Alert";
import User from "./user/UserPage";


function UserInput() {
    let [value, setValue] = useState('');

    return {
        bind: {
            value,
            onChange: e => setValue(e.target.value)
        },
        clear: () => setValue(('')),
        value: () => value
    }
}

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    input: {
        display: 'none',
    },
    formControl: {
        margin: theme.spacing(0),
        minWidth: 250,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));

export default function Request() {
    let Passport = UserInput('');
    let series = UserInput('');
    let file = UserInput('');
    let user = [];

    const [items, setItems] = useState([]);
    const classes = useStyles();
    const [id, setId] = useState('');
    const [Agr, setAgr] = useState(false);
    const [open, setOpen] = useState(false);
    const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    useEffect(() => {
        fetch(`/api/category/all`).then(async response => {
            if (!response.ok) {
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            } else {
                response.json().then(function (data) {
                    setItems(data);
                });
            }
        })
    }, [])

    if (localStorage.getItem('User') !== null) {
        user = JSON.parse(localStorage.getItem('User'));
    }


    const handleChange = (event) => {
        setId(event.target.value);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const agreement = () => {
        setAgr(!Agr);
    }

    function fileUpload(e) {
        file = e.target.files[0];
    }

    function sendReg(e) {
        let data = new FormData();
        data.append('title', 'Заявка на поступление ' + user.username);
        data.append('category_id', id);
        data.append('user_id', user.id);
        data.append('certificate', file);
        data.append('Passport', Passport.value()+' '+series.value());
        data.append('agreement', 1);

        e.preventDefault()



        fetch(`/api/requests/`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + localStorage.token
            },
            body: data
        }).then(async response => {
            const data = await response.json();
            if (!response.ok) {
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            } else {
                window.location.replace('/user-page');
            }
        }).catch(error => {
            console.log('не работает');
        });
    }

    if (user.length === 0) {
        return (
            <div className={'container-fluid text-center mt-5 col-6'}>
                <Alert variant="filled" severity="error">
                    Ошибка 403, вы должны авторизироваться
                </Alert>
            </div>
        );
    } else {
        return (
            <form className={'container-fluid Form col-10 col-lg-6 mt-5'} encType="form-data" onSubmit={sendReg}>
                <h1 className={'text-center'}>Отправить заявку</h1>
                {/*потом сделать файлом*/}

                <div className={'mt-3'}>
                    <TextField
                        className={'col-9'}
                        {...Passport.bind}
                        id="standard-basic"
                        label="Паспорт гражданина РФ сеирия"
                        required
                    />


                    <TextField
                        id="date"
                        label="Дата выдачи"
                        type="date"
                        {...series.bind}
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />


                    <FormControl className={classes.formControl + ' mt-3'}>
                        <InputLabel id="demo-controlled-open-select-label">Выберите специальность</InputLabel>
                        <Select
                            labelId="demo-controlled-open-select-label"
                            id="demo-controlled-open-select"
                            open={open}
                            onClose={handleClose}
                            onOpen={handleOpen}
                            value={id}
                            onChange={handleChange}
                        >
                            {items.map((item, id) => (
                                <MenuItem value={item.id} key={id}>{item.title}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>

                <input
                    accept={".docx"}
                    name={'certificate'}
                    className={classes.input}
                    onClick={fileUpload}
                    id="contained-button-file"
                    multiple
                    type="file"
                />
                <label htmlFor="contained-button-file" className={'mt-3'}>
                    <Button variant="contained" color="primary" component="span">
                        Прикрепить атестат
                    </Button>
                </label>

                <div className={'mt-3'}>
                    <label>Согласие на обработку персональных данных</label>
                    <Checkbox onClick={agreement} required color="primary"/>
                </div>

                {Agr === false &&
                <Button
                    disabled
                    className="MuiButtonBase-root MuiButton-root MuiButton-contained mt-3 col-12 MuiButton-containedPrimary"
                    tabIndex="0">
                    <span className="MuiButton-label">Подать заявку</span>
                    <span className="MuiTouchRipple-root"> </span>
                </Button>
                }
                {Agr === true &&
                <button
                    className="MuiButtonBase-root MuiButton-root MuiButton-contained mt-3 col-12 MuiButton-containedPrimary"
                    tabIndex="0"><span className="MuiButton-label">Подать заявку</span>
                    <span className="MuiTouchRipple-root"> </span>
                </button>
                }
            </form>
        );
    }
}
