import React, {useEffect} from 'react';
import ProdServ from './ProdServ'
import PleaseInsert from './waiting__card/PleaseInsert';
/*img*/
import PicInfo from './PicInfo.js'
/*css*/
import '../../css/prof.css';
import {makeStyles} from '@material-ui/core/styles';
import {CircularProgress, Typography} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
/*redux*/
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {action__get__my__posts} from '../../actions/action__posts';
import {action__get__one__account} from '../../actions/action__accounts';
import {action__get__events} from '../../actions/action__events';
import {action__get__my__events} from '../../actions/action__participants';
const useStyles = makeStyles((theme) => ({
    events_section: {
        marginTop: '5%'
    }

}));

function Profile__tab1() {
    const classes = useStyles();
    const dispatch = useDispatch();

    const id = useSelector((state) => state.reducer__login)

    useEffect(() => {
        dispatch(action__get__one__account(id[0]));
    }, []);

    const account = useSelector((state) => state.reducer__accounts);
    //console.log(account.organization)
    useEffect(() => {
        dispatch(action__get__my__posts(id[0]));
    }, [dispatch]);
    const store__post = useSelector((state) => state.reducer__posts);
    useEffect(() => {
        dispatch(action__get__events());
    }, []);
    const events = useSelector((state) => state.reducer__events);
    // console.log(events)

    useEffect(() => {
        dispatch(action__get__my__events(id[0]));
    }, [dispatch]);
    const participant = useSelector((state) => state.reducer__participants);
    /*


    useEffect(() => {
        Axios
            .get(`http://localhost:5000/api/accounts/${_id}`)
            .then((response) => {
                setid_org(response.data.id_org);
            })
    }, {});
*/

    /*addd*/

    /*post*/
    const prof = (
        <Grid container="container">
            {
                store__post[0] && events[0]
                    ? ((store__post.length > 0) && (events.length > 0))
                        ? (store__post.map((post, key) => (

                            post.place_id !== "generalmarketplace"
                                ? null
                                : <Grid item="item" xs={4}><ProdServ admin="me" id={key} post={post}/></Grid>
                        )))
                        : <CircularProgress/>
                    : <PleaseInsert id={id[0]}/>
            }

            {
                participant[0] && events[0]
                    ? participant.map((part, keypart) => (events.map((event, keyev) => (
                        part.event_id === event._id
                            ? <Grid container="container" className={classes.events_section}>
                                <Typography variant="h5" component="h4" color="textSecondary">
                                    {event.title}
                                </Typography>
                                <Grid container="container" className={classes.events_section}>
                                    {
                                        store__post[0] && events[0]
                                            ? ((store__post.length > 0) && (events.length > 0))
                                                ? (store__post.map((post, key) => (
                                                    post.place_id !== "generalmarketplace"
                                                        ? events.map((event, keyev) => (
                                                            post.place_id === event._id
                                                                ? <Grid item="item" xs={4}><ProdServ admin="me" id={key} post={post} event={event.title}/>
                                                                </Grid>
                                                                : null
                                                        ))
                                                        : null
                                                )))
                                                : <CircularProgress/>
                                            : null

                                    }
                                </Grid>

                            </Grid>
                            : null
                    ))))
                    : null
            }

        </Grid>
    );
    return prof;
}

export default Profile__tab1;