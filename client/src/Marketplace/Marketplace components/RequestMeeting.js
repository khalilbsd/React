import {useParams} from "react-router-dom";
import {action__post__meetings} from '../../actions/action__meetings';

import React, {useState, useEffect} from 'react';
import '../../css/invi.css';
import Modal from 'react-bootstrap/Modal';
import {Button} from 'react-bootstrap';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import TextField from '@material-ui/core/TextField';
import Form from 'react-bootstrap/Form';
//redux
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';

const RequestMeeting = ({invite}) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const id = useSelector((state) => state.reducer__login)
    let {id: event_id} = useParams(); //this is the event id passed as a param in the url
    const dispatch = useDispatch();
    const [newMeeting, setNewMeeting] = useState({
        event_id: event_id,
        party_one_id: id[0],
        party_two_id: invite.account,
        unique_id: event_id + id[0] + invite.account,
        description: ""
    });
    console.log(invite.account)
    const handleform = (e) => {
        e.preventDefault();
        dispatch(action__post__meetings(newMeeting))

        handleClose();
    }
    return (
        <div className="modal-invitation">
            <Button variant="primary" className="btn-express" onClick={handleShow}>
                <MeetingRoomIcon/>
            </Button>

            <Modal show={show} onHide={handleClose} className="modal" centered="centered">
                <Form autoComplete="off" noValidate="noValidate" onSubmit={handleform}>
                    <Modal.Header >
                        <Modal.Title className="modal-title">We have some question for you</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>Why are you inrrested in our product ?</div>
                        <div>
                            <TextField
                                id="standard-basic"
                                label="Your answer"
                                onChange={(e) => {
                                    setNewMeeting({
                                        ...newMeeting,
                                        description: e.target.value
                                    })
                                }}/>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="secondary"
                            onClick={handleClose}
                            type="reset"
                            className="btn-reset">
                            Close
                        </Button>
                        <Button type="submit" className="btn-req">
                            request meeting
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    );
}

export default RequestMeeting;