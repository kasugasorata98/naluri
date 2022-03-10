import { Box, Grid } from '@mui/material';
import React, { useEffect, useState, useCallback } from 'react';
import API from '../../Network';
import CircumferenceOfSun from '../../Components/CircumferenceOfSun';
import Sun from '../../Components/Sun';
import LatestPi from '../../Components/LatestPi';
const Home = React.memo(() => {
    const [circumferenceOfTheSun, setCircumferenceOfTheSun] = useState(0);
    const [latestPi, setLatestPi] = useState(0);

    const getCircumferenceOfSun = useCallback(() => {
        API()
            .getCircumferenceOfSun()
            .then(res => {
                console.log(res);
                setCircumferenceOfTheSun(res.circumferenceOfTheSun);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const getLatestPiValue = useCallback(() => {
        API()
            .getLatestPiValue()
            .then(res => {
                console.log(res);
                setLatestPi(res.latestPi);
                getCircumferenceOfSun();
            })
            .catch(err => {
                console.log(err);
            });
    }, [getCircumferenceOfSun]);

    const getMorePrecisePi = useCallback(() => {
        API()
            .getMorePrecisePi()
            .then(res => {
                console.log(res);
                setLatestPi(res.latestPi);
                getCircumferenceOfSun();
            })
            .catch(err => {
                console.log(err);
            });
    }, [getCircumferenceOfSun]);

    useEffect(() => {
        getLatestPiValue();

    }, [getLatestPiValue]);

    const style = {
        container: {
            padding: 1
        },
        box: {
            boxShadow: 10,
            borderRadius: 10,
            p: 1,
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5))'
        },
        text: {
            p: 1,
            maxWidth: '100vh',
            wordWrap: 'break-word'
        }
    };

    return (
        <Box
            sx={style.container}>
            <Grid
                container
                direction="column"
                justifyContent="space-between"
                alignItems="center">
                <CircumferenceOfSun style={style} circumferenceOfTheSun={circumferenceOfTheSun} />
                <Sun />
                <LatestPi latestPi={latestPi} getMorePrecisePi={getMorePrecisePi} style={style} />
            </Grid>
        </Box >
    );
});

export default Home;