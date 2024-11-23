'use client';

import { SVGProps } from 'react';
import * as React from 'react';

import MockExamYearsFilter from '@/components/exam/MockExamYearsFilter';

interface Props {
  examYears: number[] | undefined;
  isClickedYearSelector: boolean;
  setIsClickedYearSelector: React.Dispatch<React.SetStateAction<boolean>>;
  selectedYear: number | null;
  setSelectedYear: React.Dispatch<React.SetStateAction<number | null>>;
}
// 과목의 Year를 선택하는 모듈
const YearSelector = (props: Props) => {
  const { examYears, isClickedYearSelector, setSelectedYear, setIsClickedYearSelector, selectedYear } = props;

  return (
    <>
      <div
        onClick={() => {
          setIsClickedYearSelector(!isClickedYearSelector);
        }}
        className={'mt-2 flex justify-between items-center bg-gray0 rounded-[16px] py-3 px-4'}>
        {selectedYear ? <span>{selectedYear}년도 기출 모의고사</span> : <span>기출 모의고사</span>}
        {isClickedYearSelector ? <ActiveIcon /> : <DisableIcon />}
      </div>
      {isClickedYearSelector ? (
        <MockExamYearsFilter
          setIsClickedYearSelector={setIsClickedYearSelector}
          setSelectedYear={setSelectedYear}
          yearList={examYears}
        />
      ) : null}
    </>
  );
};

export default YearSelector;

const DisableIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" {...props}>
    <path stroke="#000" strokeLinecap="round" d="m13.5 8.5-3.5 3-3.5-3" />
  </svg>
);
const ActiveIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" {...props}>
    <path stroke="#000" strokeLinecap="round" d="m6.5 11.5 3.5-3 3.5 3" />
  </svg>
);
