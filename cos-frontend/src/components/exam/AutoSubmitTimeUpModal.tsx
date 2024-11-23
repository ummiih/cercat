import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useRecoilState } from 'recoil';

import {
  questionIndex,
  subjectResultRequestsList,
  timerIsPaused,
  userAnswerRequests,
  userAnswerRequestsList,
} from '@/recoil/exam/atom';
import { UserAnswerRequests } from '@/types/global';

interface Props {
  isAutoSubmitTimeUpModalOpen: boolean;
  setIsAutoSubmitTimeUpModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AutoSubmitTimeUpModal = (props: Props) => {
  const { isAutoSubmitTimeUpModalOpen, setIsAutoSubmitTimeUpModalOpen } = props;
  const router = useRouter();
  // 모달창을 띄우면 타이머를 잠시 멈추게 하는 state
  const [isPausedTimer, setIsPausedTimer] = useRecoilState(timerIsPaused);
  const [userAnswerList, setUserAnswerList] = useRecoilState<UserAnswerRequests[]>(userAnswerRequestsList);
  const [subjectResultList, setSubjectResultList] = useRecoilState(subjectResultRequestsList);
  // 현재 머물고 있는 문제 번호
  const [questionIdx, setQuestionIdx] = useRecoilState<number>(questionIndex);
  // 현재 머물고 있는 문제 번호에 내가 찍은 답 번호
  const [userAnswer, setUserAnswer] = useRecoilState<UserAnswerRequests>(userAnswerRequests);

  /**
   * 제출 버튼을 눌렀을 때, 결과 페이지로 이동하는 함수
   */
  const onMove = () => {
    router.push('/exam/result');
  };

  return (
    <>
      <div
        className={
          'absolute left-0 right-0 z-50 flex flex-col gap-y-2 justify-center bg-[rgba(0,0,0,0.6)] px-8 min-h-screen'
        }>
        <div className={'flex flex-col gap-y-4 bg-white rounded-[32px] p-5'}>
          <div className={'flex flex-col gap-y-1'}>
            <div className={'text-h2 font-semibold text-black'}>시간이 종료되었어요!</div>
            <div>
              <div className={'flex items-center text-h6'}>지금까지 푼 문제들이 제출됩니다.</div>
            </div>
          </div>
          <div className={'flex justify-end gap-x-2'}>
            <button
              onClick={() => {
                setIsPausedTimer(true);
                //체점 결과 초기화
                setUserAnswerList([]);
                setSubjectResultList([]);
                // 문제를 다시 풀 때, 마지막 번호에서 시작하지 않도록 초기화해줌.
                setQuestionIdx(0);
                setUserAnswer((prevState) => ({
                  ...prevState,
                  selectOptionSeq: 0,
                  takenTime: 0,
                  questionId: 0,
                }));
                setIsAutoSubmitTimeUpModalOpen(!isAutoSubmitTimeUpModalOpen);
                onMove();
              }}
              className={'bg-black rounded-full text-white py-[7px] px-3'}>
              확인
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default AutoSubmitTimeUpModal;
