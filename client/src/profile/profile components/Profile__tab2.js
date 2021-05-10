import React, {useState, useEffect} from 'react';
import EventDetails from './DetailsEvent';
import {action__get__participants__by__paramm} from '../../actions/action__participants';
import {action__get__events} from '../../actions/action__events';
import {CircularProgress} from '@material-ui/core';
/*redux*/
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';

/*participate card*/
import Enroll from './waiting__card/Please__participate';
const Profile__tab2 = () => {

    const dispatch = useDispatch();
    const id = useSelector((state) => state.reducer__login)

    //getting my events
    useEffect(() => {
        dispatch(action__get__participants__by__paramm(id[0]));
    }, [id[0]]);
    const participant = useSelector((state) => state.reducer__participants);
    //getting events
    useEffect(() => {
        dispatch(action__get__events());
    }, [dispatch]);

    const events = useSelector((state) => state.reducer__events);
    console.log(events);
    const tab = (
        <div>
            {
                participant
                    ? 
                    !participant[0]?
                    <Enroll/>
                    :events.map(
                        (ev, key) => participant.event_id === ev._id
                            ? <EventDetails id={key} event={ev}/>
                            : null
                    )
                    : <CircularProgress className="loading" />
            }
        </div>
    )
    return tab;

}

export default Profile__tab2;