import useSWR from 'swr';

import { swrGetFetcher } from '@/lib/axios';
import { Certificate, CertificatesResponseType } from '@/types/global';

const useGetAllCertificates = () => {
  const { data, error } = useSWR<CertificatesResponseType>('/api/v2/certificates', swrGetFetcher);

  const parseResultList = data?.result.map((item) => item).flat();

  return {
    certificationsList: parseResultList,
    isLoading: !error && !data,
    isError: error,
  };
};
export default useGetAllCertificates;
