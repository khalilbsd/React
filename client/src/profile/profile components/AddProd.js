import React, {useState} from 'react';
//react bootstrap design//
import {Button} from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import FileBase from 'react-file-base64';
import {useDispatch} from 'react-redux';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import {action__post__posts} from '../../actions/action__posts';
//jss
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
/*new form*/
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
//icon
import CancelIcon from '@material-ui/icons/Cancel';
import AddCircleIcon from '@material-ui/icons/AddCircle';
//redux
import {useSelector} from 'react-redux';
import {useEffect} from 'react';
import {action__get__participants} from '../../actions/action__participants';
import {action__get__events} from '../../actions/action__events';
import {LinearProgress} from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
    modal: {
        marginLeft: '5%',
        zIndex: '1100'
    },
    modal_title: {
        display: 'flex',
        justifyContent: 'center'
    },
    left: {
        marginLeft: '5%'
    },
    btn_add: {
        backgroundColor: 'green',
        paddingLeft: '45%',
        paddingRight: '50%',
        textAlign: 'center',
        outline: 'none',
        border: 'none',
        '&:hover': {
            backgroundColor: '#6cef6c'
        },
        '&:active': {
            outline: 'none',
            border: 'none',
            textDecoration: 'none',
            backgroundColor: 'green'
        },
        '&:focus': {
            backgroundColor: 'green',
            border: 'none',
            outline: 'none',
            boxShadow: 'none'
        }
    },
    btn_add_main: {
        color: '#2699fb',
        outline: 'none',
        border: 'none',
        borderRadius: '100%',
        '&:hover': {
            color: '#92c5f1'
        },
        '&:active': {
            outline: 'none',
            border: 'none',
            textDecoration: 'none',
            color: 'red',
            boxShadow: 'none'
        },
        '&:focus': {
            color: '#2699fb',
            border: 'none',
            outline: 'none',
            boxShadow: 'none'
        }

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
        textAlign:'center',
        '&:hover': {
            color: 'white',
            backgroundColor: '#68A5CF'
        }
    },
    cancel:{
        color: 'white',
        backgroundColor: '#f50057',
        border: 'none',
        width: '100%',
        textAlign:'center',
        '&:hover': {
            color: 'white',
            backgroundColor: '#f73378'
        }
    },
    icon:{
        //marginTop:1,
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
    indust: {
        width: 500
    },
    preview:{
        width:'25%',
        float:'center',
        border:'1px solid lightgrey'
    }
}));
function AddProd({style,place}) {
    const classes = useStyles();
    const [show, setShow] = useState(false);
    const id = useSelector((state) => state.reducer__login)
    //state property
    const [prodData, setPostData] = useState({
        type: 'post',
        title: '',
        image: '',
        file: '',
        video: '',
        description: '',
        state: '',
        industrial_field: 'it',
        account: id[0],
        place_id:place
    });

    const handleClose = () =>{
      
        setShow(false);
        setPostData({...prodData,image:""})
      
    } 
    const handleShow = () => setShow(true);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(action__get__participants());
    }, [dispatch]);
    const store__participants = useSelector((state) => state.reducer__participants);
    useEffect(() => {
        dispatch(action__get__events());
    }, []);
    const store__events = useSelector((state) => state.reducer__events);

    const handleform = (e) => {
        e.preventDefault();
        dispatch(action__post__posts(prodData));
        //console.log(prodData)
        handleClose();
    }

    return (
        <div>
            {
                (style === "main")
                    ? (
                        < Button onClick = {
                            handleShow
                        }
                        className = {
                            classes.btn_add_main
                        }
                        style = {{ background: 'transparent'}} > <AddCircleIcon className={classes.add_main}/>
                    </Button>
                    )
                    : (< Button onClick = {
                        handleShow
                    }
                    className = {
                        classes.btn_add
                    } > <AddCircleOutlineIcon/>
                </Button>)
            }

            <Modal
                show={show}
                onHide={handleClose}
                className={classes.modal}
                animation={true}
                size="xl"
                centered="centered">
                <Form autoComplete="off" noValidate="noValidate" onSubmit={handleform} id="form">
                    <Modal.Header className={classes.modal_title}>
                        <Modal.Title >Creating a post</Modal.Title>
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
                                                        ...prodData,
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
                                                <InputLabel id="select-type-label">Industrial Field</InputLabel>
                                                <Select
                                                    className={classes.indust}
                                                    labelId="select-type-label"
                                                    id="demo-simple-select"
                                                    onChange={(e) => setPostData({
                                                        ...prodData,
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
                                                ...prodData,
                                                image: base64
                                            })}/>
                                         <img src={prodData.image} className={classes.preview}/>
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
                                                ...prodData,
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
                                                    ...prodData,
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
                                                    ...prodData,
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
                                                    ...prodData,
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
                                                ...prodData,
                                                file: base64
                                            })}/>
                                       
                                    </Form.Group>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Modal.Body>
                    <Modal.Footer>
                        <Grid container="container" spacing={3}>
                            <Grid item="item" xs={12}>
                                <Button type="submit" className={classes.btn_mod_add}>
                                    <AddCircleOutlineIcon className={classes.icon}/>
                                 
                                </Button>
                            </Grid>
                            <Grid item="item" xs={12}>
                                <Button variant="secondary" onClick={handleClose} className={classes.cancel} >
                                   <CancelIcon className={classes.icon}/>
                                </Button>
                            </Grid>

                        </Grid>

                    </Modal.Footer>
                </Form>
            </Modal>
        </div>

    );
}
export default AddProd;