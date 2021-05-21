import React, {useEffect, useState} from 'react';
import {withRouter} from "react-router-dom";
/*componenet*/
import Post from '../Pages/DashboardAdmin/components/Posts/Post'
/*redux*/
import {useDispatch, useSelector} from 'react-redux';
/*actions*/
import {action__get__one__post} from '../actions/action__posts';
/*styles*/
import '../css/bootstrap.min.css';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { CircularProgress } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
    content: {
        marginRight: 50
    },
    container: {
        marginTop: 50
    }
}));
function Product({match, location}) {
    const classes = useStyles();
    const {params: {
            id
        }} = match;
    const dispatch = useDispatch();
    useEffect(() => (dispatch(action__get__one__post(id))), [id])

    const store__post = useSelector((state) => state.reducer__posts);
    //console.log(store__post);
    return (
        <div className={classes.container}>
            <Grid container="container">
                <Post post={store__post}/>
            </Grid>
            
        </div>
    );
}
export default withRouter(Product);
