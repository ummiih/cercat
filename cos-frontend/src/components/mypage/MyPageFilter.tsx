import React from 'react';
import { twMerge } from 'tailwind-merge';

interface Props {
  data: ('최신순' | '인기순')[]; //최신순, 작성순
  setSelectedFilterContent: React.Dispatch<React.SetStateAction<'최신순' | '인기순'>>;
  setIsFilterOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isFilterOpen: boolean;
  className?: string;
}

const MyPageFilter = (props: Props) => {
  const { data, setSelectedFilterContent, setIsFilterOpen, isFilterOpen, className } = props;

  return (
    <div
      className={twMerge('absolute top-[10%] border-[1px] border-gray2 bg-white rounded-[16px] py-2 z-10', className)}>
      {!data || data.length === 0 ? (
        <div>error</div>
      ) : (
        data?.map((datum: '최신순' | '인기순', index: number) => {
          return (
            <div
              key={index}
              className="text-h4 text-gray3 py-3 px-4 hover:text-black transition"
              onClick={() => {
                setSelectedFilterContent(datum);
                setIsFilterOpen(!isFilterOpen);
              }}>
              {datum}
            </div>
          );
        })
      )}
    </div>
  );
};
export default MyPageFilter;
