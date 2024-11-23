import useSWRInfinite from 'swr/infinite';

import { swrGetFetcher } from '@/lib/axios';
import { ReviewIncorrectAnswers } from '@/types/global';

const getKey = (pageIndex: number, previousPageData: ReviewIncorrectAnswers) => {
  // 초기 요청
  if (pageIndex === 0) {
    return `/api/v2/certificates/1/user-answers/wrong-answers?page=${pageIndex}&size=10&sortFields=subjectResultEntity.mockExamResultEntity.createdAt, questionEntity.questionSeq&sortDirections=DESC`;
  }

  // 이전 페이지 데이터가 없으면 종료
  if (!previousPageData) return null;

  // 이전 페이지에 더 많은 데이터가 있으면 다음 페이지 요청
  if (previousPageData.result.hasNext) {
    return `/api/v2/certificates/1/user-answers/wrong-answers?page=${pageIndex}&size=10&sortFields=subjectResultEntity.mockExamResultEntity.createdAt, questionEntity.questionSeq&sortDirections=DESC`;
  }

  // 이전 페이지에 더 이상 데이터가 없으면 null 반환
  return null;
};
const useAllIncorrectQuestions = () => {
  const { data, isLoading, error, size, setSize, mutate } = useSWRInfinite<ReviewIncorrectAnswers>(
    getKey,
    swrGetFetcher,
    {
      revalidateAll: true,
    },
  );

  const parseResultList = data ? data.map((item) => item).flat() : null;

  return {
    incorrectQuestions: parseResultList ? parseResultList : [],
    isLoading: !error && !data,
    isError: error,
    size,
    setSize,
    mutate,
  };
};
export default useAllIncorrectQuestions;
