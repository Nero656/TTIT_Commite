import React from "react";
import {makeStyles} from '@material-ui/core/styles';
import ProfList from "../profList";
import UserCard from "./UserCard";
import ReqListWaiting from "../../elements/requestListWaiting"
import OrderListWaiting from "../../elements/orderWating"
import AcceptOrders from "../../elements/AcceptOrders"
import CanceledOrders from "../../elements/CanceledOrders"


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    }
}));


export default function User() {
    let user = [];
    const classes = useStyles();

    if (localStorage.getItem('User') !== null) {
        user = JSON.parse(localStorage.getItem('User'));
    }

    return (
        <div className={'container-fluid row justify-content-center'}>
            <ProfList/>
            <div className={'col-12 col-lg-6'}>
                <UserCard/>
                <ReqListWaiting/>
                <OrderListWaiting/>
                <AcceptOrders/>
                <CanceledOrders/>
            </div>
        </div>
    );
}
