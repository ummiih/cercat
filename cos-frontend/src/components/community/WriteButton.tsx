'use client';
import type { SVGProps } from 'react';
import * as React from 'react';

import { BoardType } from '@/types/community/type';

interface Props {
  setBoardTypeForPost: React.Dispatch<React.SetStateAction<BoardType>>;
  setIsClickedWriteButton: React.Dispatch<React.SetStateAction<boolean>>;
  boardType: BoardType;
}
const WriteButton = (props: Props) => {
  const { setBoardTypeForPost, boardType, setIsClickedWriteButton } = props;

  const updatePostTypeForBoard = () => {
    if (boardType === 'TIP') setBoardTypeForPost('TIP');
    else if (boardType === 'COMMENTARY') setBoardTypeForPost('COMMENTARY');
    else if (boardType === 'NORMAL') setBoardTypeForPost('NORMAL');
    else null;
  };

  return (
    <button
      className={
        'flex gap-x-1 fixed bottom-28 left-1/2 transform -translate-x-1/2 bg-gray1 border-[1px] border-gray2 w-fit rounded-full py-2 px-4'
      }
      onClick={() => {
        updatePostTypeForBoard();
        setIsClickedWriteButton(true);
      }}>
      <WriteIcon />
      <span className={'text-gray4 text-h6'}>글 쓰기</span>
    </button>
  );
};
export default WriteButton;

const WriteIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={19} height={19} fill="none" {...props}>
    <path
      fill="#3B3DFF"
      d="M2.646 16.5H4.07l9.775-9.775L12.42 5.3l-9.775 9.775zm-2 2v-4.25l13.2-13.175q.3-.275.662-.425t.763-.15.775.15.65.45l1.375 1.4q.3.275.437.65a2.17 2.17 0 0 1 0 1.512 1.9 1.9 0 0 1-.437.663L4.896 18.5zM13.12 6.025l-.7-.725 1.425 1.425z"
    />
  </svg>
);
