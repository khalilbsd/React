import React, {useState, useEffect} from 'react';
import EventDetails from '../../../../profile/profile components/DetailsEvent';
import {action__get__my__events} from '../../../../actions/action__participants';
import {action__get__events} from '../../../../actions/action__events';
import {CircularProgress} from '@material-ui/core';
/*redux*/
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';

/*participate card*/

import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({

    loadingCircle: {
        color: '#2196F3',
        marginLeft: '48%',
        marginTop: '10%',
        marginBottom: '10%'
    }
}));
const Events=({id})=>{
    const classes = useStyles();
    const dispatch = useDispatch();
    //const id = useSelector((state) => state.reducer__login)
    //getting my events
    useEffect(() => {
        dispatch(action__get__my__events(id));
    }, [dispatch]);
    const participant = useSelector((state) => state.reducer__participants);
    //getting events

    useEffect(() => {
        dispatch(action__get__events());
    }, [participant]);

    const events = useSelector((state) => state.reducer__events);
    //console.log(participant);

    return (
        <div>
            {
                participant&&events[0]
                    ? !participant[0]
                        ? <h1>he's not participated in any event</h1>
                        : participant.map(
                            (part, key1) => part
                                ? events.map(
                                    (ev, key) => ev._id===part.event_id
                                        ? <EventDetails id={key} event={ev}/>
                                        : null
                                )
                                : <CircularProgress className={classes.loadingCircle}/>
                        )
                    : <CircularProgress className="loading"/>
            }
        </div>
    )
    

}

    
    export default Events;
    