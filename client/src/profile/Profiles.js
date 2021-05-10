import React, {useEffect, useState} from 'react';
import {withRouter} from "react-router-dom";
import {makeStyles} from '@material-ui/core/styles';
import {useDispatch, useSelector} from 'react-redux';

//grid
import Grid from '@material-ui/core/Grid';

//components
import PicInfo from './profile components/PicInfo';
import ProfAction from './profile components/ProfAction';
import Posts from './profiles components/Posts'
//actions
import {action__get__one__account} from '../actions/action__accounts';
import {action__get__my__posts} from '../actions/action__posts';
import {CircularProgress} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    account_info: {
        marginTop: '5%',
        marginLeft: '1%'
    },
    account_info_2: {
        marginTop: '8.5%'
    },
    root_posts: {
        flexGrow: 1,
        marginLeft: '2%'
    }
}));

const Profiles = ({match, location}) => {
    const classes = useStyles();
    const {params: {
            id
        }} = match;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(action__get__one__account(id));
    }, [id]);
    const account = useSelector((state) => state.reducer__accounts);

    useEffect(() => {
        dispatch(action__get__my__posts(id));
    }, [id]);
    const posts = useSelector((state) => state.reducer__posts);
    return (
        <Grid container="container" spacing={3}>
            <Grid item="item" xs={4} className={classes.account_info}>
                <PicInfo account={account}/>
            </Grid>
            <Grid item="item" xs={7}>
                <Grid container="container" spacing={3}>
                    <Grid item="item" xs={12} className={classes.account_info_2}>
                        <ProfAction info={account}/>
                    </Grid>
                    <Grid item="item" xs={12} className={classes.account_posts}>
                        <div className={classes.root_posts}>
                            <Grid container="container" spacing={0}>
                                {
                                    !posts[0]
                                        ? <CircularProgress className="loading"/>
                                        : posts.map(
                                            (post, key) => <Grid container="container" item="item" xs={4} spacing={3}>
                                                <Posts id={key} post={post}/>
                                            </Grid>
                                        )
                                }
                            </Grid>
                        </div>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default withRouter(Profiles)