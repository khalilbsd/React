import {withRouter} from "react-router-dom";
import React, {useEffect, useState} from 'react';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import MainFeaturedPost from './Profile events components/MainFeaturedPost';
import Location from './Profile events components/Location';
import Main from './Profile events components/Main';
import Sidebar from './Profile events components/Sidebar';
import Duration from './Profile events components/Duration';
//card
import Card from '@material-ui/core/Card';
//icon
import LockIcon from '@material-ui/icons/Lock';
//redux
import {useSelector, useDispatch} from 'react-redux';
import {action__get__one__event} from '../actions/action__events';
import PropTypes from 'prop-types';

/*css*/
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import '../css/profile_event.css';
import DescriptionIcon from '@material-ui/icons/Description';
import ScheduleIcon from '@material-ui/icons/Schedule';
//agenda
import Agenda from './Profile events components/Agenda'
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
    icon: {
        color: '#2196F3'
    },
    pending_card: {
        backgroundColor: '#f50057',
        minHeight: 92,
        marginBottom: 50
    },
    status: {
        color: '#ffff',
        verticalAlign: 'middle',
        display: 'inline-flex',
        marginLeft: 90,
        marginTop: 25,
        fontSize: 24
    },
}));

const ProfileEvent = ({match, location}) => {
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
    const classes = useStyles();
    const {params: {
            id
        }} = match;
    const dispatch = useDispatch();

    const handleChange = (ev, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        dispatch(action__get__one__event(id));
    }, [id]);
    const event = useSelector((state) => state.reducer__events);
    //console.log(event)

    return (
        <React.Fragment>
            <CssBaseline/>
            <Container maxWidth="lg" className={classes.container}>
                <Grid container="container" spacing={3}>
                    <Grid item="item" xs={12}>
                        <MainFeaturedPost event={event}/>
                        <Grid container="container" spacing={4}>
                            <Location location={event.location}/>
                            <Duration event={event}/>
                        </Grid>
                    </Grid>

                    <Grid item="item" xs={8}>
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
                                    icon={<DescriptionIcon className = {
                                        classes.icon
                                    } />}
                                    className={classes.TabPanel}
                                    {...a11yProps(0)}/>
                                <Tab
                                    icon={<ScheduleIcon className = {
                                        classes.icon
                                    } />}
                                    {...a11yProps(1)}/>
                            </Tabs>
                        </AppBar>
                        <TabPanel value={value} index={0} dir={theme.direction}>
                            <Main title="Description" event={event}/>
                        </TabPanel>
                        <TabPanel value={value} index={1} dir={theme.direction}>
                            {<Agenda/>}

                        </TabPanel>
                    </Grid>
                    <Grid item="item" xs={4} className={classes.test}>
                        {
                            event.state === "true"
                                ? <Sidebar event_id={id}/>
                                : <Card className={classes.pending_card}>
                                        <Grid container="container" spacing={1}>
                                            <div>
                                                <div className={classes.status}>
                                                    <LockIcon/>
                                                    <span>Closed
                                                    </span>
                                                </div>
                                            </div>
                                        </Grid>
                                    </Card>
                        }
                    </Grid>
                </Grid>
            </Container>
        </React.Fragment>
    );

}

export default withRouter(ProfileEvent);