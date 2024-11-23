import { SVGProps, useState } from 'react';
import React from 'react';

import UserExamAttemptsFilter from '@/components/exam/UserExamAttemptsFilter';
import { MockExamResultType } from '@/types/exam/type';

interface Props {
  userExamAttempts: MockExamResultType[] | null;
  userExamAttempt: number;
  setUserExamAttempt: React.Dispatch<React.SetStateAction<number>>;
}
const UserExamAttemptsFilterContent = (props: Props) => {
  const { userExamAttempts, userExamAttempt, setUserExamAttempt } = props;
  const [isClickedActionIcon, setIsClickedActionIcon] = useState<boolean>(false);
  return (
    <>
      <div className={'text-h3 font-semibold'}>모의고사 응시횟수 선택</div>
      <div
        onClick={() => setIsClickedActionIcon(!isClickedActionIcon)}
        className={'mt-2 my-5 py-3 px-4 bg-white flex justify-between rounded-[16px]'}>
        {userExamAttempt + 1}회{isClickedActionIcon ? <ActionIcon /> : <InactiveIcon />}
      </div>
      {isClickedActionIcon ? (
        <UserExamAttemptsFilter
          userExamAttempts={userExamAttempts}
          setUserExamAttempt={setUserExamAttempt}
          setIsClickedActionIcon={setIsClickedActionIcon}
          isClickedActionIcon={isClickedActionIcon}
        />
      ) : null}
    </>
  );
};

export default UserExamAttemptsFilterContent;

const InactiveIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={21} height={21} fill="none" {...props}>
    <path stroke="#000" strokeLinecap="round" d="m14.208 9-3.5 3-3.5-3" />
  </svg>
);
const ActionIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={21} height={21} fill="none" {...props}>
    <path stroke="#000" strokeLinecap="round" d="m7.208 12 3.5-3 3.5 3" />
  </svg>
);
