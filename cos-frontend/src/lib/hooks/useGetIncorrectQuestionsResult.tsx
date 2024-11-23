import useSWRInfinite from 'swr/infinite';

import { swrGetFetcher } from '@/lib/axios';
import { MockExamIncorrectQuestionsResultResponseType } from '@/types/exam/type';

const getKey = (
  size: number,
  previousPageData: MockExamIncorrectQuestionsResultResponseType | null,
  mockExamResultId: number,
) => {
  if (size === 0) {
    return `/api/v2/mock-exam-results/${mockExamResultId}/user-answers/wrong-answers?page=${size}&size=10&sortFields=subjectResultEntity.mockExamResultEntity.createdAt, questionEntity.questionSeq&sortDirections=DESC, ASC`;
  }
  if (previousPageData && !previousPageData.result.hasNext) {
    return `/api/v2/mock-exam-results/${mockExamResultId}/user-answers/wrong-answers?page=${size}&size=10&sortFields=subjectResultEntity.mockExamResultEntity.createdAt, questionEntity.questionSeq&sortDirections=DESC, ASC`;
  }
  if (previousPageData?.result.hasNext) {
    return null;
  }
};
const useGetIncorrectQuestionsResult = (mockExamResultId: number) => {
  const { data, isLoading, error, size, setSize } = useSWRInfinite<MockExamIncorrectQuestionsResultResponseType>(
    (pageIndex, previousPageData) => getKey(pageIndex, previousPageData, mockExamResultId),
    swrGetFetcher,
    {
      revalidateAll: true,
    },
  );

  const parseResultList = data ? data.map((item) => item).flat() : null;

  return {
    incorrectQuestionsResult: parseResultList ? parseResultList : [],
    isLoading: !error && !data,
    isError: error,
    size,
    setSize,
  };
};
export default useGetIncorrectQuestionsResult;
