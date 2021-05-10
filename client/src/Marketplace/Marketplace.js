import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Grid, Paper, CircularProgress, LinearProgress} from '@material-ui/core';
import {useSelector} from 'react-redux';
import Filter from "./Marketplace components/Filter";
import '../css/markplace.css';
import Item from './Marketplace components/Item';
import {useDispatch} from 'react-redux';
import {action__get__posts} from '../actions/action__posts';
import {withRouter} from "react-router-dom";
import Waiting_Card from './Marketplace components/waiting card'
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 5,
        //paddingLeft:"10px",
    },
    paper: {
        textAlign: 'center'
    }
}));
function Marketplace() {
    const dispatch = useDispatch();

    /*geting info form database */

    useEffect(() => {
        dispatch(action__get__posts());
    }, [dispatch]);

    const classes = useStyles();
    const store__posts = useSelector((state) => state.reducer__posts);
    console.log(store__posts);

    return (
        !store__posts
            ? <CircularProgress/>
            : (
                !store__posts[0]?
                <Waiting_Card />
                :<Grid
                    container="container"
                    className={classes.root}
                    spacing={5}
                    direction="column">
                    <Grid item="item" xs={12}/>
                    <Grid
                        container="container"
                        spacing={1}
                        direction="row"
                        className="inside"
                        justify="center">

                        {/*Filter*/}
                        <Grid item="item" xs={2}>
                            <Filter/>
                        </Grid>
                        {/*Catalog*/}
                        <Grid item="item" xs={7}>
                            <Grid container="container" spacing={2}>
                                {
                                    store__posts.map((post, key) => (
                                        <Grid key={post._id} item="item" xs={12} sm={12} md={6} lg={4} xl={3}>
                                            {
                                                !post
                                                    ? <LinearProgress/>
                                                    : <Item post={post}/>
                                            }

                                        </Grid>
                                    ))
                                }
                            </Grid>
                        </Grid>

                    </Grid>
                </Grid>
            )
    );
}

export default withRouter(Marketplace);