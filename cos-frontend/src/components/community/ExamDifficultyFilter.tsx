import React from 'react';

import { ExamDifficulty } from '@/types/community/type';
import { examDifficulty } from '@/utils/community/FilterContent';

export interface Props {
  setSelectedExamDifficultyContent: React.Dispatch<React.SetStateAction<string>>;
  setExamDifficulty: React.Dispatch<React.SetStateAction<ExamDifficulty | undefined>>;
  setIsExamDifficultyOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedExamDifficulty: string;
}
const ExamDifficultyFilter = (props: Props) => {
  const { setExamDifficulty, selectedExamDifficulty, setSelectedExamDifficultyContent, setIsExamDifficultyOpen } =
    props;

  const colorCircle = (difficulty: string) => {
    if (difficulty === '어려워요') {
      return <div className={'h-[6px] w-[6px] rounded-full bg-[#F85449]'} />;
    } else if (difficulty === '조금 어려워요') {
      return <div className={'h-[6px] w-[6px] rounded-full bg-[#F89249]'} />;
    } else if (difficulty === '보통이에요') {
      return <div className={'h-[6px] w-[6px] rounded-full bg-[#F8BC49]'} />;
    } else if (difficulty === '쉬워요') {
      return <div className={'h-[6px] w-[6px] rounded-full bg-[#4BEA3E]'} />;
    } else if (difficulty === '너무 쉬워요') {
      return <div className={'h-[6px] w-[6px] rounded-full bg-[#49D8F8]'} />;
    }
  };

  const handleDifficultyChange = (difficulty: string) => {
    let difficultyEnum: ExamDifficulty | undefined;
    switch (difficulty) {
      case '어려워요':
        difficultyEnum = 'TOO_DIFFICULT';
        break;
      case '조금 어려워요':
        difficultyEnum = 'LITTLE_DIFFICULT';
        break;
      case '보통이에요':
        difficultyEnum = 'NORMAL';
        break;
      case '쉬워요':
        difficultyEnum = 'EASY';
        break;
      case '너무 쉬워요':
        difficultyEnum = 'TOO_EASY';
        break;
      default:
        difficultyEnum = undefined;
    }
    setSelectedExamDifficultyContent(difficulty);
    setExamDifficulty(difficultyEnum); // 여기에서 바로 상태를 업데이트
    setIsExamDifficultyOpen(false);
  };

  return (
    <div
      className={
        'absolute left-0 top-[120%] border-[1px] border-gray2 bg-white rounded-[16px] py-2 z-10 h-[250px] overflow-y-scroll'
      }>
      {examDifficulty.map((difficulty, index) => {
        return (
          <div
            onClick={() => {
              handleDifficultyChange(difficulty);
            }}
            className="flex items-center gap-x-[6px] py-3 px-4 hover:text-black transition text-h4 text-gray3"
            key={index}>
            {difficulty}
            {colorCircle(difficulty)}
          </div>
        );
      })}
    </div>
  );
};
export default ExamDifficultyFilter;
