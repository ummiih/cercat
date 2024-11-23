import { useState } from 'react';
import useSWR from 'swr';

import { swrGetFetcher } from '@/lib/axios';
import { TrendingKeywordsResponseType } from '@/types/search/type';

const useGetTrendingKeywords = (certificateId: number) => {
  const [lastFetchedTime, setLastFetchedTime] = useState<Date | null>(null);
  const { data, error } = useSWR<TrendingKeywordsResponseType>(
    `/api/v2/certificates/${certificateId}/trending-keywords`,
    swrGetFetcher,
    {
      refreshInterval: 1_800_000, // 1_800_000 30분을 밀리초로 변환
      onSuccess: () => {
        // 데이터가 성공적으로 불러와질 때마다 현재 시간 기록
        setLastFetchedTime(new Date());
      },
    },
  );

  const parseResultList = data?.result.map((item) => item).flat();

  return {
    trendingKeywords: parseResultList,
    lastFetchedTime,
    isLoading: !error && !data,
    isError: error,
  };
};
export default useGetTrendingKeywords;
