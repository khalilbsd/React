import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { action__get__accounts } from '../../actions/action__accounts';
import PeopleIcon from '@material-ui/icons/People';
import Title from './Title';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    depositContext: {
        flex: 1
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }
}));

export default function AccountsStats() {
    const classes = useStyles();

    //accounts get
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(action__get__accounts());
    }, [dispatch]);
    const store__accounts = useSelector((state) => state.reducer__accounts);

    //occ
    let i = 0;

    //date
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;

    return (
        <Grid container spacing={0} className={classes.paper}>
            <Grid item xs={12}>
                <PeopleIcon fontSize="large" color="primary" />
            </Grid>

            <Grid item xs={12}>
                <Title>ACCOUNTS</Title>
            </Grid>

            {
                store__accounts.map((account, key) => {
                    i = i + 1;
                    console.log(i);
                })
            }

            <Grid item xs={12}>
                <Typography component="p" variant="h6">
                    {i}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography color="textSecondary" className={classes.depositContext}>
                    in total
                </Typography>
            </Grid>

            <Grid item xs={12}>
                <Link to="/dashaccounts">
                    View All Accounts
                </Link>
            </Grid>
        </Grid>
    );
}