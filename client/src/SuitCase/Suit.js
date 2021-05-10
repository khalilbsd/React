import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {Fullscreen} from '@material-ui/icons';
import {createMuiTheme} from '@material-ui/core/styles';
import {CircularProgress} from '@material-ui/core';
import SendedInvitation from './suit components/SendedInvitation'
import Incoming__invitation from './suit components/Incoming__invitation';
import Post__request from './suit components/Post__request';
import {withRouter} from "react-router-dom";

/*action*/

import {action__get__invitations} from '../actions/action__invitations.js'
/*redux*/

import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
/*css*/
import '../css/suit.css';
function TabPanel(props) {
    const {
        children,
        value,
        index,
        ...other
    } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}>
            {
                value === index && (
                    <Box p={3}>
                        <Typography>{children}</Typography>
                    </Box>
                )
            }
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired
};

function a11yProps(index) {
    return {id: `full-width-tab-${index}`, 'aria-controls': `full-width-tabpanel-${index}`};
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: Fullscreen,
        marginTop: 40,
    },
    tabs:{
        color:'black',
    }
}));

const Suit = () => {
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    /*geting info form database */

    const store__invi = useSelector((state) => state.reducer__invitations);

    return (
        <div className={classes.root}>
            <AppBar
                position="static"
                style={{
                    background: 'transparent',
                    boxShadow: 'none'
                }}>
                <Tabs
                className={classes.tabs}
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="white"
                    variant="full Width"
                    centered="centered">
                    <Tab label="Recieved invitation " {...a11yProps(0)}/>

                    <Tab label="Sent invitation" {...a11yProps(1)}/>
                    <Tab label="Post Request" {...a11yProps(2)}/>
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl'
                    ? 'x-reverse'
                    : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}>
                <TabPanel value={value} index={0} dir={theme.direction}>
                    <Incoming__invitation/>
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    <SendedInvitation/>
                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}>
                    <Post__request/>
                </TabPanel>
            </SwipeableViews>
        </div>
    );
}

export default withRouter(Suit);