import React, {useEffect, useState} from 'react';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
/*test*/
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
/*redux*/
import {action__get__one__post} from '../../actions/action__posts';
import {action__get__one__account} from '../../actions/action__accounts';
import {action__patch__invitations} from '../../actions/action__invitations';
import {action__delete__invitations} from '../../actions/action__invitations'
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
/*style*/
import moment from 'moment';
import Empty from './Empty';

import Slide from '@material-ui/core/Slide';

//confirmation
import { useConfirm } from "material-ui-confirm";
//component
const useStyles = makeStyles((theme) => ({
   

   
    root: {
        display: 'flex',
       
      },
      details: {
        display: 'flex',
        flexDirection: 'column',
      },
      content: {
        flex: '1 0 auto',
      },
      cover: {
        width: 200,
        height:'100%'
      },
    //state colors
    pending:{
        color:'#ffffff',
        backgroundColor:'#ff9100',
        width:'25%',
        textAlign:'center',
        borderRadius:'4px 4px 4px 4px'
        
    },
    accepted:{
        color:'#fffff',
        backgroundColor:'green',
        width:'25%',
        textAlign:'center',
        borderRadius:'4px 4px 4px 4px'
    },
    denied:{
        color:'#fffff',
        backgroundColor:'#f44336',
        width:'25%',
        textAlign:'center',
        borderRadius:'4px 4px 4px 4px'
    },
    actions:{
        backgroundColor:'red',
    },
    loading:{
        width:'100%'
    }

}));
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
const Invit = ({invite, place}) => {
    //const confirm = useConfirm();
    //console.log(invite)
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
   const [openDialog, setDialogOpen] = React.useState(false);
    //notification test
    
   
    const dispatch = useDispatch();
    const handleClick = () => {
        setOpen(!open);
    };
    const [accepted, setAccepted] = useState({state: "accepted"});
    const [denied, setDeny] = useState({state: "denied"});
/*
    const handleClickOpen = () => {
        setDialogOpen(true);
      };
    
      const handleDialogClose = () => {
        setDialogOpen(false);
      };

      */


    useEffect(() => {
        dispatch(action__get__one__post(invite.post_id));
    }, [invite]);
    const posts = useSelector((state) => state.reducer__posts);
    //console.log(posts);

    useEffect(() => {
        dispatch(action__get__one__account(invite.requester_id));
    }, [invite]);
    const offerer = useSelector((state) => state.reducer__accounts);
    //console.log(offerer);

    const accept = () => {
        if (window.confirm('Are you sure you wish to accept this invitation?')) {
            dispatch(action__patch__invitations(invite._id, accepted));

        }
    }
    const deny = () => {
        if (window.confirm('Are you sure you wish to deny this invitation?')) {
            dispatch(action__patch__invitations(invite._id, denied));
        }
    }
    const cancel = ()=>{
          dispatch(action__delete__invitations(invite._id));
        
        
    }
    return (
            <Grid item xs={12} sm={6} md={12} className={classes.container}>
                {           
                 !posts
                      ? <Empty title="you don't have any invitations yet"/>
                          : (             
                             <Card className={classes.root}>
                                 <div>
                                 <CardMedia className={classes.cover} image={posts.image} title={posts.title}/>     
                                 </div>
                                                                     
                                    <div className={classes.details}>
                                         {
                                            offerer.organization
                                                 ? <CardContent className={classes.content}>
                                                        <Typography component="h5" variant="h5">
                                                              {
                                                                place === "incoming"
                                                                     ? <div>
                                                                            {offerer.organization.name}
                                                                             &nbsp; is interrested in one of your {posts.type}
                                                                        </div>
                                                                    : place ==="sent"?
                                                                        <div>
                                                                             you'r interrested in {offerer.organization.name} 's {posts.type}
                                                                         </div>
                                                                                :
                                                                                <div>
                                                                                    you'r requested to post a  {posts.type} 
                                                                                </div>
                                                                        }
                                                                    </Typography>
                                                                    <Typography variant="subtitle1" color="textSecondary">
                                                                        Product title: {posts.title}
                                                                    </Typography>
                                                                    <Typography variant="subtitle2" color="textSecondary">
                                                                        the answer : {invite.description}
                                                                    </Typography>
                                                                    <Typography variant="subtitle2" color="textSecondary">
                                                                        Sent {moment(invite.senAt).fromNow()}
                                                                        a go
                                                                    </Typography>
                                                                    
                                                                    {
                                                                        invite.state==="pending"?
                                                                        <Typography variant="subtitle2" className={classes.pending}>
                                                                        {invite.state}
                                                                     </Typography>
                                                                     :invite.state==="accepted"?
                                                                     <Typography variant="subtitle2" className={classes.accepted}>
                                                                     {invite.state}
                                                                  </Typography>
                                                                  : <Typography variant="subtitle2" className={classes.denied}>
                                                                  {invite.state}
                                                               </Typography>
                                                                    }
                                                                   
                                                                </CardContent>
                                                            : <LinearProgress className={classes.progress}/>
                                                    }
                                                    <div className={classes.controls}></div>

                                                </div>
                                            
                                                {
                                                    ((invite.state !== "accepted") && (invite.state !== "denied"))
                                                        ? (
                                                            <List>
                                                                <ListItem button="button" onClick={handleClick}>
                                                                    <ListItemIcon>
                                                                        <InboxIcon/>
                                                                    </ListItemIcon>
                                                                    <ListItemText primary="Actions"/> {
                                                                        open
                                                                            ? <ExpandLess/>
                                                                            : <ExpandMore/>
                                                                    }
                                                                </ListItem>
                                                                <Collapse in={open} timeout="auto" unmountOnExit="unmountOnExit">
                                                                    <List component="div" disablePadding="disablePadding">
                                                                        {
                                                                            place==="incoming"?
                                                                            <ListItem
                                                                            button="button"
                                                                            className="accept-btn"
                                                                            value={"accepted"}
                                                                            onClick={accept}>
                                                                            <ListItemIcon >
                                                                                <CheckIcon className="accept-btn"/>
                                                                            </ListItemIcon>
                                                                            <ListItemText primary="Accept"/>
                                                                        </ListItem>
                                                                        :null
                                                                        }
                                                                       {
                                                                           place!=="post"?
                                                                           <ListItem button="button" className="deny-btn" onClick={deny} value={"denied"}>
                                                                           <ListItemIcon>
                                                                               <ClearIcon className="deny-btn"/>
                                                                           </ListItemIcon>
                                                                           <ListItemText primary="Deny"/>
                                                                       </ListItem>
                                                                       :<ListItem button="button" className="deny-btn" onClick={cancel} value={"canceled"}>
                                                                       <ListItemIcon>
                                                                           <ClearIcon className="deny-btn"/>
                                                                       </ListItemIcon>
                                                                       <ListItemText primary="Cancel"/>
                                                                   </ListItem>
                                                                       }
                                                                        
                                                                    </List>
                                                                </Collapse>
                                                            </List>
                                                        )
                                                        : null

                                                }
                                       
                                                              
                                       </Card> 
                                        
                             ) 
                           
                            
                }      
<h1>



</h1>
            </Grid>
             
        
    );
}

export default Invit;