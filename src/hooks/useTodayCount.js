import { useContext, useEffect, useMemo } from 'react';
import dayjs from 'dayjs';
import { NumberOfCountByDateContext } from '../components/NumberOfCountByDateProvider';

const useTodayCount = () => {
    const [numberOfCountByDate, setNumberOfCountByDate] = useContext(NumberOfCountByDateContext);

    const today = dayjs(Date.now()).format('YYYY-MM-DD');

    useEffect(() => {
        if (!numberOfCountByDate[today]) {
            setNumberOfCountByDate((prev) => ({ ...prev, [today]: [] }));
        }
    }, [today, numberOfCountByDate, setNumberOfCountByDate]);

    const increaseTodayCount = () => {
        const copiedNumberOfCountByDate = { ...numberOfCountByDate };
        const copiedTodayCounts = [...copiedNumberOfCountByDate[today]];

        copiedTodayCounts.push(Date.now());

        copiedNumberOfCountByDate[today] = copiedTodayCounts;

        setNumberOfCountByDate(copiedNumberOfCountByDate);
    };

    const todayCountContext = useMemo(
        () => ({
            todayCount: numberOfCountByDate[today]?.length || 0,
            increaseTodayCount,
        }),
        [today, numberOfCountByDate],
    );

    return todayCountContext;
};

export default useTodayCount;
