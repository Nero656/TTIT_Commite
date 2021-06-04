import React from "react";
import Avatar from '@material-ui/core/Avatar';
import PhoneIphoneIcon from "@material-ui/icons/PhoneIphone";
import EmailIcon from "@material-ui/icons/Email";
import Button from "@material-ui/core/Button";
import Send from "@material-ui/icons/Send";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            flexFlow: 'row wrap',
        },
    },
    avatar: {
        width: theme.spacing(25),
        height: theme.spacing(25),
    }
}));

export default function userCard() {
    const classes = useStyles();

    let user = [];
    if (localStorage.getItem('User') !== null) {
        user = JSON.parse(localStorage.getItem('User'));
    }

    function sendReq() {
        return window.location.replace('/send-request');
    }

    return (
        <div className={'Form p-3 UserCard'}>
            <div className={'row'}>
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
    );
}
