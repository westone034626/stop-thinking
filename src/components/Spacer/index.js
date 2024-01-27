function Spacer({ spacing }) {
    const calculatedPadding = spacing * 4;

    return <div style={{ padding: calculatedPadding / 2 }} />;
}

export default Spacer;
