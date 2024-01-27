import React, { useEffect, useState } from 'react';
import Lottie from 'react-lottie';
import * as FireLottie from '../../assets/lotties/cute-fire-lottie.json';

function Fire({ active }) {
    const [isPaused, setIsPaused] = useState(true);

    const options = {
        loop: true,
        autoplay: false,
        animationData: FireLottie,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    };

    useEffect(() => {
        setIsPaused(!active);
    }, [active]);

    return (
        <Lottie
            options={options}
            height={100}
            width={100}
            isPaused={isPaused}
        />
    );
}

export default Fire;
