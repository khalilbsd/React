import React from 'react';
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {makeStyles, useTheme} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {action__patch__participants} from '../../../../actions/action__participants';
import Grid from '@material-ui/core/Grid';
//redux icon
import BusinessIcon from '@material-ui/icons/Business';
import EventIcon from '@material-ui/icons/Event';
//dilaog

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        paddingLeft: 30,
        paddingTop: 20,
        paddingBottom: 20
    },
    details: {
        display: "flex",
        flexDirection: "column"
    },
    content: {
        flex: "1 0 auto"
    },
    cover: {
        width: 151,
        height: 150
    },
    controls: {
        display: "flex",
        alignItems: "center",
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1)
    },

    btn_validate: {
        marginTop: '25%',
        backgroundColor: '#2196F3',
        textAlign: 'center',
        border: 'none',
        width: '90%',
        float: 'right',
        borderRadius: 3,
        color: 'white',
        outline: 'none',
        textTransform: 'capitalize'
    },
    btn_unvalidate: {
        marginTop: '25%',
        backgroundColor: '#f50057',
        textAlign: 'center',
        border: 'none',
        width: '90%',
        float: 'right',
        borderRadius: 3,
        color: 'white',
        outline: 'none',
        textTransform: 'capitalize'
    },
    btn: {
        color: '#2196F3',
        textTransform: 'capitalize'
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props}/>;
});
export default function ParticipantCard({account, participant, event}) {
    const classes = useStyles();
    const theme = useTheme();
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    ////begin participant update
    const [updatedParticipant, setUpdatedParticipant] = useState({verified: ""});
    const [participantId, setParticipantId] = useState("");
    useEffect(() => {
        if (updatedParticipant.verified && participantId) {
            dispatch(action__patch__participants(participantId, updatedParticipant)).then(
                setUpdatedParticipant({
                    ...updatedParticipant,
                    verified: "", //this is used to reset, why? cause when you click on one you can't click on another, look at the dispatch condition and you'll get it
                })
            );
        }
    }, [participantId, updatedParticipant.verified]);
    //end participant update
    return (
        <Card className={classes.root}>
            <Grid container="container" spacing={3}>
                <Grid item="item" container="container" xs={10}>
                    <Grid item="item" xs={2}>
                        <CardMedia className={classes.cover} image={account.organization.logo}/>
                    </Grid>
                    <Grid item="item" xs={10}>
                        <div className={classes.details}>
                            <CardContent className={classes.content}>
                                {
                                    participant.verified === "false"
                                        ? <Typography component="h5" variant="h5">

                                                {account.organization.representative.first_name + " " + account.organization.representative.last_name}
                                                &nbsp; is asking to join an event
                                            </Typography>
                                        : <Typography component="h5" variant="h5">

                                                {account.organization.representative.first_name + " " + account.organization.representative.last_name}
                                                &nbsp; has joind an event
                                            </Typography>
                                }

                                <Typography variant="subtitle1" color="textSecondary">
                                    <BusinessIcon/>
                                    company name:&nbsp; &nbsp;&nbsp;{account.organization.name}
                                </Typography>
                                <Typography variant="subtitle1" color="textSecondary">
                                    <EventIcon/>
                                    event name: &nbsp; &nbsp;&nbsp; {event.title}
                                </Typography>
                                <Button variant="outlined" className={classes.btn} onClick={handleClickOpen}>
                                    Show his answer
                                </Button>
                                <Dialog
                                    open={open}
                                    TransitionComponent={Transition}
                                    keepMounted="keepMounted"
                                    onClose={handleClose}
                                    aria-labelledby="alert-dialog-slide-title"
                                    aria-describedby="alert-dialog-slide-description">
                                    <DialogTitle id="alert-dialog-slide-title">{`${account.organization.representative.first_name} answer `}</DialogTitle>
                                    <DialogContent>
                                        <DialogContentText id="answer">
                                            {participant.desc}
                                        </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>

                                        <Button onClick={handleClose} className={classes.btn} color="primary">
                                            Close
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </CardContent>
                        </div>
                    </Grid>
                </Grid>
                <Grid item="item" justify="center" className={classes.btn} xs={2}>
                    <div className={classes.controls}>
                        {
                            participant.verified === "false"
                                ? (

                                    <Button
                                        variant="contained"
                                        className={classes.btn_validate}
                                        onClick={() => {
                                            setUpdatedParticipant({
                                                ...updatedParticipant,
                                                verified: "true"
                                            });
                                            setParticipantId(participant._id);
                                        }}>Validate</Button>

                                )
                                : (

                                    <Button
                                        variant="contained"
                                        className={classes.btn_unvalidate}
                                        onClick={() => {
                                            setUpdatedParticipant({
                                                ...updatedParticipant,
                                                verified: "false"
                                            });
                                            setParticipantId(participant._id);
                                        }}>Unvalidate</Button>

                                )
                        }
                    </div>
                </Grid>
            </Grid>
        </Card>
    );
}
