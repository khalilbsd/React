import React from 'react';
import {CircularProgress} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
//css
import '../../css/prof_action.css'
//icons
import WorkIcon from '@material-ui/icons/Work';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
const useStyles = makeStyles({
    root: {
        marginTop: '1.4%',
        minWidth: 275
    },
    container: {
        marginLeft: 25
    },
    media: {

        width: 75,
        height: 75,
        borderRadius: 500
    },
    rep_name: {
        marginTop: 20
    },
    icon:{
        color:'#2196F3',
    },
});

const Representative = ({info}) => {
    const classes = useStyles();
    console.log(info)
    return (

        !info
            ? (<CircularProgress className="loading"/>)
            : (
                <Card className={classes.root}>
                    <CardContent>

                        <Grid container="container" spacing={3}>
                            <Grid item="item" xs={12}>
                                <Typography
                                    className={classes.title}
                                    color="textSecondary"
                                    gutterBottom="gutterBottom">
                                    Our Representative
                                </Typography>
                            </Grid>
                            <Grid container="container" spacing={3} className={classes.container}>
                                <Grid item="item" xs={2}>
                                    <CardMedia
                                        className={classes.media}
                                        image={info.organization.representative.image}
                                        title={info.organization.representative.last_name + " " + info.organization.representative.first_name}/>
                                </Grid>
                                <Grid item="item" xs={10}>
                                    <Typography variant="h5" component="h2" className={classes.rep_name}>
                                        {info.organization.representative.last_name} &nbsp;
                                        {info.organization.representative.first_name}
                                    </Typography>
                                </Grid>
                                <Grid item="item" xs={12}>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    <WorkIcon  className={classes.icon} /> {info.organization.representative.job_position}
                                </Typography>
                                </Grid>
                                <Grid item="item" xs={12}>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    <PhoneAndroidIcon className={classes.icon}/> {info.organization.representative.phone_number}
                                </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            )

    );

}

export default Representative;