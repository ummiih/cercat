'use client';
import React, { useEffect, useState } from 'react';

import Banner from '@/components/common/Banner';
import Header from '@/components/common/Header';
import NavBar from '@/components/common/NavBar';
import RandomMockExamModal from '@/components/exam/RandomMockExamModal';
import SubjectSessionCard from '@/components/exam/SubjectList';
import YearSelector from '@/components/exam/YearSelector';
import useGetMockExamYears from '@/lib/hooks/useGetMockExamYears';

const Exam = () => {
  return (
    <div>
      <Header />
      <SolveExamBox />
      <NavBar />
    </div>
  );
};

const SolveExamBox = () => {
  const { examYears } = useGetMockExamYears();
  const [isClickedYearSelector, setIsClickedYearSelector] = useState<boolean>(false);
  const [selectedYear, setSelectedYear] = useState<number | null>(examYears ? examYears[0] : null);
  const [isRandomMockExamModalOpen, setIsRandomMockExamModalOpen] = useState(false);
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    if (examYears && isFirstRender) {
      setSelectedYear(examYears[0]);
      setIsFirstRender(false);
    }
  }, [examYears]);

  return (
    <>
      {isRandomMockExamModalOpen ? (
        <RandomMockExamModal setIsRandomMockExamModalOpen={setIsRandomMockExamModalOpen} />
      ) : null}
      <Header headerType={'second'} />
      <div className="px-5 py-4">
        <div className="flex gap-x-4 justify-between">
          <Banner title="지금까지 틀린 문제만 모아봤어요." buttonText="틀린 문제 풀기" href="/exam/wrong" />
          <Banner
            title="실제 출제된 문제를 모아봤어요."
            buttonText="랜덤 모의고사"
            setIsRandomMockExamModalOpen={setIsRandomMockExamModalOpen}
          />
        </div>
        <div className="text-h3 mt-[24px] font-bold">모의고사 풀기</div>
        <YearSelector
          isClickedYearSelector={isClickedYearSelector}
          examYears={examYears}
          setSelectedYear={setSelectedYear}
          setIsClickedYearSelector={setIsClickedYearSelector}
          selectedYear={selectedYear}
        />
        <SubjectSessionCard selectedYear={selectedYear} />
      </div>
    </>
  );
};

export default Exam;
