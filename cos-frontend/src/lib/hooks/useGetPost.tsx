import useSWR from 'swr';

import { swrGetFetcher } from '@/lib/axios';
import { ResponsePostType } from '@/types/community/type';

const useGetPost = (postId: number | string | string[]) => {
  //66: 자유, 61: 해설, 55: 꿀팁
  const { data, error, mutate } = useSWR<ResponsePostType>(`/api/v2/posts/${postId}`, swrGetFetcher);
  return {
    postDetailData: data ? data.result : null,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};
export default useGetPost;
