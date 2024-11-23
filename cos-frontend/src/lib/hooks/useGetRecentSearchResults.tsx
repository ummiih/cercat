import useSWR from 'swr';

import { swrGetFetcher } from '@/lib/axios';
import { RecentSearchResponseType } from '@/types/search/type';

const useGetRecentSearchResults = () => {
  const { data, error, mutate } = useSWR<RecentSearchResponseType>(
    '/api/v2/users/search-logs', // URL에 직접 keyword 파라미터를 추가
    swrGetFetcher,
  );

  const parseResultList = data?.result.map((item) => item).flat();

  return {
    recentSearchResults: parseResultList,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};
export default useGetRecentSearchResults;
