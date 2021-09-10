import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Grid, CircularProgress, LinearProgress} from '@material-ui/core';
import {useSelector} from 'react-redux';
import Filter from "./Marketplace components/Filter";
import Item from './Marketplace components/Item';
import {useDispatch} from 'react-redux';
import {action__get__verified__posts} from '../actions/action__posts';
import {action__get__posts} from '../actions/action__posts';
import {withRouter} from "react-router-dom";
import Waiting_Card from './Marketplace components/waiting card'
//form
import Form from 'react-bootstrap/Form';

import SearchBar from './Marketplace components/SearchBar'
import '../css/markplace.css';
import {useParams} from "react-router-dom";
import AddProd from '../profile/profile components/AddProd'
//dialog
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import ExtractPost from './Marketplace components/ExtractPost'
//select
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 5,
        //paddingLeft:"10px",
    },
    loadingCircle: {
        color: '#2196F3',
        marginLeft: '48%',
        marginTop: '10%',
        marginBottom: '10%'
    },
    add: {
        marginTop: 10,
        marginRight: 15
    },
    extract: {
        backgroundColor: "#f50057",
        color: 'white',
        textTransform: 'capitalize',
        width: '105%',
        marginTop: 10,
        '&:hover': {
            color: 'black'
        }
    },
    post: {
        width: 1000
    },
    add_btn: {
        color: '#2196F3'
    }
}));
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props}/>;
});
function Marketplace() {
    const [open, setOpen] = React.useState(false);
    let {id: event_id} = useParams();
    const classes = useStyles();
    const dispatch = useDispatch();
    const [searchData, setSearchData] = useState('');
    const id = useSelector((state) => state.reducer__login)
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    useEffect(() => {
        dispatch(action__get__posts());
    }, []);
    const store__posts = useSelector((state) => state.reducer__posts);

    const handleChange = () => {
        alert("khalil")
    }
    const handleform = () => {
        alert("helo");
    }
    /*geting info form database */
    /*useEffect(() => {
        dispatch(action__get__verified__posts(id[0], event_id));
    }, [event_id, dispatch]);
    const store__posts = useSelector((state) => state.reducer__posts);
    */
    //console.log(store__posts);
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
                                <Grid item="item" xs={12} className={classes.add}>
                                    {
                                        event_id === "generalmarketplace"
                                            ? null
                                            : <div>
                                                    <AddProd place={event_id}/>
                                                    <Button
                                                        variant="outlined"
                                                        className={classes.extract}
                                                        onClick={handleClickOpen}>
                                                        Extract post
                                                    </Button>
                                                    <Dialog
                                                        open={open}
                                                        TransitionComponent={Transition}
                                                        keepMounted="keepMounted"
                                                        fullWidth="true"
                                                        maxWidth="lg"
                                                        onClose={handleClose}>
                                                        <Form
                                                            autoComplete="off"
                                                            noValidate="noValidate"
                                                            onSubmit={handleform}
                                                            id="form">
                                                            <DialogTitle id="title">{"Extract post"}</DialogTitle>
                                                            <DialogContent>
                                                                <DialogContentText id="posts">
                                                                    <FormControl className={classes.formControl}>
                                                                        <InputLabel id="demo-simple-select-label">My post</InputLabel>
                                                                        <Select
                                                                            className={classes.post}
                                                                            labelId="demo-simple-select-label"
                                                                            id="demo-simple-select"
                                                                            autoWidth="true"
                                                                            onChange={handleChange}>
                                                                            {
                                                                                !store__posts
                                                                                    ? null
                                                                                    : store__posts.map((post, key) => (
                                                                                        (post.account === id[0] && post.verified_by_admin === "true" && post.place_id !== event_id)
                                                                                            ? <MenuItem value={30}><ExtractPost post={post}/></MenuItem>
                                                                                            : null
                                                                                    ))
                                                                            }

                                                                        </Select>
                                                                    </FormControl>

                                                                    <ExtractPost/>
                                                                </DialogContentText>
                                                            </DialogContent>
                                                            <DialogActions>
                                                                <Button onClick={handleClose} className={classes.add_btn}>
                                                                    Add Post
                                                                </Button>
                                                                <Button onClick={handleClose} color="secondary">

                                                                    Close
                                                                </Button>
                                                            </DialogActions>
                                                        </Form>
                                                    </Dialog>
                                                </div>
                                    }
                                </Grid>
                                <Grid item="item" xs={12} className={classes.add}></Grid>
                            </Grid>
                            {/*Catalog*/}
                            <Grid item="item" xs={7}>
                                <Grid container="container" spacing={2}>
                                    {
                                        store__posts
                                            .filter((post) => {
                                                if (post === "") {
                                                    return post
                                                } else if (searchData === "type" || searchData === "state") {
                                                    return post
                                                } else if (post.title.toLowerCase().includes(searchData.toLowerCase())) {
                                                    return post
                                                } else if (post.type.toLowerCase().includes(searchData.toLowerCase())) {
                                                    return post
                                                } else if (post.state.toLowerCase().includes(searchData.toLowerCase())) {
                                                    return post
                                                }
                                            })
                                            .map((post, key) => (
                                                !post
                                                    ? <LinearProgress/>
                                                    : (
                                                        post.account !== id[0] && post.verified_by_admin === "true" && post.place_id === event_id
                                                    )
                                                        ? <Grid key={post._id} item="item" xs={12} sm={12} md={6} lg={4} xl={3}>
                                                            {console.log(post)}
                                                            <Item idi={key} post={post} place={event_id}/>
                                                        </Grid>
                                                        : null
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