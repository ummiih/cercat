import useSWRInfinite from 'swr/infinite';

import { swrGetFetcher } from '@/lib/axios';
import { BoardType, ResponsePostType } from '@/types/community/type';

const getKey = (
  pageIndex: number,
  previousPageData: ResponsePostType | null,
  postType: BoardType,
  certificateId: number,
  sortField: string,
) => {
  // 초기 요청 또는 이전 페이지 데이터가 없을 때
  if (pageIndex === 0) {
    return sortField === 'createdAt'
      ? `/api/v2/certificates/${certificateId}/search?postType=${postType}&page=${pageIndex}&size=10`
      : `/api/v2/certificates/${certificateId}/search?postType=${postType}&page=${pageIndex}&size=10&sortFields=${sortField}`;
  }

  // 이전 페이지 데이터가 없으면 종료
  if (!previousPageData) return null;

  // 이전 페이지에 더 많은 데이터가 있으면 다음 페이지 요청
  if (previousPageData?.result.hasNext) {
    return sortField === 'createdAt'
      ? `/api/v2/certificates/${certificateId}/search?postType=${postType}&page=${pageIndex}&size=10`
      : `/api/v2/certificates/${certificateId}/search?postType=${postType}&page=${pageIndex}&size=10&sortFields=${sortField}`;
  }

  // 이전 페이지에 더 이상 데이터가 없으면 null 반환
  return null;
};
const useGetTotalSearchResults = (postType: BoardType, certificateId: number, sortField: string) => {
  const { data, isLoading, error, size, setSize, mutate } = useSWRInfinite<ResponsePostType>(
    (pageIndex, previousPageData) => getKey(pageIndex, previousPageData, postType, certificateId, sortField),
    swrGetFetcher,
    {
      revalidateAll: true,
    },
  );

  return {
    userPostsList: data ? data : [],
    isLoading: !error && !data,
    isError: error,
    size,
    setSize,
    mutate,
  };
};
export default useGetTotalSearchResults;
