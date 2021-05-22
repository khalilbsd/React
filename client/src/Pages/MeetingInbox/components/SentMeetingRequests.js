import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import MeetingCard from './MeetingCard.js';
import { action__get__meetings } from '../../../actions/action__meetings';
import { action__get__accounts } from '../../../actions/action__accounts';
import { action__get__events } from '../../../actions/action__events';
import { CircularProgress } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    toolbar: {
        paddingRight: 24
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar
    },
    appBar: {
        transition: theme
            .transitions
            .create([
                'width', 'margin'
            ], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen
            })
    },
    menuButton: {
        marginRight: 36
    },
    menuButtonHidden: {
        display: 'none'
    },
    title: {
        flexGrow: 1
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto'
    },
    fixedHeight: {
        height: 240
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column'
    }
}));

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
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
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
    return { id: `scrollable-auto-tab-${index}`, 'aria-controls': `scrollable-auto-tabpanel-${index}` };
}

export default function SentMeetingRequests({ _id }) {
    const classes = useStyles();
    const dispatch = useDispatch();

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    useEffect(() => {
        dispatch(action__get__meetings());
    }, [dispatch]);
    const store__meetings = useSelector((state) => state.reducer__meetings);

    useEffect(() => {
        dispatch(action__get__accounts());
    }, [dispatch]);
    const store__accounts = useSelector((state) => state.reducer__accounts);

    useEffect(() => {
        dispatch(action__get__events());
    }, [dispatch]);
    const store__events = useSelector((state) => state.reducer__events);

    return (
        <div className={classes.root}>
            {
                store__meetings.length<0?
                <CircularProgress/>
                :
                store__meetings.map((meeting, key) => (
                    meeting.party_one_id == _id
                        ? (store__accounts.map((account, key2) => (
                            account._id == meeting.party_two_id
                                ? (store__events.map((event, key3) => (
                                    event._id == meeting.event_id
                                        ? (<MeetingCard _id={_id} account={account} meeting={meeting} event={event} />)
                                        : (null)
                                )))
                                : (null)
                        )))
                        : (null)
                )
                )
            }
        </div>
    );
}