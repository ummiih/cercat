import useSWR from 'swr';

import { swrGetFetcher } from '@/lib/axios';
import { InterestCertificateResponseType } from '@/types/global';

const useGetInterestCertificates = () => {
  const { data, error, mutate } = useSWR<InterestCertificateResponseType>(
    '/api/v2/interest-certificates',
    swrGetFetcher,
  );

  const parseResultList = data?.result.map((item) => item).flat();

  return {
    interestCertificates: parseResultList,
    isLoading: !error && !data,
    isError: error,
    interestCertificateDataMutate: mutate,
  };
};
export default useGetInterestCertificates;
