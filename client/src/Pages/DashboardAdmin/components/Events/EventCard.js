import React from 'react';
import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {makeStyles, useTheme} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {action__patch__events} from '../../../../actions/action__events';
import TextField from "@material-ui/core/TextField";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker} from "@material-ui/pickers";
//import Modal from "@material-ui/core/Modal";
import {useHistory} from "react-router-dom";
import dateFormat from 'dateformat';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import EventIcon from '@material-ui/icons/Event';
import InfoIcon from '@material-ui/icons/Info';

import Modal from 'react-bootstrap/Modal';
import FileBase from 'react-file-base64';

function getModalStyle() {
    const top = 50;
    const left = 50;
    return {top: `${top}%`, left: `${left}%`, transform: `translate(-${top}%, -${left}%)`};
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
        width: "100%"
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

    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: "100%",
        marginTop: theme.spacing(1)
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        color: 'white',
        backgroundColor: '#2699fb',
        border: 'none',
        width: '100%',
        '&:hover': {
            color: 'white',
            backgroundColor: '#68A5CF'
        }
    },

    close: {

        color: 'white',
        backgroundColor: '#ff1744',
        border: 'none',
        width: '100%',
        '&:hover': {
            color: 'white',
            backgroundColor: '#ff4569'
        }
    },

    mod: {
        position: "absolute",
        width: 400,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3)
    },
    image: {
        backgroundRepeat: 'no-repeat',
        backgroundColor: theme.palette.type === 'light'
            ? theme
                .palette
                .grey[50]
            : theme
                .palette
                .grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    
    button_desc: {
        backgroundColor: '#f50057',
        textAlign: 'center',
        border: 'none',
        width: '90%',
        float: 'right',
        borderRadius: 3,
        color: 'white',
        outline: 'none',
        '&:hover': {
            backgroundColor: '#f73378',
            boxShadow: '0 3px 10px 0px #f73378'
        }
    },
    button_act: {
        backgroundColor: '#76ff03',
        textAlign: 'center',
        border: 'none',
        width: '90%',
        float: 'right',
        borderRadius: 3,
        color: 'white',
        outline: 'none',
        '&:hover': {
            backgroundColor: '#91ff35',
            boxShadow: '0 3px 10px 0px #91ff35',
        }
    },
    button_update:{
        backgroundColor: '#2196F3',
        textAlign: 'center',
        border: 'none',
        width: '90%',
        float: 'right',
        borderRadius: 3,
        color: 'white',
        outline: 'none',
        '&:hover': {
            backgroundColor: 'grey',
            boxShadow: '0 3px 10px 0px grey',
        } 
    },
    input: {
        width: '80%',
        marginLeft: '10%',
        marginTop: '5%'
    },
    inputImage: {
        //marginLeft:'15%',
        paddingLeft: '20%'
    }
}));

export default function EventCard({event}) {
    const classes = useStyles();
    const theme = useTheme();

    const dispatch = useDispatch();

    //delete
    const [deletedEvent, setDeletedEvent] = useState({state: ""});
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

    /*const [selectedStartDate, setSelectedStartDate] = React.useState(
        new Date("2014-08-18T21:11:54")
    );

    const [selectedEndDate, setSelectedEndDate] = React.useState(
        new Date("2014-08-18T21:11:54")
    );*/

    /*const handleStartDateChange = (date) => {
        setSelectedStartDate(date);
    };

    const handleEndDateChange = (date) => {
        setSelectedEndDate(date);
    };*/

    let history = useHistory();

    const [image, setImage] = useState("");

    return (
        <Grid container="container" spacing={3}>
            <Grid item="item" xs={12}>
                <img className={classes.cover} src={event.image}/>
            </Grid>
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Typography component="h5" variant="h5">
                        {event.title}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        <LocationOnIcon/> {event.location}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        <EventIcon/> {dateFormat(event.start_date, "mmm dd ,yyyy")}
                        • {dateFormat(event.end_date, "mmm dd ,yyyy")}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        <InfoIcon/> {event.description}
                    </Typography>
                </CardContent>
                <div className={classes.controls}>
                    <div className={classes.buttons}>
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
                                            }}
                                            className={classes.button_desc}>Deactivate</Button>
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
                                            }}
                                            className={classes.button_act}>Activate</Button>
                                        <br/>
                                    </div>
                                )
                        }
                        {/*begin modal*/}
                        <div>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleOpen}
                                className={classes.button_update}>
                                Update
                            </Button>
                        </div>

                    </div>
                    <Modal
                        show={open}
                        animation={true}
                        size="xl"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered="centered">
                        <form className={classes.form} noValidate="noValidate">
                            <Modal.Body>
                                <Typography component="h1" align="center" variant="h5">
                                    Update Event
                                </Typography>
                                <Grid item="item" xs={12} className={classes.left}>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardDatePicker
                                            margin="normal"
                                            id="date-picker-dialog"
                                            label="Start Date"
                                            format="MM/dd/yyyy"
                                            value={updatedEvent.start_date}
                                            onChange={(e) => {
                                                setUpdatedEvent({
                                                    ...updatedEvent,
                                                    start_date: e.target.value
                                                })
                                            }
}
                                            KeyboardButtonProps={{
                                                "aria-label" : "change date"
                                            }}/>
                                        <KeyboardTimePicker
                                            margin="normal"
                                            id="time-picker"
                                            label="Start Time"
                                            value={updatedEvent.start_date}
                                            onChange={(e) => {
                                                setUpdatedEvent({
                                                    ...updatedEvent,
                                                    start_date: e.target.value
                                                })
                                            }
}
                                            KeyboardButtonProps={{
                                                "aria-label" : "change time"
                                            }}/>
                                        <KeyboardDatePicker
                                            margin="normal"
                                            id="date-picker-dialog"
                                            label="End Date"
                                            format="MM/dd/yyyy"
                                            value={updatedEvent.end_date}
                                            onChange={(e) => {
                                                setUpdatedEvent({
                                                    ...updatedEvent,
                                                    end_date: e.target.value
                                                })
                                            }
}
                                            KeyboardButtonProps={{
                                                "aria-label" : "change date"
                                            }}/>
                                        <KeyboardTimePicker
                                            margin="normal"
                                            id="time-picker"
                                            label="End Time"
                                            value={updatedEvent.end_date}
                                            onChange={(e) => {
                                                setUpdatedEvent({
                                                    ...updatedEvent,
                                                    end_date: e.target.value
                                                })
                                            }
}
                                            KeyboardButtonProps={{
                                                "aria-label" : "change time"
                                            }}/>
                                    </MuiPickersUtilsProvider>
                                </Grid>
                                <Grid container="container" spacing={3}>

                                    <Grid container="container" xs={6}>
                                        <Grid item="item" xs={12} className={classes.left}>
                                            <TextField
                                                className={classes.input}
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
                                                }}/>
                                        </Grid>
                                        <Grid item="item" xs={12} className={classes.left}>
                                            <TextField
                                                className={classes.input}
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
                                                }}/>
                                        </Grid>

                                    </Grid>
                                    <Grid container="container" xs={6}>
                                        <Grid item="item" xs={12} className={classes.right}>
                                            <TextField
                                                className={classes.input}
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
                                                }}/>
                                        </Grid>
                                        <Grid item="item" xs={12} className={classes.right}>
                                            <TextField
                                                className={classes.input}
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
                                                }}/>
                                        </Grid>
                                    </Grid>
                                    <Grid item="item" xs={12} className={classes.inputImage}>
                                        <FileBase
                                            defaultValue={event.image}
                                            type="File"
                                            multiple={false}
                                            onDone={({base64}) => setUpdatedEvent({
                                                ...updatedEvent,
                                                image: base64

                                            })}/>
                                    </Grid>
                                </Grid>
                            </Modal.Body>
                        </form>
                        <Modal.Footer>
                            <Button type="submit" fullWidth="fullWidth" variant="contained"
                                //color="primary"
                                className={classes.submit} onClick={handleUpdate}>
                                Update
                            </Button>
                            <Button
                                onClick={handleClose}
                                fullWidth="fullWidth"
                                variant="contained"
                                className={classes.close}>Close</Button>
                        </Modal.Footer>

                    </Modal>
                </div>
                {/*end modal*/}

            </div>
        </Grid>

    );
}
