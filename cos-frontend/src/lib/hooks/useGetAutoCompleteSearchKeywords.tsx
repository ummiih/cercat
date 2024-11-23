import useSWR from 'swr';

import { swrGetFetcher } from '@/lib/axios';
import { AutoCompleteSearchKeywordsResponseType } from '@/types/search/type';

const useGetAutoCompleteSearchKeywords = (certificateId: number, keyword: string | null) => {
  const { data, error } = useSWR<AutoCompleteSearchKeywordsResponseType>(
    `/api/v2/certificates/${certificateId}/auto-complete-keywords?searchText=${keyword}`, // URL에 직접 keyword 파라미터를 추가
    swrGetFetcher,
  );

  const parseResultList = data?.result.map((item) => item).flat();

  return {
    autoCompleteKeywords: parseResultList,
    isLoading: !error && !data,
    isError: error,
  };
};
export default useGetAutoCompleteSearchKeywords;
