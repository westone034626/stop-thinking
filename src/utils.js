function attachLeadingZero(number) {
    return String(number).length >= 2 ? `${number}` : `0${number}`;
}

const convertSecondsToMinutesAndSeconds = (seconds) => {
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return { minutes, seconds: remainingSeconds };
};

export {
    attachLeadingZero,
    convertSecondsToMinutesAndSeconds,
};