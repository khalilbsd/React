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
import '../../../../css/ProdServ.css'
import CardActionArea from '@material-ui/core/CardActionArea';
import Modal from 'react-bootstrap/Modal';
import Post from './Post';



const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex"
    },
    modal_body:{
backgroundColor:'rgb(230, 230, 230)'
    },
    details: {
        display: "flex",
        flexDirection: "column"
    },
    modal_title: {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor:'rgb(230, 230, 230)'
    },
    content: {
        flex: "1 0 auto"
    },
    cover: {
        width: 200,
        height: 160
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
        outline: 'none',
        textTransform:'capitalize'
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
        outline: 'none',
        textTransform:'capitalize'
    }
    
}));

export default function PostCard({post}) {
    const classes = useStyles();
    const theme = useTheme();
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
       const handleShow = () => setShow(true);
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
                <CardActionArea onClick={handleShow}>




                <Modal
                            show={show}
                            onHide={handleClose}
                            className={classes.modal}
                            animation={true}
                            size="xl"
                            centered="centered">
                            <Modal.Header className={classes.modal_title} >
                                <Modal.Title >{post.title}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body className={classes.modal_body}>
                                <Grid container="container" spacing={3}>
                                   <Post post={post}/>
                                </Grid>
                            </Modal.Body>

                        </Modal>



                <Grid item="item" container="container" xs={12}>
                    <Grid item="item" xs={3}>
                        <CardMedia className={classes.cover} image={post.image}/>
                    </Grid>
                    <Grid item="item" xs={9}>
                        <div className={classes.details}>
                            <CardContent className={classes.content}>
                                <Typography component="h5" variant="h5">
                                    {post.title}
                                </Typography>
                                <Typography variant="subtitle1" color="textSecondary" className="description">
                                    {post.description}
                                </Typography>
                            </CardContent>
                        </div>
                    </Grid>
                    </Grid>
                    </CardActionArea>
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
                                            }}>Invalidate</Button>

                                    )
                            }
                        </div>
                    </Grid>
                </Grid>
           
        </Card>
    );
}
