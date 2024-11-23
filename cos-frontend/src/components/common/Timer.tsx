'use client';

import { useEffect } from 'react';
import { useRef } from 'react';
import { useRecoilState } from 'recoil';

import {
  hStopwatchTimeState,
  integralTimeState,
  isResetState,
  isStartState,
  isStopState,
  mStopwatchTimeState,
  nowTimeState,
  sStopwatchTimeState,
  startTimeState,
  stringLocationState,
} from '@/recoil/stopwatch/atom';

export default function Timer() {
  const [integralTime, setIntegralTime] = useRecoilState(integralTimeState); //누적 시간(초단위)
  const [startTime, setStartTime] = useRecoilState(startTimeState); //시작 시간(밀리초 단위)
  const [now, setNow] = useRecoilState(nowTimeState); //현재 시간(밀리초 단위)

  const intervalRef = useRef<number | null>(null); //interval 타이머를 위한 참조 변수
  const [isStart, setIsStart] = useRecoilState(isStartState); //시작 여부
  const [isStop, setIsStop] = useRecoilState(isStopState); //멈춤 여부
  const [isReset, setIsReset] = useRecoilState(isResetState); //리셋 여부
  const [stringLocation, setStringLocation] = useRecoilState(stringLocationState); //스톱워치 초침 위치(문자열)
  const [hStopwatchTime, setHStopwatchTime] = useRecoilState(hStopwatchTimeState); //시 기록
  const [mStopwachTime, setMStopwatchTime] = useRecoilState(mStopwatchTimeState); //분 기록
  const [sSopwatchTime, setSStopwatchTime] = useRecoilState(sStopwatchTimeState); //초 기록

  useEffect(() => {
    //타이머 시작 처리
    if (isStart) {
      setStartTime(Date.now()); //현재 시작 시간 기록
      setNow(Date.now()); //현재 시간 설정

      //기존 interval이 있으면 초기화
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }

      //새로운 interval을 시작하여 100ms마다 현재 시간 업데이트
      intervalRef.current = window.setInterval(() => {
        setNow(Date.now());
      }, 100);
    }

    //타이머 멈춤 처리
    if (isStop) {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current); //interval 초기화
      }
      //마지막 시작 시점부터 현재까지의 시간을 누적 시간에 추가
      if (startTime != null && now != null) {
        setIntegralTime((prevIntegralTime) => prevIntegralTime + (now - startTime) / 1000);
      }

      //다음 interval을 위한 시작 및 현재 시간 초기화
      setStartTime(Date.now());
      setNow(Date.now());
    }

    //타이머 리셋 처리
    if (isReset) {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current); //interval초기화
      }
      //관련 상태 변수 초기화
      setStartTime(null);
      setNow(null);
      setIntegralTime(0);
      setIsReset(false); //리셋 상태 초기화
    }
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isStart, isStop, isReset]);

  useEffect(() => {
    let secondsPassed = 0; //경과시간 저장

    //전체 경과 시간 계산
    if (startTime != null && now != null) {
      secondsPassed = (now - startTime) / 1000 + integralTime;
    }

    //경과 시간을 시, 분, 초로 변환
    let hour = Math.floor(Math.floor(secondsPassed) / 3600); //시 계산
    let min = Math.floor(Math.floor(secondsPassed) / 60); //분 계산
    let sec = Math.floor(secondsPassed) % 60; //초 계산

    //스톱워치 시간 상태 업데이트
    setHStopwatchTime(hour);
    setMStopwatchTime(min);
    setSStopwatchTime(sec);

    //초침 위치(0-359도) 계산
    let location = Math.floor((secondsPassed * 6) % 360);
    setStringLocation(location.toString()); //위치를 문자열로 업데이트
    //하~~이부분 문제될 수도 있긴한데, 일단 썼음 참고! 나중에 문제 생기면 이코드를 돌아봐줘
  }, [startTime, now, integralTime]); //시간 또는 누적 시간이 변경될 때 실행

  return null;
}
