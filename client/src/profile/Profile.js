import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {Fullscreen} from '@material-ui/icons';
import Tab1 from './profile components/Profile__tab1';
import Tab2 from './profile components/Profile__tab2';
import {withRouter} from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import {CircularProgress} from '@material-ui/core';
import PicInfo from './profile components/PicInfo';
import AddProd from './profile components/AddProd.js';
import ProfAction from './profile components/ProfAction';
import Container from '@material-ui/core/Container';
//componenet 
import Representative from './profile components/Representative';
//redux
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {action__get__one__account} from '../actions/action__accounts';
//icon
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
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

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 40
    },
    tabs: {
        fontSize: '1rem',
        letterSpacing: '0.02rem',
        color: 'black',
    },
    icon: {
        color: "#2196F3"
    }
}));

function Profile() {
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };
    const dispatch = useDispatch();

    const id = useSelector((state) => state.reducer__login)

    useEffect(() => {
        dispatch(action__get__one__account(id[0]));
    }, []);

    const account = useSelector((state) => state.reducer__accounts);

    const prof = (
        <Container maxWidth="lg" className={classes.container}>
            <div className={classes.root}>
                <Grid container="container" spacing={3}>
                    <Grid item="item" xs={4}>
                        {
                            !account
                                ? <CircularProgress className="loading"/>
                                : !account.organization
                                    ? <CircularProgress className="loading"/>
                                    : <PicInfo account={account}/>

                        }
                        < AddProd id={id[0]} place={"generalmarketplace"} />
                    </Grid>
                    <Grid container="container" direction="row" xs={8}>
                        <Grid item="item" xs={12}>

                            {
                                !account
                                    ? <CircularProgress className="loading"/>
                                    : !account.organization
                                        ? <CircularProgress/>
                                        : <Representative info={account}/>
                            }

                        </Grid>
                        <Grid item="item" xs={12}>

                            {
                                !account
                                    ? <CircularProgress className="loading"/>
                                    : !account.organization
                                        ? <CircularProgress/>
                                        : <ProfAction info={account}/>
                            }

                        </Grid>

                        <Grid container="container" xs={12} >
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
                            <TabPanel style={{width:'100%'}} value={value} index={0} dir={theme.direction}>
                                <Tab1/>
                            </TabPanel>
                            <TabPanel  style={{width:'100%'}}  value={value} index={1} dir={theme.direction}>
                                <Tab2/>
                            </TabPanel>
                        </Grid>
                    </Grid>
                </Grid>

            </div>
        </Container>
    );
    return prof;
}

export default withRouter(Profile);