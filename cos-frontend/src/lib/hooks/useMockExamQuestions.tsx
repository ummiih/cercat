import useSWR from 'swr';

import { swrGetFetcher } from '@/lib/axios';
import { QuestionsResponseType } from '@/types/global';

const useGetGoalSettingData = (mockExamId: number | undefined) => {
  const { data, error } = useSWR<QuestionsResponseType>(`/api/v2/mock-exams/${mockExamId}/questions`, swrGetFetcher);

  const parseResultList = data?.result.map((item) => item).flat();

  return {
    questions: parseResultList,
    isLoading: !error && !data,
    isError: error,
  };
};
export default useGetGoalSettingData;
