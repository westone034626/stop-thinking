import { useSpring, animated } from '@react-spring/web';
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

    const props = useSpring({ opacity: active ? 1 : 0.1, transform: `scale(${active ? 1 : 0.9})` });

    return (
        <animated.div style={props}>
            <Lottie
                speed={0.7}
                options={options}
                height={100}
                width={100}
                isPaused={isPaused}
            />
        </animated.div>
    );
}

export default Fire;
