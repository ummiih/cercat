import { AxiosResponse } from 'axios';
import useSWR from 'swr';

import { swrGetFetcher } from '@/lib/axios';

const useGetAlarm = () => {
  const { data, error } = useSWR<AxiosResponse>('/api/v2/alarms/subscribe', swrGetFetcher);

  return {
    alarm: data ? data : null,
    isLoading: !error && !data,
    isError: error,
  };
};
export default useGetAlarm;
