import useSWR from 'swr';

import { swrGetFetcher } from '@/lib/axios';
import { AverageSubjectInfoResponseType, AverageSubjectInfoType } from '@/types/home/type';

const useAverageSubjectInfo = (certificateId: number) => {
  const { data, error } = useSWR<AverageSubjectInfoResponseType>(
    `/api/v2/certificates/${certificateId}/mock-exam-results/average`,
    swrGetFetcher,
  );

  const parseResultList = data?.result.map((item: AverageSubjectInfoType) => item).flat();

  return {
    averageSubjectList: parseResultList,
    isLoading: !error && !data,
    isError: error,
  };
};
export default useAverageSubjectInfo;
