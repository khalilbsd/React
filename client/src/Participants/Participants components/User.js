import React from 'react';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {action__post__meetings} from '../../actions/action__meetings';
import {useParams} from "react-router-dom";
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex'
    },
    details: {
        display: 'flex',
        flexDirection: 'column'
    },
    content: {
        flex: '1 0 auto'
    },
    cover: {
        width: 151,
        height: 150
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1)
    },
    playIcon: {
        height: 38,
        width: 38
    },
    btn: {
       // paddingLeft:20,
        //paddingRight:20,
        width:'50%',
        paddingTop:10,
        paddingBottom:10,
        marginTop:'9%',
        backgroundColor: "#2196F3",
        color: 'white'
    }
}));

export default function User({_id, account, participant}) {
    let {id} = useParams(); //this is the event id passed as a param in the url
    const dispatch = useDispatch();
    const classes = useStyles();
    const theme = useTheme();
    const [newMeeting, setNewMeeting] = useState(
        {event_id: id, party_one_id: _id, party_two_id: ""}
    );

    useEffect(() => {
        if (newMeeting.party_two_id) {
            dispatch(action__post__meetings(newMeeting)).then(setNewMeeting({
                ...newMeeting,
                party_two_id: "",
                unique_id: ""
            }));
            console.log("meeting request sent");
        }
    }, [newMeeting.party_two_id]);

    return (

        account
            ? <Card className={classes.root}>
                <Grid container="container" spacing={3}>

                    <Grid item="item" xs={6}>
                        <Grid container="container" spacing={3}>
                            <Grid item="item" xs={4}>
                                <CardMedia
                                    className={classes.cover}
                                    image={account.organization.representative.image}
                                    title="Picture"/>
                            </Grid>
                            <Grid item="item" xs={8}>

                                <div className={classes.details}>
                                    <CardContent className={classes.content}>
                                        <Typography component="h5" variant="h5">
                                            {account.organization.representative.first_name + " " + account.organization.representative.last_name}
                                        </Typography>
                                        <Typography variant="subtitle1" color="textSecondary">
                                            {account.organization.representative.job_position}
                                        </Typography>
                                    </CardContent>
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item="item" xs={6}>
                        <div className={classes.controls}>
                            <Button
                                size="small"
                                className={classes.btn}
                                variant="contained"
                                onClick={() => {
                                    setNewMeeting({
                                        ...newMeeting,
                                        party_two_id: participant._id,
                                        unique_id: id + _id + participant._id
                                    })
                                }}>Request Meeting</Button>
                        </div>
                    </Grid>

                </Grid>
            </Card>
            : <LinearProgress/>
    );
}
