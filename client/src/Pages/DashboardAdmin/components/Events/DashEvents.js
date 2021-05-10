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
import EventCard from './EventCard.js';
import { action__get__events } from '../../../../actions/action__events';
import DashDrawer from "../Drawer/DashDrawer.js"
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
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
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
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

export default function DashEvents() {
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
    //end 

    //event
    //display
    useEffect(() => {
        dispatch(action__get__events());
    }, [dispatch]);

    const store__events = useSelector((state) => state.reducer__events);
    //end

    return (
        <div className={classes.root}>
            <CssBaseline />
            <DashDrawer />
            {/*begin modal
            <div>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleOpen}>
                    Create
                        </Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description">
                    <div style={modalStyle} className={classes.mod}>
                        <Container component="main" maxWidth="xs">
                            <div className={classes.paper}>

                                <Typography component="h1" variant="h5">
                                    Create Event
                                        </Typography>
                                <form className={classes.form} noValidate="noValidate">
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth="fullWidth"
                                        id="title"
                                        label="Title"
                                        name="title"
                                        autoFocus="autoFocus"
                                        defaultValue={event.title}
                                        onChange={(e) => {
                                            setUpdatedEvent({
                                                ...updatedEvent,
                                                title: e.target.value
                                            });
                                        }} />
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardDatePicker
                                            margin="normal"
                                            id="date-picker-dialog"
                                            label="Date picker dialog"
                                            format="MM/dd/yyyy"
                                            value={selectedDate}
                                            onChange={handleDateChange}
                                            KeyboardButtonProps={{
                                                "aria-label": "change date"
                                            }} />
                                        <KeyboardTimePicker
                                            margin="normal"
                                            id="time-picker"
                                            label="Time picker"
                                            value={selectedDate}
                                            onChange={handleDateChange}
                                            KeyboardButtonProps={{
                                                "aria-label": "change time"
                                            }} />
                                    </MuiPickersUtilsProvider>

                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth="fullWidth"
                                        id="location"
                                        label="Location"
                                        name="location"
                                        autoFocus="autoFocus"
                                        defaultValue={event.location}
                                        onChange={(e) => {
                                            setUpdatedEvent({
                                                ...updatedEvent,
                                                location: e.target.value
                                            });
                                        }} />
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth="fullWidth"
                                        id="industrial_sector"
                                        label="Industrial Sector"
                                        name="industrial_sector"
                                        autoFocus="autoFocus"
                                        defaultValue={event.industrial_sector}
                                        onChange={(e) => {
                                            setUpdatedEvent({
                                                ...updatedEvent,
                                                industrial_sector: e.target.value
                                            });
                                        }} />
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth="fullWidth"
                                        id="description"
                                        label="Description"
                                        name="description"
                                        autoFocus="autoFocus"
                                        defaultValue={event.description}
                                        onChange={(e) => {
                                            setUpdatedEvent({
                                                ...updatedEvent,
                                                description: e.target.value
                                            });
                                        }} />
                                    <Button
                                        type="submit"
                                        fullWidth="fullWidth"
                                        variant="contained"
                                        color="primary"
                                        className={classes.submit}
                                        onClick={handleUpdate}
                                    >
                                        Update
                                            </Button>
                                </form>
                            </div>
                        </Container>
                    </div>
                </Modal>
            </div>

            end modal*/}
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                        {
                            store__events.map((event, key) => (
                                <Grid item xs={12}>
                                    <Paper className={classes.paper}>
                                        <EventCard event={event} />
                                    </Paper>
                                </Grid>
                            ))
                        }
                    </Grid>
                </Container>
            </main>
        </div >
    );
}