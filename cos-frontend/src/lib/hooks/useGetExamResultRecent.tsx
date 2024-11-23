import useSWR from 'swr';

import { swrGetFetcher } from '@/lib/axios';
import { RecentMockExamResultResponseType } from '@/types/exam/type';

const useGetExamResultRecent = (mockExamId: number) => {
  const { data, error } = useSWR<RecentMockExamResultResponseType>(
    `/api/v2/mock-exams/${mockExamId}/mock-exam-results/recent`,
    swrGetFetcher,
  );

  return {
    examResultRecent: data ? data.result : undefined,
    isLoading: !error && !data,
    isError: error,
  };
};
export default useGetExamResultRecent;
