'use client';

import { format, subDays } from 'date-fns';
import dayjs from 'dayjs';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import Calendar from '@/components/home/goal-setting/Calendar';
import GoalSettingTitle from '@/components/home/goal-setting/GoalSettingTitle';
import { goalSettingState } from '@/recoil/home/atom';

const PreparationPeriodSetting = () => {
  const [isStartCalendarOpen, setIsStartCalendarOpen] = useState<boolean>(false);
  const [isFinishCalendarOpen, setIsFinishCalendarOpen] = useState<boolean>(false);
  //목표 시작 날짜와 종료 날짜, 준비 날짜
  const [goalData, setGoalData] = useRecoilState(goalSettingState);

  /**
   * 자격증 준비 기간을 계산해주는 함수
   */
  const calculatePreparingPeriod = () => {
    const startDate = dayjs(goalData.prepareStartDateTime, 'YYYY-MM-DD');
    const finishDate = dayjs(goalData.prepareFinishDateTime, 'YYYY-MM-DD');

    if (startDate.isAfter(finishDate)) {
      return (
        <div className="flex items-center gap-x-2">
          <ScheduleResultIcon />
          <div className="text-h6 text-point">시작일자가 종료일자를 넘어가면 안됩니다.</div>
        </div>
      );
    } else {
      return (
        <div className="flex items-center gap-x-2">
          <ScheduleResultIcon />
          <div className="flex items-center gap-x-2">
            <div className="font-bold">
              {/* 시작일 == 종료일 1, 시작일 != 종료일 +2 (시작일과 종료일을 포함해주기 위해서)*/}
              {finishDate.diff(startDate, 'd') == 0 ? 1 : finishDate.diff(startDate, 'd') + 1}일
            </div>
            <div className="text-h6">동안 자격증 준비</div>
          </div>
        </div>
      );
    }
  };

  useEffect(() => {
    // useEffect 내에서 상태 업데이트를 수행
    const startDate = dayjs(goalData.prepareStartDateTime, 'YYYY-MM-DD');
    const finishDate = dayjs(goalData.prepareFinishDateTime, 'YYYY-MM-DD');

    if (!startDate.isAfter(finishDate)) {
      setGoalData((prevGoalSettingData) => ({
        ...prevGoalSettingData,
        goalPrepareDays: finishDate.diff(startDate, 'd') == 0 ? 1 : finishDate.diff(startDate, 'd') + 1,
      }));
    }
  }, [goalData.prepareStartDateTime, goalData.prepareFinishDateTime]);

  /**
   * 시작 날짜(or 오늘 날짜) 이전 날짜는 눌리지 않도록 disabled 제어하는 함수
   * @param date 날짜
   * @param usage 캘린더가 사용된 용도 (Start, End)
   */
  const setDateStatus = (date: Date, usage: string) => {
    let day = dayjs();
    //StartDate 를 설정할 때 disabled 조작
    if (usage == 'Start') {
      return day.format(format(new Date(), 'yyyy.MM.dd')) > day.format(format(date, 'yyyy.MM.dd'));
    }
    //EndDate 를 설정할 때 disabled 조작
    if (usage == 'Finish') {
      return day.format(format(goalData.prepareStartDateTime, 'yyyy.MM.dd')) > day.format(format(date, 'yyyy.MM.dd'));
    }
  };

  return (
    <div className="flex flex-col gap-y-2">
      <GoalSettingTitle Icon={ScheduleIcon}>자격증 준비기간 설정</GoalSettingTitle>

      {/*시작일 설정*/}
      <div className="relative flex gap-x-2 justify-between">
        <div className="goal-setting-content">
          <div className="flex items-center gap-x-2">
            <ScheduleContentIcon />
            <div>
              <div className="text-h6 text-gray4">시작일</div>
              <div className="flex items-center gap-x-2">
                <div
                  onClick={() => {
                    setIsStartCalendarOpen(!isStartCalendarOpen);
                  }}
                  className="text-h4 font-semibold">
                  {format(goalData.prepareStartDateTime, 'yyyy.MM.dd')}
                </div>
                {isStartCalendarOpen ? <UpIcon /> : <DownIcon />}
              </div>
            </div>
          </div>
        </div>

        {/*종료일 설정*/}
        <div className="relative goal-setting-content">
          <div className="flex items-center gap-x-2">
            <ScheduleContentIcon />
            <div>
              <div className="text-h6 text-gray4">종료일</div>
              <div className="flex items-center gap-x-2">
                <div
                  onClick={() => {
                    setIsFinishCalendarOpen(!isFinishCalendarOpen);
                  }}
                  className="text-h4 font-semibold">
                  {format(goalData.prepareFinishDateTime, 'yyyy.MM.dd')}
                </div>
                {isFinishCalendarOpen ? <UpIcon /> : <DownIcon />}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*시작설정 캘린더*/}
      {isStartCalendarOpen ? (
        <Calendar usage="Start" setDateStatus={setDateStatus} setIsModalOpen={setIsStartCalendarOpen} />
      ) : null}
      {/*종료설정 캘린더*/}
      {isFinishCalendarOpen ? (
        <Calendar usage="Finish" setDateStatus={setDateStatus} setIsModalOpen={setIsFinishCalendarOpen} />
      ) : null}
      <div className="goal-setting-content">{calculatePreparingPeriod()}</div>
    </div>
  );
};
export default PreparationPeriodSetting;

function ScheduleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={24} height={25} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <mask
        id="prefix__a"
        style={{
          maskType: 'alpha',
        }}
        maskUnits="userSpaceOnUse"
        x={0}
        y={0}
        width={24}
        height={25}>
        <path fill="#D9D9D9" d="M0 .5h24v24H0z" />
      </mask>
      <g mask="url(#prefix__a)">
        <path
          d="M5.308 22c-.505 0-.933-.175-1.283-.525a1.745 1.745 0 01-.525-1.283V6.808c0-.505.175-.933.525-1.283.35-.35.778-.525 1.283-.525h1.384V3.654c0-.22.074-.402.22-.55a.745.745 0 01.55-.22c.219 0 .402.074.549.22.146.148.22.33.22.55V5h7.577V3.635c0-.213.071-.391.215-.535a.726.726 0 01.535-.215c.212 0 .39.072.534.215a.726.726 0 01.216.535V5h1.384c.505 0 .933.175 1.283.525.35.35.525.778.525 1.283v13.384c0 .506-.175.933-.525 1.283-.35.35-.778.525-1.283.525H5.308zm0-1.5h13.384a.294.294 0 00.212-.096.294.294 0 00.096-.212v-9.384H5v9.384c0 .077.032.148.096.212a.294.294 0 00.212.096zM5 9.308h14v-2.5a.294.294 0 00-.096-.212.294.294 0 00-.212-.096H5.308a.294.294 0 00-.212.096.294.294 0 00-.096.212v2.5zm7 5.269a.853.853 0 01-.626-.259.853.853 0 01-.259-.626c0-.244.087-.453.259-.626a.853.853 0 01.626-.258c.245 0 .454.086.626.258a.852.852 0 01.259.626.852.852 0 01-.26.626.853.853 0 01-.625.259zm-4 0a.853.853 0 01-.626-.259.853.853 0 01-.259-.626c0-.244.087-.453.259-.626A.853.853 0 018 12.808c.245 0 .453.086.626.258a.853.853 0 01.259.626.853.853 0 01-.26.626.853.853 0 01-.625.259zm8 0a.853.853 0 01-.626-.259.853.853 0 01-.259-.626c0-.244.087-.453.259-.626a.853.853 0 01.626-.258c.245 0 .453.086.626.258a.852.852 0 01.259.626.852.852 0 01-.26.626.853.853 0 01-.625.259zM12 18.5a.853.853 0 01-.626-.259.853.853 0 01-.259-.625c0-.245.087-.454.259-.626a.853.853 0 01.626-.26c.245 0 .454.087.626.26a.852.852 0 01.259.626.853.853 0 01-.26.625.853.853 0 01-.625.26zm-4 0a.853.853 0 01-.626-.259.853.853 0 01-.259-.625c0-.245.087-.454.259-.626A.852.852 0 018 16.73c.245 0 .453.087.626.26a.852.852 0 01.259.626.853.853 0 01-.26.625.853.853 0 01-.625.26zm8 0a.853.853 0 01-.626-.259.853.853 0 01-.259-.625c0-.245.087-.454.259-.626a.853.853 0 01.626-.26c.245 0 .453.087.626.26a.852.852 0 01.259.626.853.853 0 01-.26.625.853.853 0 01-.625.26z"
          fill="#6283FD"
        />
      </g>
    </svg>
  );
}

function ScheduleContentIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <mask
        id="prefix__a"
        style={{
          maskType: 'alpha',
        }}
        maskUnits="userSpaceOnUse"
        x={0}
        y={0}
        width={24}
        height={24}>
        <path fill="#D9D9D9" d="M0 0h24v24H0z" />
      </mask>
      <g mask="url(#prefix__a)">
        <path
          d="M5.615 21c-.46 0-.844-.154-1.152-.462A1.565 1.565 0 014 19.385V6.615c0-.46.154-.844.463-1.152A1.565 1.565 0 015.615 5h1.77V2.77h1.077V5h7.153V2.77h1V5h1.77c.46 0 .844.154 1.152.463.309.308.463.692.463 1.152v12.77c0 .46-.154.844-.462 1.153a1.565 1.565 0 01-1.153.462H5.615zm0-1h12.77a.588.588 0 00.423-.192.588.588 0 00.192-.423v-8.77H5v8.77c0 .153.064.294.192.423.129.128.27.192.423.192zM5 9.615h14v-3a.588.588 0 00-.192-.423.588.588 0 00-.423-.192H5.615a.588.588 0 00-.423.192.588.588 0 00-.192.423v3zm7 4.539a.738.738 0 01-.54-.23.738.738 0 01-.23-.54c0-.206.077-.386.23-.539a.738.738 0 01.54-.23c.206 0 .386.077.54.23.153.153.23.333.23.54a.738.738 0 01-.23.54.738.738 0 01-.54.229zm-4 0a.738.738 0 01-.54-.23.738.738 0 01-.23-.54c0-.206.077-.386.23-.539a.738.738 0 01.54-.23c.206 0 .386.077.54.23.153.153.23.333.23.54a.738.738 0 01-.23.54.738.738 0 01-.54.229zm8 0a.738.738 0 01-.54-.23.738.738 0 01-.23-.54c0-.206.077-.386.23-.539a.738.738 0 01.54-.23c.206 0 .386.077.54.23.153.153.23.333.23.54a.738.738 0 01-.23.54.738.738 0 01-.54.229zM12 18a.738.738 0 01-.54-.23.739.739 0 01-.23-.54c0-.206.077-.385.23-.539a.738.738 0 01.54-.23c.206 0 .386.077.54.23.153.154.23.333.23.54a.739.739 0 01-.23.54.738.738 0 01-.54.23zm-4 0a.738.738 0 01-.54-.23.739.739 0 01-.23-.54c0-.206.077-.385.23-.539a.738.738 0 01.54-.23c.206 0 .386.077.54.23.153.154.23.333.23.54a.739.739 0 01-.23.54A.738.738 0 018 18zm8 0a.738.738 0 01-.54-.23.739.739 0 01-.23-.54c0-.206.077-.385.23-.539a.738.738 0 01.54-.23c.206 0 .386.077.54.23.153.154.23.333.23.54a.739.739 0 01-.23.54.738.738 0 01-.54.23z"
          fill="#9E9FA1"
        />
      </g>
    </svg>
  );
}

function DownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={8} height={5} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M7.5 1L4 4 .5 1" stroke="#000" strokeLinecap="round" />
    </svg>
  );
}

function UpIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={8} height={5} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M.5 4L4 1l3.5 3" stroke="#000" strokeLinecap="round" />
    </svg>
  );
}

function ScheduleResultIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <mask
        id="prefix__a"
        style={{
          maskType: 'alpha',
        }}
        maskUnits="userSpaceOnUse"
        x={0}
        y={0}
        width={24}
        height={24}>
        <path fill="#D9D9D9" d="M0 0h24v24H0z" />
      </mask>
      <g mask="url(#prefix__a)">
        <path
          d="M18.385 21h-2.827a.484.484 0 01-.357-.143.484.484 0 01-.143-.357c0-.142.047-.261.143-.357a.484.484 0 01.357-.143h2.827a.588.588 0 00.423-.192.588.588 0 00.192-.423v-8.77H5V14a.484.484 0 01-.143.357.484.484 0 01-.357.143.484.484 0 01-.357-.143A.484.484 0 014 14V6.615c0-.46.154-.844.463-1.152A1.565 1.565 0 015.615 5h1.77V3.308a.523.523 0 01.538-.539.523.523 0 01.539.539V5h7.153V3.27c0-.143.048-.262.144-.357a.484.484 0 01.356-.144c.143 0 .262.048.357.144a.484.484 0 01.143.356V5h1.77c.46 0 .844.154 1.152.463.309.308.463.692.463 1.152v12.77c0 .46-.154.844-.462 1.153a1.565 1.565 0 01-1.153.462zm-8.018-1.5H2a.484.484 0 01-.357-.143A.484.484 0 011.5 19c0-.142.048-.261.143-.357A.484.484 0 012 18.5h8.367l-2.72-2.765a.464.464 0 010-.67.468.468 0 01.343-.14c.136 0 .251.047.345.14l3.388 3.37c.162.161.242.35.242.565 0 .215-.08.404-.242.565l-3.388 3.389a.443.443 0 01-.342.134.5.5 0 01-.347-.153.457.457 0 01-.14-.335c0-.13.047-.241.14-.335l2.721-2.765zM5 9.615h14v-3a.588.588 0 00-.192-.423.588.588 0 00-.423-.192H5.615a.588.588 0 00-.423.192.588.588 0 00-.192.423v3z"
          fill="#9E9FA1"
        />
      </g>
    </svg>
  );
}
