import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography,Grid,Card } from '@material-ui/core';

import Search from "./Search";
import Parameter from "./Parameter";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#e4f7f8",
    paddingLeft:"10px",
    paddingRight:"10px",
    paddingTop:"10px",
    paddingBottom:"10px",
  },
}));

export default function Filter() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      {/*Filter*/}
      <Grid container spacing={3}>
          {/*Title*/}
          <Grid item xs={12}>
            <Typography variant="h3">
                Filter
            </Typography>
            </Grid>
        {/*Search*/}
        <Grid item xs={12}>
            <Search />
        </Grid>
        {/*Parameter*/}
        <Grid item xs={12}>
            <Parameter />
        </Grid>
      </Grid>
    </Card>
  );
}