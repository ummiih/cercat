import React from 'react';

interface Props {
  data: (string | number)[] | undefined;
  setSelectedFilterContent: React.Dispatch<React.SetStateAction<number | string>>;
  setIsOpenFilter: React.Dispatch<React.SetStateAction<boolean>>;
  isOpenFilter: boolean;
}

const YearFilter = (props: Props) => {
  const { data, setSelectedFilterContent, setIsOpenFilter, isOpenFilter } = props;

  return (
    <div className={'absolute top-9 border-[1px] border-gray2 bg-white rounded-[16px] py-2 z-10'}>
      {!data || data.length === 0 ? (
        <div>error</div>
      ) : (
        data.map((datum, index: number) => {
          return (
            <div
              key={index}
              className="text-h4 text-gray3 py-3 px-4 hover:text-black transition"
              onClick={() => {
                setSelectedFilterContent(datum);
                setIsOpenFilter(!isOpenFilter);
              }}>
              {datum}
            </div>
          );
        })
      )}
    </div>
  );
};
export default YearFilter;
