import { Grid, Typography } from '@mui/material';
import React from 'react';

const CircumferenceOfSun = React.memo(({ style, circumferenceOfTheSun }) => {
    return (
        <Grid
            sx={style.box}
            xs={12} item>
            <Typography
                align='center'
                sx={style.text}
                color={'black'}
                variant="h5"
                component="h5">
                {`The circumference of the sun is`}
            </Typography>
            <Typography
                align='center'
                sx={style.text}
                color={'black'}
                variant="h5"
                component="h5">
                {`${circumferenceOfTheSun} kilometers`}
            </Typography>
        </Grid>
    );
});

export default CircumferenceOfSun;