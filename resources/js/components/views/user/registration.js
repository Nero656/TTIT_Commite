import React, {useState} from "react";
import {TextField, Button, makeStyles} from '@material-ui/core';
import PhoneInput from "react-phone-number-input/input";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";


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

export default function Registration() {
    let username = UserInput('');
    let login = UserInput('');
    let [tel, setTel] = useState('');
    let email = UserInput('');
    let password = UserInput('');
    let preview = UserInput('');
    let avatar = UserInput('');

    const classes = useStyles();

    function fileUpload(e) {
        avatar = e.target.files[0];
    }


    function sendReg(e) {
        // preview = URL.createObjectURL(avatar);

        let data = new FormData();
        data.append('username', username.value());
        data.append('login', login.value());
        data.append('telephone_number', tel);
        data.append('email', email.value());
        data.append('password', password.value());
        data.append('avatar', avatar);

        e.preventDefault()
        fetch(`/api/user/registration`, {
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
            console.log('не работает');
        });
    }


    return (
        <form className={'container-fluid Form col-12 col-lg-6 '} encType="form-data" onSubmit={sendReg}>
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
                    <FormControl  className={'col-lg-4'}>
                        <InputLabel htmlFor="formatted-text-mask-input">Номер телефона</InputLabel>
                        <Input
                            value={tel}
                            onChange={setTel}
                            required
                            name={"telephone_number"}
                            id="formatted-text-mask-input"
                            inputComponent={PhoneInput}
                        />
                    </FormControl>

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
