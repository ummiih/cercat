import useSWR from 'swr';

import { swrGetFetcher } from '@/lib/axios';
import { GoalSettingStatusResponseType } from '@/types/home/type';

const useGoalSettingStatus = (certificateId: number) => {
  const { data, error } = useSWR<GoalSettingStatusResponseType>(
    `/api/v2/certificates/${certificateId}/goal-status`,
    swrGetFetcher,
  );

  return {
    goalSettingStatus: data,
    isLoading: !error && !data,
    isError: error,
  };
};
export default useGoalSettingStatus;
