import useSWR from 'swr';

import { swrGetFetcher } from '@/lib/axios';
import { LikeStatusResponseType } from '@/types/community/type';

const useGetLikeStatus = (likeTargetType: string, targetId: string[] | string) => {
  const { data, error, mutate } = useSWR<LikeStatusResponseType>(
    `/api/v2/likes/status?likeTargetType=${likeTargetType}&targetId=${targetId}`,
    swrGetFetcher,
  );

  return {
    likeStatus: data?.result,
    isLoading: !error && !data,
    isError: error,
    likeStatusMutate: mutate,
  };
};
export default useGetLikeStatus;
