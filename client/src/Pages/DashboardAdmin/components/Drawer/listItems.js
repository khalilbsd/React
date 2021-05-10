import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import EventIcon from '@material-ui/icons/Event';
import { Link } from "react-router-dom";

export const mainListItems = (
    <div>

        <Link to="/dashaccounts">
            <ListItem button>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Accounts" />
            </ListItem>
        </Link>

        <Link to="/dashparticipants">
            <ListItem button>
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Participants" />
            </ListItem>
        </Link>

        <Link to="/dashevents">
            <ListItem button>
                <ListItemIcon>
                    <EventIcon />
                </ListItemIcon>
                <ListItemText primary="Events" />
            </ListItem>
        </Link>


    </div>
);