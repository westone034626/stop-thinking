import React from 'react';
import Lottie from 'react-lottie';
import * as ConfettiLottie from '../../assets/lotties/confetti.json';

function Confetti({ active }) {
    const options = {
        loop: false,
        autoplay: false,
        animationData: ConfettiLottie,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    };

    return (
        <Lottie
            isClickToPauseDisabled
            style={{ position: 'absolute', top: 0 }}
            speed={1}
            options={options}
            height="100%"
            width="100%"
            isPaused={!active}
            isStopped={!active}
        />
    );
}

export default Confetti;
