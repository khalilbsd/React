import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import AddProd from '../AddProd.js';

const useStyles = makeStyles({
  root: {
    marginTop:'1%',
    width:'100%',
    textAlign:'center'
  
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function PleaseInsert({id}) {
  const classes = useStyles();
  

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
         A Big Business starts small
        </Typography>
        <Typography variant="h5" component="h2">
          Hello !
        </Typography>
        <Typography variant="h6" component="h2">
          you still don't have any products or offers please start by adding some
        </Typography>
        
        <AddProd style="main" id={id} />
        
      </CardContent>
    </Card>
  );
}