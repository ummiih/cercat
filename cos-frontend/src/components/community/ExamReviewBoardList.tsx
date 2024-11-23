'use client';

import React, { type SVGProps, useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useRecoilValue } from 'recoil';

import ExamDifficultyFilter from '@/components/community/ExamDifficultyFilter';
import PreparePeriodFilter from '@/components/community/PreparePeriodFilter';
import UserActionReminder from '@/components/community/UserActionReminder';
import useGetExamReview from '@/lib/hooks/useGetExamReview';
import { certificateIdAtom } from '@/recoil/atom';
import { ExamDifficulty, ReviewPost } from '@/types/community/type';

interface Props {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ExamReviewBoardList = (props: Props) => {
  const { setIsModalOpen } = props;
  const [ref, inView] = useInView();
  const certificateId = useRecoilValue(certificateIdAtom);
  const [selectedExamDifficultyContent, setSelectedExamDifficultyContent] = useState<string>('난이도 전체');
  const [isExamDifficultyOpen, setIsExamDifficultyOpen] = useState<boolean>(false);
  const [examDifficulty, setExamDifficulty] = useState<ExamDifficulty | undefined>();
  const [selectedPreparePeriodContent, setSelectedPreparePeriodContent] = useState<string | undefined>('준비기간 전체');
  const [isPreparePeriodOpen, setIsPreparePeriodOpen] = useState<boolean>(false);
  const [startMonths, setStartMonths] = useState<number | undefined>();
  const [endPreMonths, setEndPreMonths] = useState<number | undefined>();
  const { examReviews, setSize } = useGetExamReview(certificateId, examDifficulty, startMonths, endPreMonths);

  /**
   * 무한 스크롤 뷰 감지하고 size+1 해줌
   */
  const getMoreItem = useCallback(async () => {
    if (examReviews) {
      await setSize((prev: number) => prev + 1);
    }
    return;
  }, [setSize]);

  useEffect(() => {
    if (inView) {
      getMoreItem();
    }
  }, [inView, getMoreItem]);

  const changeTagForExamDifficulty = (examDifficulty: ExamDifficulty) => {
    if (examDifficulty === 'TOO_EASY') {
      return <div className={'px-[10px] py-[2px] bg-[#49D8F8] text-white rounded-full text-h6'}>너무 쉬워요</div>;
    } else if (examDifficulty === 'EASY') {
      return <div className={'px-[10px] py-[2px] bg-[#4BEA3E] text-white rounded-full text-h6'}>쉬워요</div>;
    } else if (examDifficulty === 'NORMAL') {
      return <div className={'px-[10px] py-[2px] bg-[#F8BC49] text-white rounded-full text-h6'}>보통이에요</div>;
    } else if (examDifficulty === 'LITTLE_DIFFICULT') {
      return <div className={'px-[10px] py-[2px] bg-[#F89249] text-white rounded-full text-h6'}>조금 어려워요</div>;
    } else {
      return <div className={'px-[10px] py-[2px] bg-[#F85449] text-white rounded-full text-h6'}>어려워요</div>;
    }
  };

  const formatDate = (date: Date) => {
    const year = date.getFullYear(); // 연도
    const month = date.getMonth() + 1; // 월 (getMonth()는 0에서 시작하므로 +1)
    const day = date.getDate(); // 일

    // 숫자가 한 자리일 경우, 앞에 '0'을 붙여 두 자리로 만듦
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedDay = day < 10 ? `0${day}` : day;

    return `${year}.${formattedMonth}.${formattedDay}`;
  };

  const userActionReminderMove = () => {
    return (
      <button
        className={'px-3 py-1 rounded-full bg-white w-fit flex items-center'}
        onClick={() => {
          setIsModalOpen(true);
        }}>
        <div className={'text-second text-h6'}>따끈 후기 작성</div>
        <MoveIcon />
      </button>
    );
  };

  return (
    <>
      <div className={'relative px-5 flex flex-col gap-y-4 '}>
        <UserActionReminder content={'크루들에게 따끈후기를 공유해주세요!'} button={userActionReminderMove()} />
        {/*filter*/}
        <div className={'flex gap-x-2'}>
          <div
            onClick={() => setIsPreparePeriodOpen(!isPreparePeriodOpen)}
            className={'relative flex items-center rounded-full bg-white py-[6px] px-[12px]'}>
            <div className={'text-h6'}>
              {selectedPreparePeriodContent === '전체' ? '준비기간 전체' : selectedPreparePeriodContent}
            </div>
            {isPreparePeriodOpen ? <ActivationIcon /> : <DisableIcon />}
            {isPreparePeriodOpen ? (
              <PreparePeriodFilter
                setEndPreMonths={setEndPreMonths}
                setStartMonths={setStartMonths}
                setSelectedPreparePeriodContent={setSelectedPreparePeriodContent}
                setIsPreparePeriodOpen={setIsPreparePeriodOpen}
              />
            ) : null}
          </div>
          <div
            onClick={() => setIsExamDifficultyOpen(!isExamDifficultyOpen)}
            className={'relative flex items-center rounded-full bg-white py-[6px] px-[12px]'}>
            <div className={'text-h6'}>
              {selectedExamDifficultyContent === '전체' ? '난이도 전체' : selectedExamDifficultyContent}
            </div>
            {isExamDifficultyOpen ? <ActivationIcon /> : <DisableIcon />}
            {isExamDifficultyOpen ? (
              <ExamDifficultyFilter
                selectedExamDifficulty={selectedExamDifficultyContent}
                setIsExamDifficultyOpen={setIsExamDifficultyOpen}
                setExamDifficulty={setExamDifficulty}
                setSelectedExamDifficultyContent={setSelectedExamDifficultyContent}
              />
            ) : null}
          </div>
        </div>
        <div className={'flex flex-col gap-y-4'}>
          {examReviews
            ? examReviews.map((examReview, index) => {
                return examReview?.result.content.map((review: ReviewPost, postIndex: number) => {
                  const isLastElement =
                    index === examReviews.length - 1 && postIndex === examReview?.result.content.length - 1;
                  return (
                    <div
                      key={review.createdAt}
                      ref={isLastElement ? ref : null}
                      className={'flex flex-col gap-y-1 py-4 px-5 rounded-[32px] bg-white'}>
                      <div className={'flex flex-col gap-y-3'}>
                        <div className={'w-full flex items-center gap-x-[6px]'}>
                          <div className={'flex items-center gap-x-[9px]'}>
                            <div className={'truncate text-gray4 text-h6'}>{review.user.nickname}</div>
                            <div
                              className={
                                'rounded-full border-[1px] border-gray2 py-[2px] px-[10px] text-gray4 text-h6'
                              }>
                              {`준비기간 ${review.prepareMonths}개월`}
                            </div>
                          </div>
                          {changeTagForExamDifficulty(review.examDifficulty)}
                        </div>
                        <div className={''}>{review.content}</div>
                      </div>
                      <div className={'text-gray3 text-h6'}>작성일 {formatDate(new Date(review.createdAt))}</div>
                    </div>
                  );
                });
              })
            : null}
        </div>
      </div>
    </>
  );
};
export default ExamReviewBoardList;

const MoveIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="none" {...props}>
    <path stroke="#6283FD" strokeLinecap="round" strokeLinejoin="round" d="m5 11 6-6M5 5h6v6" />
  </svg>
);

const DisableIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={21} fill="none" {...props}>
    <path stroke="#727375" strokeLinecap="round" d="M13.5 9 10 12 6.5 9" />
  </svg>
);
const ActivationIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={21} fill="none" {...props}>
    <path stroke="#727375" strokeLinecap="round" d="M6.5 12 10 9l3.5 3" />
  </svg>
);
