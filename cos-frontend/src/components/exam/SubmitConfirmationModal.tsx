import * as React from 'react';
import { useRecoilState } from 'recoil';

import { stopwatchIsPaused, stopwatchIsRunning, timerIsPaused } from '@/recoil/exam/atom';

interface Props {
  isSubmitConfirmationModalOpen: boolean;
  setIsSubmitConfirmationModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SubmitConfirmationModal = (props: Props) => {
  const { isSubmitConfirmationModalOpen, setIsSubmitConfirmationModalOpen } = props;
  // 모달창을 띄우면 타이머를 잠시 멈추게 하는 state
  const [isPausedTimer, setIsPausedTimer] = useRecoilState(timerIsPaused);
  // 문제당 머문시간을 잠시 멈추는
  const [isPausedStopWatch, setIsPausedStopWatch] = useRecoilState(stopwatchIsPaused);
  const [isRunning, setIsRunning] = useRecoilState<boolean>(stopwatchIsRunning);

  return (
    <>
      <div
        className={
          'absolute left-0 right-0 z-50 flex flex-col gap-y-2 justify-center bg-[rgba(0,0,0,0.6)] px-8 min-h-screen'
        }>
        <div className={'flex flex-col gap-y-4 bg-white rounded-[32px] p-5'}>
          <div className={'flex flex-col gap-y-1'}>
            <div className={'text-h2 font-semibold text-black'}>제출하시겠습니까?</div>
            <div>
              <div className={'flex items-center text-h6'}>풀지 않은 문제들이 있는지 확인해주세요.</div>
            </div>
          </div>
          <div className={'flex justify-end gap-x-2'}>
            <button
              onClick={() => {
                setIsPausedTimer(false);
                setIsPausedStopWatch(!isPausedStopWatch);
                setIsSubmitConfirmationModalOpen(!isSubmitConfirmationModalOpen);
              }}
              className={'bg-gray1 rounded-full text-gray4 py-[7px] px-4'}>
              닫기
            </button>
            <button
              onClick={async () => {
                setIsPausedTimer(true);
                setIsRunning(false); //제출 트릭
                // 체점 결과 초기화
                setIsSubmitConfirmationModalOpen(!isSubmitConfirmationModalOpen);
              }}
              className={'bg-black rounded-full text-white py-[7px] px-3'}>
              제출하기
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default SubmitConfirmationModal;
