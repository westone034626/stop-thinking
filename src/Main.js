import { useContext, useEffect, useState } from 'react';
import FingerPrint from './assets/icons/fingerprint.webp';
import Reset from './assets/icons/reset.webp';
import DReset from './assets/icons/reset-dark_mode.webp';
import DFingerPrint from './assets/icons/fingerprint-dark_mode.webp';
import { ButtonWithReaction, Spacer } from './components';
import { INITIAL_REMAINING_SECONDS } from './constant';
import { attachLeadingZero, convertSecondsToMinutesAndSeconds } from './utils';
import { LayoutContext } from './App';

export default function Main() {
    const { isDarkMode, theme } = useContext(LayoutContext);

    const [remainingSeconds, setRemainingSeconds] = useState(INITIAL_REMAINING_SECONDS);

    const [isFingerPrintActive, setIsFingerPrintActive] = useState(false);

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
        container: {
            alignItems: 'center',
            margin: 'auto 0px',
            ...theme,
        },
        brain: {},
        timer: {
            fontSize: 60,
            ...theme,
        },
        fingerPrintContainer: { padding: 20, margin: -20, ...theme, },
        fingerPrint: {},
        touchAreaOverLay: {
            position: 'absolute',
            width: 105,
            height: 105,
            backgroundColor: '#0F30E0',
            opacity: '0.3',
            borderRadius: '100%',
            pointerEvents: 'none',
        },
        resetContainer: { padding: 20, margin: -20, ...theme },
        reset: {},
    };

    const resetRemainingSeconds = () => setRemainingSeconds(INITIAL_REMAINING_SECONDS);

    const resetIcon = isDarkMode ? DReset : Reset;
    const fingerPrintIcon = isDarkMode ? DFingerPrint : FingerPrint;

    return (
        <div style={styles.container}>
            {/* <img style={styles.brain} src={Brain} width={82} height={82} />

            <Spacer spacing={18} /> */}

            <p style={styles.timer}>{displayTime(remainingSeconds)}</p>

            <Spacer spacing={20} />

            <ButtonWithReaction
                onTouchEnd={resetRemainingSeconds}
                onMouseUp={resetRemainingSeconds}
            >
                <div style={styles.resetContainer}>
                    <img style={styles.reset} src={resetIcon} width={48} height={48} />
                </div>
            </ButtonWithReaction>

            <Spacer spacing={20} />

            <ButtonWithReaction
                onTouchStart={() => setIsFingerPrintActive(true)}
                onTouchEnd={() => setIsFingerPrintActive(false)}
                onMouseDown={() => setIsFingerPrintActive(true)}
                onMouseUp={() => setIsFingerPrintActive(false)}
            >
                <div style={styles.fingerPrintContainer}>
                    <img style={styles.fingerPrint} src={fingerPrintIcon} width={56} height={56} draggable="false" />
                </div>
            </ButtonWithReaction>
        </div>
    );
}