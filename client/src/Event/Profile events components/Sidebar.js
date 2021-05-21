import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import {CardActions, withTheme} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import CheckIcon from '@material-ui/icons/Check';
import CardActionArea from '@material-ui/core/CardActionArea';
import EventSeatIcon from '@material-ui/icons/EventSeat';
//redux
import {useSelector, useDispatch} from 'react-redux';
import {action__post__participants} from '../../actions/action__participants';
import {action__get__my__particiption} from '../../actions/action__participants';
/*modal*/
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import TextField from '@material-ui/core/TextField';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import {useHistory} from 'react-router-dom';
import Typography from "@material-ui/core/Typography";
import {TextareaAutosize} from '@material-ui/core';
import '../../css/event.css'
import {Link} from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
    card: {
        maxHeight: 92,
        marginBottom: 50,
        backgroundColor: '#2196F3'

    },
    participated_card: {
      
        minHeight: 92,
        backgroundColor: '#64dd17',
        marginBottom: 10,
        
    },
    pending_card: {
        backgroundColor: '#ff9800',
        minHeight: 92,
        marginBottom: 50
    },
    status: {
        color: '#ffff',
        verticalAlign: 'middle',
        display: 'inline-flex',
        marginLeft: 90,
        marginTop: 25,
        fontSize: 24
    },
    non_status: {
        color: '#ffffff',
        verticalAlign: 'middle',
        display: 'inline-flex',
        marginLeft: '80%',
        marginTop: 5,
        fontSize: 24
    },
    action: {
        height: 92
    },
    pending: {
        marginTop: 6,
        color: '#ffffff',
        verticalAlign: 'middle',
        display: 'inline-flex'
    },
    reason: {
        width: 500
    },
    textarea:{
        '&:focus':{
            outline:'none',
            outlineOffset:'none',
            border:'none'
        }
    },
    join_card:{
        minHeight: 92,
        backgroundColor: '#2196F3',
        marginBottom: 11
    },
    event_ma:{
        color: '#ffff',
        verticalAlign: 'middle',
        display: 'inline',
        marginLeft: 80,
        marginTop: 25,
        fontSize: 20
    },
    link:{
        textDecoration:'none',
        color:'white',
        '&:hover':{
            color:'white',
        }
    }
}));

export default function Participate(props) {
    const history = useHistory();
    const {event_id} = props;
    const classes = useStyles();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const HandleShow = () => setShow(true);
    const dispatch = useDispatch();
    const [particip_req, setReq] = useState(
        {account_id: "", event_id: event_id, desc: ""}
    );

    const id = useSelector((state) => state.reducer__login);
   
    useEffect(() => {
        dispatch(action__get__my__particiption(id[0], event_id))
    }, [event_id]);
    const verify = useSelector((state) => state.reducer__participants);   
    const participation = () => {
        id[0]
            ? (
                <div>
                    {
                        setReq({
                            ...particip_req,
                            account_id: id[0]
                        }),
                        HandleShow()
                    }
                </div>
            )
            : history.push("/signup");
    }
    const sendRequest = (e) => {
        e.preventDefault();
        console.log(particip_req);
        dispatch(action__post__participants(particip_req));
        handleClose();
    }
    return (
       
                verify[0]
                    ? (
                            verify[0].verified=== "false"
                            ? <Card className={classes.pending_card}>
                            <Grid container="container" spacing={1}>
                                <div>
                                    <CardActions>
                                        <div className={classes.status}>
                                            <HourglassEmptyIcon/>
                                            <span>Pending...
                                            </span>
                                        </div>
                                    </CardActions>
                                </div>
                            </Grid>
                        </Card>
                            :
                            <div>                           
                            <Card className={classes.participated_card}>
                            <Grid container="container" spacing={1}>
                                <div>
                                    <CardActions>
                                        <div className={classes.status}>
                                            <CheckIcon/>
                                            <span>Participated
                                            </span>
                                        </div>
                                    </CardActions>
                                </div>
                            </Grid>
                        </Card> 
                        <Card className={classes.join_card}>
                            <Grid container="container" spacing={1}>
                                <div>
                                    <CardActions>
                                       
                                        <div className={classes.event_ma}>
                                        <Link to={`/marketplace/${event_id}`} className={classes.link}>
                                            Join Event Marketplace
                                            </Link>
                                        </div>
                                       
                                    </CardActions>
                                </div>
                            </Grid>
                        </Card> 
                        <Card className={classes.join_card}>
                            <Grid container="container" spacing={1}>
                                <div>
                                    <CardActions>
                                       
                                        <div className={classes.event_ma}>
                                        <Link to={`/participants/${event_id}`} className={classes.link}>
                                            Check Event Participants
                                            </Link>
                                        </div>
                                       
                                    </CardActions>
                                </div>
                            </Grid>
                        </Card> 
                        </div>

                        )
                    : (
                        <div>

                            <Modal
                                show={show}
                                onHide={handleClose}
                                size="lg"
                                aria-labelledby="contained-modal-title-vcenter"
                                centered="centered">

                                <Form autoComplete="off" noValidate="noValidate" onSubmit={sendRequest}>
                                    <Modal.Body>

                                        <Typography component="h1" align="center" variant="h5">
                                            Why you want to Participate in this event
                                        </Typography>
                                        <Form.Row>
                                            <Form.Group as={Col} className={classes.parent} controlId="title">
                                                <Form.Label>Reason</Form.Label>
                                                <Form.Control as="textarea"
                                                onChange={(e) => setReq({
                                                    ...particip_req,
                                                    desc: e.target.value
                                                })}
                                                className="textarea" rows={3}/>
                                            </Form.Group>
                                        </Form.Row>

                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button type="submit" className={classes.btn_send}>
                                            <AddCircleOutlineIcon/>
                                            Participate
                                        </Button>
                                        <Button variant="secondary" onClick={handleClose}>
                                            Close
                                        </Button>

                                    </Modal.Footer>

                                </Form>
                            </Modal>
                            <Card className={classes.card}>
                                <CardActionArea onClick={participation} className={classes.action}>
                                    <Grid container="container" spacing={1}>
                                        <div>

                                            <CardActions>
                                                <div className={classes.non_status}>
                                                    <EventSeatIcon/>
                                                    <span>Participate
                                                    </span>
                                                </div>

                                            </CardActions>
                                        </div>
                                    </Grid>
                                </CardActionArea>
                            </Card>
                        </div>
                    )
            

      

    );
}

Participate.propTypes = {
    archives: PropTypes.array,
    description: PropTypes.string,
    social: PropTypes.array,
    title: PropTypes.string
};
