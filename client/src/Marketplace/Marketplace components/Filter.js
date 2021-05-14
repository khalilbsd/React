import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TreeView from "@material-ui/lab/TreeView";
import TreeItem from "@material-ui/lab/TreeItem";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Card from '@material-ui/core/Card';

const useStyles = makeStyles({
    root: {
        margin:'10%',
        marginBottom:'10%',
        height: 'auto',
        flexGrow: 1,
        maxWidth: 400,
        
    },
    card:{
        marginTop:'5%'
    }
});

export default function Filter({ setSearchData }) {
    const classes = useStyles();
    return (
        <Card className={classes.card}>
            <TreeView
                className={classes.root}
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
                onNodeSelect={(event, value) => setSearchData(value)}
            >
                <TreeItem nodeId="type" label="Type">
                    <TreeItem nodeId="product" label="Product" />
                    <TreeItem nodeId="service" label="Service" />
                </TreeItem>
                <TreeItem nodeId="state" label="State">
                    <TreeItem nodeId="offer" label="Offer" />
                    <TreeItem nodeId="request" label="Request" />
                </TreeItem>
            </TreeView>
        </Card>
    );
}