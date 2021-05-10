import React, {useState} from 'react';
import SettingsIcon from '@material-ui/icons/Settings';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import {makeStyles} from '@material-ui/core/styles';
import {useHistory} from 'react-router-dom';

import '../../css/bootstrap.min.css';
/*redux*/
import {useDispatch} from 'react-redux';
import {action__patch__posts, action__delete__posts} from '../../actions/action__posts';
/*modal*/
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Form from 'react-bootstrap/Form';
import FileBase from 'react-file-base64';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
/*nwinput */
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
const useStyles = makeStyles({
   root:{
       marginLeft:'10%',
   },
    btn_update: {
        marginLeft:'25%',
        color: '#2699fb',
        '&:hover': {
            color: '#92c5f1'
        }
    },
    btn_delete: {
        color: '#ff1744',
        '&:hover': {
            color: '#ff4569'
        }
    },

});
const ProdPic = ({post}) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const HandleShow = () => setShow(true);
    const history = useHistory();
    const product_pic = useStyles();
    const dispatch = useDispatch();
    const [UpPost, setProdData] = useState({
        type: 'post',
        title: '',
        desc: '',
        image: '',
        state: '',
        tag: post.tag,
        data: post.date_creation
    });
    const Delete = () => {
        if (window.confirm('Are you sure you wish to delete this item?')) {
            dispatch(action__delete__posts(post._id));
            history.push("/profile");
        }
    }
    const handleform = (e) => {
        e.preventDefault();
        dispatch(action__patch__posts(post._id, UpPost));
        handleClose();
    }

    return (
        <div>
            <Card className={product_pic.root}>
                <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="140"
                    image={post.image}
                    title="Contemplative Reptile"/>
                <CardContent>
                    <Typography gutterBottom="gutterBottom" variant="h5" align="center" component="h2">
                        {post.title}
                    </Typography>
                </CardContent>
                <CardActions className={product_pic.actions}>
                    <Button
                        onClick={HandleShow}
                        className={product_pic.btn_update}
                        style={{
                            background: 'transparent'
                        }}>
                        <SettingsIcon/>
                    </Button>
                    {/*modal begin */}
                    <Modal show={show} onHide={handleClose} animation={true}>
                        <Form autoComplete="off" noValidate="noValidate" onSubmit={handleform}>
                            <Modal.Header closeButton="closeButton">
                                <Modal.Title>Update a {post.type}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridState">
                                        <InputLabel id="type">Type</InputLabel>
                                        <Select
                                            labelId="type"
                                            id="typee"
                                            className="typeS"
                                            onChange={(e) => setProdData({
                                                ...UpPost,
                                                type: e.target.value
                                            })}>
                                            <MenuItem value="Service">Service</MenuItem>
                                            <MenuItem value="Product">Product</MenuItem>
                                        </Select>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="title">
                                        <TextField
                                            className="typeI"
                                            id="title"
                                            label="Title"
                                            placeholder={post.title}
                                            onChange={(e) => setProdData({
                                                ...UpPost,
                                                title: e.target.value
                                            })}/>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridPassword">
                                        <TextField
                                            className="typeI"
                                            id="desc"
                                            label="Description"
                                            placeholder={post.desc}
                                            onChange={(e) => setProdData({
                                                ...UpPost,
                                                desc: e.target.value
                                            })}/>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Group controlId="formGridAddress1">

                                    <FormLabel component="legend">Type of post</FormLabel>
                                    <RadioGroup
                                        className="typeR"
                                        aria-label="type"
                                        name="type"
                                        onChange={(e) => setProdData({
                                            ...UpPost,
                                            state: e.target.value
                                        })}>
                                        <FormControlLabel value="Offre" control={<Radio />} label="Offre"/>
                                        <FormControlLabel value="Request" control={<Radio />} label="Request"/>
                                    </RadioGroup>
                                </Form.Group>
                                <div class="files">
                                    <FileBase
                                        type="File"
                                        multiple={false}
                                        onDone={({base64}) => setProdData({
                                            ...UpPost,
                                            image: base64
                                        })}/>
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button type="submit" className="btn-mod-add">
                                    <AddCircleOutlineIcon/>
                                    update
                                </Button>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                            </Modal.Footer>
                        </Form>
                    </Modal>
                    {/*modal end*/}
                    <Button
                        onClick={Delete}
                        className={product_pic.btn_delete}
                        style={{
                            background: 'transparent'
                        }}>
                        <DeleteForeverIcon/>
                    </Button>

                </CardActions>
            </Card>
        </div>
    );
}

export default ProdPic;