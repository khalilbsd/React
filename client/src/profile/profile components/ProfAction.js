import React,{useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
//icon
import {CircularProgress} from '@material-ui/core';
import DescriptionIcon from '@material-ui/icons/Description';
//card
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
//bootstrap
import Modal from 'react-bootstrap/Modal';
//grid
import Grid from '@material-ui/core/Grid';

//css
import '../../css/prof_action.css'
const useStyles = makeStyles({
    root: {
        marginTop: '1.4%',
        minWidth: 275
    },
    modal_title: {
        display: 'flex',
        justifyContent: 'center',
        
    },
    icon:{
        color:'#2196F3',
    },
});

const ProfAction = ({info}) => {
    const classes = useStyles();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
          const handleShow = () => setShow(true);
    const action = (

        <div>
            {
                !info
                    ? (<CircularProgress className="loading"/>)
                    : (
                        <Card className={classes.root}>
                             <CardActionArea onClick={handleShow} >
                             <Modal
                            show={show}
                            onHide={handleClose}
                            //className={classes.modal}
                            animation={true}
                            size="xl"
                            centered="centered">
                            <Modal.Header className={classes.modal_title} >
                                <Modal.Title > {info.organization.name}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body className={classes.modal_body}>
                                <Grid container="container" spacing={3}>
                                {info.organization.description}
                                </Grid>
                            </Modal.Body>

                        </Modal>
                             <CardContent>
                                <Typography variant="h5" component="h2">
                                    <DescriptionIcon className={classes.icon}/>
                                </Typography>
                                <Typography variant="body2" component="p" className="desc_prof_action">
                                    {info.organization.description}
                                </Typography>
                            </CardContent>
                             </CardActionArea>
                           
                        </Card>
                    )
            }

        </div>

    );

    return action;
}

export default ProfAction;