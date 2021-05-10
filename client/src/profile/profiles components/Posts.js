import React, {useState} from 'react';
import moment from 'moment';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
//grid
import Grid from '@material-ui/core/Grid';
/*link*/
import {Link} from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
    link: {
        textDecoration: 'none'
    },
    card_post: {
       maxWidth:250,
        width:250,
        maxHeight:300,
        minHeight:300,
        overflow:'hidden',
        marginBottom:'2%'
    },
    desc:{
        maxHeight:50,
        marginBottom:'2%',
        overflow:'hidden',
        whiteSpace: 'nowrap',
        //width: 50px, 
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        

    }
}));
const Posts = ({post, key}) => {
    const classes = useStyles();
    return (
        <Link to={`/product/${post._id}`} className={classes.link}>
            <Card className={classes.card_post}>
                <CardActionArea>
                    <CardMedia className="media" image={post.image} title="Contemplative Reptile"/>

                    <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p">
                            <b>{post.type}: {post.state}
                            </b>
                        </Typography>
                        <Typography
                            gutterBottom="gutterBottom"
                            variant="h5"
                            component="h2"
                            className="title">
                            {post.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" className={classes.desc} component="p">
                            {post.desc}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {moment(post.date_time).fromNow()}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p" className="tag">

                            {
                                post.tag === "pending"
                                    ? (<div class="status-pending">{post.tag}</div>)
                                    : post.tag === "accepted"
                                        ? (<div class="status-accept">{post.tag}</div>)
                                        : (<div class="status-denied">{post.tag}</div>)
                            }
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Link>

    );

}

export default Posts;