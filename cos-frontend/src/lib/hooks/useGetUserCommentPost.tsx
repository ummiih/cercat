import useSWRInfinite from 'swr/infinite';

import { swrGetFetcher } from '@/lib/axios';
import { SortDirections } from '@/types/community/type';
import { MyPostsResponseType } from '@/types/mypage/type';

const getKey = (pageIndex: number, previousPageData: MyPostsResponseType | null, sortDirections: SortDirections) => {
  // 초기 요청
  if (pageIndex === 0) {
    return `/api/v2/comment-posts/my-comment-posts?page=${pageIndex}&size=10&sortKey=createdAt, id&sortDirections=${sortDirections}`;
  }

  // 이전 페이지 데이터가 없으면 종료
  if (!previousPageData) return null;

  // 이전 페이지에 더 많은 데이터가 있으면 다음 페이지 요청
  if (previousPageData.result.hasNext) {
    return `/api/v2/comment-posts/my-comment-posts?page=${pageIndex}&size=10&sortFields=createdAt, id&sortDirections=${sortDirections}`;
  }

  // 이전 페이지에 더 이상 데이터가 없으면 null 반환
  return null;
};
const useGetUserCommentPost = (sortDirections: SortDirections) => {
  const { data, isLoading, error, size, setSize, mutate } = useSWRInfinite<MyPostsResponseType>(
    (pageIndex, previousPageData) => getKey(pageIndex, previousPageData, sortDirections),
    swrGetFetcher,
    {
      revalidateAll: true,
    },
  );

  const parseResultList = data ? data.map((item) => item).flat() : [];

  return {
    userCommentPostsList: data ? data : [],
    isLoading: !error && !data,
    isError: error,
    mutate,
    size,
    setSize,
  };
};
export default useGetUserCommentPost;
