import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper } from '@material-ui/core';
import Container from '@material-ui/core/Container';

import ParticipantsCatalog from "./Participants components/ParticipantsCatalog";
import Filter from "./Participants components/Filter";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop:10,
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
    <Container fixed>

    
      {/*Participants*/}
      <Grid container className={classes.root} spacing={5} direction="column">
        <Grid container spacing={5} direction="row">
          
          <Grid item xs={12}>
            <ParticipantsCatalog _id={_id} />
          </Grid>
          
        </Grid>
      </Grid>
    </Container>
  );
}