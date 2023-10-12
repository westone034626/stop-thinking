function Button({ children, onClick, disabled, style }) {
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
            onClick={onClick}
            style={buttonStyle}
            disabled={disabled}
        >
            {children}
        </button>
    );
}

export default Button;
