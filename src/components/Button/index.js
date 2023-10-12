import { forwardRef } from 'react';

const Button = forwardRef(function Button({
    children,
    onClick,
    onTouchStart,
    onTouchEnd,
    onMouseDown,
    onMouseUp,
    disabled,
    style
}, ref) {
    const styles = {
        disabled: {
            cursor: 'not-allowed',
            opacity: 0.1,
        },
    };

    const buttonStyle = {
        ...style,
        ...(disabled ? styles.disabled : {}),
    };

    return (
        <button
            ref={ref}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onClick={onClick}
            style={buttonStyle}
            disabled={disabled}
        >
            {children}
        </button>
    );
});

export default Button;
