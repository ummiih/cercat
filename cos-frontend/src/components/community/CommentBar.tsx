//공감수, 댓글 수, 추천버튼 라인
'use client';

import React from 'react';

import DdbongIcon from './DdabongIcon';

interface Props {
  empathy: number; //공감 수
  comment: number; //댓글 수
  onClick?: () => void; //추천 버튼 눌렀을 때 동작
  isLike: boolean | undefined; //사용자 게시글 좋아요 클릭 여부
}

const CommentBar = (props: Props) => {
  const { empathy, comment, onClick, isLike } = props;
  return (
    <div className="flex justify-between">
      <div className="flex gap-2 items-end">
        <div className="flex items-center">
          <DdbongIcon color="#3B3DFF" width="19" height="17"></DdbongIcon>
          <div className="text-primary text-h6 font-normal font-['Pretendard Variable'] leading-[21px]">{empathy}</div>
        </div>
        <div className="flex items-center">
          <div className="w-[24px] h-[24px] items-center flex justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="none" viewBox="0 0 19 19">
              <path
                fill="
              #FF6A3B"
                d="M1.996 13.7a12.42 12.42 0 0 1-.763-2.05A8.106 8.106 0 0 1 .946 9.5a8.47 8.47 0 0 1 .685-3.393 8.786 8.786 0 0 1 1.858-2.762 8.781 8.781 0 0 1 2.761-1.86A8.464 8.464 0 0 1 9.641.8a8.48 8.48 0 0 1 3.394.685 8.794 8.794 0 0 1 2.764 1.859 8.78 8.78 0 0 1 1.861 2.76 8.458 8.458 0 0 1 .686 3.392 8.477 8.477 0 0 1-.685 3.393 8.792 8.792 0 0 1-1.86 2.764 8.785 8.785 0 0 1-2.762 1.861 8.466 8.466 0 0 1-3.393.686c-.733 0-1.45-.096-2.15-.287-.7-.192-1.384-.446-2.05-.763L1.862 18.2a.683.683 0 0 1-.729-.186.683.683 0 0 1-.186-.73L1.996 13.7Zm-.4 3.85 3.2-.95c.266-.067.504-.1.712-.1.209 0 .438.067.688.2a7.444 7.444 0 0 0 1.675.6c.583.133 1.175.2 1.775.2 2.233 0 4.125-.775 5.675-2.325 1.55-1.55 2.325-3.442 2.325-5.675 0-2.233-.775-4.125-2.325-5.675C13.77 2.275 11.879 1.5 9.646 1.5c-2.234 0-4.125.775-5.675 2.325C2.42 5.375 1.646 7.267 1.646 9.5c0 .6.066 1.192.2 1.775a7.44 7.44 0 0 0 .6 1.675c.116.217.183.446.2.688a1.74 1.74 0 0 1-.1.712l-.95 3.2Z"
              />
            </svg>
          </div>
          <div className="text-point text-h6 font-normal font-['Pretendard Variable'] leading-[21px]">{comment}</div>
        </div>
      </div>
      {isLike ? (
        <div
          onClick={onClick}
          className="cursor-pointer w-[72px] h-9 px-2 py-1 bg-second rounded-lg justify-start items-center gap-1 inline-flex">
          <DdbongIcon color="#FFFFFF" width="23" height="20"></DdbongIcon>
          <div className="text-white text-h6 font-normal font-['Pretendard Variable'] leading-[21px]">추천</div>
        </div>
      ) : (
        <div
          onClick={onClick}
          className="cursor-pointer w-[72px] h-9 px-2 py-1 bg-gray0 rounded-lg justify-start items-center gap-1 inline-flex">
          <DdbongIcon color="#727375" width="23" height="20"></DdbongIcon>
          <div className="text-gray4 text-h6 font-normal font-['Pretendard Variable'] leading-[21px]">추천</div>
        </div>
      )}
    </div>
  );
};
export default CommentBar;
