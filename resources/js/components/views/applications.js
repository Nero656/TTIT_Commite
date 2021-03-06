import React, {useEffect, useState} from 'react';
import {withStyles} from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import AccordionActions from "@material-ui/core/AccordionActions";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import CircularProgress from "@material-ui/core/CircularProgress";

const Accordion = withStyles({
    root: {
        border: '1px solid rgba(0, 0, 0, .125)',
        boxShadow: 'none',
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
        '&$expanded': {
            margin: 'auto',
        },
    },
    expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
    root: {
        backgroundColor: 'rgba(0, 0, 0, .03)',
        borderBottom: '1px solid rgba(0, 0, 0, .125)',
        marginBottom: -1,
        minHeight: 56,
        '&$expanded': {
            minHeight: 56,
        },
    },
    content: {
        '&$expanded': {
            margin: '12px 0',
        },
    },
    expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiAccordionDetails);

export default function CustomizedAccordions() {
    const [expanded, setExpanded] = useState(0);
    const [items, setItems] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    useEffect(() => {
        let data = new FormData();
        fetch(`/api/orders/all`, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.token
                }
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

    function accept(id) {
        let data = new FormData();
        data.append('status', '??????????????');

        fetch(`/api/orders/` + id + '?_method=patch', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + localStorage.token
            },
            body: data
        }).then(async response => {
            const data = await response.json();
            if (!response.ok) {
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            } else {
                window.location.replace('/applications');
            }
        }).catch(error => {
            console.log('???? ????????????????');
        });
    }

    function cancel(id) {
        let data = new FormData();
        data.append('status', '????????????????');
        fetch(`/api/orders/` + id + '?_method=patch', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + localStorage.token
            },
            body: data
        }).then(async response => {
            const data = await response.json();
            if (!response.ok) {
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            } else {
                window.location.replace('/applications');
            }
        }).catch(error => {
            console.log('???? ????????????????');
        });
    }

    if (error) {
        return <div>????????????: {error.message}</div>;
    } else if (!isLoaded) {
        return (
            <div className={'container-fluid row justify-content-center mt-5'}>
                <CircularProgress/>
            </div>
        );
    } else {
        return (
            <div>
                <div className={'container Form col-10 col-lg-8'}>
                    <h1>???????????? ?????? ????????????????????????</h1>
                    {items.map((item, id) => (
                        <React.Fragment key={id}>
                            {item.data.map((el, id) => (
                                <React.Fragment key={id}>
                                    {el.status === null &&
                                    <Accordion square expanded={expanded === id} onChange={handleChange(id)}>
                                        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                                            <Typography>???????????? ????????????????????????????</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography>
                                                {el.request.map((req, id) => (
                                                    <React.Fragment key={id}>
                                                        <h1>????????????: {req.title}</h1>
                                                        <h3>??????????????: {req.certificate}</h3>
                                                        {req.category.map((cat, id) => (
                                                            <React.Fragment key={id}>
                                                                <h3>?????????????????? ??????????????????????????: {cat.title}</h3>
                                                            </React.Fragment>
                                                        ))}
                                                    </React.Fragment>
                                                ))}
                                            </Typography>
                                        </AccordionDetails>
                                        <Divider/>
                                        <AccordionActions>
                                            <Button color="secondary" variant="outlined" onClick={() => cancel(el.id)}>
                                                ???????????????? ????????????
                                            </Button>
                                            <Button color="primary" variant="contained" onClick={() => accept(el.id)}>
                                                ???????????????????? ????????????
                                            </Button>
                                        </AccordionActions>
                                    </Accordion>
                                    }
                                </React.Fragment>
                            ))}
                        </React.Fragment>
                    ))}
                </div>

                <div className={'container Form col-10 col-lg-8'}>
                    <h1>???????????????? ????????????</h1>
                    {items.map((item, id) => (
                        <React.Fragment key={id}>
                            {item.data.map((el, id) => (
                                <React.Fragment key={id}>
                                    {el.status !== null &&
                                    <Accordion square expanded={expanded === id} onChange={handleChange(id)}>
                                        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                                            <Typography>{el.status}</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography>
                                                {el.request.map((req, id) => (
                                                    <React.Fragment key={id}>
                                                        <h1>????????????: {req.title}</h1>
                                                        <h3>??????????????: {req.certificate}</h3>
                                                        {req.category.map((cat, id) => (
                                                            <React.Fragment key={id}>
                                                                <h3>?????????????????? ??????????????????????????: {cat.title}</h3>
                                                            </React.Fragment>
                                                        ))}
                                                    </React.Fragment>
                                                ))}
                                            </Typography>
                                        </AccordionDetails>
                                        <Divider/>
                                    </Accordion>
                                    }
                                </React.Fragment>
                            ))}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        );
    }
}


