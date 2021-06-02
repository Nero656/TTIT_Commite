import React, {useEffect, useState} from "react";
import {TextField, Button, makeStyles} from '@material-ui/core';
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

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
        minWidth: 200,
    },
}));

export default function Request() {
    let title = UserInput('');
    let desc = UserInput('');
    let avatar = UserInput('');

    const [items, setItems] = useState([]);
    const [id, setId] = useState('');
    const [open, setOpen] = useState(false);
    const classes = useStyles();

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


    const handleChange = (event) => {
        setId(event.target.value);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    function fileUpload(e) {
        avatar = e.target.files[0];
    }

    function send(e) {
        let data = new FormData();
        data.append('title', title.value());
        data.append('desc', desc.value());
        data.append('img_url', avatar);


        e.preventDefault()
        fetch(`/api/category/`+id+'?_method=patch', {
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
                window.location.replace('/category');
            }
        }).catch(error => {
            console.log('не работает');
        });
    }

    return (
        <form className={'container-fluid Form col-6 mt-5'} encType="form-data" onSubmit={send}>
            <h1 className={'text-center'}>Обновить категорию</h1>
            <FormControl className={classes.formControl+' mt-3'}>
                <InputLabel id="demo-controlled-open-select-label">Выберете факультет</InputLabel>
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
            <div className={'mt-3'}>
                <TextField
                    className={'col-12'}
                    {...title.bind}
                    id="standard-basic"
                    label="Загаловок"
                    required
                />
            </div>
            {/*потом сделать файлом*/}
            <div className={'mt-3'}>
                <TextField
                    className={'col-12'}
                    label="Описание"
                    multiline
                    {...desc.bind}
                    rows={5}
                    required
                />
            </div>

            <div className={'mt-3'}>
                <input
                    accept="image/*"
                    name={'avatar'}
                    className={classes.input}
                    onClick={fileUpload}
                    id="contained-button-file"
                    multiple
                    type="file"
                />
                <label htmlFor="contained-button-file">
                    <Button variant="contained" color="primary" component="span">
                        Прикрепить файл
                    </Button>
                </label>
            </div>


            <button
                className="MuiButtonBase-root MuiButton-root MuiButton-contained mt-3 col-12 MuiButton-containedPrimary"
                tabIndex="0"><span className="MuiButton-label">Создать</span>
                <span className="MuiTouchRipple-root"> </span>
            </button>
        </form>
    );
}
