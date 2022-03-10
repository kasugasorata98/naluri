import { Button, Grid, Typography } from '@mui/material';
import React from 'react';

const LatestPi = ({ getMorePrecisePi, latestPi, style }) => {
    return (
        <Grid
            alignItems={'center'}
            sx={style.box}
            xs={12} item>
            <Typography
                align='center'
                sx={style.text}
                color={'black'}
                variant="h5"
                component="h5">
                {`The current value of PI is`}
            </Typography>
            <Typography
                align='center'
                sx={style.text}
                color={'black'}
                variant="h5"
                component="h5">
                {`${latestPi}`}
            </Typography>
            <Grid
                container
                justifyContent={'center'}
                item>
                <Button onClick={() => getMorePrecisePi()} variant="contained">Increase Precision</Button>
            </Grid>
        </Grid>
    );
};

export default LatestPi;