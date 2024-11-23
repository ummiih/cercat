import useSWR from 'swr';

import { swrGetFetcher } from '@/lib/axios';
import { ExamStaticsDataResponseType } from '@/types/home/type';

const useGetMockExamStatistics = (
  certificateId: number,
  reportType: string,
  year: string | number,
  month: number,
  weekOfMonth: number,
) => {
  const { data, error } = useSWR<ExamStaticsDataResponseType>(
    `/api/v2/certificates/${certificateId}/mock-exam-result/${reportType}/statistics?year=${year}&month=${month}&weekOfMonth=${weekOfMonth}`,
    swrGetFetcher,
  );

  return {
    statisticsData: data?.result,
    isLoading: !error && !data,
    isError: error,
  };
};
export default useGetMockExamStatistics;
