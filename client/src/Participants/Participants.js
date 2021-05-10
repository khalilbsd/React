import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper } from '@material-ui/core';

import ParticipantsCatalog from "./Participants components/ParticipantsCatalog";
import Filter from "./Participants components/Filter";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
  },
}));

export default function Participants({ _id }) {
  const classes = useStyles();
  return (
    <div>
      {/*Participants*/}
      <Grid container className={classes.root} spacing={5} direction="column">
        <Grid item xs={12} />
        <Grid container spacing={5} direction="row">
          <Grid item xs={1} />{/*don't delete this line; ask jihen why*/}
          {/*Filter*/}
          <Grid item xs={3}>
            <Filter />
          </Grid>
          {/*ParticipantsCatalog*/}
          <Grid item xs={7}>
            <ParticipantsCatalog _id={_id} />
          </Grid>
          <Grid item xs={1} />{/* */}
        </Grid>
        <Grid item xs={12} />
      </Grid>
    </div>
  );
}