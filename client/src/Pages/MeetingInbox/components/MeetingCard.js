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
    }
}));

export default function MeetingCard({ account, meeting }) {
    let history = useHistory();

    const _id = "608bc1978d887c2b004fbeb7";
    const dispatch = useDispatch();
    const classes = useStyles();
    const theme = useTheme();
    useEffect(() => {
        dispatch(action__get__meetings());
    }, [dispatch]);

    const store__meetings = useSelector((state) => state.reducer__meetings);

    const [meetingId, setMeetingId] = useState("");

    const [updatedMeeting, setUpdatedMeeting] = useState(
        { state: "" }
    );

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
                    <Typography variant="subtitle1" color="textSecondary">
                        {account.organization.representative.first_name + " " + account.organization.representative.last_name}
                    </Typography>
                </CardContent>
                <div className={classes.controls}></div>
                {
                    meeting.party_one_id === _id ? (
                        //sent meeting requests
                        meeting.state === "pending" ? (
                            //if sent meeting request is pending you can cancel
                            <div>
                                <Button variant="contained" color="primary"
                                    onClick={() => {
                                        setUpdatedMeeting({
                                            ...updatedMeeting,
                                            state: "canceled"
                                        });
                                        setMeetingId(meeting._id);
                                    }}>Cancel Meeting</Button>
                                <br />
                            </div>
                        ) : (

                            meeting.state == "canceled" ? (
                                //if you canceled your meeting request
                                <p>Sent meeting request canceled</p>
                            ) : (
                                //if meeting request was accepted/denied
                                meeting.state === "accepted" ? (
                                    //if sent meeting request was accepted you can join meeting
                                    <div>
                                        <Button variant="contained" color="primary"
                                            onClick={() => {
                                                window.location.href = `http://localhost:3001/${meeting.location}`;
                                            }}>Join Meeting</Button>
                                        <br />
                                    </div>
                                ) : (
                                    //if sent meeting request was denied you can cry
                                    <p>Sent meeting request denied</p>
                                )
                                //done
                            )
                        )) : (
                        //received meeting requests
                        meeting.state === "pending" ? (
                            //you can accept/deny the received meeting request
                            < div >
                                <Button variant="contained" color="primary"
                                    onClick={() => {
                                        setUpdatedMeeting({
                                            ...updatedMeeting,
                                            state: "accepted",
                                            location: uuidv4()
                                        });
                                        setMeetingId(meeting._id);
                                    }}>Accept Meeting</Button>
                                <Button variant="contained" color="primary"
                                    onClick={() => {
                                        setUpdatedMeeting({
                                            ...updatedMeeting,
                                            state: "denied"
                                        });
                                        setMeetingId(meeting._id);
                                    }}>Deny Meeting</Button>
                                <br />
                            </div>
                        ) : (
                            //if you accepted or denied the meeting request
                            meeting.state === "accepted" ? (
                                //you accepted the meeting request good job
                                <div>
                                    <Button variant="contained" color="primary"
                                        onClick={() => {
                                            window.location.href = `http://localhost:3001/${meeting.location}`;
                                        }}>Join Meeting</Button>
                                    <br />
                                </div>
                            ) : (
                                //you have denied the meeting request boohoo
                                <p>Received meeting request denied</p>
                            )
                        )
                    )

                }
            </div>
        </Card >
    );
}
