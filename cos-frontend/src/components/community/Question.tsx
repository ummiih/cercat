import React, { SVGProps } from 'react';

import { QuestionOptions } from '@/types/global';
interface Props {
  setIsClickQuestionButton: React.Dispatch<React.SetStateAction<boolean>>;
  isClickQuestionButton: boolean;
  examYear: number | undefined;
  examRound: number | undefined;
  questionSeq: number | undefined;
  content: string | undefined;
  questionOptions: QuestionOptions[] | undefined;
  correctOption: number | undefined;
}
const Question = (props: Props) => {
  const {
    setIsClickQuestionButton,
    isClickQuestionButton,
    examYear,
    examRound,
    questionSeq,
    content,
    questionOptions,
    correctOption,
  } = props;
  return (
    <>
      <div
        className={
          'absolute left-0 right-0 z-50 flex flex-col gap-y-2 justify-center bg-[rgba(0,0,0,0.6)] px-5 min-h-screen'
        }>
        <div
          onClick={() => {
            setIsClickQuestionButton(!isClickQuestionButton);
          }}
          className={'flex justify-end items-center'}>
          <div className={'text-white text-h6'}>닫기</div>
          <CancelIcon />
        </div>
        <div className={'w-full flex flex-col gap-y-4 bg-white rounded-[32px] p-5'}>
          <div className={'text-h6 text-gray4 px-2 py-[2px] rounded-[8px] bg-gray0 w-fit'}>
            {examYear}년도 {examRound}회차 {questionSeq}번
          </div>
          <div className={'text-h3 font-semibold'}>{content}</div>
          <div className={'flex flex-col gap-y-4'}>
            {questionOptions?.map((questionOption, index) => {
              return (
                <div
                  key={index}
                  className={
                    correctOption === questionOption.optionSequence
                      ? 'flex gap-x-2 p-4 rounded-[16px] border-[1px] border-primary text-second items-start bg-[#6283FD] bg-opacity-20'
                      : 'flex gap-x-2 p-4 rounded-[16px] border-[1px] border-gray1'
                  }>
                  <div>
                    {correctOption === questionOption.optionSequence ? (
                      <CorrectOptionIcon className={'mt-1'} />
                    ) : (
                      questionOption.optionSequence
                    )}
                    .
                  </div>
                  <div>{questionOption.optionContent}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
export default Question;

const CancelIcon = (props: SVGProps<SVGSVGElement>) => (
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
        fill="#fff"
        d="M12.646 12.708 7.4 17.954a.5.5 0 0 1-.345.15.47.47 0 0 1-.363-.15.5.5 0 0 1-.16-.354.5.5 0 0 1 .16-.354L11.938 12 6.692 6.754a.5.5 0 0 1-.15-.344.47.47 0 0 1 .15-.364.5.5 0 0 1 .354-.16.5.5 0 0 1 .354.16l5.246 5.246 5.246-5.246a.5.5 0 0 1 .344-.15.47.47 0 0 1 .364.15.5.5 0 0 1 .16.354.5.5 0 0 1-.16.354L13.353 12l5.247 5.246a.5.5 0 0 1 .15.344.47.47 0 0 1-.15.364.5.5 0 0 1-.354.16.5.5 0 0 1-.354-.16z"
      />
    </g>
  </svg>
);

const CorrectOptionIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={17} height={16} fill="none" {...props}>
    <rect width={16} height={16} x={0.894} fill="#3B3DFF" rx={8} />
    <path stroke="#fff" d="M4.394 7.455 7.736 11l5.658-6" />
  </svg>
);
