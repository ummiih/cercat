'use client';
import React, { SVGProps, useState } from 'react';
import { useRecoilState } from 'recoil';
import { KeyedMutator } from 'swr';

import QuestionContent from '@/components/exam/QuestionContent';
import { deleteIncorrectQuestion } from '@/lib/api/exam';
import { userAnswerRequests } from '@/recoil/exam/atom';
import { QuestionOptions, ReviewIncorrectAnswers, ReviewIncorrectMockExam, UserAnswerRequests } from '@/types/global';

interface Props {
  selectOptionSeq: number;
  mockExam: ReviewIncorrectMockExam;
  correctOption: number;
  questionOptions: QuestionOptions[];
  questionText: string;
  questionSeq: number;
  userAnswerId?: number; //틀린문제 모아보기만
  incorrectQuestionsMutate?: KeyedMutator<ReviewIncorrectAnswers[]>; //틀린문제 모아보기만
}

const IncorrectQuestionCard = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    mockExam,
    questionSeq,
    questionText,
    questionOptions,
    correctOption,
    selectOptionSeq,
    userAnswerId,
    incorrectQuestionsMutate,
  } = props;
  const [userAnswer, setUserAnswer] = useRecoilState<UserAnswerRequests>(userAnswerRequests);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [selectedAnswerInThePast, setSelectedAnswerInThePast] = useState(0);
  const [disabled, setDisabled] = useState(false);

  const resetCorrectAnswer = () => {
    if (correctAnswer === 0) {
      setCorrectAnswer(correctOption);
      disabledQuestion();
    } else {
      setCorrectAnswer(0);
      disabledQuestion();
    }
  };

  const resetSelectedAnswerInThePast = () => {
    if (selectedAnswerInThePast === 0) {
      setSelectedAnswerInThePast(selectOptionSeq);
    } else {
      setSelectedAnswerInThePast(0);
    }
  };

  const disabledQuestion = () => {
    setDisabled(!disabled);
  };

  const resetUserAnswer = () => {
    setUserAnswer((prevState) => ({
      ...prevState,
      selectOptionSeq: 0,
    }));
  };

  const toggleQuestionModal = async () => {
    resetUserAnswer();
    setSelectedAnswerInThePast(0);
    setIsOpen(!isOpen);
  };

  return (
    <div className={'flex flex-col bg-white rounded-[32px] p-5 gap-y-[8px]'}>
      <div className={'flex justify-between'}>
        <div className={'flex justify-start bg-gray0 text-gray4 text-h6 px-2 w-fit rounded-[8px] py-1'}>
          {mockExam.examYear}년도 {mockExam.round}회차 {questionSeq}번
        </div>

        {/* 삭제버튼 */}
        {userAnswerId && incorrectQuestionsMutate ? (
          <button
            onClick={() => {
              deleteIncorrectQuestion(userAnswerId).then(() => {
                incorrectQuestionsMutate();
              });
            }}>
            <DeleteIcon />
          </button>
        ) : null}
      </div>
      <div className={'text-h3 font-semibold'}>{questionText}</div>
      <div className={'flex justify-center items-center'}>
        {isOpen ? (
          <DropUpIcon
            onClick={() => {
              toggleQuestionModal();
              setCorrectAnswer(0);
              setDisabled(false);
            }}
          />
        ) : (
          <DropDownIcon onClick={() => toggleQuestionModal()} />
        )}
      </div>

      {isOpen && (
        <div className={'flex flex-col gap-y-5'}>
          <div className={'flex flex-col gap-y-4'}>
            {questionOptions.map((question, index) => {
              return (
                <QuestionContent
                  usage={'wrongQuestion'}
                  key={index}
                  questionSequence={question.optionSequence}
                  questionContent={question.optionContent}
                  questionImage={question.optionImage}
                  questionId={questionSeq}
                  userAnswer={userAnswer}
                  setUserAnswer={setUserAnswer}
                  correctAnswer={correctAnswer}
                  disabled={disabled}
                  selectedAnswerInThePast={selectedAnswerInThePast}
                  clickedSequence={userAnswer.selectOptionSeq}></QuestionContent>
              );
            })}
          </div>
          <div className={'flex gap-x-2 justify-end'}>
            {selectOptionSeq !== 0 ? (
              <button onClick={() => resetSelectedAnswerInThePast()} className={'border-second-button'}>
                과거의 나
              </button>
            ) : null}
            <button onClick={() => resetCorrectAnswer()} className={'bg-blue-button'}>
              정답보기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default IncorrectQuestionCard;

function DropDownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={29} height={28} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M22.646 10l-8 8-8-8" stroke="#0D0E10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DropUpIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={29} height={28} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M6.646 18l8-8 8 8" stroke="#0D0E10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
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
      <path fill="#D9D9D9" d="M.646 0h24v24h-24z" />
    </mask>
    <g mask="url(#a)">
      <path
        fill="#6E6F71"
        d="M12.646 12.708 7.4 17.954a.5.5 0 0 1-.345.15.47.47 0 0 1-.363-.15.5.5 0 0 1-.16-.354.5.5 0 0 1 .16-.354L11.938 12 6.692 6.754a.5.5 0 0 1-.15-.344.47.47 0 0 1 .15-.364.5.5 0 0 1 .354-.16.5.5 0 0 1 .354.16l5.246 5.246 5.246-5.246a.5.5 0 0 1 .344-.15.47.47 0 0 1 .364.15.5.5 0 0 1 .16.354.5.5 0 0 1-.16.354L13.353 12l5.247 5.246a.5.5 0 0 1 .15.344.47.47 0 0 1-.15.364.5.5 0 0 1-.354.16.5.5 0 0 1-.354-.16z"
      />
    </g>
  </svg>
);
