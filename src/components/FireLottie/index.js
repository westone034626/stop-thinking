import { useSpring, animated } from '@react-spring/web';
import React, { useEffect, useState } from 'react';
import ReactLottie from 'react-lottie';
import * as Lottie from '../../assets/lotties/cute-fire-lottie.json';

function FireLottie({ active }) {
    const [isPaused, setIsPaused] = useState(true);

    const options = {
        loop: true,
        autoplay: false,
        animationData: Lottie,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    };

    useEffect(() => {
        setIsPaused(!active);
    }, [active]);

    const props = useSpring({ opacity: active ? 1 : 0.1, transform: `scale(${active ? 1 : 0.9})` });

    return (
        <div style={{ alignItems: 'center', position: 'relative' }}>
            <animated.div style={props}>
                <ReactLottie
                    isClickToPauseDisabled
                    speed={0.7}
                    options={options}
                    height={100}
                    width={100}
                    isPaused={isPaused}
                />
            </animated.div>
        </div>
    );
}

export default FireLottie;
