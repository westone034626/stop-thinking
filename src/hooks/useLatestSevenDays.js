import dayjs from 'dayjs';
import { useContext, useMemo } from 'react';
import { NumberOfCountByDateContext } from '../components/NumberOfCountByDateProvider';

const getLatestSevenDays = () => {
    return Array(7).fill(0).map((_, index) => dayjs().subtract(7 - (index + 1), 'day'));
};

const useLatestSevenDays = () => {
    const [numberOfCountByDate] = useContext(NumberOfCountByDateContext);

    return useMemo(() => {
        const latestSevenDays = getLatestSevenDays();

        return latestSevenDays.map((day, index) => {
            const date = day.format('YYYY-MM-DD');

            const count = numberOfCountByDate[date]?.length || 0;

            return ({ label: day.format('ddd'), count, today: index + 1 === 7 });
        });
    }, [numberOfCountByDate]);
};


export default useLatestSevenDays;