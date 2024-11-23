import React from 'react';

import { preparePeriod } from '@/utils/community/FilterContent';

export interface Props {
  setIsPreparePeriodOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedPreparePeriodContent: React.Dispatch<React.SetStateAction<string | undefined>>;
  setStartMonths: React.Dispatch<React.SetStateAction<number | undefined>>;
  setEndPreMonths: React.Dispatch<React.SetStateAction<number | undefined>>;
}
const PreparePeriodFilter = (props: Props) => {
  const { setStartMonths, setEndPreMonths, setIsPreparePeriodOpen, setSelectedPreparePeriodContent } = props;

  const formatDate = (startMonth: number | undefined, endMonth: number | undefined) => {
    if (startMonth && startMonth < 12) {
      return `${startMonth} ~ ${endMonth} 개월`;
    } else if (startMonth === 12) {
      return '1년 이상';
    } else if (startMonth === 24) {
      return '2년 이상';
    } else if (startMonth === 36) {
      return '3년 이상';
    } else if (startMonth === undefined && endMonth === undefined) {
      return '전체';
    }
  };

  return (
    <div
      className={
        'absolute top-[120%] left-0 border-[1px] border-gray2 bg-white rounded-[16px] py-2 z-10 h-[250px] overflow-y-scroll'
      }>
      {preparePeriod.map((period, index) => {
        return (
          <div
            onClick={() => {
              setSelectedPreparePeriodContent(formatDate(period.startMonth, period.endMonth));
              setStartMonths(period.startMonth);
              setEndPreMonths(period.endMonth);
              setIsPreparePeriodOpen(false);
            }}
            className="text-h4 text-gray3 py-3 px-4 hover:text-black transition"
            key={index}>
            {formatDate(period.startMonth, period.endMonth)}
          </div>
        );
      })}
    </div>
  );
};
export default PreparePeriodFilter;
