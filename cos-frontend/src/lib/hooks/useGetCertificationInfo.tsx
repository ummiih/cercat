import useSWR from 'swr';

import { swrGetFetcher } from '@/lib/axios';
import { CertificateInfoResponseType } from '@/types/home/type';

const useGetCertificationInfo = () => {
  const { data, error } = useSWR<CertificateInfoResponseType>('/api/v2certificates/1/certificate-exams', swrGetFetcher);

  return {
    certificationInfo: data,
    isLoading: !error && !data,
    isError: error,
  };
};
export default useGetCertificationInfo;
