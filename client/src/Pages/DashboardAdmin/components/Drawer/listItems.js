import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import EventIcon from '@material-ui/icons/Event';
import {Link} from "react-router-dom"
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    link: {
        textDecoration: 'none',
        color: 'black',
        '&:hover': {
            color: '#2196F3'
        }
    }

}));

const MainListItems = () => {
    const classes = useStyles();
    return (
        <div>

            <Link to="/dashaccounts" className={classes.link}>
                <ListItem button="button">
                    <ListItemIcon>
                        <DashboardIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Accounts"/>
                </ListItem>
            </Link>

            <Link to="/dashposts" className={classes.link}>
                <ListItem button="button">
                    <ListItemIcon>
                        <EventIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Posts"/>
                </ListItem>
            </Link>

            <Link to="/dashparticipants" className={classes.link}>
                <ListItem button="button">
                    <ListItemIcon>
                        <PeopleIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Participants"/>
                </ListItem>
            </Link>

            <Link to="/dashevents" className={classes.link}>
                <ListItem button="button">
                    <ListItemIcon>
                        <EventIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Events"/>
                </ListItem>
            </Link>

        </div>
    );

}
export default MainListItems;