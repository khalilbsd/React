import React, {useEffect, useState} from 'react';
//mateirle ui 
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
//componeent
import Invit from './Inivi';
import Empty from './Empty';
/*test*/
/*redux*/
import {useSelector,useDispatch} from 'react-redux';
import {action__get__invitation__by__requester} from '../../actions/action__invitations';

import {CircularProgress} from '@material-ui/core';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
    root: {
        marginLeft: 100,
        marginRight: 100,
        marginBottom: 10
    },
    details: {
        display: 'flex',
        flexDirection: 'column'
    },
    content: {
        flex: '1 0 auto'
    },
    cover: {
        width: 215,
        height: 215
    }
}));

const SendedInvitation = () => {
    const classes = useStyles();
    const id=useSelector((state) => state.reducer__login)
    //const [nb, setNb] = useState(true);
    const [open, setOpen] = React.useState(false);
    const handleClick = () => {
        setOpen(!open);
    };
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(action__get__invitation__by__requester(id[0]));
    }, []);
    const invi = useSelector((state) => state.reducer__invitations);
    return (
        <Grid container spacing={1} justify="center" className={classes.container}>
        {
            !invi?
            <Empty title="you didn't express your interest in any product yet"/>
            :
             (
                invi.map((req,key)=>
                (req&&(req.offerer_id!=="admin"))?
                 <Invit invite={req} place="sent"/>
                 :  <LinearProgress color="secondary" className={classes.loading}/>
                )
             )
    
        }
      </Grid>
    );
}

export default SendedInvitation;