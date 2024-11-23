'use client';

import React, { SVGProps, useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import Header from '@/components/common/Header';
import NavBar from '@/components/common/NavBar';
import MyPageFilter from '@/components/mypage/MyPageFilter';
import Post from '@/components/mypage/Post';
import useGetUserCommentPost from '@/lib/hooks/useGetUserCommentPost';
import { PostType } from '@/types/community/type';
import { MyPostsResponseType } from '@/types/mypage/type';
import { filterContent } from '@/utils/mypage/FilterContent';

export default function MyComment() {
  const [ref, inView] = useInView();
  const [selectedFilterContent, setSelectedFilterContent] = useState<'최신순' | '인기순'>('최신순');
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const { userCommentPostsList, setSize } = useGetUserCommentPost(selectedFilterContent === '최신순' ? 'DESC' : 'ASC');

  /**
   * 무한 스크롤 뷰 감지하고 size+1 해줌
   */
  const getMoreItem = useCallback(async () => {
    if (userCommentPostsList) {
      setSize((prev: number) => prev + 1);
    }
    return;
  }, [userCommentPostsList]);

  useEffect(() => {
    if (inView) {
      getMoreItem();
    }
  }, [inView, getMoreItem]);

  const commentaryTopElement = (year: number, round: number, number: number) => {
    return (
      <div className={'flex gap-x-[6px] pb-3'}>
        <div className={'px-2 py-[2px] text-gray4 bg-gray0 rounded-[8px]'}>{year}년도</div>
        <div className={'px-2 py-[2px] text-gray4 bg-gray0 rounded-[8px]'}>{round}회차</div>
        <div className={'px-2 py-[2px] text-gray4 bg-gray0 rounded-[8px]'}>{number}번</div>
      </div>
    );
  };

  return (
    <>
      <Header headerType={'dynamic'} title={'내가 작성한 댓글'} rightElement={<EmptyIcon />} />
      <div className={'py-6 bg-gray0 min-h-screen'}>
        <div className={'relative px-5 flex flex-col gap-y-4 '}>
          {/*필터*/}
          <div className={' w-fit flex px-3 py-1 rounded-full bg-white '}>
            <span className={'text-gray4 text-h6'}>{selectedFilterContent}</span>
            {isOpenFilter ? (
              <ActivationIcon onClick={() => setIsOpenFilter(!isOpenFilter)} />
            ) : (
              <DisableIcon onClick={() => setIsOpenFilter(!isOpenFilter)} />
            )}
          </div>
          {isOpenFilter ? (
            <MyPageFilter
              isFilterOpen={isOpenFilter}
              setSelectedFilterContent={setSelectedFilterContent}
              setIsFilterOpen={setIsOpenFilter}
              data={filterContent}
            />
          ) : null}
          <div className={'flex flex-col gap-y-4'}>
            {userCommentPostsList
              ? userCommentPostsList.map((userCommentPosts: MyPostsResponseType) => {
                  return userCommentPosts?.result.content.map((userCommentPost: PostType) => {
                    return (
                      <div key={userCommentPost.postId} ref={ref}>
                        <Post
                          postId={userCommentPost.postId}
                          content={userCommentPost.postContent.content}
                          title={userCommentPost.postContent.title}
                          commentCount={userCommentPost.postStatus.commentCount}
                          createdAt={
                            userCommentPost.dateTime.modifiedAt
                              ? userCommentPost.dateTime.modifiedAt
                              : userCommentPost.dateTime.createdAt
                          }
                          topElement={
                            userCommentPost.question
                              ? commentaryTopElement(
                                  userCommentPost.question.mockExam.examYear,
                                  userCommentPost.question.mockExam.round,
                                  userCommentPost.question.questionSeq,
                                )
                              : null
                          }
                          likeCount={userCommentPost.postStatus.likeCount}
                          imageUrl={
                            userCommentPost.postContent.images.length !== 0
                              ? userCommentPost.postContent.images[0].imageUrl
                              : null
                          }></Post>
                      </div>
                    );
                  });
                })
              : null}
          </div>
        </div>
      </div>
      <div className={'h-[60px]'} />
      <NavBar />
    </>
  );
}
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

const EmptyIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} fill="none" {...props}>
    <mask
      id="a"
      width={32}
      height={32}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: 'alpha',
      }}>
      <path fill="#D9D9D9" d="M0 0h32v32H0z" />
    </mask>
    <g mask="url(#a)">
      <path
        fill="#fff"
        d="m26.11 26.867-8.474-8.474a7 7 0 0 1-2.306 1.349 7.8 7.8 0 0 1-2.64.468q-3.19 0-5.402-2.206-2.211-2.207-2.211-5.384T7.283 7.23q2.207-2.21 5.383-2.21t5.397 2.207q2.22 2.208 2.22 5.385 0 1.378-.492 2.692a7.2 7.2 0 0 1-1.347 2.28l8.48 8.45zm-13.424-7.785q2.721 0 4.595-1.87 1.875-1.869 1.875-4.597 0-2.727-1.875-4.597t-4.595-1.87q-2.726 0-4.604 1.87-1.877 1.871-1.877 4.597 0 2.728 1.877 4.597t4.603 1.87"
      />
    </g>
  </svg>
);
