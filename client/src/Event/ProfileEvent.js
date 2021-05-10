import { withRouter } from "react-router-dom";
import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

import MainFeaturedPost from './Profile events components/MainFeaturedPost';
import Location from './Profile events components/Location';
import Main from './Profile events components/Main';
import Sidebar from './Profile events components/Sidebar';

import Duration from './Profile events components/Duration';
//redux
import {useSelector,useDispatch} from 'react-redux';
import {action__get__one__event} from '../actions/action__events';

/*css*/

import '../css/profile_event.css';



const useStyles = makeStyles((theme) => ({
    mainGrid: {
      marginTop: theme.spacing(3),
    },
    container:{
        marginTop:50,
    }
  }));
  
 
  
const ProfileEvent=({match,location})=>{
    const classes = useStyles();
    const {params:{id}}=match;
    
    const dispatch=useDispatch();

    useEffect(() => {
        dispatch(action__get__one__event(id));
    }, [dispatch]);
    const event = useSelector((state) => state.reducer__events);
console.log(event)
    
    
    return (
        <React.Fragment>
        <CssBaseline />
        <Container maxWidth="lg" className={classes.container}>
          <main>
            <MainFeaturedPost event={event} />
            <Grid container spacing={4}> 
                <Location location={event.location} />
                <Duration event={event}/>
            </Grid>
            <Grid container spacing={5} className={classes.mainGrid}>
              <Main title="Description" event={event} />
              <Sidebar
                event_id={id}
              />
            </Grid>
          </main>
        </Container>
     
      </React.Fragment>
    );
   
}

export default withRouter(ProfileEvent);