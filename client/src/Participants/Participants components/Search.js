import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField,Grid,Card } from '@material-ui/core';
import {Search as SearchIcon} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingLeft:"10px",
    paddingRight:"10px",
    paddingTop:"10px",
    paddingBottom:"10px",
  },
}));

export default function Search() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      {/*Search*/}
      <Grid container spacing={3}>
        {/*Icon*/}
        <Grid item xs={1}>
            <SearchIcon />
        </Grid>
        {/*Input*/}
        <Grid item xs={11}>
            <TextField />
        </Grid>
      </Grid>
    </Card>
  );
}