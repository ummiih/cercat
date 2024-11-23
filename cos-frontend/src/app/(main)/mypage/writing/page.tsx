'use client';

import React, { SVGProps, useState } from 'react';

import Header from '@/components/common/Header';
import NavBar from '@/components/common/NavBar';
import EditPost from '@/components/community/EditPost';
import DeleteWarningModal from '@/components/mypage/DeleteWarningModal';
import MyPageCommentaryBoardList from '@/components/mypage/MyPageCommentaryBoardList';
import MyPageFilter from '@/components/mypage/MyPageFilter';
import MyPageNormalAndTipBoardList from '@/components/mypage/MyPageNormalAndTipBoardList';
import MyWritingMenu from '@/components/mypage/MyWritingMenu';
import useGetUserPosts from '@/lib/hooks/useGetUserPosts';
import { MyPageBoardType } from '@/types/mypage/type';
import { filterContent } from '@/utils/mypage/FilterContent';

export default function MyWriting() {
  // REVIEW, COMMENTARY, TIP, NORMAL
  const [boardType, setBoardType] = useState<MyPageBoardType>('COMMENTARY');
  // 최신순:createdAt, 작성순:popular
  const [selectedFilterContent, setSelectedFilterContent] = useState<'최신순' | '인기순'>('최신순');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isDeleteWarningModalOpen, setIsDeleteWarningModalOpen] = useState<boolean>(false);
  const [selectedPostId, setSelectedPostId] = useState<number>(0);
  //수정 modal
  const [isClickEditPost, setIsClickEditPost] = useState(false);
  const { userPostsList, mutate } = useGetUserPosts(boardType, selectedFilterContent == '최신순' ? 'DESC' : 'ASC');
  return (
    <>
      {isDeleteWarningModalOpen ? (
        <DeleteWarningModal
          postId={selectedPostId}
          setIsDeleteWarningModalOpen={setIsDeleteWarningModalOpen}
          isDeleteWarningModalOpen={isDeleteWarningModalOpen}
          boardType={boardType}
          mutate={mutate}
        />
      ) : null}
      {isClickEditPost ? (
        <EditPost
          postId={selectedPostId}
          setIsClickEditPost={setIsClickEditPost}
          mockExamId={userPostsList[0].result.content[0].question?.mockExam.mockExamId}
        />
      ) : (
        <>
          <Header headerType={'dynamic'} title={'내가 작성한 글'} rightElement={<EmptyIcon />} />
          {/* 게시판 종류 선택 메뉴 */}
          <MyWritingMenu
            boardType={boardType}
            setBoardType={setBoardType}
            setSelectedFilterContent={setSelectedFilterContent}
          />
          {/* 필터 */}
          <div className={'flex flex-col bg-gray0 min-h-screen px-5'}>
            <div
              onClick={() => {
                setIsFilterOpen(!isFilterOpen);
              }}
              className={'my-4 flex w-fit items-center px-3 rounded-full bg-white text-h6 py-1'}>
              {selectedFilterContent}
              {isFilterOpen ? <ActivationIcon /> : <InActivationIcon />}
            </div>
            {isFilterOpen ? (
              <MyPageFilter
                data={filterContent}
                setIsFilterOpen={setIsFilterOpen}
                isFilterOpen={isFilterOpen}
                setSelectedFilterContent={setSelectedFilterContent}
              />
            ) : null}
            {/* boardList */}
            <div className={'flex flex-col gap-y-4'}>
              {boardType === 'COMMENTARY' ? (
                <MyPageCommentaryBoardList
                  setDeletePostId={setSelectedPostId}
                  isDeleteWarningModalOpen={isDeleteWarningModalOpen}
                  setIsDeleteWarningModalOpen={setIsDeleteWarningModalOpen}
                  boardType={boardType}
                  selectedFilterContent={selectedFilterContent}
                  setIsClickEditPost={setIsClickEditPost}
                />
              ) : boardType === 'TIP' ? (
                <MyPageNormalAndTipBoardList
                  setDeletePostId={setSelectedPostId}
                  isDeleteWarningModalOpen={isDeleteWarningModalOpen}
                  setIsDeleteWarningModalOpen={setIsDeleteWarningModalOpen}
                  boardType={boardType}
                  selectedFilterContent={selectedFilterContent}
                  setIsClickEditPost={setIsClickEditPost}
                />
              ) : boardType === 'NORMAL' ? (
                <MyPageNormalAndTipBoardList
                  setDeletePostId={setSelectedPostId}
                  isDeleteWarningModalOpen={isDeleteWarningModalOpen}
                  setIsDeleteWarningModalOpen={setIsDeleteWarningModalOpen}
                  boardType={boardType}
                  selectedFilterContent={selectedFilterContent}
                  setIsClickEditPost={setIsClickEditPost}
                />
              ) : null}
            </div>
          </div>
          <div className={'h-[60px]'} />
          <NavBar />
        </>
      )}
    </>
  );
}
const InActivationIcon = (props: SVGProps<SVGSVGElement>) => (
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
