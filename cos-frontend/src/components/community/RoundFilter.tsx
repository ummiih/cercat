import React from 'react';

import { MockExam, ReviewIncorrectMockExam } from '@/types/global';

interface Props {
  data: (string | MockExam)[];
  setSelectedFilterContent: React.Dispatch<React.SetStateAction<number | string>>;
  setIsOpenFilter: React.Dispatch<React.SetStateAction<boolean>>;
  isOpenFilter: boolean;
}

const RoundFilter = (props: Props) => {
  const { data, setSelectedFilterContent, setIsOpenFilter, isOpenFilter } = props;

  return (
    <div className={'absolute top-9 left-32 border-[1px] border-gray2 bg-white rounded-[16px] py-2 z-10'}>
      {!data || data.length === 0 ? (
        <div>error</div>
      ) : (
        data.map((datum: ReviewIncorrectMockExam | string, index: number) => {
          return (
            <div
              key={index}
              className="text-h4 text-gray3 py-3 px-4 hover:text-black transition"
              onClick={() => {
                if (typeof datum === 'string') {
                  setSelectedFilterContent('전체');
                } else {
                  setSelectedFilterContent(datum.round);
                }
                setIsOpenFilter(!isOpenFilter);
              }}>
              {typeof datum === 'string' ? '전체' : datum.round + '회차'}
            </div>
          );
        })
      )}
    </div>
  );
};
export default RoundFilter;
