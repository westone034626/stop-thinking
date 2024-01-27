import { useContext, useEffect, useState } from 'react';
import FingerPrint from './assets/icons/fingerprint.webp';
import Reset from './assets/icons/reset.webp';
import DReset from './assets/icons/reset-dark_mode.webp';
import DFingerPrint from './assets/icons/fingerprint-dark_mode.webp';
import { ButtonWithReaction, Spacer } from './components';
import { INITIAL_REMAINING_SECONDS } from './constant';
import { displayTime } from './utils';
import useTodayCount from './hooks/useTodayCount';
import useTimer from './hooks/useTimer';
import { ThemeContext } from './components/ThemeProvider';
import Fire from './components/Fire';
import Confetti from './components/Confetti';

const useStyles = () => {
    const { theme } = useContext(ThemeContext);

    return {
        container: {
            alignItems: 'center',
            margin: 'auto 0px',
            ...theme,
        },
        timer: {
            fontSize: 60,
            ...theme,
        },
        fingerPrintContainer: { padding: 20, margin: -20, ...theme },
        fingerPrint: {},
        resetContainer: { padding: 20, margin: -20, ...theme },
    };
};

export default function Main() {
    const { increaseTodayCount } = useTodayCount();
    const styles = useStyles();
    const { isDarkMode } = useContext(ThemeContext);

    const [isFingerPrintActive, setIsFingerPrintActive] = useState(false);

    const [remainingSeconds, reset] = useTimer({
        initialSeconds: INITIAL_REMAINING_SECONDS,
        active: isFingerPrintActive,
    });
    const isFinished = remainingSeconds <= 0;

    useEffect(() => {
        if (isFinished) {
            increaseTodayCount();

            setIsFingerPrintActive(false);
        }
    }, [isFinished, setIsFingerPrintActive, increaseTodayCount]);

    const resetIcon = isDarkMode ? DReset : Reset;
    const fingerPrintIcon = isDarkMode ? DFingerPrint : FingerPrint;

    return (
        <div style={styles.container}>
            <Confetti active={isFinished} />

            <Fire active={isFingerPrintActive} />

            <p style={styles.timer}>{displayTime(remainingSeconds)}</p>

            <Spacer spacing={20} />

            <ButtonWithReaction
                disabled={INITIAL_REMAINING_SECONDS <= remainingSeconds}
                onTouchEnd={reset}
                onMouseUp={reset}
            >
                <div style={styles.resetContainer}>
                    <img
                        alt="리와인드 아이콘"
                        style={styles.reset}
                        src={resetIcon}
                        width={48}
                        height={48}
                    />
                </div>
            </ButtonWithReaction>

            <Spacer spacing={20} />

            <ButtonWithReaction
                disabled={isFinished}
                onTouchStart={() => setIsFingerPrintActive(true)}
                onTouchEnd={() => setIsFingerPrintActive(false)}
                onMouseDown={() => setIsFingerPrintActive(true)}
                onMouseUp={() => setIsFingerPrintActive(false)}
            >
                <div style={styles.fingerPrintContainer}>
                    <img
                        alt="지문 아이콘"
                        style={styles.fingerPrint}
                        src={fingerPrintIcon}
                        width={56}
                        height={56}
                        draggable="false"
                    />
                </div>
            </ButtonWithReaction>
        </div>
    );
}
