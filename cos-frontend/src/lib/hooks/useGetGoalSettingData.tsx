import { AxiosResponse } from 'axios';
import useSWR from 'swr';

import { swrGetFetcher } from '@/lib/axios';
import { GoalSettingDataDetailResponseType } from '@/types/home/type';

const useGetGoalSettingData = (goalId: number) => {
  const { data, error } = useSWR<GoalSettingDataDetailResponseType>(`/api/v2/goals/${goalId}`, swrGetFetcher);

  return {
    goalSettingData: data,
    isLoading: !error && !data,
    isError: error,
  };
};
export default useGetGoalSettingData;
