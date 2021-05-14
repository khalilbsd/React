import React, {useState, useEffect} from 'react';
import '../../css/invi.css';
import Modal from 'react-bootstrap/Modal';
import {Button} from 'react-bootstrap';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import CheckIcon from '@material-ui/icons/Check';
import TextField from '@material-ui/core/TextField';
import Form from 'react-bootstrap/Form';
//redux
import {useDispatch} from 'react-redux';
import {action__post__invitations} from '../../actions/action__invitations.js';
import {action__get__invitations} from '../../actions/action__invitations';
import {useSelector} from 'react-redux';
import {action__verify__my__invitation} from '../../actions/action__invitations';

const Invitation = ({invite}) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const id = useSelector((state) => state.reducer__login)
    //const [nb, setNb] = useState({sent: true, send: true})
    const [request, setInvi] = useState(
        {description: "",
        post_id: invite._id, 
        offerer_id: invite.account,
         requester_id: id[0]
        })
    const dispatch = useDispatch();
   /*
    useEffect(() => {
        dispatch(action__verify__my__invitation(id[0],invite._id));
    }, [invite]);
    const exist = useSelector((state) => state.reducer__invitations);
    //console.log(already_requested);
    */
    const handleform = (e) => {
        e.preventDefault();
        dispatch(action__post__invitations(request));
        handleClose();
    }

    const invi = (
        <div className="modal-invitation">
            {/*
                exist.length > 0?
                <Button variant="primary" className="btn-exist" onClick={handleShow}>
                <CheckIcon/>
            </Button>
            :
            <Button variant="primary" className="btn-express" onClick={handleShow}>
            <BusinessCenterIcon/>
        </Button>
            */}
           
           <Button variant="primary" className="btn-express" onClick={handleShow}>
            <BusinessCenterIcon/>
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
                                onChange={(e) => setInvi({
                                    ...request,
                                    description: e.target.value
                                })}/>
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
                            send request
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>

    );

    return invi

}

export default Invitation;