import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import FacebookIcon from '@material-ui/icons/Facebook';
import IconButton from "@material-ui/core/IconButton";
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import YouTubeIcon from '@material-ui/icons/YouTube';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            <IconButton color="primary" component="span">
                <FacebookIcon />
            </IconButton>
            <IconButton color="primary"  component="span">
                <TwitterIcon />
            </IconButton>
            <IconButton color="primary"  component="span">
                <InstagramIcon />
            </IconButton>
            <IconButton color="primary"  component="span">
                <YouTubeIcon />
            </IconButton>
            <br/>

            {'Copyright © TTИT  Тел. приемной коммисии: +7 934 654 9090, ' +
            'Приём с понидельника по пятницу с 8:30 до 18:00 '}
            {new Date().getFullYear()}
            {'.'}


        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    footer: {
        backgroundColor: theme.palette.background.paper,
        // marginTop: theme.spacing(8),
        padding: theme.spacing(6, 0),
    },
}));

export default function Footer(props) {
    const classes = useStyles();
    const { description, title } = props;

    return (
        <footer className={classes.footer + ' footer'}>
            <Container maxWidth="lg">
                <Typography variant="h6" align="center" gutterBottom>
                    {title}
                </Typography>
                <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                    {description}
                </Typography>
                <Copyright />
            </Container>
        </footer>
    );
}

Footer.propTypes = {
    description: PropTypes.string,
    title: PropTypes.string,
};
