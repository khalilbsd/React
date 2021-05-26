/* eslint-disable react/jsx-pascal-case */
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
import {CircularProgress, LinearProgress} from '@material-ui/core';
import SendedInvitation from './suit components/SendedInvitation'
import Incoming__invitation from './suit components/Incoming__invitation';
import {withRouter} from "react-router-dom";

//componeents
import Empty from './suit components/Empty';
/*action*/
import {action__get__invitations} from '../actions/action__invitations.js'
/*redux*/

import {useSelector, useDispatch} from 'react-redux';
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
        marginTop: 40
    },
    tabs: {
        color: 'black'
    }
}));

const Suit = () => {
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
    const id = useSelector((state) => state.reducer__login)
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(action__get__invitations());
    }, [dispatch]);
    /*geting info form database */
    const invitations = useSelector((state) => state.reducer__invitations);
    console.log(id[0])
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
                    indicatorColor="secondary"
                    textColor="white"
                    variant="full Width"
                    centered="centered">
                    <Tab label="Recieved invitation " {...a11yProps(0)}/>

                    <Tab label="Sent invitation" {...a11yProps(1)}/>
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl'
                    ? 'x-reverse'
                    : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}>

                <TabPanel value={value} index={0} dir={theme.direction}>
                    {
                        !invitations
                            ? <LinearProgress className={classes.loader}/>
                            : invitations.length < 0
                                ? <Empty title="you don't have any invitations yet"/>
                                : invitations.map(
                                    (invitation, key) => invitation.offerer_id === id[0]
                                        ? <Incoming__invitation invitation={invitation}/>
                                        : null
                                )
                    }

                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    {
                        !invitations
                            ? <LinearProgress className={classes.loader}/>
                            : invitations.length < 0
                                ? <Empty title="you didn't send any invitations yet"/>
                                : invitations.map(
                                    (invitation, key) => invitation.requester_id === id[0]
                                        ? <SendedInvitation invitation={invitation}/>
                                        : null
                                )
                    }

                </TabPanel>
            </SwipeableViews>
        </div>
    );
}

export default withRouter(Suit);