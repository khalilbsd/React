import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DescriptionIcon from '@material-ui/icons/Description';
import MergeTypeIcon from '@material-ui/icons/MergeType';
import FlagIcon from '@material-ui/icons/Flag';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import ApartmentIcon from '@material-ui/icons/Apartment';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import moment from 'moment';

const useStyles = makeStyles({
    root: {
        marginLeft: '5%',
        marginRight: '5%',
        marginBottom: '5%',
        width: '100%'
    },
    media: {
        height: 250
    },
    true:{
       color:'green'
    },
    false:{
        color:'#ff1744',
    }
});

export default function Post({post}) {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia className={classes.media} image={post.image} title={post.title}/>
                <CardContent>
                    <Typography
                        gutterBottom="gutterBottom"
                        variant="h5"
                        align="center"
                        component="h2">
                        {post.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        <MergeTypeIcon/> {post.type}
                    </Typography>

                    <Typography variant="body2" color="textSecondary" component="p">
                        <BusinessCenterIcon/> {post.state}
                    </Typography>

                    <Typography variant="body2" color="textSecondary" component="p">
                        <ApartmentIcon/> {post.industrial_field}
                    </Typography>

                    <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                        className={classes.verified}>
                        
                        {
                            post.verified_by_admin === "true"
                                ? (
                                    <div className={classes.true}>
                                       <FlagIcon/>  approved
                                    </div>
                                )
                                : <div className={classes.false}>
                                       <FlagIcon/>  pending
                                    </div>
                        }
                    </Typography>
                    <Typography
                                variant="body2"
                                color="textSecondary"
                                className={classes.time}
                                component="p">
                               <QueryBuilderIcon/> Created {moment(post.date_time).fromNow()}
                               
                            </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        <DescriptionIcon/> {post.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}