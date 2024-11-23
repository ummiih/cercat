import useSWRInfinite from 'swr/infinite';

import { swrGetFetcher } from '@/lib/axios';
import { BoardType, SortDirections } from '@/types/community/type';
import { MyPageBoardType, MyPostsResponseType } from '@/types/mypage/type';

const getKey = (
  pageIndex: number,
  previousPageData: MyPostsResponseType | null,
  postType: BoardType,
  sortDirections: SortDirections,
) => {
  // 초기 요청
  if (pageIndex === 0) {
    return `/api/v2/${postType}/posts/my-posts?page=${pageIndex}&size=10&sortKey=createdAt, id&sortDirections=${sortDirections}`;
  }

  // 이전 페이지 데이터가 없으면 종료
  if (!previousPageData) return null;

  // 이전 페이지에 더 많은 데이터가 있으면 다음 페이지 요청
  if (previousPageData.result.hasNext) {
    return `/api/v2/${postType}/posts/my-posts?page=${pageIndex}&size=10&sortKey=createdAt, id&sortDirections=${sortDirections}`;
  }

  // 이전 페이지에 더 이상 데이터가 없으면 null 반환
  return null;
};
const useGetUserPosts = (postType: MyPageBoardType, sortDirections: SortDirections) => {
  const { data, isLoading, error, size, setSize, mutate } = useSWRInfinite<MyPostsResponseType>(
    (pageIndex, previousPageData) => getKey(pageIndex, previousPageData, postType, sortDirections),
    swrGetFetcher,
    {
      revalidateAll: true,
    },
  );

  return {
    userPostsList: data ? data : [],
    isLoading: !error && !data,
    isError: error,
    mutate,
    size,
    setSize,
  };
};
export default useGetUserPosts;
