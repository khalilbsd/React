import React from 'react';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Slide from '@material-ui/core/Slide';

//filebase
import FileBase from 'react-file-base64';
import TextField from "@material-ui/core/TextField";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker} from "@material-ui/pickers";
//modal
import Modal from 'react-bootstrap/Modal';
//Grid
import Grid from "@material-ui/core/Grid";

//histtory
import {useHistory} from "react-router-dom";
//icon
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import IconButton from '@material-ui/core/IconButton';
import CancelIcon from '@material-ui/icons/Cancel';
//redux
import {action__post__events} from '../../../../actions/action__events';


const useStyles = makeStyles((theme) => ({
    button_create:{
        color:'green',
        backgroundColor:'white',
        boxShadow: '5px 10px 10px -10px #888888',
        marginLeft:15,
        marginBottom:15,
        width:'10%'
    },
    create:{
        backgroundColor:"#2196F3",
        color:'white',
        textTransform:'capitalize',
        marginBottom:10,
        '&:hover':{
            color:'black'
        }
    },
    input: {
        width: '80%',
        marginLeft: '10%',
        marginTop: '5%'
    },
    inputImage: {
        //marginLeft:'15%',
        marginLeft: '5%'
    },
    close:{
        backgroundColor:"#f50057",
        color:'white',
        textTransform:'capitalize',
        marginBottom:5,
        '&:hover':{
            color:'black'
        }
    }

}));
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props}/>;
});
const CreationEvent = () => {
    const classes = useStyles();

    const dispatch = useDispatch();

    //update

    const [newEvent, setEvent] = useState({
        title: "",
        start_date: "",
        end_date: "",
        location: "",
        industrial_sector: "",
        description: "",
        image: ""
    });

    const handleCreate = (e) => {
        e.preventDefault();
        dispatch(action__post__events(newEvent));
        setOpen(false);
        history.push("/dashevents");
    }
    //end update begin modal
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
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
        <diV>
            <Button onClick={handleOpen} className={classes.button_create}>
                <AddCircleOutlineIcon classes={classes.icon}/>
            </Button>
            <Modal
            onClose={handleClose}
                show={open}
                animation={true}
                size="xl"
                aria-labelledby="contained-modal-title-vcenter"
                centered="centered">
                <form className={classes.form} noValidate="noValidate">
                    <Modal.Body>
                        <Typography component="h1" align="center" variant="h5">
                            Create Event
                        </Typography>
                        <Grid item="item" xs={12} className={classes.left}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    margin="normal"
                                    id="date-picker-dialog"
                                    label="Start Date"
                                    format="MM/dd/yyyy"
                                    onChange={(e) => {
                                        setEvent({
                                            ...newEvent,
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
                                    onChange={(e) => {
                                        setEvent({
                                            ...newEvent,
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
                                    onChange={(e) => {
                                        setEvent({
                                            ...newEvent,
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
                                    onChange={(e) => {
                                        setEvent({
                                            ...newEvent,
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
                                        onChange={(e) => {
                                            setEvent({
                                                ...newEvent,
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
                                        onChange={(e) => {
                                            setEvent({
                                                ...newEvent,
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
                                        onChange={(e) => {
                                            setEvent({
                                                ...newEvent,
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
                                        onChange={(e) => {
                                            setEvent({
                                                ...newEvent,
                                                description: e.target.value
                                            });
                                        }}/>
                                </Grid>
                            </Grid>
                            <Grid item="item" xs={12} className={classes.inputImage}>
                                <FileBase
                                    type="File"
                                    multiple={false}
                                    onDone={({base64}) => setEvent({
                                        ...newEvent,
                                        image: base64

                                    })}/>
                            </Grid>
                        </Grid>
                    </Modal.Body>
                </form>
                <Modal.Footer>
                    <Button type="submit" fullWidth="fullWidth" variant="contained"
                        //color="primary"
                        className={classes.create} onClick={handleCreate}>
                        Create
                    </Button>
                    <Button
                        onClick={handleClose}
                        fullWidth="fullWidth"
                        variant="contained"
                        className={classes.close}>Close</Button>
                </Modal.Footer>

            </Modal>
        </diV>

    );
}

export default CreationEvent;