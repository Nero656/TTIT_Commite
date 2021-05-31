import React, {useState, useEffect} from "react";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from "@material-ui/core/CircularProgress";
import SendIcon from "@material-ui/icons/Send";

export default function ProfList() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch(`/api/user/profList`).then(async response => {
            if (!response.ok) {
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            } else {
                response.json().then(function (data) {
                    setIsLoaded(true);
                    setItems(data.data);
                });
            }
        })
    }, [])
    if (error) {
        return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
        return (
            <List className={'Form mt-5'}>
                <h5 className={'p-3'}>Представители приемной комиссии:</h5>
                <div className={'container-fluid row justify-content-center'}>
                    <CircularProgress/>
                </div>
            </List>
        );
    } else {
        return (
            <List className={'Form mt-5'}>
                <h5 className={'p-3'}>Представители приемной комиссии:</h5>
                {items.map((item, id) => (
                    <React.Fragment key={id}>
                        <ListItem button>
                            <ListItemAvatar>
                                <Avatar alt={item.username} src={item.avatar}/>
                            </ListItemAvatar>
                            <ListItemText primary={item.username} secondary={item.email}/>
                            <SendIcon/>
                        </ListItem>
                    </React.Fragment>
                ))}
            </List>
        );
    }
}
