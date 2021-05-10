import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SettingsIcon from '@material-ui/icons/Settings';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';

import axios from "axios";
import { useHistory } from "react-router-dom";


const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5'
    }
})((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center'
        }}
        {...props} />
));

const StyledMenuItem = withStyles((theme) => ({
    root: {
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white
            }
        }
    }
}))(MenuItem);

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        flexGrow: 1
    },

    link: {
        textDecoration: 0,
        color: '#000000',
        '&:hover': {
            color: '#2699fb'
        }
    },
    btn: {
        height: 60
    },
    icon: {
        color: 'white'
    }

}));

export default function DropdownMenu() {
    const classes = useStyles();
    let history = useHistory();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleform = (event) => {
        //event.preventDefault();
        //dispatch(loginAccount(data));
        setAnchorEl(null);
        axios.get('http://localhost:3000/api/accounts/logout')
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });

        history.push("/");
        window.location.reload(true);

    }

    return (
        <div>

            <AccountCircleIcon
                aria-controls="customized-menu"
                aria-haspopup="true"
                variant="contained"
                className={classes.icon}
                fontSize="large"
                onClick={handleClick} />
            <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted="keepMounted"
                open={Boolean(anchorEl)}
                onClose={handleClose}>

                <Link to='/profile' className={classes.link}>
                    <StyledMenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <AccountCircleIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Profile" />
                    </StyledMenuItem>
                </Link>

                <Link to='/settings' className={classes.link}>
                    <StyledMenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <SettingsIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Settings" />
                    </StyledMenuItem>
                </Link>

                <Link to='/' className={classes.link}>
                    <StyledMenuItem onClick={handleform}>
                        <ListItemIcon>
                            <MeetingRoomIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Logout" />
                    </StyledMenuItem>
                </Link>

            </StyledMenu>
        </div>
    );
}
