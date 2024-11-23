'use client';
import { useRouter } from 'next/navigation';
import React, { SVGProps, useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { mockExamIdState, timerIsPaused } from '@/recoil/exam/atom';

interface SessionModalProps {
  mockExamId: number;
  closeTimerModal: () => void;
  closeSessionModal: () => void;
  round: number;
  timeLimit: number;
}

const TimerModal: React.FC<SessionModalProps> = ({
  mockExamId,
  timeLimit,
  round,
  closeTimerModal,
  closeSessionModal,
}) => {
  const [selectedMockExamId, setSelectedMockExamId] = useRecoilState(mockExamIdState);
  // 모달창을 띄우면 타이머를 잠시 멈추게 하는 state
  const [isPausedTimer, setIsPausedTimer] = useRecoilState(timerIsPaused);
  const router = useRouter();

  // 타이머 모달이 나타나면 기존 세션 모달을 종료 위한 동작
  useEffect(() => {
    // 타이머 모달이 나타난 후에 실행되는 부분
    closeSessionModal();
  }, [closeSessionModal]);

  return (
    <div className="fixed z-20 inset-0 flex items-center justify-center bg-black bg-opacity-30">
      <div className="w-[80%]">
        <button onClick={closeTimerModal} className="w-full flex items-center justify-end text-white text-h6 px-2 my-2">
          닫기 <CancleIcon />
        </button>
        <div className="p-5 bg-white rounded-[32px] flex flex-col gap-y-6">
          <div className="flex flex-col gap-y-4">
            <div className="flex justify-center text-h4 font-semibold">{`${round}회차`}</div>
            <div className="border-t border-gray1"></div>
            <div className={'flex flex-col gap-y-2'}>
              <div className="flex justify-center font-semibold">시험 시간 설정</div>
              <div className="flex gap-x-8 justify-center rounded-[24px] bg-gray0 p-4">
                <div className={'flex items-end gap-x-[2px]'}>
                  <span className={'text-h2 mb-[1px] text-gray3'}>{Math.floor(timeLimit / 3600000)}</span>
                  <span className={'text-h4 font-normal text-black pb-[3px]'}>시간</span>
                </div>
                <div className={'flex items-end gap-x-[2px]'}>
                  <span className={'text-h2 mb-[1px] text-gray3'}>{Math.floor(timeLimit / 60000)}</span>
                  <span className={'text-h4 font-normal text-black pb-[3px]'}>분</span>
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              setIsPausedTimer(false);
              setSelectedMockExamId(mockExamId);
              router.push('/exam/test');
            }}
            className="flex justify-center w-full bg-black text-white rounded-3xl text-h5 p-4">
            시험 보기
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimerModal;

const CancleIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" {...props}>
    <mask
      id="a"
      width={24}
      height={24}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: 'alpha',
      }}>
      <path fill="#D9D9D9" d="M0 0h24v24H0z" />
    </mask>
    <g mask="url(#a)">
      <path
        fill="#fff"
        d="m12 12.708-5.246 5.246a.5.5 0 0 1-.344.15.47.47 0 0 1-.364-.15.5.5 0 0 1-.16-.354.5.5 0 0 1 .16-.354L11.292 12 6.046 6.754a.5.5 0 0 1-.15-.344.47.47 0 0 1 .15-.364.5.5 0 0 1 .354-.16.5.5 0 0 1 .354.16L12 11.292l5.246-5.246a.5.5 0 0 1 .344-.15.47.47 0 0 1 .364.15.5.5 0 0 1 .16.354.5.5 0 0 1-.16.354L12.708 12l5.246 5.246a.5.5 0 0 1 .15.344.47.47 0 0 1-.15.364.5.5 0 0 1-.354.16.5.5 0 0 1-.354-.16z"
      />
    </g>
  </svg>
);
