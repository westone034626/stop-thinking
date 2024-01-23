import React, { useContext } from 'react';
import useLatestSevenDays from '../../hooks/useLatestSevenDays';
import Spacer from '../Spacer';
import { FONT_SIZE_MAP, FONT_WEIGHT_MAP } from '../../constant';
import { ThemeContext } from '../ThemeProvider';

const Day = ({ label, count, today }) => {
    const { theme } = useContext(ThemeContext);
    const styles = {
        container: {
            position: 'relative',
            alignItems: 'center',
            width: 24,
        },
        indicator: {
            position: 'absolute',
            top: -2,
            bottom: -2,
            left: -2,
            right: -2,
            borderRadius: 2,
            backgroundColor: theme.accent,
            opacity: 0.3,
        },
        label: {
            fontSize: FONT_SIZE_MAP.badge,
            fontWeight: FONT_WEIGHT_MAP.badge,
        },
        count: {
            fontSize: FONT_SIZE_MAP.badge,
            fontWeight: FONT_WEIGHT_MAP.badge,
        }
    };

    return (
        <div style={styles.container}>
            {today && <div style={styles.indicator}></div>}

            <span style={styles.label}>{label}</span>

            <Spacer spacing={1} />

            <span style={styles.count}>{count}</span>
        </div>
    );
};

const LatestSevenDays = () => {
    const latestSevenDays = useLatestSevenDays();
    const { theme } = useContext(ThemeContext);

    const styles = {
        container: {
            flexDirection: 'row',
            gap: 6,
            border: `1px solid ${theme.color}`,
            borderRadius: 4,
            padding: 4,
        }
    };

    return (
        <div style={styles.container}>
            {latestSevenDays.map((day) => (
                <Day
                    key={day.label}
                    {...day}
                />
            ))}
        </div>
    );
};

export default LatestSevenDays;