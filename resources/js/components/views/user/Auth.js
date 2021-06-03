import React, {useState} from "react";
import {TextField, makeStyles} from '@material-ui/core';


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
}));

export default function Auth() {
    let login = UserInput('');
    let password = UserInput('');

    function sendReg(e) {

        let data = new FormData();
        data.append('login', login.value());
        data.append('password', password.value());

        e.preventDefault()

        fetch(`/api/user/auth`, {
            method: 'POST',
            body: data
        }).then(async response => {
            const data = await response.json();
            if (!response.ok) {
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            } else {
                localStorage.token = data.message

                fetch(`/api/user/show`, {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.token
                    },
                } ).then(function(response) {
                    if (response.status !== 200) {
                        const error = (data && data.message) || response.status;
                        return Promise.reject(error);
                    }
                    // Examine the text in the response
                    response.json().then(function(data) {
                        const user = JSON.stringify(data);
                        localStorage.setItem('User', user);
                        console.log('user ',localStorage.getItem('User'))
                        window.location.replace('/');
                    });
                })
            }
        }).catch(error => {
            console.log('не работает');
        });
    }

    return (
        <form className={'container-fluid Form col-10 col-lg-6'} encType="form-data" onSubmit={sendReg}>
            <h1 className={'text-center'}>Авторизация </h1>
            <TextField {...login.bind} required id="standard-basic" className={'col-lg-12'} label="Логин" name={'login'}/>
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
