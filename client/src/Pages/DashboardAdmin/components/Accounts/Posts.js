import React, {useEffect} from 'react';
import ProdServ from '../../../../profile/profile components/ProdServ'
/*img*/
/*css*/
import {makeStyles} from '@material-ui/core/styles';
import {CircularProgress} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
/*redux*/
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {action__get__my__posts} from '../../../../actions/action__posts';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
const useStyles = makeStyles((theme) => ({
    title: {
        fontSize: 14
    },
    wait: {
        width: '100%'
    }
}));

const Posts = ({id}) => {
    console.log(id);
    const classes = useStyles();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(action__get__my__posts(id));
    }, [id]);
    const store__post = useSelector((state) => state.reducer__posts);
    console.log(store__post);
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
    return (
        <Grid container="container" >

            {
                store__post[0]
                    ? store__post.length > 0
                        ? (store__post.map((post, key) => (
                            <Grid item="item" xs={4} direction="column">
                                <ProdServ id={key} post={post} admin="admin"/>
                            </Grid>
                        )))
                        : <CircularProgress/>
                    : <h1>
                        he doesn't have any posts yet
                    </h1>

            }

           </Grid>
    );
}

export default Posts;
