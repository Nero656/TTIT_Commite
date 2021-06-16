import React, {useEffect, useState} from 'react';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Slide from "@material-ui/core/Slide";
import Avatar from "@material-ui/core/Avatar";
import CircularProgress from "@material-ui/core/CircularProgress";


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});


export default function categoryPage({prop, getProp, body}) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);
    const [scroll, setScroll] = React.useState('paper');


    return (
        <div>
            <Dialog
                open={prop}
                TransitionComponent={Transition}
                keepMounted
                onClose={getProp}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
                className={'md'}
            >
                <DialogTitle id="alert-dialog-slide-title">
                <span className={'row'}>
                    <Avatar alt="Remy Sharp" src={body.img_url}/> &nbsp;
                    {body.title}
                </span>
                </DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>
                    <DialogContentText id="alert-dialog-slide-description">
                        {body.desc}
                    </DialogContentText>
                </DialogContent>
            </Dialog>
            }
        </div>
    );
}
