import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import {Card,Checkbox,FormControlLabel} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    paddingLeft:"10px",
    paddingRight:"10px",
    paddingTop:"10px",
    paddingBottom:"10px",
  },
});

export default function Parameter() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
    <TreeView
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      multiSelect
    >
      <TreeItem nodeId="1" label="Product">
        <TreeItem nodeId="2" label="Offer">
        <FormControlLabel control={<Checkbox/>}label="Item"/>
    </TreeItem>
        <TreeItem nodeId="4" label="Request">
        <FormControlLabel control={<Checkbox/>}label="Item"/>

        </TreeItem>
      </TreeItem>
      <TreeItem nodeId="6" label="Service">
        <TreeItem nodeId="7" label="Offer">
        <FormControlLabel control={<Checkbox/>}label="Item"/>
        </TreeItem>
        <TreeItem nodeId="9" label="Request">
        <FormControlLabel control={<Checkbox/>}label="Item"/>
        </TreeItem>
      </TreeItem>
    </TreeView>
    </Card>
  );
}
