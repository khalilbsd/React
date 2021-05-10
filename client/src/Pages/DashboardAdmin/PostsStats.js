import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
//import Title from './Title';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { action__get__posts } from '../../actions/action__posts';
import PeopleIcon from '@material-ui/icons/People';
import Avatar from '@material-ui/core/Avatar';
import Title from './Title';
import Grid from '@material-ui/core/Grid';
import PublishIcon from '@material-ui/icons/Publish';
import { deepOrange } from '@material-ui/core/colors';

function preventDefault(event) {
    event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
    depositContext: {
        flex: 1
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        backgroundColor: deepOrange[500],
        width: theme.spacing(7),
        height: theme.spacing(7),
    }
}));

export default function PostsStats() {
    const classes = useStyles();

    //posts get
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(action__get__posts());
    }, [dispatch]);
    const store__posts = useSelector((state) => state.reducer__posts);

    //occ
    let i = 0;

    //date
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;

    return (
        <Grid container spacing={0} className={classes.paper}>
            <Grid item xs={12}>
                <PublishIcon fontSize="large" color="primary" />
            </Grid>

            <Grid item xs={12}>
                <Title>POSTS</Title>
            </Grid>

            {
                store__posts.map((post, key) => {
                    i = i + 1;
                    console.log(i);
                })
            }

            <Grid item xs={12}>
                <Typography component="p" variant="h6">
                    {i}
                </Typography>
            </Grid>

            <Grid item xs={12}>
                <Typography color="textSecondary" className={classes.depositContext}>
                    in total
                </Typography>
            </Grid>

            <Grid item xs={12}>
                <Link to="/dashposts">
                    View All Posts
                </Link>
            </Grid>
        </Grid>
    );
}