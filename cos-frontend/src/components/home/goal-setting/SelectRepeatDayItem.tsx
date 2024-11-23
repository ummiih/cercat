'use client';

import { useEffect, useState } from 'react';
import * as React from 'react';
import { useRecoilState } from 'recoil';

import { goalSettingState } from '@/recoil/home/atom';

interface Props {
  usage: string; // 사용된 용도 (모의고사 MockList, 공부시간 StudyTime)
}

/**
 * 월, 화, 수, 목, 금, 토, 일 목표를 설정할 수 있는 컴포넌트입니다.
 */
const SelectRepeatDayItem = (props: Props) => {
  const { usage } = props;
  //각 버튼을 눌렀을 때, 눌렸는지를 확인하는 state
  const [isMonthClick, setIsMonthClick] = useState<boolean>(false);
  const [isTuesClick, setIsTuesClick] = useState<boolean>(false);
  const [isWednesClick, setIsWednesClick] = useState<boolean>(false);
  const [isThursClick, setIsThursClick] = useState<boolean>(false);
  const [isFriClick, setIsFriClick] = useState<boolean>(false);
  const [isSaturClick, setIsSaturClick] = useState<boolean>(false);
  const [isSunClick, setIsSunClick] = useState<boolean>(false);

  // 요일 리스트를 담은 state
  let [goalData, setGoalData] = useRecoilState(goalSettingState);

  /**
   * 사용된 용도에 따라(모의고사 - MockExam, 공부시간 - StudyTime)
   * 요일 리스트에 요일을 추가하는 리스트 (2번 클릭 될 경우에는 리스트 제거)
   * @param dayOfWeek 요일 [일: 1 ~ 토: 6]
   */
  const addList = (dayOfWeek: number) => {
    if (usage == 'MockExam') {
      if (!goalData.mockExamRepeatDays.includes(dayOfWeek)) {
        setGoalData((prevGoalSettingData) => ({
          ...prevGoalSettingData,
          mockExamRepeatDays: [...prevGoalSettingData.mockExamRepeatDays, dayOfWeek],
        }));
      } else {
        setGoalData((prevGoalSettingData) => ({
          ...prevGoalSettingData,
          mockExamRepeatDays: [...prevGoalSettingData.mockExamRepeatDays].filter((day) => day != dayOfWeek),
        }));
      }
    }
    if (usage == 'StudyTime') {
      if (!goalData.studyRepeatDays.includes(dayOfWeek)) {
        setGoalData((prevGoalSettingData) => ({
          ...prevGoalSettingData,
          studyRepeatDays: [...prevGoalSettingData.studyRepeatDays, dayOfWeek],
        }));
      } else {
        setGoalData((prevGoalSettingData) => ({
          ...prevGoalSettingData,
          studyRepeatDays: [...prevGoalSettingData.studyRepeatDays].filter((day) => day != dayOfWeek),
        }));
      }
    }
  };

  //처음 랜더링 때, 기존의 저장된 요일 버튼 색상 반영되도록 하기
  const isClickedState = () => {
    const repeatDays = usage === 'MockExam' ? goalData.mockExamRepeatDays : goalData.studyRepeatDays;

    if (repeatDays.length !== 0) {
      repeatDays.forEach((dayOfWeek) => {
        switch (dayOfWeek) {
          case 0:
            setIsSunClick(true);
            break;
          case 1:
            setIsMonthClick(true);
            break;
          case 2:
            setIsTuesClick(true);
            break;
          case 3:
            setIsWednesClick(true);
            break;
          case 4:
            setIsThursClick(true);
            break;
          case 5:
            setIsFriClick(true);
            break;
          case 6:
            setIsSaturClick(true);
            break;
          default:
            break;
        }
      });
    }
  };

  //처음 랜더링 때, 기존의 저장된 요일 버튼 색상 반영되도록 하기
  const resetIsClickedState = () => {
    if (goalData.mockExamRepeatDays.length === 0 && usage == 'MockExam') {
      setIsSunClick(false);
      setIsMonthClick(false);
      setIsTuesClick(false);
      setIsWednesClick(false);
      setIsThursClick(false);
      setIsFriClick(false);
      setIsSaturClick(false);
    }
    if (goalData.studyRepeatDays.length === 0 && usage == 'StudyTime') {
      setIsSunClick(false);
      setIsMonthClick(false);
      setIsTuesClick(false);
      setIsWednesClick(false);
      setIsThursClick(false);
      setIsFriClick(false);
      setIsSaturClick(false);
    }
  };

  useEffect(() => {
    isClickedState();
    resetIsClickedState();
  }, [goalData.studyRepeatDays, goalData.mockExamRepeatDays]);

  return (
    <div className="goal-setting-content">
      <div className="flex flex-col gap-y-2">
        {/* content */}
        <div className="flex gap-x-1 items-center">
          <Icon />
          <div className="text-gray3 text-h6">반복 요일 선택</div>
        </div>

        {/* 월, 화, 수, 목, 금, 토, 일 선택*/}
        <div className="flex gap-x-1">
          <button
            onClick={() => {
              setIsMonthClick(!isMonthClick);
              addList(1);
            }}
            className={
              isMonthClick
                ? 'bg-primary w-10 h-10 rounded-[8px] text-h4 text-white'
                : 'bg-white w-10 h-10 rounded-[8px] text-h4'
            }>
            월
          </button>
          <button
            onClick={() => {
              setIsTuesClick(!isTuesClick);
              addList(2);
            }}
            className={
              isTuesClick
                ? 'bg-primary w-10 h-10 rounded-[8px] text-h4 text-white'
                : 'bg-white w-10 h-10 rounded-[8px] text-h4'
            }>
            화
          </button>
          <button
            onClick={() => {
              setIsWednesClick(!isWednesClick);
              addList(3);
            }}
            className={
              isWednesClick
                ? 'bg-primary w-10 h-10 rounded-[8px] text-h4 text-white'
                : 'bg-white w-10 h-10 rounded-[8px] text-h4'
            }>
            수
          </button>
          <button
            onClick={() => {
              setIsThursClick(!isThursClick);
              addList(4);
            }}
            className={
              isThursClick
                ? 'bg-primary w-10 h-10 rounded-[8px] text-h4 text-white'
                : 'bg-white w-10 h-10 rounded-[8px] text-h4'
            }>
            목
          </button>
          <button
            onClick={() => {
              setIsFriClick(!isFriClick);
              addList(5);
            }}
            className={
              isFriClick
                ? 'bg-primary w-10 h-10 rounded-[8px] text-h4 text-white'
                : 'bg-white w-10 h-10 rounded-[8px] text-h4'
            }>
            금
          </button>
          <button
            onClick={() => {
              setIsSaturClick(!isSaturClick);
              addList(6);
            }}
            className={
              isSaturClick
                ? 'bg-primary w-10 h-10 rounded-[8px] text-h4 text-white'
                : 'bg-white w-10 h-10 rounded-[8px] text-h4'
            }>
            토
          </button>
          <button
            onClick={() => {
              setIsSunClick(!isSunClick);
              addList(0);
            }}
            className={
              isSunClick
                ? 'bg-primary w-10 h-10 rounded-[8px] text-h4 text-white'
                : 'bg-white w-10 h-10 rounded-[8px] text-h4'
            }>
            일
          </button>
        </div>
      </div>
    </div>
  );
};
export default SelectRepeatDayItem;

function Icon(props: React.SVGProps<SVGSVGElement>) {
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
          d="M5.927 18.192l1.735 1.735a.488.488 0 010 .708.511.511 0 01-.357.168.488.488 0 01-.357-.163l-2.383-2.382a.785.785 0 01-.183-.268.818.818 0 01-.053-.298c0-.107.017-.207.053-.298a.786.786 0 01.183-.267l2.383-2.383a.484.484 0 01.713.006c.107.11.161.228.163.354a.485.485 0 01-.162.354l-1.735 1.734h10.765c.18 0 .327-.057.443-.173a.599.599 0 00.173-.442v-2.885c0-.142.047-.26.143-.357a.484.484 0 01.357-.143c.142 0 .26.048.356.143a.485.485 0 01.144.357v2.885c0 .447-.158.828-.472 1.143a1.557 1.557 0 01-1.144.472H5.927zM18.073 6.808H7.308a.599.599 0 00-.443.173.599.599 0 00-.173.442v2.885a.484.484 0 01-.143.356.484.484 0 01-.357.144.484.484 0 01-.356-.144.484.484 0 01-.144-.356V7.423c0-.447.158-.828.472-1.143a1.557 1.557 0 011.144-.472h10.765l-1.735-1.735a.488.488 0 010-.708.51.51 0 01.357-.168.488.488 0 01.357.163l2.383 2.382a.786.786 0 01.183.268.82.82 0 01.053.298.82.82 0 01-.053.298.786.786 0 01-.183.267l-2.383 2.383a.484.484 0 01-.713-.006.516.516 0 01-.163-.354.485.485 0 01.163-.354l1.734-1.734z"
          fill="#9E9FA1"
        />
      </g>
    </svg>
  );
}
