import React, { SVGProps, useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useRecoilValue } from 'recoil';

import MyPageFilter from '@/components/mypage/MyPageFilter';
import Post from '@/components/mypage/Post';
import useBest3TipPosts from '@/lib/hooks/useBest3TipPosts';
import useGetTotalSearchResults from '@/lib/hooks/useGetTotalSearchResults';
import { certificateIdAtom } from '@/recoil/atom';
import { BoardType, PostType, ResponsePostType } from '@/types/community/type';
import { filterNormalAndTipContent } from '@/utils/community/FilterContent';
interface Props {
  boardType: BoardType;
}
const NormalAndTipBoardList = (props: Props) => {
  const { boardType } = props;
  const [ref, inView] = useInView();
  const certificateId = useRecoilValue(certificateIdAtom);
  const [sortField, setSortField] = useState<string>('createdAt'); //최신순 인기순
  const { userPostsList, size, setSize } = useGetTotalSearchResults(boardType, certificateId, sortField);
  //필터값
  const [isOpenNormalAndTipFilter, setIsOpenNormalAndTipFilter] = useState<boolean>(false);
  const [selectedNormalAndTipFilterContent, setSelectedNormalAndTipFilterContent] = useState<'최신순' | '인기순'>(
    '최신순',
  );
  const { bestTipPosts } = useBest3TipPosts(certificateId);

  /**
   * 무한 스크롤 뷰 감지하고 size+1 해줌
   */
  const getMoreItem = useCallback(async () => {
    if (userPostsList) {
      await setSize((prev: number) => prev + 1);
    }
    return;
  }, [setSize]);

  useEffect(() => {
    if (inView) {
      getMoreItem();
    }
  }, [inView, getMoreItem]);

  /**
   * 일반, 꿀팁 게시판 필터
   */
  useEffect(() => {
    if (selectedNormalAndTipFilterContent == '최신순') {
      setSortField('createdAt');
    } else if (selectedNormalAndTipFilterContent == '인기순') {
      setSortField('likeCount');
    }
  }, [selectedNormalAndTipFilterContent]);

  /**
   * boardType 이 변경되면 필터값 초기화
   */
  useEffect(() => {
    setSelectedNormalAndTipFilterContent('최신순');
  }, [boardType]);

  /**
   * Best3 Post 태그
   */
  const tipTopElement = (normalTipPostId: number): JSX.Element | undefined => {
    if (bestTipPosts) {
      const bestTipPost = bestTipPosts.find((post: PostType) => post.postId === normalTipPostId);
      if (bestTipPost) {
        return (
          <div key={normalTipPostId} className={'pb-2'}>
            <div className={'px-3 py-[2px] text-white bg-primary rounded-full w-fit font-light'}>BEST</div>
          </div>
        );
      }
    }
    return undefined;
  };

  /**
   * 날짜 format 함수 2024.04.04
   */
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    // 년, 월, 일 추출
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1을 더함
    const day = String(date.getDate()).padStart(2, '0'); // 일자를 2자리로 맞춤

    // 원하는 형식으로 반환
    return `${year}.${month}.${day}`;
  };

  return (
    <div className={'relative px-5 flex flex-col gap-y-4'}>
      <div>
        <div className={'relative w-fit flex px-3 py-1 rounded-full bg-white '}>
          <span className={'text-gray4 text-h6'}>{selectedNormalAndTipFilterContent}</span>
          {isOpenNormalAndTipFilter ? (
            <ActivationIcon onClick={() => setIsOpenNormalAndTipFilter(!isOpenNormalAndTipFilter)} />
          ) : (
            <DisableIcon onClick={() => setIsOpenNormalAndTipFilter(!isOpenNormalAndTipFilter)} />
          )}
          {isOpenNormalAndTipFilter ? (
            <MyPageFilter
              className={boardType === 'TIP' ? 'top-[120%] left-0 w-full' : 'top-[120%] left-0 w-full'}
              isFilterOpen={isOpenNormalAndTipFilter}
              setSelectedFilterContent={setSelectedNormalAndTipFilterContent}
              setIsFilterOpen={setIsOpenNormalAndTipFilter}
              data={filterNormalAndTipContent}
            />
          ) : null}
        </div>
      </div>
      <div className={'flex flex-col gap-y-4'}>
        {userPostsList.map((userPosts, index) => {
          const postResponse = userPosts?.result?.postResponse; // 안전한 접근
          if (!postResponse) return null; // 데이터가 없는 경우 렌더링하지 않음

          return (
            <div ref={ref} key={postResponse.postId}>
              <Post
                postId={postResponse.postId}
                content={postResponse.postContent?.content || ''}
                title={postResponse.postContent?.title || ''}
                commentCount={postResponse.postStatus?.commentCount || 0}
                createdAt={formatDate(postResponse.dateTime?.createdAt || '')}
                imageUrl={postResponse.postContent?.images?.length ? postResponse.postContent.images[0].imageUrl : null}
                likeCount={postResponse.postStatus?.likeCount || 0}
                topElement={postResponse.recommendTags ? tipTopElement(postResponse.postId) : undefined}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default NormalAndTipBoardList;

const DisableIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={21} fill="none" {...props}>
    <path stroke="#727375" strokeLinecap="round" d="M13.5 9 10 12 6.5 9" />
  </svg>
);
const ActivationIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={21} fill="none" {...props}>
    <path stroke="#727375" strokeLinecap="round" d="M6.5 12 10 9l3.5 3" />
  </svg>
);
