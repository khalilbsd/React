import React, {useEffect, useState} from 'react';
//design card
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {Fullscreen} from '@material-ui/icons';
import dateFormat from 'dateformat';
import LinearProgress from '@material-ui/core/LinearProgress';

import {Link} from 'react-router-dom';

const useStyles = makeStyles({
    root: {
        width: Fullscreen,
        marginLeft: 50,
        marginRight: 50,
        marginBottom: 30
    },
    media: {
        height: 190
    },
    desc: {
        minHeight: 25,
        maxHeight: 42,
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    },
    status: {
        verticalAlign: 'middle',
        display: 'inline-flex'
    },
    loader: {
        width: '100%',
        '& > * + *': {
            marginTop: 0
        }
    },

    time: {
        marginTop: 2
    },
    btn_send: {
        color: '#2196F3'
    },
    state: {
        marginTop: 6,
        color: '#64dd17',
        verticalAlign: 'middle',
        display: 'inline-flex'
    },
   
    link: {
        textDecoration: 'none'
    }
});
const EventList = ({event}) => {
    const classes = useStyles();
    return (
        <Link to={`/event/${event._id}`} className={classes.link}>
            <div>
                <Card className={classes.root}>
                    {
                        !event
                            ? <LinearProgress color="primary" className={classes.loader}/>
                            : (
                                <div>
                                    <CardActionArea>
                                        <CardMedia
                                            className={classes.media}
                                            image={event.image}
                                            title="Contemplative Reptile"/>
                                        <CardContent>
                                            <Typography gutterBottom="gutterBottom" variant="h5" component="h2">
                                                {event.title}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="textSecondary"
                                                className={classes.desc}
                                                component="p">
                                                {event.description}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions>

                                        <Typography
                                            variant="body2"
                                            color="textSecondary"
                                            className={classes.time}
                                            component="p">
                                            &nbsp; Started at: {dateFormat(event.start_date, "mmm ds ,yyyy")}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="textSecondary"
                                            className={classes.time}
                                            component="p">
                                            &nbsp; until: {dateFormat(event.end_date, "mmm ds ,yyyy")}
                                        </Typography>
                                    </CardActions>
                                </div>

                            )

                    }
                </Card>

            </div>
        </Link>
    );
}

export default EventList;