import React from 'react';
import '../../css/bootstrap.min.css';

import {CircularProgress} from '@material-ui/core';
//card
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
//Grid
import Grid from '@material-ui/core/Grid';

//css
import {makeStyles} from '@material-ui/core/styles';
//icon
import LanguageIcon from '@material-ui/icons/Language';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import RoomIcon from '@material-ui/icons/Room';
const useStyles = makeStyles((theme) => ({
    card_pic_info: {
        backgroundColor: 'rgb(255, 255, 255)',
        marginBottom: '2%',
        borderRadius: '5px',
        boxShadow: '0 3px 10px rgba(46, 45, 45, 0.2)'
    },
    profImg: {
        boxShadow: '0px 3px 5px rgba(46, 45, 45, 0.2)',
        marginTop: '5%',
        marginLeft: '25%',
        width: '50%',
        borderRadius: '60%'
    },
    icon:{
        color:'#2196F3',
    },
    details:{
        marginTop:20
    }
}));
const PicInfo = ({account}) => {
    const classes = useStyles();
    console.log(account)
    const output = (
        <Card className={classes.card_pic_info} variant="outlined">
            <img
                src={account.organization.logo}
                className={classes.profImg}
                alt="image of the company"/>
            <CardContent>

                <Typography variant="h5" align="center" component="p" className={classes.details}>
                    {account.organization.name}
                </Typography>
                <Grid container="container" spacing={3} className={classes.container} className={classes.details} >
                <Grid item="item" xs={2}>
                <RoomIcon className={classes.icon}/>
                </Grid>
                <Grid item="item" xs={10}>
                <Typography variant="h7"  component="p" >
                    {account.organization.address}
                </Typography>
                </Grid>
                <Grid item="item" xs={2}>
                <LanguageIcon className={classes.icon}/> 
                </Grid>
                <Grid item="item" xs={10}>  
                <Typography variant="h7"  component="p" >
                  {account.organization.website}
                </Typography>
                </Grid>
                
                <Grid item="item" xs={2}>
                <AlternateEmailIcon className={classes.icon}/>
                    </Grid>
                    <Grid item="item" xs={10} > 
                    <Typography variant="h7"  component="p">
                   {account.email}
                </Typography> 
                </Grid>
               
                </Grid>
            </CardContent>

        </Card>
    );

    return output;
}

export default PicInfo;