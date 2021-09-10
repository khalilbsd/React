import React, {useState, useEffect} from 'react';
import {withRouter} from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import SettingsIcon from '@material-ui/icons/Settings';
import {useDispatch, useSelector} from 'react-redux';
import {action__get__one__account} from '../../actions/action__accounts';
import FileBase from 'react-file-base64';
import Card from '@material-ui/core/Card';
import {action__patch__accounts} from '../../actions/action__accounts';
//icon
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import BusinessIcon from '@material-ui/icons/Business';
import PersonIcon from '@material-ui/icons/Person';
const useStyles = makeStyles((theme) => ({
    root:{
        width:400,
    },
    avatar: {
      marginLeft:'48.3%',
        marginBottom:"1%",
        backgroundColor: theme.palette.secondary.main
    },
        icon:{
            width:50,
            height:50
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
        width: '100%'
    },
    layout: {
        marginTop:"5%",
        width: 'auto',
        // marginLeft: theme.spacing(2),
        //marginLeft: '5%',
        //marginRight: '5%'

    },
    input:{
        marginTop:'5%',
        marginBottom:'5%',
        marginLeft:'5%',
        marginRight:'5%',
        width:'90%'
    },
    header:{
       // textAlign:'center',
       
    }   
}));

function Settings({_id}) {
    const classes = useStyles();

    const [updatedAccount, setUpdatedAccount] = useState({
        email: useSelector((state) => state.reducer__accounts.email),
        password: useSelector((state) => state.reducer__accounts.password),
        organization: {
            name: useSelector((state) => state.reducer__accounts.organization.name),
            website: useSelector((state) => state.reducer__accounts.organization.website),
            logo: useSelector((state) => state.reducer__accounts.organization.logo),
            address: useSelector((state) => state.reducer__accounts.organization.address),
            phone_number: useSelector((state) => state.reducer__accounts.organization.phone_number),
            description: useSelector((state) => state.reducer__accounts.organization.description),
            representative: {
                first_name: useSelector((state) => state.reducer__accounts.organization.representative.first_name),
                last_name: useSelector((state) => state.reducer__accounts.organization.representative.last_name),
                job_position: useSelector((state) => state.reducer__accounts.organization.representative.job_position),
                phone_number: useSelector((state) => state.reducer__accounts.organization.representative.phone_number),
                image: useSelector((state) => state.reducer__accounts.organization.representative.image)
            }
        }
    });

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(action__get__one__account(_id));
    }, [dispatch]);

    const store__account = useSelector((state) => state.reducer__accounts);
    //console.log(store__account);

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
        console.log(updatedAccount);

    }

    return (
        <div className={classes.layout}>
             <Typography component="h1"  align="center" variant="h5">
            <Avatar className={classes.avatar}>
                <SettingsIcon/>
            </Avatar>
            <Typography component="h1" variant="h5">
                Settings
            </Typography>
            </Typography>
           

            <Container component="main" maxWidth="lg">
                <CssBaseline/>
                <div className={classes.paper}>

                    {/*<img
                                        src={store__account.organization.logo}
                                        alt="Organization logo"
                                        width="100"
                        height="100"/>*/
                    }

                    <form className={classes.form} noValidate="noValidate" onSubmit={handleForm}>
                        <Grid container="container" spacing={2}>
                            <Grid item="item" xs="xs">

                                <Card className={classes.root}>
                                <Typography component="h1" align="center" variant="h5">
                                       <AccountCircleIcon color="secondary" className={classes.icon}/>
                                    </Typography>
                                    <Typography component="h2" align="center" variant="h5">
                                        Account
                                    </Typography>
                                   
                                  
                                    {
                                        Object
                                            .entries(store__account)
                                            .map(
                                                ([
                                                    key, value
                                                ], i) => account.includes(key)
                                                    ? (null)
                                                    : key === "seen"
                                                        ? null
                                                        : (

                                                            <Grid item="item" xs={12} key={i}>
                                                                <TextField
                                                                   className={classes.input}
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
                                                                    })}/>
                                                            </Grid>
                                                        )
                                            )
                                    }
                                </Card>
                            </Grid>

                            <Grid item="item" xs="xs">
                                <Card className={classes.root}>
                                    <Typography align="center" component="h1" variant="h5">
                                        <BusinessIcon color="secondary" className={classes.icon}/>
                                    </Typography>   
                                    <Typography align="center" component="h2" variant="h5">
                                        Organization
                                    </Typography>

                                    <Grid item="item" xs={12} container="container" spacing={1} className={classes.input}>
                                        <Grid item="item" xs={4}>
                                            <p>Organization Logo</p>
                                        </Grid>
                                        <Grid item="item" xs={8}>
                                            <FileBase
                                                type="File"
                                                multiple={false}
                                                onDone={({base64}) => setUpdatedAccount({
                                                    ...updatedAccount,
                                                    ...organization,
                                                    logo: base64
                                                })}/>
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
                                                            :
                                                            key2==="0" || key2==="1" || key2==="2" || key2==="3"?
                                                            null
                                                            :
                                                            (
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
                                                                        className={classes.input}
                                                                        onChange={(e) => setUpdatedAccount({
                                                                            ...updatedAccount,
                                                                            key: e.target.value
                                                                        })}/>
                                                                </Grid>
                                                            )
                                                    ))
                                            )
                                    }
                                </Card>
                            </Grid>

                            <Grid item="item" xs="xs">
                                <Card className={classes.root}>
                                <Typography align="center" component="h1" variant="h5">
                                        <PersonIcon color="secondary" className={classes.icon}/>
                                    </Typography>   
                                    <Typography component="h2" variant="h5" align="center">
                                        Representative
                                    </Typography>
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
                                                                    :
                                                                    key3==="0" || key3==="1" || key3==="2" || key3==="3"?
                                                                    null
                                                                    :
                                                                    (
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
                                                                                className={classes.input}
                                                                                onChange={(e) => setUpdatedAccount({
                                                                                    ...updatedAccount,
                                                                                    key: e.target.value
                                                                                })}/>
                                                                        </Grid>
                                                                    )
                                                            ))
                                                    ))
                                            )
                                    }
                                </Card>
                            </Grid>

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

        </div>
    );
}

export default withRouter(Settings);