import React from 'react';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Menu from "./Components/Menu/Menu.js";
import logo from "./logo.jpg"

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
        textTransform: 'lowercase',
        color: 'white',
        '&:hover': {
            color: 'white'
        }
    },
    btn: {
        height: 60,
        textTransform:'capitalize',
        paddingLeft:20,
        paddingRight:20
    },
    logo: {
        maxWidth: 80,
        marginRight: '10px'
    },
    color: {
        backgroundColor: '#2196F3',

    }

}));

export default function Header({ isAuth, role }) {
    const classes = useStyles();
    if (isAuth && role == "0") {
        return (
            <div className={classes.root}>
                <AppBar position="static" className={classes.color} title={<img src={logo} />} >
                    <Toolbar>
                        <img src={logo} alt="logo" className={classes.logo} />
                        <Typography variant="h6" className={classes.title}>
                            Agence de Promotion de l'Industrie et de l'Innovation
                    </Typography>
                        <Link to='/events' className={classes.link}>
                            <Button color="inherit" className={classes.btn}>Events</Button>
                        </Link>
                        <Link to='/marketplace/generalmarketplace' className={classes.link}>
                            <Button color="inherit" className={classes.btn}>Marketplace</Button>
                        </Link>
                        
                        <Link to='/suitcase' className={classes.link}>
                            <Button color="inherit" className={classes.btn}>Suitcase</Button>
                        </Link>
                        <Link to='/meetinginbox' className={classes.link}>
                            <Button color="inherit" className={classes.btn}>Meeting Inbox</Button>
                        </Link>
                        <Menu />
                    </Toolbar>
                </AppBar>
            </div>
        );
    } else if (isAuth && role == "2") {
        return (

            <AppBar position="static" className={classes.color}>
                <Toolbar>
                    <img src={logo} alt="logo" className={classes.logo} />

                    <Typography variant="h6" className={classes.title}>
                        Agence de Promotion de l'Industrie et de l'Innovation
                    </Typography>
                    <Menu />
                </Toolbar>
            </AppBar>
        )
    } else {
        return (
            <div className={classes.root}>
                <AppBar position="static" className={classes.color}>
                    <Toolbar>
                        <img src={logo} alt="logo" className={classes.logo} />
                        <Typography variant="h6" className={classes.title}>
                            Agence de Promotion de l'Industrie et de l'Innovation
                    </Typography>
                        <Link to='/events' className={classes.link}>
                            <Button color="inherit" className={classes.btn}>Events</Button>
                        </Link>
                        <Link to='/login' className={classes.link}>
                            <Button color="inherit" className={classes.btn}>Login</Button>
                        </Link>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}