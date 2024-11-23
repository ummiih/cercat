'use client';
import React from 'react';

import { MyPageBoardType } from '@/types/mypage/type';

interface Props {
  boardType: MyPageBoardType;
  setBoardType: React.Dispatch<React.SetStateAction<MyPageBoardType>>;
  setSelectedFilterContent: React.Dispatch<React.SetStateAction<'최신순' | '인기순'>>;
}

const MyWritingMenu = (props: Props) => {
  const { boardType, setBoardType, setSelectedFilterContent } = props;
  const changeBoardType = (type: MyPageBoardType) => {
    setBoardType(type);
  };

  return (
    <div className={'bg-white px-4 py-3 flex gap-x-2 w-full overflow-x-scroll'}>
      <button
        onClick={() => {
          changeBoardType('COMMENTARY');
          setSelectedFilterContent('최신순');
        }}
        className={boardType === 'COMMENTARY' ? 'tag-clicked' : 'tag-not-clicked'}>
        해설게시판
      </button>
      <button
        onClick={() => {
          changeBoardType('TIP');
          setSelectedFilterContent('최신순');
        }}
        className={boardType === 'TIP' ? 'tag-clicked' : 'tag-not-clicked'}>
        꿀팁게시판
      </button>
      <button
        onClick={() => {
          changeBoardType('NORMAL');
          setSelectedFilterContent('최신순');
        }}
        className={boardType === 'NORMAL' ? 'tag-clicked' : 'tag-not-clicked'}>
        자유게시판
      </button>
    </div>
  );
};
export default MyWritingMenu;
