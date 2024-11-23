import useSWR from 'swr';

import { swrGetFetcher } from '@/lib/axios';
import { GoalAchievementResponseType } from '@/types/home/type';

const useGoalAchievement = (certificateId: number) => {
  const { data, error } = useSWR<GoalAchievementResponseType>(
    `/api/v2certificates/${certificateId}/goals/achievement`,
    swrGetFetcher,
  );

  return {
    goalAchievementData: data,
    isLoading: !error && !data,
    isError: error,
  };
};
export default useGoalAchievement;
