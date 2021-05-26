import React from 'react';
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {makeStyles} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from '@material-ui/core/Grid';
import '../../css/Extract.css'
const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        width:'80%',
        marginLeft:'10%'
    },
    cover:{
        height:100,
        width:100
    }
    
}));


const ExtractPost=({post})=>{
    const classes = useStyles();
    return (
        !post?
        null
        :
        <Card className={classes.root}>
        <Grid container="container" spacing={3}>
                <Grid item="item" xs={1}>
                    <CardMedia className={classes.cover} image={post.image}/>
                </Grid>
                <Grid item="item" xs={11}>
                    <div className={classes.details}>
                        <CardContent className={classes.content}>
                            <Typography component="h6" variant="h7">
                                {post.title}
                            </Typography>
                            <Typography variant="subtitle1" color="textSecondary" className="descript-extract">
                                {post.description}
                            </Typography>
                        </CardContent>
                    </div>
                </Grid>
               
             </Grid>
       
    </Card>
    );
}

export default ExtractPost;