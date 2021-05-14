import React from 'react';
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {makeStyles, useTheme} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {action__patch__posts} from '../../../../actions/action__posts';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex"
    },
    details: {
        display: "flex",
        flexDirection: "column"
    },
    content: {
        flex: "1 0 auto"
    },
    cover: {
        width: 151,
        height: 150
    },
    btn_validate: {
        marginRight:'25%',
        marginLeft:'25%',
        marginTop:'25%',
        backgroundColor: '#2196F3',
        textAlign: 'center',
        border: 'none',
        width: '70%',
        float: 'right',
        borderRadius: 3,
        color: 'white',
        outline: 'none'
    },

    
    btn_unvalidate:{
        marginRight:'25%',
        marginLeft:'25%',
        marginTop:'25%',
        backgroundColor: '#f50057',
        textAlign: 'center',
        border: 'none',
        width: '70%',
        float: 'right',
        borderRadius: 3,
        color: 'white',
        outline: 'none'
    }
    
}));

export default function PostCard({post}) {
    const classes = useStyles();
    const theme = useTheme();
    const dispatch = useDispatch();

    ////begin post update
    const [updatedPost, setUpdatedPost] = useState({verified_by_admin: ""});

    const [postId, setpostId] = useState("");

    useEffect(() => {
        if (updatedPost.verified_by_admin && postId) {
            dispatch(action__patch__posts(postId, updatedPost)).then(setUpdatedPost({
                ...updatedPost,
                verified_by_admin: "", //this is used to reset, why? cause when you click on one you can't click on another, look at the dispatch condition and you'll get it
            }));
        }
    }, [postId, updatedPost.verified_by_admin]);
    //end post update
    return (
        <Card className={classes.root}>
            <Grid container="container" spacing={3}>
                <Grid item="item" container="container" xs={9}>
                    <Grid item="item" xs={2}>
                        <CardMedia className={classes.cover} image={post.image}/>
                    </Grid>
                    <Grid item="item" xs={10}>
                        <div className={classes.details}>
                            <CardContent className={classes.content}>
                                <Typography component="h5" variant="h5">
                                    {post.title}
                                </Typography>
                                <Typography variant="subtitle1" color="textSecondary">
                                    {post.description}
                                </Typography>
                            </CardContent>
                        </div>
                    </Grid>
                    </Grid>
                    <Grid item="item" justify="center" className={classes.btn} xs={3}>
                        <div className={classes.controls}>
                            {
                                post.verified_by_admin === "false"
                                    ? (

                                        <Button
                                            variant="contained"
                                            
                                            className={classes.btn_validate}
                                            onClick={() => {
                                                setUpdatedPost({
                                                    ...updatedPost,
                                                    verified_by_admin: "true"
                                                });
                                                setpostId(post._id);
                                            }}>Validate</Button>

                                    )
                                    : (

                                        <Button
                                            variant="contained"
                                           
                                            className={classes.btn_unvalidate}
                                            onClick={() => {
                                                setUpdatedPost({
                                                    ...updatedPost,
                                                    verified_by_admin: "false"
                                                });
                                                setpostId(post._id);
                                            }}>Unvalidate</Button>

                                    )
                            }
                        </div>
                    </Grid>
                </Grid>
           
        </Card>
    );
}
