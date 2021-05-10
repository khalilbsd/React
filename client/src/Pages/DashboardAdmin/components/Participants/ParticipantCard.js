import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { action__patch__participants } from '../../../../actions/action__participants';


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

export default function ParticipantCard({ account, participant }) {
    const classes = useStyles();
    const theme = useTheme();
    const dispatch = useDispatch();

    ////begin participant update
    const [updatedParticipant, setUpdatedParticipant] = useState(
        { verified_by_admin: "" }
    );
    const [participantId, setParticipantId] = useState("");

    useEffect(() => {
        if (updatedParticipant.verified_by_admin && participantId) {
            dispatch(action__patch__participants(participantId, updatedParticipant)).then(
                setUpdatedParticipant({
                    ...updatedParticipant,
                    verified_by_admin: "", //this is used to reset, why? cause when you click on one you can't click on another, look at the dispatch condition and you'll get it
                })
            );
        }
    }, [participantId, updatedParticipant.verified_by_admin]);
    //end participant update
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
                <div className={classes.controls}>
                    {participant.verified_by_admin === "false"
                        ? (
                            <div>
                                <Button variant="contained" color="primary"
                                    onClick={() => {
                                        setUpdatedParticipant({
                                            ...updatedParticipant,
                                            verified_by_admin: "true"
                                        });
                                        setParticipantId(participant._id);
                                    }}>Validate</Button>
                                <br />
                            </div>
                        )
                        : (
                            <div>
                                <Button variant="contained" color="primary"

                                    onClick={() => {
                                        setUpdatedParticipant({
                                            ...updatedParticipant,
                                            verified_by_admin: "false"
                                        });
                                        setParticipantId(participant._id);
                                    }}>Unvalidate</Button>
                                <br />
                            </div>
                        )}
                </div>
            </div>
        </Card>
    );
}
