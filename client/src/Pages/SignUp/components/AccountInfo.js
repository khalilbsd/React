import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

export default function AccountInfo({ data, setData }) {
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Account Information
      </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="email"
                        name="email"
                        label="Email Address"
                        fullWidth
                        autoComplete="email"
                        onChange={(e) => {
                            setData({
                                ...data,
                                email: e.target.value
                            });
                            console.log(data)
                        }
                        }
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="password"
                        name="password"
                        label="Password"
                        fullWidth
                        autoComplete="password"
                        onChange={(e) => {
                            setData({
                                ...data,
                                password: e.target.value
                            });
                            console.log(data)
                        }
                        }
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}