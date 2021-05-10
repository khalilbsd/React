import React, {Component} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {Block, Fullscreen} from '@material-ui/icons';
import EventIcon from '@material-ui/icons/Event';
import Button from '@material-ui/core/Button';
import {useHistory} from 'react-router-dom';
const useStyles = makeStyles({
    root: {
        marginTop:50,
        paddingTop:50,
        paddingBottom:50,
        width: Fullscreen,
      minWidth: 180,
      marginLeft:10,
      textAlign:'center'
    
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
     paddingTop:20,
    },
    pos: {
      marginBottom: 12,
    },
    icon:{
        color:'#2699fb',
    fontSize:100,
    '&:hover':{
        color:'#92c5f1',
    }
    },
    goTo:{
        borderRadius:100,
    }
  });
  
const Waiting_card = () => {
    const history = useHistory();
    const classes = useStyles();
    
    
    const res = (
      
 <Card className={classes.root}>
      <CardContent>
      <Typography className={classes.title} color="textSecondary" gutterBottom>
      in order to rise all must combine
        </Typography>
        <Typography variant="h5" component="h2">
       looks like we are still in our first baby steps
        </Typography>
        <Typography variant="h6" className={classes.title} color="textSecondary" >
       please Start by adding some products 
        </Typography>
        
      </CardContent>
    </Card>
     
    );

    return res;

}

export default Waiting_card;