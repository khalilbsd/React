import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FileBase from 'react-file-base64';

export default function RepresentativeInfo({ data, setData }) {
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Representative Information
      </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <TextField
                        required
                        id="first_name"
                        name="first_name"
                        label="First Name"
                        fullWidth
                        autoComplete="first_name"
                        onChange={(e) => setData({
                            ...data,
                            first_name: e.target.value
                        })}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        required
                        id="last_name"
                        name="last_name"
                        label="Last Name"
                        fullWidth
                        autoComplete="last_name"
                        onChange={(e) => setData({
                            ...data,
                            last_name: e.target.value
                        })}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        required
                        id="job_position"
                        name="job_position"
                        label="Job Position"
                        fullWidth
                        autoComplete="job_position"
                        onChange={(e) => setData({
                            ...data,
                            job_position: e.target.value
                        })}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        required
                        id="phone_number"
                        name="phone_number"
                        label="Phone Number"
                        fullWidth
                        autoComplete="phone_number"
                        onChange={(e) => setData({
                            ...data,
                            phone_number: e.target.value
                        })}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <FileBase
                        type="File"
                        multiple={false}
                        onDone={({ base64 }) => setData({
                            ...data,
                            image: base64
                        })}
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}