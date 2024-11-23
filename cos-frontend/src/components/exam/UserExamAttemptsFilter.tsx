import React from 'react';

import { MockExamResultType } from '@/types/exam/type';

interface Props {
  userExamAttempts: MockExamResultType[] | null;
  setUserExamAttempt: React.Dispatch<React.SetStateAction<number>>;
  isClickedActionIcon: boolean;
  setIsClickedActionIcon: React.Dispatch<React.SetStateAction<boolean>>;
}
const UserExamAttemptsFilter = (props: Props) => {
  const { userExamAttempts, setUserExamAttempt, isClickedActionIcon, setIsClickedActionIcon } = props;
  return (
    <div
      className={
        'absolute top-[27%] w-[90%] overflow-y-scroll max-h-[200px] border-[1px] border-gray2 bg-white rounded-[16px] py-2 z-10'
      }>
      {!userExamAttempts || userExamAttempts.length === 0 ? (
        <div>error</div>
      ) : (
        userExamAttempts.map((userExamAttempt: MockExamResultType, index: number) => {
          return (
            <div
              key={index}
              className="text-h4 text-gray3 py-3 px-4 hover:text-black transition"
              onClick={() => {
                setUserExamAttempt(index + 1);
                setIsClickedActionIcon(!isClickedActionIcon);
              }}>
              {index + 1}회차
            </div>
          );
        })
      )}
    </div>
  );
};
export default UserExamAttemptsFilter;
