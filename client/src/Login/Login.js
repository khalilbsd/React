import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import image from "./APII.jpg";
import { action__post__id } from '../actions/action__login.js'
import axios from "axios";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: `url(${image})`,
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        //boxShadow: '0px 0px 20px black',
        //boxShadow: '12px 0 15px -4px rgba(31, 73, 125, 0.8), -12px 0 8px -4px black,'

    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function Login2({ setIsAuth, set_id, setRole, set_verified_by_admin }) {
    const classes = useStyles();
    const [data, setData] = useState({ email: '', password: '' });
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const history = useHistory();

    const handleform = (event) => {
        event.preventDefault();
        axios
            .post('http://localhost:3000/api/accounts/login', data)
            .then(function (response) {
                if (response.data.loginSuccess === true) {
                    setIsAuth(true);
                    set_id(response.data._id);
                    setRole(response.data.role);
                    set_verified_by_admin(response.data.verified_by_admin);
                    dispatch(action__post__id(response.data._id));
                    if (response.data.role == "2") {
                        history.push("/dashboardadmin");
                    } else if (response.data.role == "0") {
                        history.push("/marketplace/generalmarketplace");
                    }

                } else {
                    setError("error")
                }
            })
            .then(function () {
                axios
                    .get('http://localhost:3000/api/accounts/auth')
                    .then(function (response) {
                        console.log(response);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
          </Typography>
                    <form className={classes.form} noValidate onSubmit={handleform}>
                        <TextField
                            error={error}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={(e) => setData({
                                ...data,
                                email: e.target.value
                            })}
                        />
                        <TextField
                            error={error}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={(e) => setData({
                                ...data,
                                password: e.target.value
                            })}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign In
            </Button>
                        <Grid container>
                            <Grid item>
                                <Link to="/signup">
                                    Don't have an account? Sign Up
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
}