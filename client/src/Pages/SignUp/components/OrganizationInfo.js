import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FileBase from 'react-file-base64';

export default function OrganizationInfo({ data, setData }) {

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Organization Information
      </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <TextField
                        required
                        id="name"
                        name="name"
                        label="Name"
                        fullWidth
                        autoComplete="name"
                        onChange={(e) => {
                            setData({
                                ...data,
                                name: e.target.value,
                            });
                            console.log(e.target.value);
                        }
                        }
                    />
                </Grid>


                <Grid item xs={12} md={6}>
                    <TextField
                        required
                        id="website"
                        name="website"
                        label="Website"
                        fullWidth
                        autoComplete="website"
                        onChange={(e) => {
                            setData({
                                ...data,
                                website: e.target.value
                            });
                            console.log(e.target.value);
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        required
                        id="address"
                        name="address"
                        label="Address"
                        fullWidth
                        autoComplete="address"
                        onChange={(e) => {
                            setData({
                                ...data,
                                address: e.target.value
                            });
                            console.log(e.target.value);
                        }
                        }
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
                        onChange={(e) => {
                            setData({
                                ...data,
                                phone_number: e.target.value
                            });
                            console.log(e.target.value);
                        }
                        }
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        required
                        multiline
                        id="description"
                        name="description"
                        label="Description"
                        fullWidth
                        autoComplete="description"
                        onChange={(e) => {
                            setData({
                                ...data,
                                description: e.target.value
                            });
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Select
                        required
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        onChange={(e) => {
                            setData({
                                ...data,
                                type: e.target.value
                            });
                        }
                        }
                    >
                        <MenuItem value={"Business"}>Business</MenuItem>
                        <MenuItem value={"Research Lab"}>Research Lab</MenuItem>
                    </Select>
                </Grid>
                <Grid item xs={12} md={6}>
                    <FileBase
                        type="File"
                        multiple={false}
                        onDone={({ base64 }) => {
                            setData({
                                ...data,
                                logo: base64
                            });
                        }
                        }
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}