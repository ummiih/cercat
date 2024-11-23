'use client';
import React from 'react';
import { twMerge } from 'tailwind-merge';

import { WeeklyGoalPeriodType } from '@/types/home/type';

interface Props {
  className?: string;
  data: WeeklyGoalPeriodType[];
  setDataState: React.Dispatch<React.SetStateAction<WeeklyGoalPeriodType>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  reportType?: 'WEEKLY' | 'MONTHLY' | 'YEARLY';
}
const WeeklyGoalPeriodFilter = (props: Props) => {
  const { className, data, setDataState, reportType, setIsOpen } = props;

  /**
   * reportType 에 따라서 필터 내용을 다르게 하는 함수
   * @param weeklyGoalPeriod 몇주차인지
   */
  const adjustFilterContentsByReportType = (weeklyGoalPeriod: WeeklyGoalPeriodType) => {
    switch (reportType) {
      case 'WEEKLY':
        return weeklyGoalPeriod.formattedWeeklyPrepTime;
      case 'MONTHLY':
        return `${weeklyGoalPeriod.prepareMonth}월`;
      case 'YEARLY':
        return `${weeklyGoalPeriod.prepareYear}년`;
      default:
        return '에러';
    }
  };

  return (
    <div
      className={
        data.length >= 5
          ? twMerge(
              'border-[1px] border-gray2 bg-white rounded-[16px] py-2 z-10 h-[250px] overflow-y-scroll',
              className,
            )
          : twMerge('border-[1px] border-gray2 bg-white rounded-[16px] py-2 z-10 overflow-y-scroll', className)
      }>
      {!data || data.length === 0 ? (
        <div>error</div>
      ) : (
        data.map((datum: WeeklyGoalPeriodType, index) => {
          return (
            <div
              key={index}
              className="text-h4 text-gray3 py-3 px-4 hover:text-black transition"
              onClick={() => {
                setDataState((prevState: WeeklyGoalPeriodType) => ({
                  ...prevState,
                  prepareDate: datum.prepareDate,
                  prepareYear: datum.prepareYear,
                  prepareMonth: datum.prepareMonth,
                  prepareWeekly: datum.prepareWeekly,
                  formattedWeeklyPrepTime: datum.formattedWeeklyPrepTime,
                }));
                setIsOpen(false);
              }}>
              {adjustFilterContentsByReportType(datum)}
            </div>
          );
        })
      )}
    </div>
  );
};
export default WeeklyGoalPeriodFilter;
