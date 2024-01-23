import { useLocalStorageState } from 'ahooks';
import { useEffect, useMemo } from 'react';
import dayjs from 'dayjs';

const useTodayCount = () => {
    const [numberOfCountByDate, setNumberOfCountByDate] = useLocalStorageState('@stop-thinking/number-of-count-by-date', {
        defaultValue: {}
    });

    const today = dayjs(Date.now()).format('YYYY-MM-DD');

    useEffect(() => {
        if (numberOfCountByDate[today]) {
            return;
        } else {
            setNumberOfCountByDate(prev => ({ ...prev, [today]: [] }));
        }
    }, [today, numberOfCountByDate]);

    const increaseTodayCount = () => {
        const copiedNumberOfCountByDate = { ...numberOfCountByDate };
        const copiedTodayCounts = [...copiedNumberOfCountByDate[today]];

        copiedTodayCounts.push(Date.now());

        copiedNumberOfCountByDate[today] = copiedTodayCounts;

        setNumberOfCountByDate(copiedNumberOfCountByDate);
    };

    const todayCountContext = useMemo(() => ({
        todayCount: numberOfCountByDate[today]?.length || 0,
        increaseTodayCount,
    }), [today, numberOfCountByDate]);

    return todayCountContext;
};

export default useTodayCount;