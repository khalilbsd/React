import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
const useStyles = makeStyles((theme) => ({
    
    card: {
      display: 'flex',
    
  },
}));

export default function Main(props) {
    const classes = useStyles();
    const {event, title} = props;

    return (
        <Grid item="item" xs={12} md={8}>
            <Card className={classes.card}>
                <Grid container="container" spacing={1}>
                    <div>
                        <CardContent>
                            <Typography variant="h6" gutterBottom="gutterBottom">
                                {title}
                            </Typography>
                            <Divider/>
                            <Grid
                                container="container"
                                item="item"
                                xs={12}
                                spacing={3}
                                className={classes.content}>
                                <Grid container="container" item="item" xs={12} md={12} spacing={1}>
                                    <Typography variant="subtitle1" >
                                        {event.description}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </div>
                </Grid>
            </Card>
        </Grid>
    );
}

Main.propTypes = {
    event: PropTypes.array,
    title: PropTypes.string
};
