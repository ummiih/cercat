import Link from 'next/link';
import { SVGProps, useEffect, useState } from 'react';
import React from 'react';

import useGetTestResults from '@/lib/hooks/useGetTestResults';

import SubjectGradeCard from './SubjectGradeCard';

interface SessionModalProps {
  round: number;
  mockExamId: number;
  closeModal: () => void;
  openTimerModal: () => void;
  total: number;
}

const SessionModal: React.FC<SessionModalProps> = ({ round, mockExamId, closeModal, openTimerModal, total }) => {
  const [changedRound, setChangedRound] = useState<number>(0);
  const { examResults } = useGetTestResults(mockExamId);

  useEffect(() => {
    if (round) {
      setChangedRound(round);
    }
  }, [round]);

  return (
    <div>
      <div className="fixed z-20 inset-0 flex items-center justify-center bg-black bg-opacity-30">
        <div className="w-[80%]">
          <button onClick={closeModal} className="w-full flex justify-end items-center text-white text-h6 px-2 my-2">
            닫기 <CancleIcon />
          </button>
          <div className="relative bg-white rounded-[32px]">
            <div className="flex flex-col gap-y-4 p-5">
              <div className=" flex justify-center">
                <div>{`${round}회차`}</div>
              </div>
              <div className="border-t border-gray1"></div>
              <div className="flex justify-between">
                {examResults ? (
                  <Link
                    href={'/exam/result'}
                    className="absolute right-5 px-3 py-2 flex gap-x-2 items-center bg-gray0 rounded-full text-h6">
                    <span>성적 리포트</span> <MoveIcon />
                  </Link>
                ) : null}
                <div>
                  {/* 점수 */}
                  <div className="font-semibold text-h6">최근 점수</div>
                  {examResults &&
                  examResults.length > 0 &&
                  examResults[examResults.length - 1].totalScore !== undefined ? (
                    <div className={''}>
                      <div className="flex items-end">
                        <div className="font-bold text-h1">{examResults[examResults?.length - 1].totalScore}점</div>
                        <div className="text-gray3 text-h6 mb-1">/{`${total}점`}</div>
                      </div>
                    </div>
                  ) : (
                    <div className="font-bold text-h1">미응시</div>
                  )}
                </div>
              </div>

              {/* 과목별 맞춘 문제 갯수 표 */}
              <div>
                {examResults && examResults[examResults?.length - 1]?.subjectResults ? (
                  <div className={'flex flex-col gap-y-2'}>
                    <div className="text-h6 font-semibold">과목별 맞춘 문제 수</div>
                    <div className={'grid grid-cols-3'}>
                      {examResults[examResults?.length - 1]?.subjectResults?.map((subjectResult, index) => {
                        return (
                          <div className={'w-full'} key={index}>
                            <SubjectGradeCard
                              name={subjectResult.subject.subjectName}
                              correctAnswer={subjectResult.numberOfCorrect}
                              totalCorrect={subjectResult.subject.numberOfQuestions}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : null}
              </div>
              <div className="flex justify-center">
                <button onClick={() => openTimerModal()} className="w-full bg-black text-white rounded-3xl text-h5 p-4">
                  시험 보기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionModal;

const BeforeIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={28} height={28} fill="none" {...props}>
    <path stroke="#0D0E10" strokeLinecap="round" strokeLinejoin="round" d="m18 22-8-8 8-8" />
  </svg>
);

const AfterIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={28} height={28} fill="none" {...props}>
    <path stroke="#0D0E10" strokeLinecap="round" strokeLinejoin="round" d="m10 6 8 8-8 8" />
  </svg>
);

const MoveIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={17} fill="none" {...props}>
    <path stroke="#0D0E10" strokeLinecap="round" strokeLinejoin="round" d="m5 11.5 6-6M5 5.5h6v6" />
  </svg>
);

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
