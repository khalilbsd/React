import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";
import AccountInfo from './components/AccountInfo';
import OrganizationInfo from './components/OrganizationInfo';
import RepresentativeInfo from './components/RepresentativeInfo';
import { action__post__accounts } from '../../actions/action__accounts';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative'
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [
            theme
                .breakpoints
                .up(600 + theme.spacing(2) * 2)
        ]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto'
        }
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [
            theme
                .breakpoints
                .up(600 + theme.spacing(3) * 2)
        ]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3)
        }
    },
    stepper: {
        padding: theme.spacing(3, 0, 5)
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1)
    }
}));

const steps = ['Account Information', 'Organization Information', 'Representative Information'];

function getStepContent(step, accountDataInfo, setAccountDataInfo, organizationDataInfo, setOrganizationDataInfo, representativeDataInfo, setRepresentativeDataInfo) {
    switch (step) {
        case 0:
            return <AccountInfo data={accountDataInfo} setData={setAccountDataInfo} />;
        case 1:
            return <OrganizationInfo data={organizationDataInfo} setData={setOrganizationDataInfo} />;
        case 2:
            return <RepresentativeInfo data={representativeDataInfo} setData={setRepresentativeDataInfo} />;
        default:
            throw new Error('Unknown step');
    }
}

export default function SignUp() {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep(activeStep + 1);
        setData({
            email: accountDataInfo.email,
            password: accountDataInfo.password,
            organization: {
                name: organizationDataInfo.name,
                type: organizationDataInfo.type,
                website: organizationDataInfo.website,
                logo: organizationDataInfo.logo,
                address: organizationDataInfo.address,
                phone_number: organizationDataInfo.phone_number,
                description: organizationDataInfo.description,
                representative: {
                    first_name: representativeDataInfo.first_name,
                    last_name: representativeDataInfo.last_name,
                    job_position: representativeDataInfo.job_position,
                    phone_number: representativeDataInfo.phone_number,
                    image: representativeDataInfo.image
                }
            }

        });
        if (activeStep === steps.length) {
            dispatch(action__post__accounts(data));
        }
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const [data, setData] = useState({
        email: "",
        password: "",
        organization: {
            name: "",
            type: "",
            website: "",
            logo: "",
            address: "",
            phone_number: "",
            description: "",
            representative: {
                first_name: "",
                last_name: "",
                job_position: "",
                phone_number: "",
                image: ""
            }
        }
    });

    const [accountDataInfo, setAccountDataInfo] = useState({ email: "", password: "" });

    const [organizationDataInfo, setOrganizationDataInfo] = useState({
        name: "",
        type: "",
        website: "",
        logo: "",
        address: "",
        phone_number: "",
        description: ""
    });

    const [representativeDataInfo, setRepresentativeDataInfo] = useState(
        { first_name: "", last_name: "", job_position: "", phone_number: "", image: "" }
    );

    return (
        <React.Fragment>
            <CssBaseline />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h4" align="center">
                        Sign Up
                    </Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {
                            steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))
                        }
                    </Stepper>
                    <React.Fragment>
                        {
                            activeStep === steps.length
                                ? (
                                    <React.Fragment>
                                        <Typography variant="h5" gutterBottom="gutterBottom">
                                            Thank you for signing up.
                                        </Typography>
                                        <Link to="/login">

                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={handleNext}
                                                className={classes.button}>
                                                Sign In
                                            </Button>
                                        </Link>
                                    </React.Fragment>
                                )
                                : (
                                    <React.Fragment>
                                        {getStepContent(activeStep, accountDataInfo, setAccountDataInfo, organizationDataInfo, setOrganizationDataInfo, representativeDataInfo, setRepresentativeDataInfo)}
                                        <div className={classes.buttons}>
                                            {
                                                activeStep !== 0 && (
                                                    <Button onClick={handleBack} className={classes.button}>
                                                        Back
                                                    </Button>
                                                )
                                            }
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={handleNext}
                                                className={classes.button}>
                                                {
                                                    activeStep === steps.length - 1
                                                        ? 'Confirm'
                                                        : 'Next'
                                                }
                                            </Button>
                                        </div>
                                    </React.Fragment>
                                )
                        }
                    </React.Fragment>
                </Paper>
            </main>
        </React.Fragment>
    );
}