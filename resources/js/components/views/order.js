import React, {useState} from "react";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Send from "@material-ui/icons/Send";
import {Cancel} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

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

export default function Order({prop, sendDate, getProp}) {
    const classes = useStyles();

    let user = [];
    let file = UserInput('');

    if (localStorage.getItem('User') !== null) {
        user = JSON.parse(localStorage.getItem('User'));
    }

    function fileUpload(e) {
        file = e.target.files[0];
    }

    function sendOrder(e) {
        console.log(file)

        let data = new FormData();

        data.append('request_id', sendDate);
        data.append('user_id', user.id);
        data.append('file', file);

        e.preventDefault()


        fetch(`/api/orders/`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.token
                },
                body: data
            }
        ).then(async response => {
            if (!response.ok) {
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            } else {
                response.json().then(function (data) {
                    getProp();
                    return window.location.replace('/user-page');
                });
            }
        })
    }

    const download = () => {
        fetch(`/api/orders/download`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.token,
                    responseType: 'blob',
                }
            }
        ).then(response => response.blob())
            .then(blob => {
                let url = window.URL.createObjectURL(blob);
                let a = document.createElement('a');
                a.href = url;
                a.download = "filename.docx";
                document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will
                // not work in firefox
                a.click();
                a.remove();  //afterwards we remove the element again
            });
    };

    return (
        <div>
            <Dialog
                open={prop}
                TransitionComponent={Transition}
                keepMounted
                onClose={getProp}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >

                <DialogTitle id="alert-dialog-slide-title">{'Отправте файл для поступления'}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Скачайте документ, заполните, затем отправьте его нам
                    </DialogContentText>

                    <div>
                        <Button onClick={download} color="primary" variant="contained">
                            Скачать файл для заполнения данных
                        </Button>
                    </div>

                    <input
                        accept={".docx"}
                        name={'file'}
                        className={classes.input}
                        onClick={fileUpload}
                        id="order-file"
                        multiple
                        type="file"
                    />

                    <label htmlFor="order-file" className={'mt-3'}>
                        <Button variant="contained" color="primary" component="span">
                            Прикрепить документ
                        </Button>
                    </label>

                </DialogContent>
                <DialogActions>
                    <Button onClick={getProp} color="secondary" variant="outlined" endIcon={<Cancel/>}>
                        Отменить
                    </Button>
                    <Button onClick={sendOrder} color="primary" variant="contained" endIcon={<Send/>}>
                        Отправить
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
