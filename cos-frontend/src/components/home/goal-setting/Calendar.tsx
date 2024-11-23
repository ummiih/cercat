'use client';

import {
  addDays,
  addMonths,
  differenceInCalendarDays,
  endOfMonth,
  endOfWeek,
  format,
  getMonth,
  startOfMonth,
  startOfWeek,
  subMonths,
} from 'date-fns';
import dayjs from 'dayjs';
import React, { useCallback, useMemo, useState } from 'react';
import { useRecoilState } from 'recoil';
import { twMerge } from 'tailwind-merge';

import { goalSettingState } from '@/recoil/home/atom';

interface Props {
  usage: string;
  className?: string; // 캘린더 위치 변경
  // 시작 날짜(or 오늘 날짜) 이전 날짜는 눌리지 않도록 disabled 제어하는 함수
  setDateStatus: (date: Date, usage: string) => boolean | undefined;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>; // 캘린더를 키고 끌 수 있게 하는 state 함수
}

/**
 * 캘린더
 */
const Calendar = (props: Props) => {
  const { usage, className, setDateStatus, setIsModalOpen } = props;

  const now = dayjs();
  const [currentDate, setCurrentDate] = useState(new Date());
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  const weekMock = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const [goalData, setGoalData] = useRecoilState(goalSettingState);

  /**
   * 다음 달로 넘어가는 함수
   */
  const nextMonthHandler = useCallback(() => {
    setCurrentDate(addMonths(currentDate, 1));
  }, [currentDate]);

  /**
   * 이전 달로 넘어가는 함수
   */
  const prevMonthHandler = useCallback(() => {
    setCurrentDate(subMonths(currentDate, 1));
  }, [currentDate]);

  const createMonth = useMemo(() => {
    const monthArray = [];
    let day = startDate;
    while (differenceInCalendarDays(endDate, day) >= 0) {
      monthArray.push(day);
      day = addDays(day, 1);
    }
    return monthArray;
  }, [startDate, endDate]);

  return (
    <section className={twMerge('bg-white border-[1px] border-gray2 rounded-[16px] p-2 pt-3', className)}>
      <div className="flex flex-col items-center justify-center gap-y-3">
        <div>{usage === 'Start' ? 'Start Date' : 'Finish Date'}</div>
        <div className="flex justify-evenly w-full">
          <button onClick={prevMonthHandler}>
            <LeftIcon />
          </button>
          <div className="flex">
            <div className="text-h3 font-semibold">{format(currentDate, 'yyyy.')}</div>
            <div className="text-h3 font-semibold">{format(currentDate, 'MM')}</div>
          </div>
          <button onClick={nextMonthHandler}>
            <RightIcon />
          </button>
        </div>

        <div className="flex justify-between text-h6 text-gray3 w-full">
          {weekMock.map((date, i) => {
            return (
              <div key={`day${i}`} className="flex w-full justify-center items-center">
                {date}
              </div>
            );
          })}
        </div>
      </div>

      {/*날짜*/}
      <div className="grid grid-cols-7 justify-between items-center gap-y-5 my-3">
        {createMonth.map((date, i) => {
          const validation = getMonth(currentDate) === getMonth(date);
          const today = format(new Date(), 'yyyyMMdd') === format(date, 'yyyyMMdd');
          return (
            <button
              key={`date${i}`}
              disabled={setDateStatus(date, usage)}
              onClick={() => {
                const correctedDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000); // UTC 보정
                usage == 'Start'
                  ? setGoalData((prevGoalSettingData) => ({
                      ...prevGoalSettingData,
                      prepareStartDateTime: correctedDate.toISOString(),
                    }))
                  : setGoalData((prevGoalSettingData) => ({
                      ...prevGoalSettingData,
                      prepareFinishDateTime: correctedDate.toISOString(),
                    }));
                setIsModalOpen(false);
              }}
              //이번 달에 해당하지 않는 날짜 style
              className={
                validation
                  ? setDateStatus(date, usage)
                    ? 'flex justify-center items-center bg-white text-gray3'
                    : 'flex justify-center items-center bg-white hover:text-gray4'
                  : 'text-white'
              }>
              <div>
                {/*오늘 style*/}
                {today ? (
                  <span className="rounded-[8px] border border-blue py-2 px-3">{format(date, 'd')}</span>
                ) : (
                  <span>{format(date, 'd')}</span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default Calendar;

function RightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={20} height={20} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M8 5.5l4 4.5-4 4.5" stroke="#000" strokeLinecap="round" />
    </svg>
  );
}
function LeftIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={20} height={20} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M12 14.5L8 10l4-4.5" stroke="#000" strokeLinecap="round" />
    </svg>
  );
}
