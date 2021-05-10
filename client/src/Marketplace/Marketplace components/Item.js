import React, {useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {useDispatch} from 'react-redux';
import {action__get__one__account} from '../../actions/action__accounts';
import {useSelector} from 'react-redux';
import {CircularProgress, LinearProgress} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import CardActionArea from '@material-ui/core/CardActionArea';
import '../../css/ProdServ.css';
/*actions*/
import moment from 'moment';
import Invitation from './Invitation';

//link
import {Link} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        width:280,
        paddingLeft: "10px",
        paddingRight: "10px",
        paddingTop: "10px",
        paddingBottom: "10px",
        maxHeight: 410,
        minHeight: 360
    },
    media: {
        height: 0,
        paddingTop: '56.25%'
    },
    
    title: {
        whiteSpace: 'nowrap',
        width: '100%', 
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        minHeight: 30,
    },
    link: {
        textDecoration: 'none',
        color: '#000000'
    },
    loadingBar:{
        marginTop:'10%',
        width:'100%',
    },
    loadingCirlcle:{
        marginLeft:'40%',
        marginTop:'15%',
        marginBottom:'15%',
       color:'#2196F3'
    },
    small:{
        height:30,
        width:30,
    }
}));

function Item({post}) {
    const id = useSelector((state) => state.reducer__login)
    const dispatch = useDispatch();
    const classes = useStyles();
    useEffect(() => {
        dispatch(action__get__one__account(post.account));
    }, [dispatch]);

    const account = useSelector((state) => state.reducer__accounts);

    return (
      !account._id===id[0]?
      (

      
        <Card className={classes.root}>
             {
                (!account.organization)
                    ? <LinearProgress className={classes.loadingBar}/>
                    : (
                        <Link to={`/others/${account._id}`} className={classes.link}>
                            <CardActionArea>
                                <CardHeader
                                    avatar={<Avatar className={classes.small}  
                                    src = {account.organization.logo} />}
                                    title={account.organization.name}
                                    subheader={moment(account.creation_date).fromNow()}/>
                            </CardActionArea>
                        </Link>
                    )
                                }
            <Link to={`/product/${post._id}`} className={classes.link}>
                <CardActionArea>
                    {
                        !post?
                        <CircularProgress className={classes.loadingCirlcle}/>
                        :<CardMedia className={classes.media} image={post.image} title={post.title}/>
                    }
                    
                </CardActionArea>
          

           

            <CardContent>

                <Typography
                    variant="h8"
                    color="primary"
                    className={classes.title}
                    component="p">
                    {post.title}
                </Typography>
              
                <Typography
                    variant="body2"
                    color="textSecondary"
                    className="desc"
                    component="p">
                    {post.description}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {post.date_creation}
                </Typography>

            </CardContent>
            </Link>
            {

                (!account.organization)
                    ? <LinearProgress className={classes.loadingBar}/>
                    : <Invitation account={account} post={post}/>

            }

        </Card>
      ):
      null
    );
}
export default Item;