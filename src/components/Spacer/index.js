function Spacer({ spacing }) {
    const calculatedPadding = spacing * 4;

    return <div style={{ padding: calculatedPadding / 2 }}></div>;
}

export default Spacer;
