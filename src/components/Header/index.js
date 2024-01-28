import React, { useContext } from 'react';
import DarkModeIcon from '../../assets/icons/dark-mode.webp';
import LightModeIcon from '../../assets/icons/light-mode.webp';
import SoundIcon from '../../assets/icons/sound.webp';
import DSoundIcon from '../../assets/icons/sound-dark.webp';
import SoundOffIcon from '../../assets/icons/sound-off.png.webp';
import DSoundOffIcon from '../../assets/icons/sound-off-dark.webp';
import { MAX_MOBILE_WIDTH } from '../../constant';
import ButtonWithReaction from '../ButtonWithReaction';
import { ThemeContext } from '../ThemeProvider';
import LatestSevenDays from '../LatestSevenDays';
import { MutedContext } from '../MutedProvider';

function Header() {
    const { isDarkMode, toggleIsDarkMode, theme } = useContext(ThemeContext);
    const { muted, toggleMuted } = useContext(MutedContext);

    const styles = {
        container: { flex: 1, ...theme },
        innerContainer: {
            flex: 1,
            width: '100%',
            maxWidth: MAX_MOBILE_WIDTH,
            margin: '0px auto',
        },
        iconContainer: {
            display: 'flex',
            flexDirection: 'row',
            gap: 12,
        },
        modeChanger: {
            zIndex: 9999,
            width: '100%',
            position: 'absolute',
            top: 0,
            right: 0,
            padding: 24,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
        },
        icon: {},
    };

    const modeIcon = isDarkMode ? LightModeIcon : DarkModeIcon;

    const soundIcon = muted ? (isDarkMode ? DSoundIcon : SoundIcon) : isDarkMode ? DSoundOffIcon : SoundOffIcon;

    return (
        <div style={styles.modeChanger}>
            <LatestSevenDays />

            <div style={{ marginLeft: 'auto' }} />

            <div style={styles.iconContainer}>
                <ButtonWithReaction
                    onClick={toggleMuted}
                    radius={24}
                >
                    <img
                        alt="사운드 설정 아이콘"
                        style={styles.icon}
                        src={soundIcon}
                        width={24}
                        height={24}
                    />
                </ButtonWithReaction>

                <ButtonWithReaction
                    onClick={toggleIsDarkMode}
                    radius={24}
                >
                    <img
                        alt="다크모드 아이콘"
                        style={styles.icon}
                        src={modeIcon}
                        width={24}
                        height={24}
                    />
                </ButtonWithReaction>
            </div>
        </div>
    );
}

export default Header;
