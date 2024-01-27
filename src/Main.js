import { useContext, useEffect, useState } from 'react';
import Lottie from 'react-lottie';
import FingerPrint from './assets/icons/fingerprint.webp';
import Reset from './assets/icons/reset.webp';
import DReset from './assets/icons/reset-dark_mode.webp';
import DFingerPrint from './assets/icons/fingerprint-dark_mode.webp';
import * as FireLottie from './assets/lotties/cute-fire-lottie.json';
import { ButtonWithReaction, Spacer } from './components';
import { INITIAL_REMAINING_SECONDS } from './constant';
import { attachLeadingZero, convertSecondsToMinutesAndSeconds } from './utils';
import useTodayCount from './hooks/useTodayCount';
import { ThemeContext } from './components/ThemeProvider';

export default function Main() {
    const { increaseTodayCount } = useTodayCount();
    const { isDarkMode, theme, reverseTheme } = useContext(ThemeContext);

    const [remainingSeconds, setRemainingSeconds] = useState(INITIAL_REMAINING_SECONDS);

    const [isFingerPrintActive, setIsFingerPrintActive] = useState(false);

    const [isLottiePaused, setIsLottiePaused] = useState(true);

    useEffect(() => {
        const timeId = setInterval(() => {
            setRemainingSeconds((prev) => {
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

    useEffect(() => {
        if (isFingerPrintActive) {
            setIsLottiePaused(false);
        } else {
            if (remainingSeconds > 0) {
                setIsLottiePaused(true);
            }
        }
    }, [isFingerPrintActive, remainingSeconds]);

    useEffect(() => {
        if (remainingSeconds === 0) {
            increaseTodayCount();
        }
    }, [remainingSeconds]);

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
        badgeAndTimerContainer: {
            position: 'relative',
        },
        badge: {
            position: 'absolute',
            top: -20,
            right: -16,
            padding: 4,
            borderRadius: 4,
            ...reverseTheme,
        },
        badgeLabel: {},
        timer: {
            fontSize: 60,
            ...theme,
        },
        fingerPrintContainer: { padding: 20, margin: -20, ...theme },
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

    const resetRemainingSeconds = () => {
        setRemainingSeconds(INITIAL_REMAINING_SECONDS);

        setIsLottiePaused(true);
    };

    const resetIcon = isDarkMode ? DReset : Reset;
    const fingerPrintIcon = isDarkMode ? DFingerPrint : FingerPrint;

    const lottieOptions = {
        loop: true,
        autoplay: false,
        animationData: FireLottie,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    };

    return (
        <div style={styles.container}>
            {/* <img style={styles.brain} src={Brain} width={82} height={82} />

            <Spacer spacing={18} /> */}

            <Lottie
                options={lottieOptions}
                height={100}
                width={100}
                isPaused={isLottiePaused}
            />

            {/* <div style={styles.badgeAndTimerContainer}>
                <div style={styles.badge}>
                    <span style={styles.badgeLabel}>{todayCount}</span>
                </div>

                <p style={styles.timer}>{displayTime(remainingSeconds)}</p>
            </div> */}

            <p style={styles.timer}>{displayTime(remainingSeconds)}</p>

            <Spacer spacing={20} />

            <ButtonWithReaction
                disabled={INITIAL_REMAINING_SECONDS <= remainingSeconds}
                onTouchEnd={resetRemainingSeconds}
                onMouseUp={resetRemainingSeconds}
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
