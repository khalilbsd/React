import React from 'react';
//mateirle ui
import Grid from '@material-ui/core/Grid';
//componeent
import Empty from './Empty';

import Invitation from './Invitations';

const SendedInvitation = ({invitation}) => {

    return (
        <Grid container="container" spacing={1} justify="center">
            {
                !invitation
                    ? <Empty title="you didn't express your interest in any product yet"/>
                    : <Invitation invite={invitation} place="sent"/>

            }
        </Grid>
    );
}

export default SendedInvitation;