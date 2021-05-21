import React, {useState, useEffect} from 'react';
import '../css/event.css';
import List from './Event components/EventList';
import {withRouter} from "react-router-dom";
/*redux*/
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {action__get__events} from '../actions/action__events';
import {CircularProgress} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
   
    loadingCircle: {
        color: '#2196F3',
        marginLeft:'48%',
        marginTop:'10%',
        marginBottom:'10%',
    }
}));
const ProfileEvent = () => {
    const classes=useStyles();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(action__get__events());
    }, [dispatch]);
    const events = useSelector((state) => state.reducer__events);
    console.log(events);

    return (
        <div class="event">
            {
                events[0]
                    ? (events.map(
                        (event, key) => event
                            ? <List id={key} event={event}/>
                            : <CircularProgress className="loading"/>
                    ))
                    : <CircularProgress className={classes.loadingCircle}/>
                    
            }

        </div>
    );

}

export default withRouter(ProfileEvent);