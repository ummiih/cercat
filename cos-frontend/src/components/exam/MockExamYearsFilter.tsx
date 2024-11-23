import React from 'react';

interface Props {
  yearList: number[] | undefined;
  setIsClickedYearSelector: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedYear: React.Dispatch<React.SetStateAction<number | null>>;
}
const MockExamYearsFilter = (props: Props) => {
  const { yearList, setIsClickedYearSelector, setSelectedYear } = props;
  return (
    <div className={'absolute top-[45%] w-[90%] border-[1px] border-gray2 bg-white rounded-[16px] py-2'}>
      {!yearList || yearList.length === 0 ? (
        <div>error</div>
      ) : (
        yearList.map((year: number, index: number) => {
          return (
            <div
              key={index}
              className="text-h4 text-gray3 py-3 px-4 hover:text-black transition"
              onClick={() => {
                setIsClickedYearSelector(false);
                setSelectedYear(year);
              }}>
              {year}년도 기출 모의고사
            </div>
          );
        })
      )}
    </div>
  );
};
export default MockExamYearsFilter;
