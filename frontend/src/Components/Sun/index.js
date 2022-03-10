import { Grid } from '@mui/material';
import React, { useEffect } from 'react';
import lottie from "lottie-web";
import sun from '../../Assets/Animations/sun.json';

const Sun = React.memo(() => {
    useEffect(() => {
        lottie.loadAnimation({
            container: document.querySelector("#sun"),
            animationData: sun,
            renderer: "canvas",
            loop: true,
            autoplay: true,
        });
    }, []);
    return (
        <Grid xs={12} item>
            <div
                id="sun"
                style={{
                    width: 500,
                    height: 500
                }}
            />
        </Grid>
    );
});

export default Sun;