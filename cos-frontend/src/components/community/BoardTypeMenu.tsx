import React from 'react';

import { BoardType } from '@/types/community/type';

interface Props {
  boardType: BoardType;
  setBoardType: React.Dispatch<React.SetStateAction<BoardType>>;
}
const BoardTypeMenu = (props: Props) => {
  const { boardType, setBoardType } = props;
  const changeBoardType = (type: BoardType) => {
    setBoardType(type);
  };

  return (
    <div className={'bg-white px-4 py-3 flex gap-x-2 w-full overflow-x-scroll'}>
      <button
        onClick={() => {
          changeBoardType('REVIEW');
        }}
        className={boardType === 'REVIEW' ? 'tag-clicked' : 'tag-not-clicked'}>
        따끈후기
      </button>
      <button
        onClick={() => {
          changeBoardType('COMMENTARY');
        }}
        className={boardType === 'COMMENTARY' ? 'tag-clicked' : 'tag-not-clicked'}>
        해설게시판
      </button>
      <button
        onClick={() => {
          changeBoardType('TIP');
        }}
        className={boardType === 'TIP' ? 'tag-clicked' : 'tag-not-clicked'}>
        꿀팁게시판
      </button>
      <button
        onClick={() => {
          changeBoardType('NORMAL');
        }}
        className={boardType === 'NORMAL' ? 'tag-clicked' : 'tag-not-clicked'}>
        자유게시판
      </button>
    </div>
  );
};
export default BoardTypeMenu;
