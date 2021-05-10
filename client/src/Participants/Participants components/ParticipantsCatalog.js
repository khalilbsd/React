import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, Card } from '@material-ui/core';
import { action__get__participants } from '../../actions/action__participants';
import { useDispatch } from 'react-redux';
import User from "./User";
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { action__get__accounts } from '../../actions/action__accounts';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#e4f7f8",
    paddingLeft: "10px",
    paddingRight: "10px",
    paddingTop: "10px",
    paddingBottm: "10px"
  }
}));

export default function ParticipantsCatalog({ _id }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(action__get__participants());
  }, [dispatch]);

  useEffect(() => {
    dispatch(action__get__accounts());
  }, [dispatch]);

  const store__accounts = useSelector((state) => state.reducer__accounts);
  const store__participants = useSelector((state) => state.reducer__participants);
  return (
    <Card>
      {/*ParticipantsCatalog*/}
      <Grid container="container" className={classes.root} spacing={2}>
        {/*Title*/}
        <Grid item="item" xs={12}>
          <Typography variant="h3">
            Participants Catalog
                    </Typography>
        </Grid>
        {/*User 1*/}
        {
          store__participants.map(
            (participant, key) => (store__accounts.map((account, key) => (
              account._id == participant.account_id
                ? (
                  <Grid item="item" xs={12}>
                    <User _id={_id} account={account} participant={participant} />
                  </Grid>
                )
                : (null)
            )))
          )
        }
      </Grid>
    </Card >
  );
}