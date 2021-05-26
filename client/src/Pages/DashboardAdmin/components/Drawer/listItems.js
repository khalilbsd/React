import React, {useState, useEffect} from 'react';

import {Link} from "react-router-dom"
import {makeStyles} from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
//list
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
// icon
import ShareIcon from '@material-ui/icons/Share';
import PeopleIcon from '@material-ui/icons/People';
import EventIcon from '@material-ui/icons/Event';
import DashboardIcon from '@material-ui/icons/Dashboard';

//redux
import {action__get__events} from '../../../../actions/action__events'
import {action__get__posts} from '../../../../actions/action__posts';
import {action__get__accounts} from '../../../../actions/action__accounts';
import {action__get__participants} from '../../../../actions/action__participants';
import {useSelector, useDispatch} from 'react-redux';
import {action__patch__posts} from '../../../../actions/action__posts';
import {action__patch__accounts} from '../../../../actions/action__accounts';
import {action__patch__participants} from '../../../../actions/action__participants';
import {useHistory} from "react-router-dom";
import { LinearProgress } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({

    link: {
        textDecoration: 'none',
        color: 'black',
        '&:hover': {
            color: '#2196F3'
        }
    },
    nested: {
        paddingLeft: theme.spacing(4)
    }
}));

const MainListItems = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    let history = useHistory();
    const [open, setOpen] = React.useState(false);
    const [invisibleAccounts, setInvisibleAccounts] = useState(true);
    const [invisiblePosts, setInvisiblePosts] = useState(true);
    const [invisibleParticipants, setInvisibleParticipants] = useState(true);
    const handleClick = () => {
        setOpen(!open);
    };
    useEffect(() => {
        dispatch(action__get__posts());
    }, [dispatch]);
    const store__posts = useSelector((state) => state.reducer__posts);

    useEffect(() => {
        dispatch(action__get__accounts());
    }, [dispatch]);
    const store__accounts = useSelector((state) => state.reducer__accounts);

    useEffect(() => {
        dispatch(action__get__participants());
    }, [dispatch]);
    const store__participants = useSelector((state) => state.reducer__participants);

    useEffect(()=>{
        dispatch(action__get__events());
    },[dispatch])
    const events = useSelector((state) => state.reducer__events);
    useEffect(() => {
        store__posts.map((post, key) => (
            post.seen == "false"
                ? (setInvisiblePosts(false))
                : (null)
        ))

        store__accounts.map((account, key) => (
            account.seen == "false"
                ? (setInvisibleAccounts(false))
                : (null)
        ))

        store__participants.map((participant, key) => (
            participant.seen == "false"
                ? (setInvisibleParticipants(false))
                : (null)
        ))
    });

    const [updatedPost, setUpdatedPost] = useState({seen: "false"});

    const [updatedAccount, setUpdatedAccount] = useState({seen: "false"});

    const [updatedParticipant, setUpdatedParticipant] = useState({seen: "false"});

    useEffect(() => {
        if (updatedPost.seen == "true") {
            store__posts.map(
                (post, key) => (dispatch(action__patch__posts(post._id, updatedPost)))
            )
        }

    }, [updatedPost.seen]);

    useEffect(() => {
        if (updatedAccount.seen == "true") {
            store__accounts.map(
                (account, key) => (dispatch(action__patch__accounts(account._id, updatedAccount)))
            )
        }
    }, [updatedAccount.seen]);

    useEffect(() => {
        if (updatedParticipant.seen == "true") {
            store__participants.map(
                (participant, key) => (dispatch(action__patch__participants(participant._id, updatedParticipant)))
            )
        }

    }, [updatedParticipant.seen]);

    const handleUpdatePosts = (e) => {
        //e.preventDefault();
        setUpdatedPost({seen: "true"});
        setInvisiblePosts(true);
        history.push("/dashposts");
    }

    const handleUpdateAccounts = (e) => {
        //e.preventDefault();
        setUpdatedAccount({seen: "true"});
        setInvisibleAccounts(true);
        history.push("/dashaccounts");
    }

    const handleUpdateParticipants = (e) => {
        //e.preventDefault();
        setUpdatedParticipant({seen: "true"});
        setInvisibleParticipants(true);
        history.push("/dashparticipants");
    }

    return (
        <div>

            {
                invisibleAccounts == false
                    ? (
                        <Link to="/dashaccounts" className={classes.link}>
                            <ListItem button="button" onClick={handleUpdateAccounts}>
                                <ListItemIcon>
                                    <Badge color="secondary" variant="dot" invisible={false}>
                                        <DashboardIcon/>
                                    </Badge>
                                </ListItemIcon>
                                <ListItemText primary="Accounts"/>
                            </ListItem>
                        </Link>
                    )
                    : (
                        <Link to="/dashaccounts" className={classes.link}>
                            <ListItem button="button" onClick={handleUpdateAccounts}>
                                <ListItemIcon>
                                    <Badge color="secondary" variant="dot" invisible={true}>
                                        <DashboardIcon/>
                                    </Badge>
                                </ListItemIcon>
                                <ListItemText primary="Accounts"/>
                            </ListItem>
                        </Link>
                    )
            }

            {
                invisiblePosts == false
                    ? (
                        <List>

                            <ListItem
                                button="button"
                                onClick={handleUpdatePosts,
                                handleClick}>
                                <ListItemIcon>
                                    <Badge color="secondary" variant="dot" invisible={false}>
                                        <ShareIcon/>
                                    </Badge>
                                </ListItemIcon>
                                <ListItemText primary="Posts"/>
                            </ListItem>

                            <Collapse in={open} timeout="auto" unmountOnExit="unmountOnExit">
                                <List component="div" disablePadding="disablePadding">
                                <Link to={`/dashposts/generalmarketplace`} className={classes.link}>
                                    <ListItem button="button" className={classes.nested}>
                                            <ListItemIcon>
                                                <EventIcon/>
                                            </ListItemIcon>
                                            <ListItemText primary="General Marketplace Posts"/>
                                        </ListItem>
                                        </Link>
                                        {
                                            !events?
                                            null
                                            :events.length<0?
                                            <LinearProgress className={classes.loader}/>
                                            :
                                            events.map((event,key)=>
                                            <Link to={`/dashposts/${event._id}`} className={classes.link}>
                                            <ListItem button="button" className={classes.nested}>
                                            <ListItemIcon>
                                                <EventIcon/>
                                            </ListItemIcon>
                                            <ListItemText primary={event.title}/>
                                        </ListItem>
                                        </Link>
                                            )
                                        }
                                      
                                   
                                </List>
                            </Collapse>

                        </List>

                    )
                    : (
                        <List>

                        
                            <ListItem
                                button="button"
                                onClick={handleUpdatePosts,
                                handleClick}>
                                <ListItemIcon>
                                    <Badge color="secondary" variant="dot" invisible={true}>
                                        <ShareIcon/>
                                    </Badge>
                                </ListItemIcon>
                                <ListItemText primary="Posts"/>
                            </ListItem>
                            <Collapse in={open} timeout="auto" unmountOnExit="unmountOnExit">
                                <List component="div" disablePadding="disablePadding">
                                <Link to={`/dashposts/generalmarketplace`} className={classes.link}>
                                    <ListItem button="button" className={classes.nested}>
                                            <ListItemIcon>
                                                <EventIcon/>
                                            </ListItemIcon>
                                            <ListItemText primary="General Marketplace Posts"/>
                                        </ListItem>
                                        </Link>
                                        {
                                            !events?
                                            null

                                            :events.length<0?
                                            <LinearProgress className={classes.loader}/>
                                            :
                                            events.map((event,key)=>
                                            <Link to={`/dashposts/${event._id}`} className={classes.link}>
                                            <ListItem button="button" className={classes.nested}>
                                            <ListItemIcon>
                                                <EventIcon/>
                                            </ListItemIcon>
                                            <ListItemText primary={event.title}/>
                                        </ListItem>
                                        </Link>
                                            )
                                        }
                                      
                                   
                                </List>
                            </Collapse>
                        </List>
                    )
            }

            {
                invisibleParticipants == false
                    ? (
                        <Link to="/dashparticipants" className={classes.link}>
                            <ListItem button="button" onClick={handleUpdateParticipants}>
                                <ListItemIcon>
                                    <Badge color="secondary" variant="dot" invisible={false}>
                                        <PeopleIcon/>
                                    </Badge>
                                </ListItemIcon>
                                <ListItemText primary="Participants"/>
                            </ListItem>
                        </Link>
                    )
                    : (
                        <Link to="/dashparticipants" className={classes.link}>
                            <ListItem button="button" onClick={handleUpdateParticipants}>
                                <ListItemIcon>
                                    <Badge color="secondary" variant="dot" invisible={true}>
                                        <PeopleIcon/>
                                    </Badge>
                                </ListItemIcon>
                                <ListItemText primary="Participants"/>
                            </ListItem>
                        </Link>
                    )
            }

            <Link to="/dashevents" className={classes.link}>
                <ListItem button="button">
                    <ListItemIcon>
                        <EventIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Events"/>
                </ListItem>
            </Link>

        </div >
    );
}
export default MainListItems;