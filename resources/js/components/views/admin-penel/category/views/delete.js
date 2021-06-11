import React, {useEffect, useState} from "react";
import {TextField, Button, makeStyles} from '@material-ui/core';
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Checkbox from "@material-ui/core/Checkbox";


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


    function sendReg(e) {
        let data = new FormData();

        e.preventDefault()
        fetch(`/api/category/`+id, {
            method: 'delete',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + localStorage.token
            }
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

    return (
        <form className={'container-fluid Form col-6 mt-5'} encType="form-data" onSubmit={sendReg}>
            <h1 className={'text-center'}>Удалить</h1>

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

            <button
                className="MuiButtonBase-root MuiButton-root MuiButton-contained mt-3 col-12 MuiButton-containedPrimary"
                tabIndex="0"><span className="MuiButton-label">Подать заявку</span>
                <span className="MuiTouchRipple-root"> </span>
            </button>
        </form>
    );
}
