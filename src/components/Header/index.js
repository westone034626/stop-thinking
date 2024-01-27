import React, { useContext } from 'react';
import DarkModeIcon from '../../assets/icons/dark-mode.webp';
import LightModeIcon from '../../assets/icons/light-mode.webp';
import { MAX_MOBILE_WIDTH } from '../../constant';
import ButtonWithReaction from '../ButtonWithReaction';
import { ThemeContext } from '../ThemeProvider';
import LatestSevenDays from '../LatestSevenDays';

function Header() {
    const { isDarkMode, toggleIsDarkMode, theme } = useContext(ThemeContext);

    const styles = {
        container: { flex: 1, ...theme },
        innerContainer: {
            flex: 1,
            width: '100%',
            maxWidth: MAX_MOBILE_WIDTH,
            margin: '0px auto',
        },
        modeChanger: {
            width: '100%',
            position: 'absolute',
            top: 0,
            right: 0,
            padding: 24,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
        },
        modeIcon: {},
    };

    const modeIcon = isDarkMode ? LightModeIcon : DarkModeIcon;

    return (
        <div style={styles.modeChanger}>
            <LatestSevenDays />

            <div style={{ marginLeft: 'auto' }} />

            <ButtonWithReaction
                onClick={toggleIsDarkMode}
                radius={24}
            >
                <img
                    alt="다크모드 아이콘"
                    style={styles.modeIcon}
                    src={modeIcon}
                    width={24}
                    height={24}
                />
            </ButtonWithReaction>
        </div>
    );
}

export default Header;
