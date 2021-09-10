import React, {useState, useSelector} from 'react';
import moment from 'moment';
/*css*/
import {makeStyles, useTheme} from '@material-ui/core/styles';
import '../../css/bootstrap.min.css';
import '../../css/ProdServ.css';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Grid from '@material-ui/core/Grid';

/*nwinput */
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

/*modal*/
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Form from 'react-bootstrap/Form';
import FileBase from 'react-file-base64';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import FormControl from '@material-ui/core/FormControl';
//icon
import UpdateIcon from '@material-ui/icons/Update';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import CancelIcon from '@material-ui/icons/Cancel';
//dialog
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
/*redux*/
import {useDispatch} from 'react-redux';
import {action__patch__posts, action__delete__posts} from '../../actions/action__posts';
/*link*/
import {Link} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {

        width: '90%',
        overflow: 'hidden',
        marginRight: '3%',
        maxHeight: 385,
        minHeight: 390
    },
    link: {
        textDecoration: 'none'
    },
    media: {
        height: 140,
        textAlign: 'center'
    },
    status_pending: {
        marginTop: '7%',
        backgroundColor: 'orange',
        width: '100%',
        color: 'white',
        textAlign: 'center',
        borderRadius: 100
    },
    status_accept: {
        marginTop: '7%',
        backgroundColor: 'green',
        width: '100%',
        color: 'white',
        textAlign: 'center',
        borderRadius: 100
    },
    status_denied: {
        marginTop: '7%',
        backgroundColor: 'red',
        width: '70%',
        color: 'white',
        textAlign: 'center',
        borderRadius: 100
    },
    delete: {
        marginLeft: '30%'
    },
    time: {
        marginTop: '2%'
    },
    edit: {
        position: 'absolute',
        color: 'black',
        float: 'right',
        marginLeft: '85%'
    },
    //modal
    modal: {
        marginLeft: '5%',
        zIndex:1100
    },
    modal_title: {
        display: 'flex',
        justifyContent: 'center'
    },
    left: {
        marginLeft: '5%'
    },

    add_main: {
        fontSize: '100px'
    },
    add_frm: {
        marginBottom: '3%',
        textAlign: 'left'
    },
    btn_mod_add: {
        color: 'white',
        backgroundColor: '#2699fb',
        border: 'none',
        width: '100%',
        '&:hover': {
            color: 'white',
            backgroundColor: '#68A5CF'
        }
    },

    typeInput: {
        width: 500,
        textAlign: 'center'
    },

    add_frm_title: {
        marginBottom: '2%',
        width: '70%'
    },

    add_frm_video: {
        marginBottom: '9%',
        width: '70%'
    },

    add_frm_state: {
        marginBottom: '2%'
    },
    add_frm_image: {
        marginTop: '5%',
        marginBottom: '5%'
    },

    tit: {
        marginTop: '2%',
        marginBottom: '2%'
    },
    Ind: {
        width: 500,
        textAlign: 'center'
    },
    agree:{
        color:'#f50057',
    },
    disagree:{
        color:'green'
    },
    cancel:{
        marginTop:10,
        width:'100%',
        backgroundColor:'#f50057',
        color:'white'
    },
    status_pending__toevent:{
        marginTop: '7%',
        backgroundColor: 'orange',
        width: '100%',
        color: 'white',
        textAlign: 'center',
        borderRadius: 100
    }
}));

//dilaog
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props}/>;
});
const ProdServ = ({post, admin,event}) => {
    const [open, setOpen] = useState(false);
    const classes = useStyles();
    const [show, setShow] = useState(false);
    const [UpPost, setPostData] = useState({
        type: post.type,
        title: post.title,
        image: post.image,
        file: post.file,
        video: post.video,
        description: post.description,
        state: post.state,
        industrial_field: post.industrial_field
    });
    //console.log(event)

    const handleDialogkOpen = () => {
        setOpen(true);
    };

    const handleDialogClose = () => {
        setOpen(false);
    };

    const dispatch = useDispatch();
    const handleClose = () => setShow(false);
    const HandleShow = () => setShow(true);

    const handleform = (e) => {
        e.preventDefault();
        dispatch(action__patch__posts(post._id, UpPost));
        handleClose();
    }

    const DelPost = () => {
        dispatch(action__delete__posts(post._id));
        handleDialogClose();
    }

    return (<Card className={classes.root}>

        <CardActionArea>
            {
                admin === "me"
                    ? <IconButton aria-label="settings" className={classes.edit} onClick={HandleShow}>
                            <MoreVertIcon/>
                        </IconButton>
                    : null
            }
            {/*modal */}

            <Modal
                show={show}
                onHide={handleClose}
                className={classes.modal}
                animation={true}
                size="xl"
                centered="centered">
                <Form autoComplete="off" noValidate="noValidate" onSubmit={handleform}>
                    <Modal.Header className={classes.modal_title}>
                        <Modal.Title >Updating a {post.type}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Grid container="container" spacing={3}>
                            <Grid container="container" xs={6}>
                                <Grid item="item" xs={12} className={classes.left}>
                                    <Form.Row>
                                        <Form.Group as={Col} className={classes.add_frm} onSubmit={handleform}>
                                            <FormControl >
                                                <InputLabel id="select-type-label">Type</InputLabel>
                                                <Select
                                                    className={classes.typeInput}
                                                    labelId="select-type-label"
                                                    id="demo-simple-select"
                                                    value={UpPost.type}
                                                    onChange={(e) => setPostData({
                                                        ...UpPost,
                                                        type: e.target.value
                                                    })}>
                                                    <MenuItem value="Product">Product</MenuItem>
                                                    <MenuItem value="Service">Service</MenuItem>

                                                </Select>
                                            </FormControl>

                                        </Form.Group>
                                    </Form.Row>
                                </Grid>
                                <Grid item="item" xs={12} className={classes.left}>
                                    <Form.Row>
                                        <Form.Group as={Col} className={classes.add_frm} onSubmit={handleform}>

                                            <FormControl >
                                                <InputLabel id="select-type-label">Industiral Fields</InputLabel>
                                                <Select
                                                    className={classes.Ind}
                                                    labelId="select-type-label"
                                                    id="demo-simple-select"
                                                    value={UpPost.industrial_field}
                                                    onChange={(e) => setPostData({
                                                        ...UpPost,
                                                        industrial_field: e.target.value
                                                    })}>
                                                    <MenuItem value="Product">It</MenuItem>
                                                    <MenuItem value="Service">math</MenuItem>
                                                    <MenuItem value="Service">...</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Form.Group>
                                    </Form.Row>
                                </Grid>
                                <Grid item="item" xs={12} className={classes.left}>
                                    <Form.Group>
                                        <InputLabel id="select-image-label" className={classes.tit}>Upload a Image</InputLabel>
                                        <FileBase
                                            type="File"
                                            multiple={false}
                                            onDone={({base64}) => setPostData({
                                                ...UpPost,
                                                image: base64
                                            })}/>
                                    </Form.Group>
                                </Grid>
                                <Grid item="item" xs={12} className={classes.left}>
                                    <Form.Group >
                                        <FormLabel component="legend" className={classes.tit}>It's kind</FormLabel>
                                        <RadioGroup
                                            className={classes.add_frm_state}
                                            aria-label="state"
                                            name="state"
                                            value={UpPost.state}
                                            onChange={(e) => setPostData({
                                                ...UpPost,
                                                state: e.target.value
                                            })}>
                                            <FormControlLabel value="Request" control={<Radio />} label="Request"/>
                                            <FormControlLabel value="Offre" control={<Radio />} label="Offre"/>
                                        </RadioGroup>

                                    </Form.Group>
                                </Grid>
                            </Grid>
                            <Grid container="container" xs={6}>
                                <Grid item="item" xs={12}>
                                    <Form.Row>

                                        <Form.Group as={Col}>
                                            <TextField
                                                className={classes.add_frm_title}
                                                id="standard-basic"
                                                label="Title"
                                                value={UpPost.title}
                                                onChange={(e) => setPostData({
                                                    ...UpPost,
                                                    title: e.target.value
                                                })}/>
                                        </Form.Group>
                                    </Form.Row>
                                </Grid>
                                <Grid item="item" xs={12}>
                                    <Form.Row>
                                        <Form.Group as={Col}>
                                            <TextField
                                                className={classes.add_frm_title}
                                                id="desc"
                                                value={UpPost.description}
                                                label="Description"
                                                onChange={(e) => setPostData({
                                                    ...UpPost,
                                                    description: e.target.value
                                                })}
                                                multiline="multiline"/>

                                        </Form.Group>
                                    </Form.Row>

                                </Grid>
                                <Grid item="item" xs={12}>
                                    <Form.Row>
                                        <Form.Group as={Col}>
                                            <TextField
                                                className={classes.add_frm_video}
                                                id="video"
                                                label="Youtube Link"
                                                value={UpPost.video}
                                                onChange={(e) => setPostData({
                                                    ...UpPost,
                                                    video: e.target.value
                                                })}/>

                                        </Form.Group>
                                    </Form.Row>
                                </Grid>

                                <Grid item="item" xs={12}>
                                    <Form.Group >
                                        <InputLabel id="select-File-label" className={classes.tit}>Upload a File</InputLabel>
                                        <FileBase
                                            className={classes.add_frm_file}
                                            type="File"
                                            multiple={false}
                                            onDone={({base64}) => setPostData({
                                                ...UpPost,
                                                file: base64
                                            })}/>

                                    </Form.Group>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="submit" className={classes.btn_mod_add}>
                            <UpdateIcon/>
                         
                        </Button>
                        <Button variant="secondary" onClick={handleClose} className={classes.cancel}>
                       
                        <CancelIcon/>
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>

            {/*end model */}
            <Link to={`/product/${post._id}`} className={classes.link}>
                <CardMedia
                    className={classes.media}
                    image={post.image}
                    title="Contemplative Reptile"/>

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
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                        className="description">
                        {post.description}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        className={classes.time}
                        component="p">
                        Created {moment(post.date_time).fromNow()}

                    </Typography>

                </CardContent>
            </Link>
        </CardActionArea>

        <CardActions>
            <Grid container="container" spacing={3}>
                <Grid item="item" xs={8}>
                    <Typography variant="body2" color="textSecondary" component="p" className="tag">
                        {
                            !event?
                            post.verified_by_admin === "false"
                                ? (<div class={classes.status_pending}>Pending</div>)
                                : (
                                    <div class={classes.status_accept}>
                                        Approved</div>
                                )
                                :
                                post.verified_by_admin === "false"
                                ? (<div class={classes.status_pending__toevent}>Pending to an event</div>)
                                : (
                                    <div class={classes.status_accepted__to_event}>
                                        Approved to{event}</div>
                                )
                        }
                    </Typography>
                </Grid>

                <Grid item="item" xs={4}>
                    {
                        admin === "me"
                            ? <IconButton
                                    aria-label="settings"
                                    className={classes.delete}
                                    onClick={handleDialogkOpen}>
                                    <DeleteForeverIcon/>
                                </IconButton>
                            : null
                    }
                </Grid>
                <Dialog open={open} TransitionComponent={Transition}
                 fullWidth="lg"
                keepMounted="keepMounted" onClose={handleDialogClose}
                    //aria-labelledby="alert-dialog-slide-title"
                    
                    //aria-describedby="alert-dialog-slide-description">
                >
                    <DialogTitle id="alert-dialog-slide-title">{"Are you sure you want to delete "}{post.title} ?</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            this post will be deleted form our data base and you will never access it again
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDialogClose} className={classes.disagree}>
                            Disagree
                        </Button>
                        <Button  onClick={DelPost} className={classes.agree}>
                            Agree
                        </Button>
                    </DialogActions>
                </Dialog>
            </Grid>

        </CardActions>
    </Card>

    );

}

export default ProdServ;