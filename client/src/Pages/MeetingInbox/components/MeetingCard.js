import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { action__get__meetings } from '../../../actions/action__meetings';
import { action__patch__meetings } from '../../../actions/action__meetings';
import { v4 as uuidv4 } from 'uuid';
import { useHistory } from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import LocationOnIcon from '@material-ui/icons/LocationOn';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import InfoIcon from '@material-ui/icons/Info';

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        width:'80%'
    },
    details: {
        display: "flex",
        flexDirection: "column"
    },
    content: {
        flex: "1 0 auto"
    },
    cover: {
        width: 250,
    },
   
    playIcon: {
        height: 38,
        width: 38
    },
    accept:{
        backgroundColor:"#2196F3",
        color:'white',
        marginLeft:50,
        width:'40%',
        marginRight:5,
        marginBottom:30,
        textTransform:'capitalize',
        '&:hover':{
            color:'black'
        }
    },
    join:{
        backgroundColor:"#2196F3",
        color:'white',
        marginLeft:50,
        width:'40%',
        marginRight:5,
        marginBottom:30,
        textTransform:'capitalize',
        '&:hover':{
            color:'black'
        },
        
    },
    deny:{
        backgroundColor:"#f50057",
        color:'white',
        width:'40%',
        marginBottom:30,
        textTransform:'capitalize',
        '&:hover':{
            color:'black'
        }

    },
    cancel:{
        backgroundColor:"#f50057",
        color:'white',
        width:'40%',
        marginLeft:50,
        marginBottom:30,
        textTransform:'capitalize',
        '&:hover':{
            color:'black'
        }

    }

}));

export default function MeetingCard({ _id, account, meeting, event }) {
    let history = useHistory();

    const dispatch = useDispatch();
    const classes = useStyles();
    const theme = useTheme();
    useEffect(() => {
        dispatch(action__get__meetings());
    }, [dispatch]);

    const store__meetings = useSelector((state) => state.reducer__meetings);

    const [meetingId, setMeetingId] = useState("");

    const [updatedMeeting, setUpdatedMeeting] = useState({ state: "" });

    useEffect(() => {
        if (updatedMeeting.state && meetingId) {
            dispatch(action__patch__meetings(meetingId, updatedMeeting)).then(
                setUpdatedMeeting({
                    ...updatedMeeting,
                    state: "",
                    location: ""
                })
            );
        }
    }, [meetingId, updatedMeeting.state]);

    return (
        <Card className={classes.root}>
            <CardMedia className={classes.cover} image={account.organization.logo} />
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Typography component="h5" variant="h5">
                        {account.organization.name}
                    </Typography>
                    <Typography component="h6" variant="h6">
                        {account.organization.representative.first_name + " " + account.organization.representative.last_name}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        <LocationOnIcon />
                        {event.title}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        <QueryBuilderIcon />
                        {meeting.time}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        <InfoIcon />
                        {meeting.description}
                    </Typography>
                </CardContent>
                <div className={classes.controls}>
                    {
                        meeting.party_one_id === _id
                            ? (
                                meeting.state === "pending"
                                    ? (
                                        <Button
                                            variant="contained"
                                            className={classes.cancel}
                                            onClick={() => {
                                                setUpdatedMeeting({
                                                    ...updatedMeeting,
                                                    state: "canceled"
                                                });
                                                setMeetingId(meeting._id);
                                            }}>Cancel</Button>
                                    )
                                    : (
                                        meeting.state == "canceled"
                                            ? (<p>Sent meeting request canceled</p>)
                                            : (
                                                meeting.state === "accepted"
                                                    ? (
                                                        <div>
                                                            <Button
                                                                variant="contained"
                                                               className={classes.join}
                                                                onClick={() => {
                                                                    window.location.href = `http://localhost:3001/${meeting.location}`;
                                                                }}>Join Meeting</Button>
                                                            <br />
                                                        </div>
                                                    )
                                                    : (<p>Sent meeting request denied</p>)
                                            )
                                    )
                            )
                            : (null)

                    }
                    {
                        meeting.party_two_id === _id
                            ? (
                                meeting.state === "pending"
                                    ? (
                                        < div > <Button
                                            variant="contained"
                                            className={classes.accept}
                                            onClick={() => {
                                                setUpdatedMeeting({
                                                    ...updatedMeeting,
                                                    state: "accepted",
                                                    location: uuidv4()
                                                });
                                                setMeetingId(meeting._id);
                                            }}>Accept</Button>
                                            <Button
                                                variant="contained"
                                                className={classes.deny}
                                                onClick={() => {
                                                    setUpdatedMeeting({
                                                        ...updatedMeeting,
                                                        state: "denied"
                                                    });
                                                    setMeetingId(meeting._id);
                                                }}>Deny</Button>
                                            <br />
                                        </div>
                                    )
                                    : (
                                        meeting.state === "accepted"
                                            ? (
                                                <Button
                                                    variant="contained"
                                                    className={classes.join}
                                                    onClick={() => {
                                                        window.location.href = `http://localhost:3001/${meeting.location}`;
                                                    }}>Join Meeting</Button>
                                            )
                                            : (<p>Received meeting request denied</p>)
                                    )
                            )
                            : (null)

                    }
                </div>
            </div>
        </Card >
    );
}