import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

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
    }

}));

export default function Header() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar position="static" color="#fffff">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Agence de promotion de l'industrie et de l'innovation
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}