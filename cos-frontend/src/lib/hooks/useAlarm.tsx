import useSWR from 'swr';

import { swrGetFetcher } from '@/lib/axios';
import { AlarmResponseType } from '@/types/alarm/type';

const useAlarm = () => {
  //66: 자유, 61: 해설, 55: 꿀팁
  const { data, error } = useSWR<AlarmResponseType>('/api/v2/alarms', swrGetFetcher);
  return {
    alarms: data ? data.result : null,
    isLoading: !error && !data,
    isError: error,
  };
};
export default useAlarm;
