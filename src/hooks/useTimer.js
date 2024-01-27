import { useCallback, useEffect, useMemo, useState } from 'react';

const useTimer = ({ initialSeconds, active }) => {
    const [seconds, setSeconds] = useState(initialSeconds);

    const reset = useCallback(() => {
        setSeconds(initialSeconds);
    }, [initialSeconds]);

    useEffect(() => {
        const timeId = setInterval(() => {
            setSeconds((prev) => {
                if (active) {
                    return prev > 0 ? prev - 1 : prev;
                } else {
                    if (prev === 0) {
                        return 0;
                    }
                    return prev < initialSeconds ? prev + 1 : prev;
                }
            });
        }, 1000);

        return () => clearInterval(timeId);
    }, [active, initialSeconds]);

    return useMemo(() => [seconds, reset], [seconds, reset]);
};

export default useTimer;
