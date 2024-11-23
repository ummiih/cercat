'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import Header from '@/components/common/Header';
import DetailedGradeReport from '@/components/home/DetailedGradeReport';
import GrowthChart from '@/components/home/GrowthChart';
import UserCertGoalPeriods from '@/components/home/UserCertGoalPeriods';
import useGetMockExamStatistics from '@/lib/hooks/useGetMockExamStatistics';
import useGetUserGoals from '@/lib/hooks/useGetUserGoals';
import { certificateIdAtom } from '@/recoil/atom';
import { selectedPrepareWeeksBetweenState, selectedReportTypeState } from '@/recoil/home/atom';
import { ScoreAVGListType } from '@/types/home/type';

const GrowthChartView = () => {
  const certificateId = useRecoilValue(certificateIdAtom);
  const { userGoals } = useGetUserGoals(certificateId);
  const [selectedPrepareWeeksBetween, setSelectedPrepareWeeksBetweenState] = useRecoilState(
    selectedPrepareWeeksBetweenState,
  );
  const [selectedReportType, setSelectedReportType] = useRecoilState<'WEEKLY' | 'MONTHLY' | 'YEARLY'>(
    selectedReportTypeState,
  );

  const { statisticsData } = useGetMockExamStatistics(
    certificateId,
    selectedReportType,
    selectedPrepareWeeksBetween.prepareYear,
    selectedPrepareWeeksBetween.prepareMonth,
    selectedPrepareWeeksBetween.prepareWeekly,
  );
  const [goalPeriod, setGoalPeriod] = useState<string>('목표 기간 선택');
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    console.log('성적그래프 통계', statisticsData);
  }, [statisticsData]);

  /**
   * 목표 주차 계산해주는 함수
   * @param date 목표 날짜
   */
  const getWeek = (date: Date) => {
    const currentDate = date.getDate();
    const firstDay = new Date(date.setDate(1)).getDay();

    return Math.ceil((currentDate + firstDay) / 7);
  };

  /**
   * 목표 월 계산해주는 함수
   * @param date 목표 날짜
   */
  const getMonth = (date: Date) => {
    return date.getMonth() + 1;
  };

  /**
   * 목표 년도 계산해주는 함수
   * @param date 목표 날짜
   */
  const getYear = (date: Date) => {
    return date.getFullYear().toString().slice(-4);
  };

  /**
   * 요일 영어 값을 한국어로 바꿔주는 함수
   */
  const convertDayOfWeekToKorean = (scoreAVG: ScoreAVGListType) => {
    if (scoreAVG.dayOfWeek === 'MONDAY') {
      return '월요일';
    }
    if (scoreAVG.dayOfWeek === 'TUESDAY') {
      return '화요일';
    }
    if (scoreAVG.dayOfWeek === 'WEDNESDAY') {
      return '수요일';
    }
    if (scoreAVG.dayOfWeek === 'THURSDAY') {
      return '목요일';
    }
    if (scoreAVG.dayOfWeek === 'FRIDAY') {
      return '금요일';
    }
    if (scoreAVG.dayOfWeek === 'SATURDAY') {
      return '토요일';
    }
    if (scoreAVG.dayOfWeek === 'SUNDAY') {
      return '일요일';
    }
  };

  /**
   * 주차 변경해주는 함수
   */
  const convertWeekOfMonth = (scoreAVG: ScoreAVGListType) => {
    return `${scoreAVG.weekOfMonth}주차`;
  };

  /**
   * 월 변경해주는 함수
   */
  const convertMonth = (scoreAVG: ScoreAVGListType) => {
    return `${scoreAVG.month}월`;
  };

  const onBack = () => {
    router.push('/home');
  };

  return (
    <div className={'bg-gray0 min-h-screen'}>
      <Header title={'성장그래프 자세히보기'} headerType={'dynamic'} onBack={onBack} />
      <div className={'relative m-5 flex flex-col gap-y-[24px]'}>
        {/*유저별 목표 기간 전체 필터*/}
        <div
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className={'flex items-center gap-x-1 bg-white py-[6px] px-[12px] w-fit rounded-full'}>
          <div className={'text-h6'}>{goalPeriod}</div> {isFilterOpen ? <DropUpIcon /> : <DropDownIcon />}
        </div>
        {isFilterOpen ? (
          <UserCertGoalPeriods
            setIsOpen={setIsFilterOpen}
            data={userGoals}
            setDataState={setGoalPeriod}
            className={'absolute top-10 h-fit'}
          />
        ) : null}

        {/*막대 그래프*/}
        <GrowthChart />

        {/*주간 성적 자세히 보기*/}
        <div className={'flex flex-col gap-y-[8px]'}>
          <div className={'text-h3 font-bold ml-2'}>
            {selectedReportType === 'WEEKLY' ? '주간' : selectedReportType === 'MONTHLY' ? '월간' : '년간'} 성적 자세히
            보기
          </div>
          <div className={'flex flex-col gap-y-[12px]'}>
            {statisticsData?.scoreAVGList.map((scoreAVG: ScoreAVGListType, index: number) => {
              return (
                <DetailedGradeReport
                  prepareYear={
                    selectedReportType === 'WEEKLY'
                      ? getYear(new Date(scoreAVG.date))
                      : selectedReportType === 'MONTHLY'
                      ? selectedPrepareWeeksBetween.prepareYear.toString()
                      : selectedReportType === 'YEARLY'
                      ? selectedPrepareWeeksBetween.prepareYear.toString()
                      : ''
                  }
                  prepareMonth={
                    selectedReportType === 'WEEKLY'
                      ? getMonth(new Date(scoreAVG.date))
                      : selectedReportType === 'MONTHLY'
                      ? selectedPrepareWeeksBetween.prepareMonth
                      : selectedReportType === 'YEARLY'
                      ? scoreAVG.month
                      : undefined
                  }
                  prepareWeekly={
                    selectedReportType === 'WEEKLY'
                      ? getWeek(new Date(scoreAVG.date))
                      : selectedReportType === 'MONTHLY'
                      ? scoreAVG.weekOfMonth
                      : undefined
                  }
                  prepareDate={selectedReportType === 'WEEKLY' ? new Date(scoreAVG.date).toISOString() : undefined}
                  key={index}
                  dayOfWeek={
                    selectedReportType === 'WEEKLY'
                      ? convertDayOfWeekToKorean(scoreAVG)
                      : selectedReportType === 'MONTHLY'
                      ? convertWeekOfMonth(scoreAVG)
                      : convertMonth(scoreAVG)
                  }
                  scoreAverage={scoreAVG.scoreAverage}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default GrowthChartView;

function DropDownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={21} height={21} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M13.654 9l-3.5 3-3.5-3" stroke="#0D0E10" strokeLinecap="round" />
    </svg>
  );
}
function DropUpIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={21} height={21} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M6.654 12l3.5-3 3.5 3" stroke="#0D0E10" strokeLinecap="round" />
    </svg>
  );
}
