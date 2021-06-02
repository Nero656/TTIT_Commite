import React, {useState, useEffect} from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
});

export default function category() {
    const classes = useStyles();

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

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
                <div className={'row row-cols-lg-3'}>
                {items.map((item, id) => (
                    <Card className={classes.root + ' ml-3 mt-2 '}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                alt="Contemplative Reptile"
                                height="140"
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
                        </CardActionArea>
                    </Card>
                ))}
                </div>
            </div>
        );
    }
}
