import React, { useState } from 'react';
import Button from '../Button';

const DEFAULT_RADIUS = 52;

const ButtonWithReaction = ({ children, radius, ...otherProps }) => {
    const [isActive, setIsActive] = useState();

    const overlayRadius = radius ?? DEFAULT_RADIUS;

    const styles = {
        touchAreaOverLay: {
            position: 'absolute',
            width: overlayRadius * 2,
            height: overlayRadius * 2,
            backgroundColor: '#0F30E0',
            opacity: '0.3',
            borderRadius: '100%',
            pointerEvents: 'none',
        },
    };

    const handleTouchStart = (e) => {
        setIsActive(true);

        otherProps.onTouchStart && otherProps.onTouchStart(e);
    };

    const handleTouchEnd = (e) => {
        setIsActive(false);

        otherProps.onTouchEnd && otherProps.onTouchEnd(e);
    };

    const handleMouseDown = (e) => {
        setIsActive(true);

        otherProps.onMouseDown && otherProps.onMouseDown(e);
    };

    const handleMouseUp = (e) => {
        setIsActive(false);

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