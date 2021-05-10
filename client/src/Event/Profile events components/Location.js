import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {Fullscreen} from '@material-ui/icons';
//design
import LocationOnIcon from '@material-ui/icons/LocationOn';
const useStyles = makeStyles({
    card: {
        display: 'flex',
        width: Fullscreen
    },
    cardDetails: {
        flex: 1
    },
    content: {
        align: "center",
        flexGrow: 1
    },
    location_icon: {
        color: '#2196F3',
        fontSize: 70,
      marginLeft:50,
      borderRight: '2px solid grey',
     paddingRight:50,
    },
    location: {
        paddingTop: 50,
      
    },
    icon: {
        fontSize: 70
    }
});

export default function Location(props) {
    const classes = useStyles();
    const {location} = props;

    return (
        <Grid item="item" xs={12} md={6}>
            <Card className={classes.card}>
                <Grid container="container" spacing={1}>
                    <div className={classes.cardDetails}>
                        <CardContent>
                            <Typography component="h2" variant="h5">
                                Location
                            </Typography>
                            <Grid
                                container="container"
                                item="item"
                                xs={12}
                                spacing={3}
                                className={classes.content}>
                                <Grid container="container" item="item" xs={4} spacing={1}>
                                    <Typography variant="subtitle1" className={classes.location_icon}>
                                        <LocationOnIcon className={classes.icon}/>
                                    </Typography>
                                </Grid>
                                <Grid container="container" item="item" xs={8} spacing={1}>
                                    <Typography variant="subtitle1" className={classes.location}>
                                        {location}
                                    </Typography>
                                </Grid>

                            </Grid>
                        </CardContent>
                    </div>

                </Grid>

            </Card>
        </Grid>
    );
}
Location.propTypes = {
    event: PropTypes.object
};