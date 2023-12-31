import { useEffect, useState } from 'react';
import FingerPrint from './assets/icons/fingerprint.webp';
import Reset from './assets/icons/reset.webp';
import { Button, Spacer } from './components';
import { INITIAL_REMAINING_SECONDS, SHAPE_COLOR_MAP } from './constant';
import { attachLeadingZero, convertSecondsToMinutesAndSeconds } from './utils';

export default function Main() {
    const [remainingSeconds, setRemainingSeconds] = useState(INITIAL_REMAINING_SECONDS);

    const [isFingerPrintActive, setIsFingerPrintActive] = useState(false);
    const [isResetActive, setIsResetActive] = useState(false);

    useEffect(() => {
        const timeId = setInterval(() => {
            setRemainingSeconds(prev => {
                if (isFingerPrintActive) {
                    return prev > 0 ? prev - 1 : prev;
                } else {
                    if (prev === 0) {
                        return 0;
                    }
                    return prev < INITIAL_REMAINING_SECONDS ? prev + 1 : prev;
                }
            });
        }, 1000);

        return () => clearInterval(timeId);
    }, [isFingerPrintActive]);

    const displayTime = (seconds) => {
        const time = convertSecondsToMinutesAndSeconds(seconds);

        return `${attachLeadingZero(time.minutes)}:${attachLeadingZero(time.seconds)}`;
    };

    const styles = {
        container: { alignItems: 'center', margin: 'auto 0px', backgroundColor: SHAPE_COLOR_MAP.white },
        brain: {},
        timer: { fontSize: 60 },
        fingerPrintContainer: { backgroundColor: SHAPE_COLOR_MAP.white, padding: 20, margin: -20 },
        fingerPrint: {},
        touchAreaOverLay: {
            position: 'absolute',
            width: 105,
            height: 105,
            backgroundColor: '#0F30E0',
            opacity: '0.07',
            borderRadius: '100%',
            pointerEvents: 'none',
        },
        resetContainer: { backgroundColor: SHAPE_COLOR_MAP.white, padding: 20, margin: -20 },
        reset: {},
    };

    const resetRemainingSeconds = () => setRemainingSeconds(INITIAL_REMAINING_SECONDS);

    return (
        <div style={styles.container}>
            {/* <img style={styles.brain} src={Brain} width={82} height={82} />

            <Spacer spacing={18} /> */}

            <p style={styles.timer}>{displayTime(remainingSeconds)}</p>

            <Spacer spacing={20} />

            <div style={{ position: 'relative', justifyContent: 'center', alignItems: 'center', }}>
                <Button
                    style={styles.resetContainer}
                    onTouchStart={() => setIsResetActive(true)}
                    onTouchEnd={() => {
                        resetRemainingSeconds();
                        setIsResetActive(false);
                    }}
                    onMouseDown={() => setIsResetActive(true)}
                    onMouseUp={() => {
                        resetRemainingSeconds();
                        setIsResetActive(false);
                    }}
                >
                    <img style={styles.reset} src={Reset} width={48} height={48} />
                </Button>

                {isResetActive && <div style={styles.touchAreaOverLay}></div>}
            </div>

            <Spacer spacing={20} />

            <div style={{ position: 'relative', justifyContent: 'center', alignItems: 'center', }}>
                <Button
                    style={styles.fingerPrintContainer}
                    onTouchStart={() => setIsFingerPrintActive(true)}
                    onTouchEnd={() => setIsFingerPrintActive(false)}
                    onMouseDown={() => setIsFingerPrintActive(true)}
                    onMouseUp={() => setIsFingerPrintActive(false)}
                >
                    <img style={styles.fingerPrint} src={FingerPrint} width={56} height={56} draggable="false" />
                </Button>

                {isFingerPrintActive && <div style={styles.touchAreaOverLay}></div>}
            </div>
        </div>
    );
}