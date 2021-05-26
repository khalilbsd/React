import React from 'react';
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ParticipantCard from './ParticipantCard.js';

//redux
import {action__get__participants} from '../../../../actions/action__participants';
import {action__get__accounts} from '../../../../actions/action__accounts';
import {action__get__events} from '../../../../actions/action__events';

import DashDrawer from "../Drawer/DashDrawer.js"
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex'
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme
            .transitions
            .create([
                'width', 'margin'
            ], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen
            })
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme
            .transitions
            .create([
                'width', 'margin'
            ], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen
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
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme
            .transitions
            .create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen
            })
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme
            .transitions
            .create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen
            }),
        width: theme.spacing(7),
        [
            theme
                .breakpoints
                .up('sm')
        ]: {
            width: theme.spacing(9)
        }
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto'
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4)
    },

    fixedHeight: {
        height: 240
    }
}));

export default function Dashboard() {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [open, setOpen] = React.useState(true);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    //end default begin account display
    useEffect(() => {
        dispatch(action__get__events());
    }, [dispatch]);

    const events = useSelector((state) => state.reducer__events);

    useEffect(() => {
        dispatch(action__get__participants());
    }, [dispatch]);

    const store__participants = useSelector((state) => state.reducer__participants);
    //end account display ultra imp
    useEffect(() => {
        dispatch(action__get__accounts());
    }, [dispatch]);

    const store__accounts = useSelector((state) => state.reducer__accounts);
    console.log(store__accounts);
    //end ultra

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <DashDrawer/>
            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container="container" spacing={3}>
                        {/* Recent Orders */}
                        {
                            store__participants.map(
                                (participant, key) => (store__accounts.map((account, key) => (
                                    account._id === participant.account_id
                                        ? events.map((event, map) => (
                                            event._id === participant.event_id
                                                ? (
                                                    <Grid item="item" xs={12}>
                                                        <ParticipantCard account={account} event={event} participant={participant}/>
                                                    </Grid>
                                                )
                                                : (null)

                                        ))
                                        :null

                                )))
                            )
                        }
                    </Grid>
                </Container>
            </main>
        </div>
    );
}