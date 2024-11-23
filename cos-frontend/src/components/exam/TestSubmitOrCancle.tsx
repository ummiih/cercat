'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import useCalculateScore from '@/hooks/useCalculateScore';
import { postSubjectResultRequestsList } from '@/lib/api/exam';
import useGetTestResults from '@/lib/hooks/useGetTestResults';
import {
  mockExamIdState,
  questionIndex,
  sessionRecordedState,
  stopwatchIsPaused,
  stopwatchIsRunning,
  stopwatchTime,
  subjectResultRequestsList,
  submittedMockExamResultIdState,
  timeLimitState,
  timerIsPaused,
  userAnswerRequests,
  userAnswerRequestsList,
} from '@/recoil/exam/atom';
import { UserAnswerRequests } from '@/types/global';

interface Props {
  isUnsavedChangesWarningModalOpen: boolean;
  setIsUnsavedChangesWarningModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isSubmitConfirmationModalOpen: boolean;
  setIsSubmitConfirmationModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isAutoSubmitTimeUpModalOpen: boolean;
  setIsAutoSubmitTimeUpModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const TestSubmitOrCancle = (props: Props) => {
  const {
    isUnsavedChangesWarningModalOpen,
    setIsUnsavedChangesWarningModalOpen,
    isSubmitConfirmationModalOpen,
    setIsSubmitConfirmationModalOpen,
    isAutoSubmitTimeUpModalOpen,
    setIsAutoSubmitTimeUpModalOpen,
  } = props;
  const router = useRouter();
  const [selectedMockExamId, setSelectedMockExamId] = useRecoilState(mockExamIdState);
  //시험 제한 시간
  const [timeLimit, setTimeLimit] = useRecoilState(timeLimitState);
  // 남은 시간(타이머)
  const [timeLeft, setTimeLeft] = useState(timeLimit); //5400000 -> 1시간 30분, 10000 -> 10초
  // 각 문제당 걸린 시간
  const [time, setTime] = useRecoilState<number>(stopwatchTime);
  const [isRunning, setIsRunning] = useRecoilState<boolean>(stopwatchIsRunning);
  // 모달창을 띄우면 타이머를 잠시 멈추게 하는 state, 잠시 멈췄냐?
  const [isPausedTimer, setIsPausedTimer] = useRecoilState(timerIsPaused);
  // 문제당 머문시간을 잠시 멈추는
  const [isPausedStopWatch, setIsPausedStopWatch] = useRecoilState(stopwatchIsPaused);
  // 현재 머물고 있는 문제 번호
  const [questionIdx, setQuestionIdx] = useRecoilState<number>(questionIndex);
  // 현재 머물고 있는 문제 번호에 내가 찍은 답 번호
  const [userAnswer, setUserAnswer] = useRecoilState<UserAnswerRequests>(userAnswerRequests);
  const [userAnswerList, setUserAnswerList] = useRecoilState<UserAnswerRequests[]>(userAnswerRequestsList);
  const [subjectResultList, setSubjectResultList] = useRecoilState(subjectResultRequestsList);

  // 제출버튼을 눌렀을 때 제출버튼을 누르는 페이지의 머문 시간까지 기록하기 위한 트릭
  const [sessionRecorded, setSessionRecorded] = useRecoilState(sessionRecordedState);
  // 시, 분, 초 계산
  const hours = String(Math.floor((timeLeft / (1000 * 60 * 60)) % 24)).padStart(2, '0');
  const minutes = String(Math.floor((timeLeft / (1000 * 60)) % 60)).padStart(2, '0');
  const seconds = String(Math.floor((timeLeft / 1000) % 60)).padStart(2, '0');
  const { calculateScore, prepareAndScoreSubjectResults } = useCalculateScore(selectedMockExamId);
  const [submittedMockExamResultId, setSubmittedMockExamResultId] = useRecoilState(submittedMockExamResultIdState);

  //모의고사 결과 바로 불러오기
  const { examResultMutate } = useGetTestResults(selectedMockExamId);

  /**
   * 제출 버튼을 눌렀을 때, 결과 페이지로 이동하는 함수
   */
  const onMove = async () => {
    router.push('/exam/result');
  };

  /**
   * 시험 시간 타이머 기능
   */
  useEffect(() => {
    const id = setInterval(() => {
      if (!isPausedTimer && timeLeft > 0) {
        setTimeLeft((prevCount) => (prevCount <= 0 ? 0 : prevCount - 1000)); // 1초(1000밀리초) 감소
      }
    }, 1000);

    return () => clearInterval(id); // 컴포넌트 언마운트 시 인터벌 클리어
  }, [timeLeft, isPausedTimer]);

  /**
   * 각 문제당 걸린 시간 기록 함수
   */
  const recordSessionTime = () => {
    setUserAnswerList((prevResultList) => {
      const updatedResultList: UserAnswerRequests[] = prevResultList.map((answer, index) => {
        if (index === questionIdx) {
          // 현재 질문에 대해서만 시간 업데이트
          const updatedTime = answer.takenTime === 0 ? time : answer.takenTime + time;
          return { ...answer, takenTime: updatedTime };
        }
        return answer; // 다른 질문에 대한 답변은 변경하지 않음
      });

      return updatedResultList;
    });
  };

  /**
   * 각 문제당 채점
   */
  const handleSubmit = async () => {
    calculateScore();
  };

  /**
   * 시간이 종료되었을 때, 자동 제출되는 로직
   */
  useEffect(() => {
    if (timeLeft <= 0) {
      setIsRunning(false);
      setIsAutoSubmitTimeUpModalOpen(!isAutoSubmitTimeUpModalOpen);
    }
  }, [timeLeft]);

  useEffect(() => {
    if (!isRunning) {
      recordSessionTime();
      setSessionRecorded(true); //바로 다음 useEffect 실행시키기 위한 트릭
      setIsRunning(true); //시작할 때 제출되는 것을 막기위함.
    }
  }, [isRunning]);

  useEffect(() => {
    if (sessionRecorded) {
      handleSubmit();
      setSessionRecorded(false); // 다시 초기 상태로 설정
    }
  }, [sessionRecorded]);

  /**
   * 채점이 다 되어 userAnswerList 에 is_correct 프로퍼티가 추가된 다음
   * prepareAndScoreSubjectResults 를 실행시켜 과목별로 채점 및 post 데이터인 subjectResultList 정제
   */
  useEffect(() => {
    if (userAnswerList.some((answer) => answer.isCorrect !== undefined)) {
      prepareAndScoreSubjectResults().then(() => {});
    }
  }, [userAnswerList]);

  /**
   * prepareAndScoreSubjectResults 가 다 완료되고, subjectResultList 에 값이 다 저장될 때,
   * 서버에 post 요청을 보내는 코드
   */
  useEffect(() => {
    if (subjectResultList.length !== 0) {
      const postResults = async () => {
        const r = await postSubjectResultRequestsList(subjectResultList, selectedMockExamId);
        console.log('제출', r);
        await examResultMutate(); // 제출하자마자 모의고사 결과 불러오기
        setSubmittedMockExamResultId(r.result.mockExamResultId);
        // 상태 초기화
        setUserAnswerList([]);
        setSubjectResultList([]);
        setQuestionIdx(0);
        setUserAnswer((prevState) => ({
          ...prevState,
          selectOptionSeq: 0,
          takenTime: 0,
          questionId: 0,
        }));
      };

      postResults().then(async (r) => {
        await onMove();
      });
    }
  }, [subjectResultList]);

  return (
    <>
      <div className="fixed bg-white z-10 flex justify-between items-center w-full py-4 px-5">
        <button
          className={'border-primary-button'}
          onClick={() => {
            setIsPausedTimer(true);
            setIsPausedStopWatch(!isPausedStopWatch);
            setIsUnsavedChangesWarningModalOpen(!isUnsavedChangesWarningModalOpen);
          }}>
          그만두기
        </button>
        <span className={'px-10 rounded-lg bg-white'}>
          {hours} : {minutes} : {seconds}
        </span>
        <button
          onClick={() => {
            setIsPausedTimer(true);
            setIsPausedStopWatch(!isPausedStopWatch);
            setIsSubmitConfirmationModalOpen(!isSubmitConfirmationModalOpen);
          }}
          className={'bg-blue-button'}>
          제출하기
        </button>
      </div>
    </>
  );
};

export default TestSubmitOrCancle;
