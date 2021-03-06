import React, {useState} from "react";
import {TextField, Button, makeStyles} from '@material-ui/core';
import PhoneInput from "react-phone-number-input/input";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
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
}));

export default function Registration() {
    let username = UserInput('');
    let login = UserInput('');
    let [tel, setTel] = useState('');
    let email = UserInput('');
    let password = UserInput('');
    let avatarFile = UserInput({});
    let avatarUrl= UserInput('');
    let [error, setError] = useState({})
    let [open, setOpen] = useState(false);
    let [fileOrUrl, setFileOrUrl] = useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const classes = useStyles();

    function fileUpload(e) {
        avatarFile = e.target.files[0];
    }

    const changeFileOrUrl = () => {
        setFileOrUrl(!fileOrUrl);
    }


    function sendReg(e) {
        let data = new FormData();
        data.append('username', username.value());
        data.append('login', login.value());
        data.append('telephone_number', tel);
        data.append('email', email.value());
        data.append('password', password.value());

        if(fileOrUrl === false){
            data.append('avatar', avatarFile);
        }else {
            data.append('avatar', avatarUrl.value());
        }


        e.preventDefault()
        fetch(`/api/user/registration`, {
            method: 'POST',
            body: data
        }).then(async response => {
            const data = await response.json();
            if (!response.ok) {
                console.log(error);
                setOpen(true);
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            } else {
                window.location.replace('/sign-in');
            }
        }).catch(error => {
            setError({mes :'???????????? ???????????????? ???????????????????????? ????????????'});
        });
    }


    return (
        <form className={'container-fluid Form col-12 col-lg-6 '} encType="form-data" onSubmit={sendReg}>
            <h1 className={'text-center'}>??????????????????????</h1>

            <Snackbar
                open={open}
                autoHideDuration={6000}
                anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    {error.mes}
                </Alert>
            </Snackbar>

            <div className={'form-group'}>
                <TextField
                    {...username.bind}
                    id="standard-basic"
                    className={'col-12'}
                    label="??????"
                    required
                    name={'username'}
                />
                <TextField
                    {...login.bind}
                    id="standard-basic"
                    className={'col-12'}
                    label="??????????"
                    required
                    name={'login'}
                />

                <FormControl className={'col-12'}>
                    <InputLabel htmlFor="formatted-text-mask-input">?????????? ????????????????</InputLabel>
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
                    className={'col-12'}
                    label="EMAIL"
                    name={'email'}
                />
                <TextField
                    {...password.bind}
                    id="standard-password-input"
                    className={'col-12'}
                    label="????????????" type="password"
                    name={'password'}
                />

                <TextField
                    {...avatarUrl.bind}
                    id="standard-basic"
                    className={'col-12'}
                    label="?????????????????????? URL"
                    name={'avatar'}

                    disabled={!fileOrUrl}
                />
            </div>

            <div className={'mt-3'}>
                <label>?????????????????? ???????????? ???? ??????????????????????</label>
                <Checkbox onClick={changeFileOrUrl}  color="primary"/>
            </div>

            <input
                accept="image/jpeg"
                name={'avatar'}
                className={classes.input}
                id="contained-button-file"
                disabled={fileOrUrl}
                onClick={fileUpload}
                multiple
                type="file"
            />

            <label htmlFor="contained-button-file">
                <Button variant="contained" color="primary" disabled={fileOrUrl} component="span">
                    ?????????????????? ????????????????????
                </Button>
            </label>

            <button
                className="MuiButtonBase-root MuiButton-root MuiButton-contained mt-3 col-12 MuiButton-containedPrimary"
                tabIndex="0"><span className="MuiButton-label">????????????????????????????????????</span>
                <span className="MuiTouchRipple-root"> </span>
            </button>
        </form>
    );
}
