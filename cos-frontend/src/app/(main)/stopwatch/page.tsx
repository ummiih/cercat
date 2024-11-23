'use client';

import React, { useMemo } from 'react';
import { useState } from 'react';
import { useRecoilState } from 'recoil';

import Header from '@/components/common/Header';
import NavBar from '@/components/common/NavBar';
import AccumulatedTime from '@/components/stopwatch/AccumulatedTime';
import StopwatchAlert from '@/components/stopwatch/StopwatchAlert';
import {
  hStopwatchTimeState,
  isResetState,
  isStartState,
  isStopState,
  mStopwatchTimeState,
  sStopwatchTimeState,
  stringLocationState,
  timeBoolState,
} from '@/recoil/stopwatch/atom';

export default function StopWatch() {
  const [timebool, setTimebool] = useRecoilState(timeBoolState); // true: 시작 버튼/ false: 일시정지 버튼
  const [onModal, setOnModal] = useState<boolean>(false); //기록하기 알림창 onoff조절
  const [onAccumulatedModal, setOnAccumulatedModal] = useState<boolean>(false); //기록완료 알림창 onoff조절
  const [isStart, setIsStart] = useRecoilState(isStartState); //시작 여부
  const [isStop, setIsStop] = useRecoilState(isStopState); //멈춤 여부
  const [isReset, setIsReset] = useRecoilState(isResetState); //리셋 여부
  const [stringLocation, setStringLocation] = useRecoilState(stringLocationState); //스톱워치 돌아가는 원의 위치
  const [hStopwatchTime, setHStopwatchTime] = useRecoilState(hStopwatchTimeState); //시 기록
  const [mStopwatchTime, setMStopwatchTime] = useRecoilState(mStopwatchTimeState); //분 기록
  const [sStopwatchTime, setSStopwatchTime] = useRecoilState(sStopwatchTimeState); //초 기록

  const rotateStyle = useMemo(() => {
    return { transform: `rotate(${stringLocation}deg)` }; //원의 위치가 변경될 수 있도록 함
  }, [stringLocation]);

  return (
    <>
      {onModal ? ( //기록하기 알림창 열림OnOff
        <StopwatchAlert setOnAccumulatedModal={setOnAccumulatedModal} setOnModal={setOnModal} />
      ) : null}
      {onAccumulatedModal ? ( //기록완료 알림창OnOff
        <AccumulatedTime setOnAccumulatedModal={setOnAccumulatedModal} />
      ) : null}
      <Header />
      <Header headerType={'second'} />
      <div className="relative flex justify-center items-center mt-[100px]">
        <div className="w-80 h-[449px] flex-col justify-start items-center gap-6 flex">
          {/* <div className={twMerge('h-[320px] w-[320px] border border-gray2 rounded-full', className)}> */}
          <div style={rotateStyle} className="h-[320px] w-[320px] border border-gray2 rounded-full">
            <div className="absolute z-10 left-1/2 -top-2 h-4 w-4 bg-second rounded-full"></div>
          </div>
          <div className="absolute justify-center items-center gap-2 inline-flex w-full h-[290px]">
            <h1
              className={
                hStopwatchTime === 0 && mStopwatchTime === 0 && sStopwatchTime === 0
                  ? 'pt-5 text-[48px] text-gray3'
                  : 'pt-5 text-[48px]'
              }>
              {/* 스톱워치 시간 */}
              {/* <div class="text-neutral-950 text-5xl font-medium font-['Pretendard Variable'] leading-[48px]">01 : 20 : 35</div> */}
              {hStopwatchTime.toString().padStart(2, '0')} : {mStopwatchTime.toString().padStart(2, '0')} :{' '}
              {sStopwatchTime.toString().padStart(2, '0')}
            </h1>
          </div>

          <div className="self-stretch px-2 justify-between items-start inline-flex">
            <div className="flex-col justify-start items-center gap-1 inline-flex">
              <button
                onClick={() => {
                  setOnModal(true); //모달창 열기
                  setIsStop(true); //멈춤 설정
                  setTimebool(true); // true: 시작 버튼
                }}
                className="w-20 h-20 p-2 bg-gray0 rounded-[999px] justify-center items-center gap-2 inline-flex">
                <div className="w-[18px] h-[18px] bg-gray4 rounded-sm"></div>
              </button>
              <div className="text-gray4 text-h6 leading-[21px]">재설정</div>
            </div>
            <div className="flex-col justify-start items-center gap-1 inline-flex">
              {timebool ? (
                // true: 시작 버튼/ false: 일시정지 버튼
                <div className="flex-col justify-start items-center gap-1 inline-flex">
                  <button
                    onClick={() => {
                      setIsStart(true); //시작 여부 true
                      setTimebool(false); // false: 일시정지 버튼
                      setIsStop(false);
                    }}
                    className="w-20 h-20 p-2 bg-second rounded-[999px] justify-center items-center gap-2 inline-flex">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="22" fill="none" viewBox="0 0 16 22">
                      <path
                        fill="#fff"
                        d="M14.735 9.448 3.907.65C2.6-.412.646.518.646 2.202v17.596c0 1.684 1.954 2.614 3.26 1.552l10.83-8.798a2 2 0 0 0 0-3.104Z"
                      />
                    </svg>
                  </button>
                  <div className="text-gray4 text-h6 leading-[21px]">시작</div>
                </div>
              ) : (
                <div className="flex-col justify-start items-center gap-1 inline-flex">
                  <button
                    onClick={() => {
                      setIsStart(false);
                      setIsStop(true); //멈춤
                      setTimebool(true); //true: 시작 버튼
                    }}
                    className="w-20 h-20 p-2 bg-point rounded-[999px] justify-center items-center gap-2 inline-flex">
                    <div className="justify-center items-center gap-1.5 flex">
                      <div className="w-1.5 h-[18px] bg-white rounded-sm"></div>
                      <div className="w-1.5 h-[18px] bg-white rounded-sm"></div>
                    </div>
                  </button>
                  <div className="text-gray4 text-h6 leading-[21px]">일시정지</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <NavBar />
    </>
  );
}
