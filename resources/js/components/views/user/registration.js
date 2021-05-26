import React, {useState} from "react";
import {server} from "../../../server";
import {TextField, Button, makeStyles} from '@material-ui/core';


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

export default function Registration(name) {
    let username = UserInput('');
    let login = UserInput('');
    let telephone = UserInput('');
    let email = UserInput('');
    let password = UserInput('');
    let preview = UserInput('');
    let avatar = UserInput('');

    const classes = useStyles();

    function fileUpload(e) {
        avatar = e.target.files[0];
    }


    function sendReg(e) {
        preview = URL.createObjectURL(avatar);

        let data = new FormData();
        data.append('username', username.value());
        data.append('login', login.value());
        data.append('telephone_number', telephone.value());
        data.append('email', email.value());
        data.append('password', password.value());
        data.append('avatar', avatar);

        e.preventDefault()
        fetch(`${server.baseURL}/api/user/registration`, {
            method: 'POST',
            body: data
        }).then(async response => {
            const data = await response.json();
            if (!response.ok) {
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            } else {
                 window.location.replace('/sign-in');
            }
        }).catch(error => {
            console.log('не работает', data.get('username'));
        });
    }


    return (
        <form className={'container-fluid authForm col-6'} encType="form-data" onSubmit={sendReg}>
            <h1 className={'text-center'}>Регистрация {preview.value()}</h1>
            <div className={'form-row'}>
                <div className={'form-group col-12'}>
                    <TextField
                        {...username.bind}
                        id="standard-basic"
                        className={'col-lg-6'}
                        label="ФИО"
                        required name={'username'}
                    />
                    <TextField
                        {...login.bind}
                        id="standard-basic"
                        className={'col-lg-6'}
                        label="Логин"
                        required
                        name={'login'}
                    />
                </div>
                <div className={'form-group col-12'}>
                    <TextField
                        {...telephone.bind}
                        id="standard-basic"
                        className={'col-lg-4'}
                        required
                        label="Телефон"
                        name={'telephone_number'}
                    />
                    <TextField
                        {...email.bind}
                        type={'email'}
                        id="standard-basic"
                        required
                        className={'col-lg-4'}
                        label="EMAIL"
                        name={'email'}
                    />
                    <TextField
                        {...password.bind}
                        id="standard-password-input"
                        className={'col-lg-4'}
                        label="Пароль" type="password"
                        name={'password'}
                    />
                </div>

                <input
                    accept="image/*"
                    name={'avatar'}
                    className={classes.input}
                    onClick={fileUpload}
                    id="contained-button-file"
                    multiple
                    type="file"
                />

                <img src={preview.value()} alt=""/>
                <label htmlFor="contained-button-file">
                    <Button variant="contained" color="primary" component="span">
                        Загрузить фотографию
                    </Button>
                </label>
            </div>
            <button
                className="MuiButtonBase-root MuiButton-root MuiButton-contained mt-3 col-12 MuiButton-containedPrimary"
                tabIndex="0"><span className="MuiButton-label">Зарегистрироваться</span>
                <span className="MuiTouchRipple-root"> </span>
            </button>
        </form>
    );
}


