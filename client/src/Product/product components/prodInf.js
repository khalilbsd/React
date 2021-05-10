import React from 'react';
import '../../css/bootstrap.min.css';
/*date format*/
import dateFormat from 'dateformat';
/*style*/
//card
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
const useStyles = makeStyles({
    root: {
        minWidth: 275,
        marginRight:'5%',
        minHeight:265,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)'
    },
    content:{
        marginTop:10,
    }
   
});
const ProdInf = ({post}) => {
    const information = useStyles();
    console.log(post)
    return (

        <div>
            <Card className={information.root}>
                <CardContent>
                    <Typography
                        color="textSecondary"
                        gutterBottom="gutterBottom">
                        {
                            !post
                                ? <LinearProgress/>
                                : (<h6>{post.type}
                                    : {post.state}</h6>)
                        }
                    </Typography>
                    <Typography variant="h6" component="h2" className={information.content}>
                        <Grid container="container" spacing={1}>
                            <Grid item="item" xs={3}>
                                <Typography variant="h6" component="h2" color="textSecondary">Description :</Typography>
                            </Grid>
                            <Grid item="item" xs={9}>
                                {
                                    !post
                                        ? <LinearProgress/>
                                        : post.desc
                                }
                            </Grid>
                        </Grid>
                    </Typography>
                    <Typography variant="h6" component="h2" className={information.content}>
                        <Grid container="container" spacing={1}>
                            <Grid item="item" xs={3}>
                                <Typography variant="h6" component="h2" color="textSecondary">Creation Date :</Typography>
                            </Grid>
                            <Grid item="item" xs={9}>
                                {
                                    !post
                                        ? <LinearProgress/>
                                        : dateFormat(post.date_time, "mmm ds ,yyyy")
                                }
                            </Grid>
                        </Grid>
                    </Typography>
                    <Typography variant="h6" component="h2" className={information.content}>
                        <Grid container="container" spacing={1}>
                            <Grid item="item" xs={3}>
                                <Typography variant="h6" component="h2" color="textSecondary">Documentation :</Typography>
                            </Grid>
                            <Grid item="item" xs={9}>
                                {
                                    !post
                                        ? <LinearProgress/>
                                        : post.file
                                }
                            </Grid>
                        </Grid>
                    </Typography>
                    <Typography variant="h6" component="h2" className={information.content}>
                        <Grid container="container" spacing={1}>
                            <Grid item="item" xs={3}>
                                <Typography variant="h6" component="h2" color="textSecondary">Video Link :</Typography>
                            </Grid>
                            <Grid item="item" xs={9}>
                                {
                                    !post
                                        ? <LinearProgress/>
                                        : post.video
                                }
                            </Grid>
                        </Grid>
                    </Typography>
                </CardContent>
               
            </Card>
           
            
        </div>

    );
}

export default ProdInf;