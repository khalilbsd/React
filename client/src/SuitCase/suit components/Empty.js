import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        marginTop: '2%',
        width: '100%',
        marginLeft: 10,
        textAlign: 'center'
    },
    title: {
        fontSize: 14
    },
    content: {
        marginTop: '5%',
        marginBottom: '5%'
    }
});

export default function Empty({title, quote}) {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardContent className={classes.content}>

                {
                    quote
                        ? <Typography
                                className={classes.title}
                                color="textSecondary"
                                gutterBottom="gutterBottom">
                                {quote}
                            </Typography>
                        : null
                }
                <Typography variant="h5" component="h2">
                    Sorry !
                </Typography>
                <Typography variant="h6" component="h2">
                    {title}
                </Typography>
            </CardContent>
        </Card>
    );
}