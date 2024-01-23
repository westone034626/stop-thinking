import React, { useContext, useState } from 'react';
import Button from '../Button';
import { ThemeContext } from '../ThemeProvider';

const DEFAULT_RADIUS = 52;

const ButtonWithReaction = ({ children, radius, ...otherProps }) => {
    const [isActive, setIsActive] = useState();
    const handleIsActive = (dataOrFunc) => {
        if (!otherProps.disabled) {
            setIsActive(dataOrFunc);
        }
    };
    const { theme } = useContext(ThemeContext);

    const overlayRadius = radius ?? DEFAULT_RADIUS;

    const styles = {
        touchAreaOverLay: {
            position: 'absolute',
            width: overlayRadius * 2,
            height: overlayRadius * 2,
            backgroundColor: theme.accent,
            opacity: '0.3',
            borderRadius: '100%',
            pointerEvents: 'none',
        },
    };

    const handleTouchStart = (e) => {
        handleIsActive(true);

        otherProps.onTouchStart && otherProps.onTouchStart(e);
    };

    const handleTouchEnd = (e) => {
        handleIsActive(false);

        otherProps.onTouchEnd && otherProps.onTouchEnd(e);
    };

    const handleMouseDown = (e) => {
        handleIsActive(true);

        otherProps.onMouseDown && otherProps.onMouseDown(e);
    };

    const handleMouseUp = (e) => {
        handleIsActive(false);

        otherProps.onMouseUp && otherProps.onMouseUp(e);
    };

    return (
        <div style={{ position: 'relative', justifyContent: 'center', alignItems: 'center', }}>
            <Button
                {...otherProps}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
            >
                {children}
            </Button>

            {isActive && <div style={styles.touchAreaOverLay}></div>}
        </div>
    );
};

export default ButtonWithReaction;