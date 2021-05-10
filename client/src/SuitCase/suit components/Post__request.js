import React, {useEffect, useState} from 'react';
//mateirle ui 
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
//componeent
import Invitation from './Invitations';
import Empty from './Empty';
//redux
import {useSelector,useDispatch} from 'react-redux';
import {action__get__post__request__invitations} from '../../actions/action__invitations';
const useStyles = makeStyles((theme) => ({
    root: {
        marginLeft: 100,
        marginRight: 100
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

const Post__request = () => {
    const classes = useStyles();
    const theme = useTheme();
    const id=useSelector((state) => state.reducer__login)

   // const [nb, setNb] = useState(true);
    const [open, setOpen] = React.useState(false);
    const handleClick = () => {
        setOpen(!open);
    };
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(action__get__post__request__invitations(id[0]));
    }, [id[0]]);

    const invi = useSelector((state) => state.reducer__invitations);
console.log(invi);
    return (
        <Grid container spacing={1} justify="center" className={classes.container}>
        {
            !invi?
            <Empty title="you didn't request to post anything yet"/>
            :
             (
                invi.map((req,key)=>
                req?
                 <Invitation invite={req} place="post"/>
                 :  <LinearProgress color="secondary" className={classes.loading}/>
                )
             )
    
        }
      </Grid>
    );
}

export default Post__request;