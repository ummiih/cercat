//커뮤니티 댓글 내용부분(프로필과 댓글 내용을 분리해놓음, 댓글과 대댓글 컴포넌트는 따로 구현돼있음)
'use client';

import React from 'react';

import DdbongIcon from './DdabongIcon';

interface Props {
  reply: boolean; //답글달기 유무
  onClick?: () => void; //답글달기 클릭 시 내용 입력 창이 보이도록 설정
  ddabonhNumber: number; //공감 개수
  content: string; //댓글 내용
  DdabongClick?: () => void; //좋아요 버튼 클릭 시 동작
  isLike: boolean; //사용자의 좋아요 클릭 여부
}

const CommentContent = (props: Props) => {
  const { reply, onClick, ddabonhNumber, content, DdabongClick, isLike } = props;
  return (
    <div>
      <div className="pl-12 justify-between items-start gap-6 flex">
        <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
          <div className="self-stretch text-black text-h6 font-normal font-['Pretendard Variable'] leading-[21px]">
            {content}
          </div>
          {reply ? (
            <div
              onClick={onClick} //답글달기 클릭 시 내용 입력 창이 보이도록 설정
              className="cursor-pointer text-gray4 text-h6 font-medium font-['Pretendard Variable']">
              답글 달기
            </div>
          ) : null}
        </div>
        <div className="flex-col justify-center items-center inline-flex cursor-pointer">
          {isLike ? (
            <DdbongIcon width="19" height="17" color="#6283FD" onClick={DdabongClick}></DdbongIcon>
          ) : (
            <DdbongIcon width="19" height="17" color="#727375" onClick={DdabongClick}></DdbongIcon>
          )}
          <div className="text-gray4 text-h7 font-light font-['Inter']">{ddabonhNumber}</div>
        </div>
      </div>
    </div>
  );
};
export default CommentContent;
