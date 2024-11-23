import * as React from 'react';

import { DifficultyType } from '@/types/mypage/type';

interface Props {
  bottomElement?: () => React.JSX.Element;
  content: string;
  nickName: string;
  preparationPeriod: string;
  createdAt: string;
  difficulty: DifficultyType;
}
const ReviewPost = (props: Props) => {
  const { bottomElement, createdAt, content, nickName, preparationPeriod, difficulty } = props;

  const renderDifficultyTag = (difficultyType: DifficultyType) => {
    switch (difficultyType) {
      case '너무 쉬워요':
        return (
          <div className={'px-[10px] py-[2px] text-white bg-[#49D8F8] rounded-full text-h6'}>{difficultyType}</div>
        );
      case '쉬워요':
        return (
          <div className={'px-[10px] py-[2px] text-white bg-[#4BEA3E] rounded-full text-h6'}>{difficultyType}</div>
        );
      case '보통이에요':
        return (
          <div className={'px-[10px] py-[2px] text-white bg-[#F8BC49] rounded-full text-h6'}>{difficultyType}</div>
        );
      case '조금 어려워요':
        return (
          <div className={'px-[10px] py-[2px] text-white bg-[#F89249] rounded-full text-h6'}>{difficultyType}</div>
        );
      case '어려워요':
        return (
          <div className={'px-[10px] py-[2px] text-white bg-[#F85449] rounded-full text-h6'}>{difficultyType}</div>
        );
    }
  };

  return (
    <div className={'flex flex-col gap-y-1 bg-white p-5 rounded-[32px]'}>
      <div className={'flex flex-col gap-y-3'}>
        <div className={'flex gap-x-1 items-center'}>
          <div className={'text-h6 font-semibold text-gray4'}>{nickName}</div>
          <div className={'px-[10px] py-[2px] border-[1px] border-gray2 text-gray4 text-h6 rounded-full'}>
            {preparationPeriod}
          </div>
          {renderDifficultyTag(difficulty)}
        </div>
        <div className={'text-h4'}>{content}</div>
      </div>

      {/*작성일*/}
      <div className={'text-h6 text-gray3'}>작성일 {createdAt}</div>

      {/*수정, 삭제버튼*/}
      {!bottomElement || bottomElement() ? (bottomElement ? bottomElement() : null) : null}
    </div>
  );
};
export default ReviewPost;
