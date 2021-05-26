import React, {useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
// import {action__get__one__account} from '../../actions/action__accounts';
// import {useSelector} from 'react-redux';
import {CircularProgress, LinearProgress} from '@material-ui/core';
import CardActionArea from '@material-ui/core/CardActionArea';
import '../../css/ProdServ.css';
/*actions*/
import moment from 'moment';
import Invitation from './Invitation';
//meeitngs
import RequestMeeting from './RequestMeeting'
//link
import {Link} from 'react-router-dom';
//axios
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    root: {
        width: 260,
        paddingLeft: "10px",
        paddingRight: "10px",
        paddingTop: "10px",
        paddingBottom: "10px",
        maxHeight: 410,
        minHeight: 360,
        marginLeft: '2%'
    },
    media: {
        height: 0,
        paddingTop: '56.25%'
    },

    title: {
        whiteSpace: 'nowrap',
        width: '100%',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        minHeight: 30
    },
    link: {
        textDecoration: 'none',
        color: '#000000'
    },
    loadingBar: {
        marginTop: '10%',
        width: '100%'
    },
    loadingCirlcle: {
        marginLeft: '40%',
        marginTop: '15%',
        marginBottom: '15%',
        color: '#2196F3'
    },
    small: {
        height: 30,
        width: 30
    },
    time:{
        marginTop:'3%',
    }
}));

function Item({post,place}) {
    // const id = useSelector((state) => state.reducer__login)
    const classes = useStyles();
    return (

        <Card className={classes.root}>
            <Link to={`/product/${post._id}`} className={classes.link}>
                <CardActionArea>
                    {
                        !post
                            ? <CircularProgress className={classes.loadingCirlcle}/>
                            : <CardMedia className={classes.media} image={post.image} title={post.title}/>
                    }
                </CardActionArea>
                <CardContent>
                    <Typography
                        variant="h8"
                        color="primary"
                        className={classes.title}
                        component="p">
                        {post.title}
                    </Typography>

                    <Typography
                        variant="body2"
                        color="textSecondary"
                        className="desc"
                        component="p">
                        {post.description}
                    </Typography>
                    <Typography variant="body2" className={classes.time} color="textSecondary" component="p">
                    {moment(post.date_time).fromNow()} 
                    </Typography>

                </CardContent>
            </Link>
            {
                !post
                    ? <LinearProgress className={classes.loadingBar}/>
                    : 
                    place==="generalmarketplace"?
                    <Invitation invite={post}/>
                    :
                    <RequestMeeting invite={post}/>
            }
        </Card>

    );
}
export default Item;