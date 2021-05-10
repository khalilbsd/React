import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import {CardActions} from '@material-ui/core';
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
const useStyles = makeStyles((theme) => ({
    card: {
        maxHeight: 92,
        marginBottom: 50,
        backgroundColor: '#2196F3'
    },
    participated_card: {
        minHeight: 92,
        backgroundColor: '#64dd17',
        marginBottom: 50
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
    }
}));

export default function Participate(props) {
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
    const verify = useSelector((state) => state.reducer__participants);
    console.log(verify);
    useEffect(() => {
        dispatch(action__get__my__particiption(id[0], event_id))
    }, [id[0]]);

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
            : alert("andich")
    }
    const sendRequest = (e) => {
        e.preventDefault();
        console.log(particip_req);
        dispatch(action__post__participants(particip_req));
        handleClose();
    }
    return (
        <Grid item="item" xs={12} md={4}>
            {
                verify[0]
                    ? (
                            verify.approved === "approved"
                            ? <Card className={classes.participated_card}>
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
                            : <Card className={classes.pending_card}>
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
                                    <Modal.Header closeButton="closeButton">
                                        <Modal.Title>Why you want to Participate in this event</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>

                                        <Form.Row>
                                            <Form.Group as={Col} controlId="title">
                                                <TextField
                                                    className="typeI"
                                                    id="title"
                                                    label="Title"
                                                    placeholder="convince me"
                                                    onChange={(e) => setReq({
                                                        ...particip_req,
                                                        desc: e.target.value
                                                    })}/>
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
            }

        </Grid>

    );
}

Participate.propTypes = {
    archives: PropTypes.array,
    description: PropTypes.string,
    social: PropTypes.array,
    title: PropTypes.string
};
