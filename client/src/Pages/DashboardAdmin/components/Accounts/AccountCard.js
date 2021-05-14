import React from 'react';
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {makeStyles, useTheme} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {action__patch__accounts} from '../../../../actions/action__accounts';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        paddingLeft: 30,
        paddingTop: 20,
        paddingBottom: 20
    },
    details: {
        display: "flex",
        flexDirection: "column"
    },
    content: {
        flex: "1 0 auto"
    },
    cover: {
        width: 151,
        height: 150
    },
    controls: {
        display: "flex",
        alignItems: "center",
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1)
    },

    btn_validate: {
        marginTop:'25%',
        backgroundColor: '#2196F3',
        boxShadow: '0 3px 10px 2px rgba(33, 203, 243, .3)',
        textAlign: 'center',
        border: 'none',
        width: '90%',
        float: 'right',
        borderRadius: 3,
        color: 'white',
        outline: 'none'
    },
    btn: {
      
        alignItems: 'center'
    }
}));

export default function AccountCard({account}) {
    const classes = useStyles();
    const theme = useTheme();
    const dispatch = useDispatch();

    ////begin account update
    const [updatedAccount, setUpdatedAccount] = useState({verified_by_admin: ""});

    const [accountId, setAccountId] = useState("");

    useEffect(() => {
        if (updatedAccount.verified_by_admin && accountId) {
            dispatch(action__patch__accounts(accountId, updatedAccount)).then(
                setUpdatedAccount({
                    ...updatedAccount,
                    verified_by_admin: "", //this is used to reset, why? cause when you click on one you can't click on another, look at the dispatch condition and you'll get it
                })
            );
        }
    }, [accountId, updatedAccount.verified_by_admin]);
    //end account update
    return (
        <Card className={classes.root}>
            <Grid container="container" spacing={3}>
                <Grid item="item" container="container" xs={10}>
                    <Grid item="item" xs={2}>
                        <CardMedia className={classes.cover} image={account.organization.logo}/>
                    </Grid>
                    <Grid item="item" xs={10}>

                        <div className={classes.details}>
                            <CardContent className={classes.content}>
                                <Typography component="h5" variant="h5">
                                    {account.organization.name}
                                </Typography>
                                <Typography variant="subtitle1" color="textSecondary">
                                    {account.organization.representative.first_name + " " + account.organization.representative.last_name}
                                </Typography>
                            </CardContent>
                        </div>
                    </Grid>
                </Grid>
                <Grid item="item" justify="center" className={classes.btn} xs={2}>
                    <div className={classes.controls}>
                        {
                            account.verified_by_admin === "false"
                                ? (
                                    <Button
                                        variant="contained"
                                        className={classes.btn_validate}
                                        onClick={() => {
                                            setUpdatedAccount({
                                                ...updatedAccount,
                                                verified_by_admin: "true"
                                            });
                                            setAccountId(account._id);
                                        }}>Validate</Button>
                                )
                                : (
                                    
                                        <Button
                                            variant="contained"
                                            className={classes.btn_validate}
                                            onClick={() => {
                                                setUpdatedAccount({
                                                    ...updatedAccount,
                                                    verified_by_admin: "false"
                                                });
                                                setAccountId(account._id);
                                            }}>Unvalidate</Button>
                                        
                                   
                                )
                        }

                    </div>
                </Grid>
            </Grid>
        </Card>
    );
}
