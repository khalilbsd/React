import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {Fullscreen} from '@material-ui/icons';
import dateFormat from 'dateformat';
/*design*/
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import EventBusyIcon from '@material-ui/icons/EventBusy';
import SettingsEthernetIcon from '@material-ui/icons/SettingsEthernet';
const useStyles = makeStyles({
    card: {
        display: 'flex',
        width: Fullscreen
    },
    cardDetails: {
        flex: 1
    },
    devider: {
        borderRight: '2px solid grey',
        marginRight: 20
    },
    time: {
        marginTop: 40,
        marginLeft: 20
    },
    time_text: {
        align: "center",
        marginTop: 20,
        flexGrow: 1
    },
    time_icon_container: {
        align: "center",
        flexGrow: 1,
        color: '#2196F3'
    },
    time_icon: {
        fontSize: 70
    }

});

export default function Duration(props) {
    const classes = useStyles();
    const {event} = props;
    const end = dateFormat(event.end_date, "dd/mm/yyyy");
    const start = dateFormat(event.start_date, "dd/mm/yyyy");
    return (
        <Grid item="item" xs={12} md={6}>
            <Card className={classes.card}>
                <div className={classes.cardDetails}>
                    <CardContent>
                        <Typography component="h2" variant="h5">
                            Duration
                        </Typography>

                        <Typography
                            variant="subtitle1"
                            paragraph="paragraph"
                            className={classes.time}
                            align='center'>
                            <Grid container="container" spacing={1}>
                                <Grid
                                    container="container"
                                    item="item"
                                    xs={4}
                                    spacing={3}
                                    className={classes.devider}>
                                    <Grid container="container" spacing={1}>
                                        <Grid container="container" item="item" xs={12} spacing={3}>
                                            <Typography variant="subtitle1" className={classes.time_icon_container}>
                                                <EventAvailableIcon className={classes.time_icon}/>
                                            </Typography>
                                        </Grid>
                                        <Grid container="container" item="item" xs={12} spacing={3}>
                                            <Typography
                                                variant="subtitle1"
                                                color="textSecondary"
                                                className={classes.time_text}>
                                                {dateFormat(event.start_date, "mmm dd ,yyyy")}
                                            </Typography>
                                        </Grid>
                                    </Grid>

                                </Grid>
                                <Grid
                                    className={classes.devider}
                                    container="container"
                                    item="item"
                                    xs={4}
                                    spacing={3}>
                                    <Grid container="container" spacing={1}>
                                        <Grid container="container" item="item" xs={12} spacing={3}>
                                            <Typography variant="subtitle1" className={classes.time_icon_container}>
                                                <EventBusyIcon className={classes.time_icon}/>
                                            </Typography>
                                        </Grid>
                                        <Grid container="container" item="item" xs={12} spacing={3}>
                                            <Typography
                                                variant="subtitle1"
                                                color="textSecondary"
                                                className={classes.time_text}>

                                                {dateFormat(event.end_date, "mmm dd ,yyyy")}
                                            </Typography>
                                        </Grid>
                                    </Grid>

                                </Grid>

                                <Grid container="container" item="item" xs={4} spacing={3}>
                                    <Grid container="container" spacing={1}>
                                        <Grid container="container" item="item" xs={12} spacing={3}>
                                            <Typography variant="subtitle1" className={classes.time_icon_container}>
                                                <SettingsEthernetIcon className={classes.time_icon}/>
                                            </Typography>
                                        </Grid>
                                        <Grid container="container" item="item" xs={12} spacing={3}>
                                            <Typography
                                                variant="subtitle1"
                                                color="textSecondary"
                                                className={classes.time_text}>
                                                {Math.abs(end - start)}

                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>

                        </Typography>
                    </CardContent>
                </div>
            </Card>
        </Grid>
    );
}

Duration.propTypes = {
    event: PropTypes.object
};
