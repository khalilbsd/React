import React, { useState, useEffect } from 'react';
import { withRouter } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import SettingsIcon from '@material-ui/icons/Settings';
import Paper from '@material-ui/core/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { action__get__one__account } from '../../actions/action__accounts';
import FileBase from 'react-file-base64';

import { action__patch__accounts } from '../../actions/action__accounts';

const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    },
    card: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [
            theme
                .breakpoints
                .up(600 + theme.spacing(3) * 2)
        ]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3)
        }
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [
            theme
                .breakpoints
                .up(600 + theme.spacing(2) * 2)
        ]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto'
        }
    }
}));

function Settings({ _id }) {
    const classes = useStyles();

    const [updatedAccount, setUpdatedAccount] = useState({
        email: "",
        password: "",
        organization: {
            name: "",
            website: "",
            logo: "",
            address: "",
            phone_number: "",
            description: "",
            representative: {
                first_name: "",
                last_name: "",
                job_position: "",
                phone_number: "",
                image: ""
            }
        }
    });

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(action__get__one__account(_id));
    }, [dispatch]);

    const store__account = useSelector((state) => state.reducer__accounts);
    console.log(store__account);


    //const _id = useSelector((state) => state.reducer__login);

    const account = [
        "_id",
        "role",
        "creation_date",
        "verified_by_admin",
        "token",
        "tokenExp",
        "organization",
        "__v",
        "verified_account"
    ];

    const organization = [
        "_id",
        "role",
        "email",
        "password",
        "creation_date",
        "verified_by_admin",
        "token",
        "tokenExp",
        "__v",
        "verified_account"
    ];

    const organization2 = ["logo", "representative"];

    const representative = [
        "name",
        "type",
        "website",
        "logo",
        "address",
        "phone_number",
        "description"
    ];

    const representative2 = ["image"];

    const handleForm = (e) => {
        e.preventDefault();
        dispatch(action__patch__accounts(store__account._id, updatedAccount));
        //console.log(updatedAccount);

    }

    return (
        <div className={classes.layout}>
            <Paper className={classes.card}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <SettingsIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Settings
                        </Typography>

                        {/*<img
                                        src={store__account.organization.logo}
                                        alt="Organization logo"
                                        width="100"
                        height="100"/>*/}

                        <form className={classes.form} noValidate="noValidate" onSubmit={handleForm}>
                            <Grid container="container" spacing={2}>
                                <Grid item="item" xs={12}>
                                    <Typography component="h2" variant="h5">
                                        Account
                                    </Typography>
                                </Grid>

                                {
                                    Object
                                        .entries(store__account)
                                        .map(
                                            ([
                                                key, value
                                            ], i) => account.includes(key)
                                                    ? (null)
                                                    : (
                                                        <Grid item="item" xs={12} key={i}>
                                                            <TextField
                                                                variant="outlined"
                                                                fullWidth="fullWidth"
                                                                id={key}
                                                                label={key}
                                                                name={key}
                                                                autoComplete={key}
                                                                type={key}
                                                                defaultValue={value}
                                                                onChange={(e) => setUpdatedAccount({
                                                                    ...updatedAccount,
                                                                    key: e.target.value
                                                                })}
                                                            />
                                                        </Grid>
                                                    )
                                        )
                                }
                                <Grid item="item" xs={12}>
                                    <Typography component="h2" variant="h5">
                                        Organization
                                    </Typography>
                                </Grid>
                                <Grid item="item" xs={12} container="container" spacing={1}>
                                    <Grid item="item" xs={4}>
                                        <p>Organization Logo</p>
                                    </Grid>
                                    <Grid item="item" xs={8}>
                                        <FileBase
                                            type="File"
                                            multiple={false}
                                            onDone={({ base64 }) => setUpdatedAccount({
                                                ...updatedAccount,
                                                ...organization,
                                                logo: base64
                                            })} />
                                    </Grid>
                                </Grid>
                                {
                                    Object
                                        .entries(store__account)
                                        .map(
                                            ([
                                                key, value
                                            ], i) => organization.includes(key)
                                                    ? (null)
                                                    : (Object.entries(value).map(
                                                        ([
                                                            key2, value2
                                                        ], i2) => organization2.includes(key2)
                                                                ? (null)
                                                                : (
                                                                    <Grid item="item" xs={12} key={i2}>
                                                                        <TextField
                                                                            variant="outlined"
                                                                            fullWidth="fullWidth"
                                                                            id={key2}
                                                                            label={key2}
                                                                            name={key2}
                                                                            autoComplete={key2}
                                                                            type={key2}
                                                                            defaultValue={value2}
                                                                            onChange={(e) => setUpdatedAccount({
                                                                                ...updatedAccount,
                                                                                key: e.target.value
                                                                            })}
                                                                        />
                                                                    </Grid>
                                                                )
                                                    ))
                                        )
                                }
                                <Grid item="item" xs={12}>
                                    <Typography component="h2" variant="h5">
                                        Representative
                                    </Typography>
                                </Grid>
                                {
                                    Object
                                        .entries(store__account)
                                        .map(
                                            ([
                                                key, value
                                            ], i) => organization.includes(key)
                                                    ? (null)
                                                    : (Object.entries(value).map(
                                                        ([
                                                            key2, value2
                                                        ], i2) => representative.includes(key2)
                                                                ? (null)
                                                                : (Object.entries(value2).map(
                                                                    ([
                                                                        key3, value3
                                                                    ], i3) => representative2.includes(key3)
                                                                            ? (null)
                                                                            : (
                                                                                <Grid item="item" xs={12} key3={i}>
                                                                                    <TextField
                                                                                        variant="outlined"
                                                                                        fullWidth="fullWidth"
                                                                                        id={key3}
                                                                                        label={key3}
                                                                                        name={key3}
                                                                                        autoComplete={key3}
                                                                                        type={key3}
                                                                                        defaultValue={value3}
                                                                                        onChange={(e) => setUpdatedAccount({
                                                                                            ...updatedAccount,
                                                                                            key: e.target.value
                                                                                        })}
                                                                                    />
                                                                                </Grid>
                                                                            )
                                                                ))
                                                    ))
                                        )
                                }
                            </Grid>

                            <Button
                                type="submit"
                                fullWidth="fullWidth"
                                variant="contained"
                                color="primary"
                                className={classes.submit}>
                                Confirm Modifications
                            </Button>
                        </form>
                    </div>
                </Container>
            </Paper>
        </div>
    );
}

export default withRouter(Settings);