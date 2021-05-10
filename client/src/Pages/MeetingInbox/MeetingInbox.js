import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MeetingCard from './components/MeetingCard.js';
import { action__get__meetings } from '../../actions/action__meetings';
import { action__get__accounts } from '../../actions/action__accounts';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24,
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
}));

export default function MeetingInbox() {
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
    console.log(store__accounts);

    return (
        <div className={classes.root}>
            <CssBaseline />
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                        {
                            store__meetings.map((meeting, key) => (
                                store__accounts.map((account, key) => (
                                    account._id == meeting.party_two_id ? (
                                        <Grid item xs={12}>
                                            <Paper className={classes.paper}>
                                                <MeetingCard account={account} meeting={meeting} />
                                            </Paper>
                                        </Grid>
                                    ) : (
                                        null
                                    )
                                )
                                )))
                        }
                    </Grid>
                </Container>
            </main>
        </div>
    );
}