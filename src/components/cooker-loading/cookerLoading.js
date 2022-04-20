import React from 'react';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';

const CookerLoading = () => {

    return (
        <div>
            <Grid container alignItems="center" justifyContent="center">
                <CircularProgress disableShrink />
            </Grid>
        </div>
    )
} 

export default CookerLoading