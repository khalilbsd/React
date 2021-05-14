import React, {useEffect, useState} from 'react';
//material ui
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
//components
import Invitation from './Invitations';
import Empty from './Empty';
import {useSelector, useDispatch} from 'react-redux';
import {action__get__invitation__by__offerer} from '../../actions/action__invitations';
import {ConfirmProvider} from "material-ui-confirm";
const useStyles = makeStyles((theme) => ({
    loading: {
        width: 100,
        height:100
    },
    container: {
        width: '100%'
    }
}));

const Incoming__invitation = () => {
    const classes = useStyles();
    /*id*/
    const id = useSelector((state) => state.reducer__login)
    const dispatch = useDispatch();
    /*fetching information form  data base*/
    //invitations
    useEffect(() => {
        dispatch(action__get__invitation__by__offerer(id[0]));
    }, []);
    const invi = useSelector((state) => state.reducer__invitations);
   // console.log(invi);
    return (
        <Grid
            container="container"
            justify="center"
            spacing={1}
            className={classes.container}>
            {
                !invi
                    ? <Empty title="you don't have any invitations yet"/>
                    : (
                                invi.map(
                                    (req, key) => req
                                        ?  <Invitation invite={req} place="incoming" id={key}/>
                                        : <LinearProgress color="secondary" className={classes.loading}/>
                                )
                            
                        
                    )
                                }
                   
            
        </Grid>
    );
}

export default Incoming__invitation;