import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
import {makeStyles, useTheme} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {action__patch__accounts} from '../../../../actions/action__accounts';
import Grid from '@material-ui/core/Grid';
import CardActionArea from '@material-ui/core/CardActionArea';
import Modal from 'react-bootstrap/Modal';
import PicInfo from '../../../../profile/profile components/PicInfo'
import ProfAction from '../../../../profile/profile components/ProfAction'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Posts from './Posts';
import Events from './Events';
import {CircularProgress} from '@material-ui/core';
import Box from '@material-ui/core/Box';
//icon
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        paddingLeft: 30,
        paddingTop: 20,
        paddingBottom: 20
    },
    modal_body:{
        backgroundColor:'rgb(230, 230, 230)'
    },
    modal_title: {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor:'rgb(230, 230, 230)'
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
        marginTop: '25%',
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
    },
    btn_invalidate: {
        marginTop: '25%',
        backgroundColor: '#f50057',
        //boxShadow: '0 3px 10px 2px rgba(33, 203, 243, .3)',
        textAlign: 'center',
        border: 'none',
        width: '90%',
        float: 'right',
        borderRadius: 3,
        color: 'white',
        outline: 'none',
        textTransform:'capitalize'
    },
    icon:{
        color:"#2196F3"
    }
}));

function TabPanel(props) {
    const {
        children,
        value,
        index,
        ...other
    } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}>
            {
                value === index && (
                    <Box p={3}>
                        <Typography>{children}</Typography>
                    </Box>
                )
            }
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired
};
function a11yProps(index) {
    return {id: `full-width-tab-${index}`, 'aria-controls': `full-width-tabpanel-${index}`};
}

export default function AccountCard({account}) {
    const classes = useStyles();
    const [show, setShow] = useState(false);
    const theme = useTheme();
    const dispatch = useDispatch();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };
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
                    <CardActionArea onClick={handleShow}>

                        {/*begin modal*/}
                        <Modal
                            show={show}
                            onHide={handleClose}
                            className={classes.modal}
                            animation={true}
                            size="xl"
                            centered="centered">
                            <Modal.Header className={classes.modal_title} >
                                <Modal.Title >{account.organization.name} profile</Modal.Title>
                            </Modal.Header>
                            <Modal.Body className={classes.modal_body}>
                                <Grid container="container" spacing={3}>
                                    <Grid item="item" xs={4}>
                                        {
                                            !account
                                                ? <CircularProgress className="loading"/>
                                                : !account.organization
                                                    ? <CircularProgress className="loading"/>
                                                    : <PicInfo account={account}/>

                                        }

                                    </Grid>
                                    <Grid container="container" direction="row" xs={8}>
                                        <Grid item="item" xs={12}>

                                            {
                                                !account
                                                    ? <CircularProgress className="loading"/>
                                                    : !account.organization
                                                        ? <CircularProgress/>
                                                        : <ProfAction info={account}/>
                                            }

                                        </Grid>
                                            
                                        <Grid container="container" xs={12}>
                                            <AppBar
                                                position="static"
                                                style={{
                                                    background: 'white',
                                                    borderRadius: 5,
                                                    marginTop: 20
                                                }}>
                                                <Tabs
                                                    className={classes.tabs}
                                                    value={value}
                                                    onChange={handleChange}
                                                    indicatorColor="primary"
                                                    variant="fullWidth">
                                                    <Tab
                                                        icon={<AssignmentIndIcon className = {
                                                            classes.icon
                                                        } />}
                                                        className={classes.TabPanel}
                                                        {...a11yProps(0)}/>
                                                    <Tab
                                                        icon={<EventAvailableIcon className = {
                                                            classes.icon
                                                        } />}
                                                        {...a11yProps(1)}/>
                                                </Tabs>
                                            </AppBar>
                                            <TabPanel value={value} index={0} dir={theme.direction}>
                                                
                                                <Posts id={account._id}/>
                                                
                                            </TabPanel>
                                            <TabPanel value={value} index={1} dir={theme.direction}>
                                                <Events id={account._id}/>
                                            </TabPanel>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Modal.Body>

                        </Modal>
                        <Grid container="container" xs={12}>
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
                    </CardActionArea>
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
                                        className={classes.btn_invalidate}
                                        onClick={() => {
                                            setUpdatedAccount({
                                                ...updatedAccount,
                                                verified_by_admin: "false"
                                            });
                                            setAccountId(account._id);
                                        }}>Invalidate</Button>

                                )
                        }

                    </div>
                </Grid>
            </Grid>
        </Card>
    );
}
