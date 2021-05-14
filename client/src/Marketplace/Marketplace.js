import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Grid, CircularProgress, LinearProgress} from '@material-ui/core';
import {useSelector} from 'react-redux';
import Filter from "./Marketplace components/Filter";
import Item from './Marketplace components/Item';
import {useDispatch} from 'react-redux';
import {action__get__verified__posts} from '../actions/action__posts';
import {withRouter} from "react-router-dom";
import Waiting_Card from './Marketplace components/waiting card'

import SearchBar from './Marketplace components/SearchBar'
import '../css/markplace.css';
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 5,
        //paddingLeft:"10px",
    },
    loadingCircle: {
        color: '#2196F3',
        marginLeft:'48%',
        marginTop:'10%',
        marginBottom:'10%',
    }
}));
function Marketplace() {
    let { id: event_id } = useParams(); 
    const classes = useStyles();
    const dispatch = useDispatch();
    const [searchData, setSearchData] = useState('');
    const id = useSelector((state) => state.reducer__login)
    /*geting info form database */
    useEffect(() => {
        dispatch(action__get__verified__posts(id[0], event_id));
    }, [event_id]);
    const store__posts = useSelector((state) => state.reducer__posts);

    console.log(store__posts);

    return (
        !store__posts
            ? <Waiting_Card/>
            : (
                    !store__posts[0]
                    ? <CircularProgress className={classes.loadingCircle}/>
                    : <Grid
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
                                <SearchBar setSearchData={setSearchData}/>
                                <Filter setSearchData={setSearchData}/>
                            </Grid>
                            {/*Catalog*/}
                            <Grid item="item" xs={7}>
                                <Grid container="container" spacing={2}>
                                    {
                                         store__posts.filter((post) => {
                                            if (post == "") {
                                                return post
                                            } else if (searchData == "type" || searchData == "state") {
                                                return post
                                            }
                                            else if (post.title.toLowerCase().includes(searchData.toLowerCase())) {
                                                return post
                                            } else if (post.type.toLowerCase().includes(searchData.toLowerCase())) {
                                                return post
                                            } else if (post.state.toLowerCase().includes(searchData.toLowerCase())) {
                                                return post
                                            }
                                        }).map((post, key) => (
                                            !post
                                                ? <LinearProgress />
                                                :   <Grid key={post._id} item="item" xs={12} sm={12} md={6} lg={4} xl={3}>
                                                    <Item idi={key} post={post}/>
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