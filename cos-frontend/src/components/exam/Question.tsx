'use client';

import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import QuestionContent from '@/components/exam/QuestionContent';
import useMockExamQuestions from '@/lib/hooks/useMockExamQuestions';
import {
  mockExamIdState,
  questionIndex,
  stopwatchIsPaused,
  stopwatchIsRunning,
  stopwatchTime,
  userAnswerRequests,
  userAnswerRequestsList,
} from '@/recoil/exam/atom';
import { QuestionOptions, QuestionsResponse, UserAnswerRequests } from '@/types/global';

import { AllQuestionModal } from './AllQuestionModal';

const Question = () => {
  const [selectedMockExamId, setSelectedMockExamId] = useRecoilState(mockExamIdState);
  const { questions, isLoading, isError } = useMockExamQuestions(selectedMockExamId);
  const [questionIdx, setQuestionIdx] = useRecoilState<number>(questionIndex);
  const [allQuestionModalIsOpen, setAllQuestionModalIsOpen] = useState(false);
  const [userAnswer, setUserAnswer] = useRecoilState<UserAnswerRequests>(userAnswerRequests);
  const [userAnswerList, setUserAnswerList] = useRecoilState(userAnswerRequestsList);
  // 각 문제당 걸린 시간
  const [time, setTime] = useRecoilState<number>(stopwatchTime);
  const [isRunning, setIsRunning] = useRecoilState<boolean>(stopwatchIsRunning);
  // 문제당 머문시간을 잠시 멈추는
  const [isPaused, setIsPaused] = useRecoilState(stopwatchIsPaused);
  const [progressBarLength, setProgressBarLength] = useState(60); // 초기값을 60으로 설정

  const toggleQuestionModal = () => {
    setAllQuestionModalIsOpen(!allQuestionModalIsOpen);
  };

  /**
   * 기존에 선택한 답과 현재 선택한 답이 다르면 그 값으로 수정해주는 함수
   */
  const updateUserAnswerInUserAnswerList = () => {
    if (userAnswerList[questionIdx]) {
      if (userAnswer.selectOptionSeq !== userAnswerList[questionIdx].selectOptionSeq) {
        setUserAnswerList((prevResultList) => {
          const updatedFirstItem = {
            ...prevResultList[questionIdx],
            questionId: questionIdx + 1,
            selectOptionSeq: userAnswer.selectOptionSeq,
          };

          // 변경된 첫 번째 요소와 나머지 요소들을 포함하는 새로운 배열 생성
          const updatedResultList: UserAnswerRequests[] = [
            ...prevResultList.slice(0, questionIdx),
            updatedFirstItem,
            ...prevResultList.slice(questionIdx + 1),
          ];

          return updatedResultList; // 새로운 resultList로 상태 업데이트
        });
      }
    }
  };

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

  const resetOptionOnReclick = () => {
    if (userAnswer.selectOptionSeq === userAnswerList[questionIdx]?.selectOptionSeq) {
      if (userAnswerList[questionIdx]?.selectOptionSeq !== 0 && userAnswer.selectOptionSeq !== 0) {
        setUserAnswer((prevState) => ({
          ...prevState,
          selectOptionSeq: 0,
        }));
      }
    }
  };

  /**
   * 처음 랜더링 될 때, userAnswerList 을 기본값으로 채워주는 기능
   */
  useEffect(() => {
    if ((questions?.length || 0) > 0 && userAnswerList.length === 0) {
      // userAnswerList가 초기화되지 않았을 때만 실행
      const initialUserAnswers = questions?.map((question: QuestionsResponse, index: number) => ({
        questionId: index + 1,
        selectOptionSeq: 0,
        takenTime: 0,
      }));

      if (initialUserAnswers) {
        setUserAnswerList(initialUserAnswers);
      }
    }
  }, [questions, userAnswerList.length]);

  /**
   * 문제당 걸린 시간을 측정하는 스톱워치
   */
  useEffect(() => {
    let interval: number | undefined;

    if (isRunning && !isPaused) {
      interval = window.setInterval(() => {
        setTime((prevTime) => prevTime + 1000);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning, isPaused]);

  /**
   * 다음 문제로 넘어갈 때, 스톱워치를 다시 키고, 다시 0으로 릿셋
   */
  useEffect(() => {
    setIsRunning(true);
    setTime(0);
  }, [questionIdx]);

  useEffect(() => {
    updateUserAnswerInUserAnswerList();
  }, [userAnswer]);

  useEffect(() => {
    resetOptionOnReclick();
  }, [userAnswer]);

  /**
   * 문제 풀기 진행바 조작
   */
  useEffect(() => {
    // questions.length가 변경될 때만 progressBarLength 업데이트
    if ((questions?.length || 0) > 0) {
      setProgressBarLength(questions?.length || 0);
    }
  }, [questions?.length]);

  return (
    <>
      {/* 문제 전체 모아보기 session */}
      {allQuestionModalIsOpen ? (
        <AllQuestionModal toggleQuestionModal={toggleQuestionModal} recordSessionTime={recordSessionTime} />
      ) : null}
      <div className={'h-[70px]'} />
      <div className="relative flex flex-col">
        {/* progressBar */}
        <div className="fixed top-[70px] left-0 h-[4px] w-full bg-gray1" />
        <div
          className="fixed top-[70px] left-0 z-10 h-[4px] bg-black rounded-r"
          style={{ width: `${((questionIdx + 1) / (progressBarLength || 1)) * 100}%` }}
        />

        {/* 현재 문제 번호 session */}
        <div className={'flex flex-col p-5 gap-y-2 mt-[8px]'}>
          <div className={'flex text-h3 text-gray4 items-center font-bold'} onClick={toggleQuestionModal}>
            {questionIdx + 1}/{questions?.length}번
            <button className={'text-h3 text-black'}>
              {allQuestionModalIsOpen ? <EnabledIcon /> : <DisabledIcon />}
            </button>
          </div>

          {/* 문제 선지 session */}
          <div className="flex flex-col gap-y-8">
            <div className="text-h3 font-semibold">{questions ? questions[questionIdx].questionText : null}</div>
            <div className="flex flex-col gap-y-4">
              {questions
                ? questions[questionIdx].questionOptions.map((option: QuestionOptions) => {
                    return (
                      <QuestionContent
                        usage={'mockExam'}
                        key={option.optionSequence}
                        questionId={questions[questionIdx].questionSeq}
                        questionContent={option.optionContent}
                        questionImage={option.optionImage ? option.optionImage : undefined}
                        questionSequence={option.optionSequence}
                        userAnswer={userAnswer}
                        setUserAnswer={setUserAnswer}
                        clickedSequence={
                          userAnswerList[questionIdx]
                            ? userAnswerList[questionIdx].selectOptionSeq
                            : userAnswer.selectOptionSeq
                        }></QuestionContent>
                    );
                  })
                : null}
            </div>
          </div>
        </div>
        <div className={'h-[86px]'} />
      </div>

      {/*이동 버튼*/}
      <div className={'fixed bottom-0 bg-white h-[86px] w-full '}>
        <div className={'absolute bottom-[8px] right-[20px] left-[20px] '}>
          {questionIdx + 1 === 1 ? (
            <button
              onClick={() => {
                recordSessionTime();
                setQuestionIdx((prev) => prev + 1);
              }}
              className={'relative w-full rounded-[16px] bg-blue text-white p-4'}>
              다음
              <NextIcon className={'absolute right-5 bottom-[18px]'}></NextIcon>
            </button>
          ) : questionIdx + 1 === questions?.length ? (
            <button
              className={'relative w-full rounded-[16px] text-blue p-4 border-blue border-[1px]'}
              onClick={() => {
                setQuestionIdx((prev) => prev - 1);
                recordSessionTime();
              }}>
              <BeforeIcon className={'absolute left-5 bottom-[18px]'}></BeforeIcon>
              이전
            </button>
          ) : (
            <div className={'flex gap-x-3'}>
              <button
                className={'relative w-full rounded-[16px] text-blue p-4 border-blue border-[1px]'}
                onClick={() => {
                  setQuestionIdx((prev) => prev - 1);
                  recordSessionTime();
                }}>
                <BeforeIcon className={'absolute left-5 bottom-[18px]'}></BeforeIcon>
                이전
              </button>
              <button
                className={'relative w-full rounded-[16px] bg-blue text-white p-4'}
                onClick={() => {
                  recordSessionTime();
                  setQuestionIdx((prev) => prev + 1);
                }}>
                다음
                <NextIcon className={'absolute right-5 bottom-[18px]'}></NextIcon>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Question;

function DisabledIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={28} height={28} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M22 10l-8 8-8-8" stroke="#0D0E10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function EnabledIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={28} height={28} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M6 18l8-8 8 8" stroke="#0D0E10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function NextIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={20} height={20} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M7.5 5l5 5-5 5" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BeforeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={20} height={20} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M12.5 15l-5-5 5-5" stroke="#6283FD" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
