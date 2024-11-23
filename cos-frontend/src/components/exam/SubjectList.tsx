'use client';
import React from 'react';
import { useRecoilValue } from 'recoil';

import SubjectCard from '@/components/exam/SubjectCard';
import useGetMockExams from '@/lib/hooks/useGetMockExams';
import { certificateIdAtom } from '@/recoil/atom';
import { ReviewIncorrectMockExam } from '@/types/global';

interface Props {
  selectedYear: number | null;
}
// 해당하는 연도의 회차별 데이터를 모두 출력
const SubjectSessionCard = (props: Props) => {
  const { selectedYear } = props;
  const certificateId = useRecoilValue(certificateIdAtom);
  const { mockExams } = useGetMockExams(certificateId, selectedYear);

  return (
    <div className={'mt-[16px] grid grid-cols-2 gap-x-4 gap-y-4'}>
      {mockExams?.map((mockExam: ReviewIncorrectMockExam, index: number) => {
        return (
          <div key={index}>
            <SubjectCard
              timeLimit={mockExam.timeLimit}
              total={300} //TODO: 총점
              round={mockExam.round}
              mockExamId={mockExam.mockExamId}></SubjectCard>
          </div>
        );
      })}
    </div>
  );
};

export default SubjectSessionCard;
