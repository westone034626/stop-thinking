import React, { useContext, useEffect, useState } from 'react';
import Button from '../Button';
import { ThemeContext } from '../ThemeProvider';

const DEFAULT_RADIUS = 52;

function ButtonWithReaction({
    children,
    radius,
    disabled,
    onTouchStart,
    onTouchEnd,
    onMouseUp,
    onMouseDown,
    ...otherProps
}) {
    const { theme } = useContext(ThemeContext);

    const [isActive, setIsActive] = useState();
    const handleIsActive = (dataOrFunc) => {
        if (!disabled) {
            setIsActive(dataOrFunc);
        } else {
            setIsActive(false);
        }
    };
    useEffect(() => {
        if (disabled) {
            setIsActive(false);
        }
    }, [disabled]);

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

    const wrapEventHandler = (eventHandler) => (e) => {
        if (typeof eventHandler === 'function' && !disabled) {
            eventHandler(e);
        }
    };

    const handleTouchStart = (e) => {
        handleIsActive(true);

        wrapEventHandler(onTouchStart)(e);
    };

    const handleTouchEnd = (e) => {
        handleIsActive(false);

        wrapEventHandler(onTouchEnd)(e);
    };

    const handleMouseDown = (e) => {
        handleIsActive(true);

        wrapEventHandler(onMouseDown)(e);
    };

    const handleMouseUp = (e) => {
        handleIsActive(false);

        wrapEventHandler(onMouseUp)(e);
    };

    return (
        <div style={{ position: 'relative', justifyContent: 'center', alignItems: 'center' }}>
            <Button
                {...otherProps}
                disabled={disabled}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
            >
                {children}
            </Button>

            {isActive && <div style={styles.touchAreaOverLay} />}
        </div>
    );
}

export default ButtonWithReaction;
