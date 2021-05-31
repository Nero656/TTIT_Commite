import React, {useEffect, useState} from "react";
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Send from "@material-ui/icons/Send"
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import EmailIcon from '@material-ui/icons/Email';
import Avatar from '@material-ui/core/Avatar';
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import SendIcon from "@material-ui/icons/Send";
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import List from "@material-ui/core/List";
import CircularProgress from "@material-ui/core/CircularProgress";
import Order from "../order"


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    avatar: {
        width: theme.spacing(25),
        height: theme.spacing(25),
    },
    button: {
        right: theme.spacing(1),
    },
}));


export default function User() {
    let user = [];
    const classes = useStyles();

    const [items, setItems] = useState([]);
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isLoadedOrders, setIsLoadedOrders] = useState(false);
    const [open, setOpen] = useState(false);
    const [idModal, setIdModal] = useState(0);

    const handleClickOpen = (id) => {
        setIdModal(id)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    if (localStorage.getItem('User') !== null) {
        user = JSON.parse(localStorage.getItem('User'));
    }


    useEffect(() => {
        let data = new FormData();
        data.append('user_id', user.id);

        fetch(`/api/requests/ReqList`, {
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
                setError(error);
                return Promise.reject(error);
            } else {
                response.json().then(function (data) {
                    setIsLoaded(true);
                    setItems(data);
                });
            }
        })
    }, [])

    useEffect(() => {
        let data = new FormData();
        data.append('user_id', user.id);

        fetch(`/api/orders/userOrder`, {
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
                setError(error);
                return Promise.reject(error);
            } else {
                response.json().then(function (data) {
                    setIsLoadedOrders(true);
                    setOrders(data);
                });
            }
        })
    }, [])


    function sendReq() {
        return window.location.replace('/send-request');
    }

    if (error) {
        return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
        return (
            <div>
                <div className={'container Form col-6 ' + classes.root}>
                    <div className={'container-fluid row justify-content-center'}>
                        <CircularProgress/>
                    </div>
                </div>
                <div className={'container-fluid Form col-6 mt-4'}>
                    <List>
                        <h2>Список заявок для поддтверждения:</h2>
                        <div className={'container-fluid row justify-content-center'}>
                            <CircularProgress/>
                        </div>
                    </List>
                </div>
            </div>
        );
    } else {
        return (
            <div>
                <div className={'container Form col-6 ' + classes.root}>
                    <div className={'row p-3'}>
                        <Avatar alt={user.username} src={user.avatar} className={classes.avatar}/>
                        <div className={'ml-5'}>
                            <h1>{user.username}</h1>
                            <span><PhoneIphoneIcon/> {user.telephone_number}</span><br/>
                            <span><EmailIcon/> {user.email}</span> <br/>
                        </div>
                    </div>
                    <div className={'butRight'}>
                        <Button
                            variant="contained"
                            color="primary"
                            endIcon={<Send/>}
                            onClick={sendReq}
                        >
                            Подать заявку
                        </Button>
                    </div>
                </div>
                <div className={'container-fluid Form col-6 mt-4'}>
                    <List>
                        <h2>Список заявок для поддтверждения: </h2>
                        {items.map((item, id) => (
                            <React.Fragment key={id}>
                                {item.data.length === 0 &&
                                <div>Заявок нет</div>
                                }
                                {item.data.map((el, id) => (
                                    <React.Fragment key={id}>
                                        <Order prop={open} sendDate={idModal} getProp={handleClose}/>
                                        <ListItem button onClick={() => handleClickOpen(el.id)}>

                                            <ListItemAvatar>
                                                <Avatar>
                                                    <InsertDriveFileIcon/>
                                                </Avatar>
                                            </ListItemAvatar>
                                            {el.category.map((cat, id) => (
                                                <React.Fragment key={id}>
                                                    <ListItemText primary={cat.title} secondary={cat.title}/>
                                                </React.Fragment>
                                            ))}
                                            <SendIcon/>
                                        </ListItem>
                                    </React.Fragment>
                                ))}
                            </React.Fragment>
                        ))}
                    </List>

                    {!isLoadedOrders &&
                        <List>
                            <h2>Список заявок:</h2>
                            <div className={'container-fluid row justify-content-center'}>
                                <CircularProgress/>
                            </div>
                        </List>
                    }
                    {isLoadedOrders &&
                    <List>
                        <h2>Список заявок: </h2>
                        {orders.length === 0 &&
                        <div>Заявок нет</div>
                        }
                        {orders.map((item, id) => (
                            <React.Fragment key={id}>

                                {item.request.map((el, id) => (
                                    <React.Fragment key={id}>
                                        <ListItem button>
                                            <ListItemAvatar>
                                                <Avatar>
                                                    <InsertDriveFileIcon/>
                                                </Avatar>
                                            </ListItemAvatar>
                                            {el.category.map((cat, id) => (
                                                <React.Fragment key={id}>
                                                    <ListItemText primary={cat.title} secondary={cat.title}/>
                                                </React.Fragment>
                                            ))}
                                            <SendIcon/>
                                        </ListItem>
                                    </React.Fragment>
                                ))}
                            </React.Fragment>
                        ))}
                    </List>
                    }
                </div>
            </div>
        );
    }
}
