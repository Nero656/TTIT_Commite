import React, {useState} from "react";
import {TextField, makeStyles} from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import {useSelector, useDispatch } from 'react-redux';
import {
    auth,
    setUser,
    selectApiToken
} from '../../../features/auth/authSlice';

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
    alert: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

export default function AuthForm() {
    let login = UserInput('');
    let password = UserInput('');
    let [error, setError] = useState('')
    let [open, setOpen] = useState(false);

    const dispatch = useDispatch();

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    function sendReg(e) {
        e.preventDefault()

        let data = new FormData();

        data.append('login', login.value());
        data.append('password',  password.value());

        fetch(`/api/user/auth`, {
            method: 'POST',
            body: data
        }).then(async response => {
            const data = await response.json();

            if (!response.ok) {
                const error = (data && data.message) || response.status;
                setOpen(true);
                return Promise.reject(error);

            } else {
                dispatch(auth(data.message))

                fetch(`/api/user/show`, {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': 'Bearer ' + data.message
                    },
                }).then(function (response) {
                    if (response.status !== 200) {
                        const error = (data && data.message) || response.status;
                        return Promise.reject(error);
                    }
                response.json().then(function (data) {
                    dispatch(setUser(data))
                    // window.location.replace('/');
                    });
                })

            }
        }).catch(error => {
            setError('Ошибка авторизации, проверьте свои данные');
        });

        // console.log(selectApiToken)


    }

    return (
        <form className={'container-fluid Form col-10 col-lg-6'} encType="form-data" onSubmit={sendReg}>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    {error}
                </Alert>
            </Snackbar>
            <h1 className={'text-center'}>Авторизация </h1>
            <TextField {...login.bind} required id="standard-basic" className={'col-lg-12'} label="Логин"
                       name={'login'}/>
            <TextField
                required
                {...password.bind}
                id="standard-password-input"
                className={'col-lg-12 mt-4'}
                label="Пароль"
                type="password"
                name={'password'}
            />
            <button
                className="MuiButtonBase-root MuiButton-root MuiButton-contained mt-3 col-12 MuiButton-containedPrimary"
                tabIndex="0"><span className="MuiButton-label">Войти</span>
                <span className="MuiTouchRipple-root"> </span>
            </button>
        </form>
    );
}
