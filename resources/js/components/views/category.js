import React, {useState, useEffect} from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import CategoryPage from "./categoryPage";

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        height : 500,
    },
    action:{
        verticalAlign:'top',
        display:'inline-block',
        height:500,
    }
});

export default function category() {
    const classes = useStyles();
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [open, setOpen] = useState(false);
    const [catId, setId] = useState(0);
    const [bodyPage, setBody ]= useState([]);


    const handleClickOpen = (id) => {
        setId(id);
        console.log(id);

        fetch(`/api/category/` + id).then(async response => {
            if (!response.ok) {
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            } else {
                response.json().then(function (data) {
                    setBody(data);
                });
            }
        })

        setOpen(true);
    };

    const handleClose = () => {
        setBody([])
        setOpen(false);
    };

    useEffect(() => {
        fetch(`/api/category/all`).then(async response => {
            if (!response.ok) {
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            } else {
                response.json().then(function (data) {
                    setIsLoaded(true);
                    setItems(data);
                });
            }
        })
    }, [])

    if (error) {
        return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
        return (
            <div className={'container-fluid mt-5 text-center'}>
                <CircularProgress/>
            </div>
        );
    } else {
        return (
            <div className={'container  mt-5 '}>
                <CategoryPage prop={open}  getProp={handleClose} body={bodyPage}/>
                <div className={'row row-cols-lg-3'}>
                {items.map((item, id) => (
                    <CardActionArea className={classes.root+' ml-3 mt-2'} onClick={() => handleClickOpen(item.id)}>
                    <Card className={classes.root}>
                            <CardMedia
                                component="img"
                                alt="Contemplative Reptile"
                                image={item.img_url}
                                title="Contemplative Reptile"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {item.title}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {item.desc.substring(0,200) + '...'}
                                </Typography>
                            </CardContent>
                    </Card>
                    </CardActionArea>
                ))}
                </div>
            </div>
        );
    }
}
