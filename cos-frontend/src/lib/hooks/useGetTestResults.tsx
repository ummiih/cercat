import useSWR from 'swr';

import { swrGetFetcher } from '@/lib/axios';
import { MockExamResultsResponseType, MockExamResultType } from '@/types/exam/type';

const useGetTestResults = (mockExamId: number) => {
  const { data, error, mutate } = useSWR<MockExamResultsResponseType>(
    `/api/v2/mock-exams/${mockExamId}`,
    swrGetFetcher,
  );

  const parseResultList = data?.result.map((item: MockExamResultType) => item).flat();

  return {
    examResults: data ? parseResultList : null,
    isLoading: !error && !data,
    isError: error,
    examResultMutate: mutate,
  };
};
export default useGetTestResults;
