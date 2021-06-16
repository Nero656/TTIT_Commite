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
import TextField from "@material-ui/core/TextField";

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

export default function Order({prop, sendDate, getProp}) {
    let user = [];
    let file = UserInput('');
    const [order, setOrder] = useState(sendDate);
    const [error, setError] = useState(null);

    if (localStorage.getItem('User') !== null) {
        user = JSON.parse(localStorage.getItem('User'));
    }

    const sendOrder = () => {
        setOrder(sendDate)

        let data = new FormData();
        data.append('request_id', sendDate);
        data.append('user_id', user.id);
        data.append('file', sendDate);

        fetch(`/api/orders/`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.token,
                },
                body: data
            }
        ).then(async response => {
            if (!response.ok) {
                const error = (data && data.message) || response.status;
                // setError(error);
                return Promise.reject(error);
            } else {
                response.json().then(function (data) {
                    getProp();
                    return window.location.replace('/user-page');
                });
            }
        })

        console.log('order ', order);
    };

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
                document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
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


                <DialogTitle id="alert-dialog-slide-title">{'Отправте файл ' + sendDate}</DialogTitle>
                <DialogContent>
                    <Button onClick={download} color="primary" variant="contained">
                        Скачать файл для заполнения данных
                    </Button>
                    <DialogContentText id="alert-dialog-slide-description">
                        Let Google help apps determine location. This means sending anonymous location data to
                        Google, even when no apps are running.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        {...file.bind}
                        margin="dense"
                        label="file"
                        type="text"
                        fullWidth
                    />
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
