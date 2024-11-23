import React from 'react';
import { SetterOrUpdater } from 'recoil';
import { twMerge } from 'tailwind-merge';

import { CreatePostDataType, EditPostDataType } from '@/types/community/type';
import { MockExam } from '@/types/global';

interface Props {
  mockExams: MockExam[] | null | undefined;
  className?: string;
  setIdState?: React.Dispatch<React.SetStateAction<number>>;
  setDataState: React.Dispatch<React.SetStateAction<CreatePostDataType>> | SetterOrUpdater<EditPostDataType>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const MockExamRoundFilter = (props: Props) => {
  const { mockExams, className, setIdState, setDataState, setIsOpen } = props;

  const changePostDataRound = (round: number) => {
    setDataState((prevState: any) => ({
      ...prevState,
      round: round,
    }));
  };

  return (
    <div className={twMerge('border-[1px] border-gray2 bg-white rounded-[16px] py-2 z-10', className)}>
      {!mockExams || mockExams.length === 0 ? (
        <div>error</div>
      ) : (
        mockExams.map((mockExam, index) => {
          return (
            <div
              key={index}
              className="text-h4 text-gray3 py-3 px-4 hover:text-black transition"
              onClick={() => {
                changePostDataRound(mockExam.round);
                setIsOpen(false);
              }}>
              {mockExam.round}회차
            </div>
          );
        })
      )}
    </div>
  );
};
export default MockExamRoundFilter;
