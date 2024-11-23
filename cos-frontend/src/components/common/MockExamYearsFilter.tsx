import React from 'react';

import { CreatePostDataType, EditPostDataType } from '@/types/community/type';

interface Props {
  years: number[] | undefined;
  setDataState:
    | React.Dispatch<React.SetStateAction<CreatePostDataType>>
    | React.Dispatch<React.SetStateAction<EditPostDataType>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const MockExamYearsFilter = (props: Props) => {
  const { years, setDataState, setIsOpen } = props;

  const changePostDataExamYear = (year: number) => {
    setDataState((prevState: any) => ({
      ...prevState,
      examYear: year,
    }));
  };

  const resetRoundOnYearChange = () => {
    setDataState((prevState: any) => ({
      ...prevState,
      round: 1,
    }));
  };

  return (
    <div
      className={
        'absolute z-10 w-full top-[100%] border-[1px] border-gray2 bg-white rounded-[16px] py-2 h-[210px] overflow-y-scroll'
      }>
      {!years || years.length === 0 ? (
        <div>error</div>
      ) : (
        years.map((year) => {
          return (
            <div
              key={year}
              className="text-h4 text-gray3 py-3 px-4 hover:text-black transition"
              onClick={() => {
                changePostDataExamYear(year);
                resetRoundOnYearChange();
                setIsOpen(false);
              }}>
              {year}
            </div>
          );
        })
      )}
    </div>
  );
};
export default MockExamYearsFilter;
