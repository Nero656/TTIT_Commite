import React, {useEffect, useState} from "react";
import Avatar from '@material-ui/core/Avatar';
import Order from "../views/order";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import ListItemText from "@material-ui/core/ListItemText";
import SendIcon from "@material-ui/icons/Send";
import List from "@material-ui/core/List";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function reqListForWaiting() {
    const [items, setItems] = useState([]);
    const [open, setOpen] = useState(false);
    const [idModal, setIdModal] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isLoadedOrders, setIsLoadedOrders] = useState(false);

    const handleClickOpen = (id) => {
        setIdModal(id)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    let user = [];
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

    if (!isLoaded) {
        return (
            <List className={'Form mt-3'}>
                <h2 className={'p-2'}>Список заявок для поддтверждения:</h2>
                <div className={'container-fluid row justify-content-center'}>
                    <CircularProgress/>
                </div>
            </List>
        )
    } else {
        return (
            <List className={'Form mt-3'}>
                <h2 className={'p-2'}>Список заявок для поддтверждения: </h2>
                {items.map((item, id) => (
                    <React.Fragment key={id}>
                        {item.data.length === 0 &&
                        <div className={'p-2'}>Заявок нет</div>
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
        );
    }
}
