import useSWR from 'swr';

import { client, swrGetFetcher } from '@/lib/axios';
import { ExamInfo, ExamResult } from '@/types/global';

// 모의고사 연도와 회차 정보를 담은 데이터 (연도,회차)
export const useGetExamInfoData = () => {
  const { data, error } = useSWR<ExamInfo>('/api/v2/1/mock-exam-infos', swrGetFetcher);

  return {
    Data: data,
    isLoading: !error && !data,
    isError: error,
  };
};

// id와 연도를 매개변수로 나중에 받아야 할듯
// 연도 데이터, 그 연도에 해당하는 round와 응시 여부 받아온다
// (examid, round, istake)
export const useGetExamYearData = (examId?: Number, examYear?: Number) => {
  const { data, error } = useSWR<ExamResult>(`/${examId}/mock-exams?examYear=${examYear}`, swrGetFetcher);

  return {
    YearData: data,
    isLoading: !error && !data,
    isError: error,
  };
};
