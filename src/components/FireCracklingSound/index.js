import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import Sound from '../../assets/sounds/fire-crackling-weak.mp3';

const styles = {
    container: { position: 'absolute', width: 1, height: 1, overflow: 'hidden' },
};

function FireCracklingSound({ active, muted = false }) {
    const [lazyActive, setLazyActive] = useState(active);

    useEffect(() => {
        setTimeout(() => {
            setLazyActive(active);
        }, 300);
    }, [active]);

    return (
        <div style={styles.container}>
            <ReactPlayer
                playing={lazyActive}
                muted={muted}
                url={Sound}
                loop
            />
        </div>
    );
}

export default FireCracklingSound;
