import React, {useState} from 'react';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
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
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
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

/*redux*/
import {useDispatch} from 'react-redux';
import {action__patch__posts, action__delete__posts} from '../../actions/action__posts';
/*link*/
import {Link} from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '5%',
        maxWidth: '100%',
        overflow: 'hidden',
        marginRight: '3%',
        maxHeight: 385,
        minHeight: 30
    },
    link: {
        textDecoration: 'none'
    },
    media: {
        height: 140,
        textAlign: 'center'
    },
    status_pending: {
        marginTop:'7%',
        backgroundColor: 'orange',
        width: '70%',
        color: 'white',
        textAlign: 'center',
        borderRadius: 100
    },
    status_accept: {
        marginTop:'7%',
        backgroundColor: 'green',
        width: '70%',
        color: 'white',
        textAlign: 'center',
        borderRadius: 100
    },
    status_denied: {
        marginTop:'7%',
        backgroundColor: 'red',
        width: '70%',
        color: 'white',
        textAlign: 'center',
        borderRadius: 100
    },
    delete:{
       marginLeft:'30%'
    },
    time:{
        marginTop:'2%',
    },
    edit:{
        position: 'absolute',
        color: 'black',
        float: 'right',
        marginLeft: '85%',
    },
    //modal 
    modal: {
        marginLeft: '5%'
    },
    modal_title:{
        display:'flex',
        justifyContent:'center',
 },
left:{
   marginLeft:'5%'
},
 
 add_main:{
     fontSize:'100px',
 },
 add_frm:{
     marginBottom:'3%',
     textAlign:'left',
 },
 btn_mod_add:{
     color:'white',
     backgroundColor:'#2699fb',
     border:'none',
     width:'30%',
     '&:hover':{
        color:'white',
        backgroundColor:'#68A5CF',
    },

 },

 typeInput:{
     width:'520%',
     textAlign:'center',

 },

 add_frm_title:{
     marginBottom:'2%',
     width:'70%',
 },

 add_frm_video:{
    marginBottom:'9%',
    width:'70%',
},

add_frm_state:{
    marginBottom:'2%'
},
add_frm_image:{
marginTop:'5%',
marginBottom:'5%'
},

tit:{
    marginTop:'2%',
    marginBottom:'2%',
}

}));
const ProdServ = ({post}) => {
    const classes = useStyles();
    const [show, setShow] = useState(false);
    const [UpPost, setPostData] = useState({
        type: post.type,
        title: post.title,
        image: post.image,
        file: post.file,
        video: post.video,
        description: post.description,
        state:post.state
    });

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
    }

    return (
        <div>

            <Card className={classes.root}>

                <CardActionArea>
                    <IconButton aria-label="settings" className={classes.edit} onClick={HandleShow}>
                        <MoreVertIcon/>
                    </IconButton>
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
                                <Modal.Title >Creating a product or a service</Modal.Title>
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
                                                        label="Description"
                                                        onChange={(e) => setPostData({
                                                            ...UpPost,
                                                            description: e.target.value
                                                        })}/>

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
                                    <AddCircleOutlineIcon/>
                                    Update
                                </Button>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
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
                            <Typography variant="body2" color="textSecondary" className={classes.time} component="p">
                                Created {moment(post.date_time).fromNow()} ago
                            </Typography>
                            
                          
                        </CardContent>
                    </Link>
                </CardActionArea>

                <CardActions>
                <Grid container="container" spacing={3}>
                                <Grid item="item" xs={8}>
                                <Typography variant="body2" color="textSecondary" component="p" className="tag">
                                {
                                    post.tag === "pending"
                                        ? (<div class={classes.status_pending}>{post.tag}</div>)
                                        : post.tag === "accepted"
                                            ? (<div class={classes.status_accept}>{post.tag}</div>)
                                            : (<div class={classes.status_denied}>{post.tag}</div>)
                                }
                            </Typography>
                                </Grid>
                                <Grid item="item" xs={4}>
                                <IconButton aria-label="settings" className={classes.delete} onClick={DelPost}>
                                <DeleteForeverIcon />
                    </IconButton>
                              
                                </Grid>
                            </Grid>
                   
                </CardActions>
            </Card>

        </div>

    );

}

export default ProdServ;