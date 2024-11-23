import Image from 'next/image';
import React from 'react';

import { UserAnswerRequests } from '@/types/global';

interface Props {
  usage: string;
  questionSequence: number;
  questionContent: string;
  questionId: number;
  questionImage?: string;
  clickedSequence: number;
  selectedAnswerInThePast?: number;
  correctAnswer?: number;
  userAnswer: UserAnswerRequests;
  disabled?: boolean;
  setUserAnswer: React.Dispatch<React.SetStateAction<UserAnswerRequests>>;
}
const QuestionContent = (props: Props) => {
  const {
    usage,
    disabled,
    questionSequence,
    questionId,
    correctAnswer,
    selectedAnswerInThePast,
    questionContent,
    questionImage,
    setUserAnswer,
    clickedSequence,
  } = props;

  /**
   * 눌린 번호로 state 를 바꾸는 함수
   */
  const resetUserAnswer = () => {
    return new Promise(async (resolve: (value?: unknown) => void) => {
      setUserAnswer((prevState) => ({
        ...prevState,
        selectOptionSeq: questionSequence,
        questionId: questionId,
      }));
      // 상태 업데이트 후 즉시 다음 코드가 실행되기 전에 약간의 지연을 주어
      // 상태 업데이트가 반영될 시간을 제공합니다.
      setTimeout(() => resolve(), 0);
    });
  };

  return (
    <button
      disabled={disabled}
      onClick={async () => {
        await resetUserAnswer();
      }}
      className={
        //TODO: 언젠가.. 이 코드를 깔끔하게 짜도록... 할거시야.. 지금은 못건들..
        correctAnswer === questionSequence
          ? 'text-left border-[1px] border-primary text-second bg-second/20 rounded-[16px] p-4'
          : correctAnswer !== clickedSequence &&
            selectedAnswerInThePast === clickedSequence &&
            clickedSequence === questionSequence &&
            correctAnswer !== 0
          ? 'text-left items-start border-[1px] border-point text-second bg-point/20 rounded-[16px] p-4'
          : selectedAnswerInThePast !== 0 && selectedAnswerInThePast === questionSequence
          ? 'text-left border-[1px] border-second rounded-[16px] p-4 text-second'
          : clickedSequence === questionSequence
          ? usage === 'mockExam'
            ? 'text-left border-[1px] border-black bg-gray0 rounded-[16px] p-4'
            : correctAnswer !== 0 && correctAnswer === clickedSequence
            ? 'flex justify-start items-start border-[1px] border-primary text-second bg-second/20 rounded-[16px] p-4'
            : correctAnswer !== 0 && correctAnswer !== clickedSequence
            ? 'text-left border-[1px] border-point text-point bg-point/20 rounded-[16px] p-4'
            : 'text-left border-[1px] border-black bg-gray0 rounded-[16px] p-4'
          : 'text-left border-[1px] border-gray1 rounded-[16px] p-4'
      }>
      <div className="flex gap-x-2 text-h4 items-start">
        {usage === 'mockExam' ? (
          <div>{questionSequence}.</div>
        ) : selectedAnswerInThePast !== 0 && selectedAnswerInThePast === questionSequence && correctAnswer === 0 ? (
          <div className={'mt-1'}>
            <SelectedAnswerInThePastPastIcon />
          </div>
        ) : selectedAnswerInThePast !== 0 &&
          selectedAnswerInThePast === questionSequence &&
          clickedSequence !== selectedAnswerInThePast ? (
          <div className={'mt-1'}>
            <SelectedAnswerInThePastPastIcon />
          </div>
        ) : correctAnswer !== 0 &&
          clickedSequence === selectedAnswerInThePast &&
          clickedSequence !== correctAnswer &&
          clickedSequence === questionSequence ? (
          <div className={'flex flex-col gap-y-2 mt-1'}>
            <WrongIcon />
            <SelectedAnswerInThePastPastIcon />
          </div>
        ) : correctAnswer !== 0 && questionSequence === correctAnswer ? (
          <div className={'mt-1'}>
            <CorrectIcon />
          </div>
        ) : correctAnswer !== 0 && clickedSequence !== correctAnswer && clickedSequence === questionSequence ? (
          <div className={'mt-1'}>
            <WrongIcon />
          </div>
        ) : (
          <div>{questionSequence}.</div>
        )}
        <div>{questionContent}</div>
      </div>
      {questionImage ? <Image src={questionImage} width={100} height={100} alt={questionImage} /> : null}
    </button>
  );
};
export default QuestionContent;

function SelectedAnswerInThePastPastIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={17} height={16} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect x={0.146} width={16} height={16} rx={8} fill="#6283FD" />
      <path d="M8.003 4L4.146 8m0 0l3.857 4M4.146 8h8" stroke="#fff" />
    </svg>
  );
}

function CorrectIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={17} height={16} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect x={0.146} width={16} height={16} rx={8} fill="#3B3DFF" />
      <path d="M3.646 7.455L6.988 11l5.657-6" stroke="#fff" />
    </svg>
  );
}

function WrongIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={17} height={16} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect x={0.146} width={16} height={16} rx={8} fill="#FF6A3B" />
      <path d="M4.646 4.5l7 7M11.646 4.5l-7 7" stroke="#fff" />
    </svg>
  );
}
