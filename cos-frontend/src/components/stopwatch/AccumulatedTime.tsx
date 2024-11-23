import type { SVGProps } from 'react';
import React from 'react';
import { useRecoilState } from 'recoil';

import { hStopwatchTimeState, mStopwatchTimeState, sStopwatchTimeState } from '@/recoil/stopwatch/atom';

interface Props {
  setOnAccumulatedModal: React.Dispatch<React.SetStateAction<boolean>>;
}

function AccumulatedTime(props: Props) {
  const { setOnAccumulatedModal } = props;

  const [hStopwatchTime, setHStopwatchTime] = useRecoilState(hStopwatchTimeState); //시 기록
  const [mStopwatchTime, setMStopwatchTime] = useRecoilState(mStopwatchTimeState); //분 기록
  const [sStopwatchTime, setSStopwatchTime] = useRecoilState(sStopwatchTimeState); //초 기록

  //기록 완료 알림창
  return (
    <>
      <div className="">
        <div className="absolute z-40 w-full h-full px-[39px] py-8 bg-black bg-opacity-60 flex-col justify-center items-center gap-2 inline-flex ">
          <div className="relative self-stretch px-2 justify-end items-center inline-flex">
            <div
              className="flex cursor-pointer"
              onClick={() => {
                setOnAccumulatedModal(false); //현재창 닫기
              }}>
              <div className="text-center text-white text-base font-medium font-['Pretendard Variable'] leading-normal">
                닫기
              </div>
              <DeleteIcon />
            </div>
          </div>
          <section className="px-5 py-6 bg-white rounded-[32px] flex-col justify-center gap-2 flex w-full">
            <div className="self-stretch flex-col gap-4 flex">
              <div className="self-stretch flex-col gap-1 flex">
                <div className="self-stretch text-h4 leading-[30px] font-medium">전체 누적 시간</div>
                <div className="self-stretch text-primary text-h1 font-bold font-['Pretendard Variable'] leading-[30px]">
                  {hStopwatchTime}시간 {mStopwatchTime}분 {sStopwatchTime}초
                </div>
                <div className="self-stretch  text-h4 font-medium leading-[30px]">
                  <br />
                  목표 기간 동안의 누적 시간
                </div>
                <div className="self-stretch text-primary text-h1 font-bold font-['Pretendard Variable'] leading-[30px]">
                  {/*TODO: 백엔드 수정되면 변경*/}
                  {hStopwatchTime}시간 {mStopwatchTime}분 {sStopwatchTime}초{' '}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
export default AccumulatedTime;

const DeleteIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={25} height={24} fill="none" {...props}>
    <mask
      id="a"
      width={25}
      height={24}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: 'alpha',
      }}>
      <path fill="#D9D9D9" d="M.974 0h24v24h-24z" />
    </mask>
    <g mask="url(#a)">
      <path
        fill="#fff"
        d="m12.974 12.708-5.246 5.246a.5.5 0 0 1-.344.15.47.47 0 0 1-.364-.15.5.5 0 0 1-.16-.354.5.5 0 0 1 .16-.354L12.266 12 7.02 6.754a.5.5 0 0 1-.15-.344.47.47 0 0 1 .15-.364.5.5 0 0 1 .354-.16.5.5 0 0 1 .354.16l5.246 5.246 5.246-5.246a.5.5 0 0 1 .344-.15.47.47 0 0 1 .364.15.5.5 0 0 1 .16.354.5.5 0 0 1-.16.354L13.682 12l5.246 5.246a.5.5 0 0 1 .15.344.47.47 0 0 1-.15.364.5.5 0 0 1-.354.16.5.5 0 0 1-.354-.16z"
      />
    </g>
  </svg>
);
