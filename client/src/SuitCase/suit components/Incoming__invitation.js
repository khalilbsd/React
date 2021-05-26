import React from 'react';
//material ui
import Grid from '@material-ui/core/Grid';
//components
import Invitation from './Invitations'

const Incoming__invitation = ({invitation}) => {
   
    return (
        <Grid
            container="container"
            justify="center"
            spacing={1}>
                    <Invitation invite={invitation} place="incoming"/>
        </Grid>
    );
}
export default Incoming__invitation;

