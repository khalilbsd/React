import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { action__patch__events } from '../../../../actions/action__events';
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from "@material-ui/pickers";
import Modal from "@material-ui/core/Modal";
import { useHistory } from "react-router-dom";

function getModalStyle() {
    const top = 50;
    const left = 50;
    return { top: `${top}%`, left: `${left}%`, transform: `translate(-${top}%, -${left}%)` };
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex"
    },
    details: {
        display: "flex",
        flexDirection: "column"
    },
    content: {
        flex: "1 0 auto"
    },
    cover: {
        width: 151
    },
    controls: {
        display: "flex",
        alignItems: "center",
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1)
    },
    playIcon: {
        height: 38,
        width: 38
    },
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: "100%",
        marginTop: theme.spacing(1)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    },
    mod: {
        position: "absolute",
        width: 400,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3)
    }
}));

export default function EventCard({ event }) {
    const classes = useStyles();
    const theme = useTheme();

    const dispatch = useDispatch();

    //delete
    const [deletedEvent, setDeletedEvent] = useState({ state: "" });
    const [eventId, setEventId] = useState("");


    useEffect(() => {
        if (eventId && deletedEvent.state) {
            dispatch(action__patch__events(eventId, deletedEvent)).then(setDeletedEvent({
                ...deletedEvent,
                state: ""
            }), setEventId(""));
        }
    }, [eventId, deletedEvent.state]);

    //update

    const [updatedEvent, setUpdatedEvent] = useState({
        _id: "",
        title: "",
        start_date: "",
        end_date: "",
        location: "",
        industrial_sector: "",
        description: "",
        image: ""
    });

    const handleUpdate = (e) => {
        e.preventDefault();
        dispatch(action__patch__events(updatedEvent._id, updatedEvent));
        setOpen(false);
        history.push("/dashevents");
    }
    //end update begin modal
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);

    const handleOpen = (e) => {
        e.preventDefault();
        setOpen(true);
        setUpdatedEvent({
            _id: event._id,
            title: event.title,
            start_date: event.start_date,
            end_date: event.end_date,
            location: event.location,
            industrial_sector: event.industrial_sector,
            description: event.description,
            image: event.image
        });
    };

    const handleClose = () => {
        setOpen(false);
    };
    //end modal begin date and time input
    const [selectedDate, setSelectedDate] = React.useState(
        new Date("2014-08-18T21:11:54")
    );

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
    //end date and time input
    let history = useHistory();

    return (
        <Card className={classes.root}>
            <CardMedia className={classes.cover} image={event.image} />
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Typography component="h5" variant="h5">
                        {event.title}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        {event.description}
                    </Typography>
                </CardContent>
                <div className={classes.controls}>
                    {
                        event.state == "true"
                            ? (
                                <div>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => {
                                            setDeletedEvent({
                                                ...deletedEvent,
                                                state: "false"
                                            });
                                            setEventId(event._id);
                                        }}>Deactivate Event</Button>
                                </div>
                            )
                            : (
                                <div>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => {
                                            setDeletedEvent({
                                                ...deletedEvent,
                                                state: "true"
                                            });
                                            setEventId(event._id);
                                        }}>Activate Event</Button>
                                    <br />
                                </div>
                            )
                    }
                    {/*begin modal*/}
                    <div>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleOpen}>
                            Open Modal
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
                                            Update Event
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

                </div>
                {/*end modal*/}
            </div>
        </Card>
    );
}
