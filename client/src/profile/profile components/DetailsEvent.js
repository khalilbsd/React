import React,{useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CheckIcon from '@material-ui/icons/Check';
import dateFormat from 'dateformat';
//redux
import {Link} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
//import {action__get__one__event} from '../../actions/action__events'

const useStyles = makeStyles({
    root: {
        //width: Fullscreen
        marginBottom:30,
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
        color: '#64dd17',
        verticalAlign: 'middle',
        display: 'inline-flex'
    },
    link:{
        textDecoration:'none',
        color:'grey'
    }
});

const EventDetails = ({id,event}) => {
    const classes = useStyles();
    const dispatch=useDispatch();
 /*
    useEffect(() => {
        dispatch(action__get__one__event(event));
    }, [id]);
    const events= useSelector((state) => state.reducer__events);
    */
  // console.log(event)
    return (
        <Card className={classes.root}>
            <Link to={`/event/${event._id}`} className={classes.link}>
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
            </Link>
            <CardActions>
                <div className={classes.status}>
                    <CheckIcon/>
                    <span>Participated
                    </span>
                </div>

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
        </Card>
      
    );

}

export default EventDetails;