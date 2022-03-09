import { Box, Grid, Typography, Button } from '@mui/material';
import React, { useEffect, useState, useCallback } from 'react';
import API from '../../Network';
import lottie from "lottie-web";
import sun from '../../Assets/Animations/sun.json';
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
        lottie.loadAnimation({
            container: document.querySelector("#sun"),
            animationData: sun,
            renderer: "canvas",
            loop: true,
            autoplay: true,
        });
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
                <Grid xs={12} item>
                    <div
                        id="sun"
                        style={{
                            width: 500,
                            height: 500
                        }}
                    />
                </Grid>
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
            </Grid>
        </Box >
    );
});

export default Home;