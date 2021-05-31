import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import Category from './category/index'

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tappable-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        display: 'flex',
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
}));

export default function adminPanel() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                indicatorColor="primary"
                onChange={handleChange}
                aria-label="Vertical tabs example"
                className={classes.tabs}
            >
                <Tab label="Категории" {...a11yProps(0)} />
                <Tab label="Заявки ожидающие подтверждения" {...a11yProps(1)} />
                <Tab label="Заявки" {...a11yProps(2)} />
                <Tab label="Пользователи" {...a11yProps(3)} />
            </Tabs>
            <TabPanel value={value} index={0} className={'container-fluid'}>
                <Category/>
            </TabPanel>
            <TabPanel value={value} index={1} className={'container-fluid'}>
                Item Two
            </TabPanel>
            <TabPanel value={value} index={2} className={'container-fluid'}>
                Item Three
            </TabPanel>
            <TabPanel value={value} index={3} className={'container-fluid'}>
                Item Four
            </TabPanel>
        </div>
    );
}
