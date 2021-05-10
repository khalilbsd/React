import React from 'react';
import '../../css/bootstrap.min.css';

import {CircularProgress} from '@material-ui/core';
//card
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
//css
import {makeStyles} from '@material-ui/core/styles';
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
                <Typography variant="h5" align="center" component="p">
                    {account.organization.name}
                </Typography>
                <Typography variant="h7" align="center" component="p">
                    {account.organization.address}
                </Typography>
            </CardContent>

        </Card>
    );

    return output;
}

export default PicInfo;