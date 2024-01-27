import React, { createContext, useCallback, useMemo, useState } from 'react';

export const NumberOfCountByDateContext = createContext();

const LOCAL_STORAGE_KEY = '@stop-thinking/number-of-count-by-date';

function NumberOfCountByDateProvider({ children }) {
    const [numberOfCountByDate, setNumberOfCountByDate] = useState(
        () => JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {},
    );

    const changeNumberOfCountByDate = useCallback(
        (dataOrFunc) => {
            if (typeof dataOrFunc === 'function') {
                localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(dataOrFunc(numberOfCountByDate)));
            } else {
                localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(dataOrFunc));
            }

            setNumberOfCountByDate(dataOrFunc);
        },
        [numberOfCountByDate],
    );

    const numberOfCountByDateContext = useMemo(
        () => [numberOfCountByDate, changeNumberOfCountByDate],
        [numberOfCountByDate, changeNumberOfCountByDate],
    );

    return (
        <NumberOfCountByDateContext.Provider value={numberOfCountByDateContext}>
            {children}
        </NumberOfCountByDateContext.Provider>
    );
}

export default NumberOfCountByDateProvider;
