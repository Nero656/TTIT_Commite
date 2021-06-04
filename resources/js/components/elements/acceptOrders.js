import React, {useEffect, useState} from "react";
import Avatar from '@material-ui/core/Avatar';
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import ListItemText from "@material-ui/core/ListItemText";
import SendIcon from "@material-ui/icons/Send";
import List from "@material-ui/core/List";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function reqListForWaiting() {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);
    const [isLoadedOrders, setIsLoadedOrders] = useState(false);

    let user = [];
    if (localStorage.getItem('User') !== null) {
        user = JSON.parse(localStorage.getItem('User'));
    }

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

    if (!isLoadedOrders) {
        return (
            <List className={'Form mt-3 '}>
                <h2 className={'p-2'}>Список принятых заявок:</h2>
                <div className={'container-fluid row justify-content-center'}>
                    <CircularProgress/>
                </div>
            </List>
        )
    } else {
        return (
            <List className={'Form mt-3'}>
                <h2 className={'p-2'}>Список принятых заявок:</h2>
                {orders.length === 0 &&
                    <div className={'p-2'}>Заявок нет</div>
                }
                {orders.map((item, id) => (
                    <React.Fragment key={id}>
                        {item.request.map((el, id) => (
                            <React.Fragment key={id}>
                                {item.status === 'Принята' &&
                                <ListItem button>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <InsertDriveFileIcon/>
                                        </Avatar>
                                    </ListItemAvatar>
                                    {el.category.map((cat, id) => (
                                        <React.Fragment key={id}>
                                            <ListItemText primary={el.title} secondary={cat.title}/>
                                        </React.Fragment>
                                    ))}
                                    <SendIcon/>
                                </ListItem>
                                }
                            </React.Fragment>
                        ))}
                    </React.Fragment>
                ))}
            </List>
        );
    }
}
