import React from 'react';
import {CircularProgress} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        marginTop: '1.4%',
        minWidth: 275
    }
});

const ProfAction = ({info}) => {
    const classes = useStyles();

    const action = (

        <div>
            {
                !info
                    ? (<CircularProgress className="loading"/>)
                    : (
                        <Card className={classes.root}>
                            <CardContent>
                                <Typography variant="h5" component="h2">
                                    {info.organization.name}
                                </Typography>
                                <Typography variant="body2" component="p">
                                    {info.organization.description}
                                </Typography>
                            </CardContent>
                        </Card>
                    )
            }

        </div>

    );

    return action;
}

export default ProfAction;