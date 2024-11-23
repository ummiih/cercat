import { useRouter } from 'next/navigation';
import { SVGProps } from 'react';
import { useRecoilState } from 'recoil';

import StickGraph from '@/components/exam/StickGraph';
import useGetMockExamStatistics from '@/lib/hooks/useGetMockExamStatistics';
import { selectedDateTypeState, selectedReportTypeState } from '@/recoil/home/atom';
import { ScoreAVGListType } from '@/types/home/type';

const RecentGrowthChart = () => {
  const [selectedReportType, setSelectedReportType] = useRecoilState<'WEEKLY' | 'MONTHLY' | 'YEARLY'>(
    selectedReportTypeState,
  );
  const [selectedDateType, setSelectedDateType] = useRecoilState<'DATE' | 'WEEK_OF_MONTH' | 'MONTH'>(
    selectedDateTypeState,
  );

  /**
   * 오늘을 포함한 날의 년도, 월, 주 계산 함수
   */
  function getCurrentWeekInfo() {
    const today = new Date();

    // 연도 계산
    const year = today.getFullYear();

    // 월 계산 (0부터 시작하므로 +1)
    const month = today.getMonth() + 1;

    // 주 계산
    const firstDayOfMonth = new Date(year, today.getMonth(), 1); // 이번 달의 첫날
    const dayOfWeek = firstDayOfMonth.getDay(); // 이번 달 첫날의 요일 (일요일이 0)

    // 오늘의 날짜에서 첫 주의 남은 일수를 더해 주차 계산
    const currentDate = today.getDate();
    const weekOfMonth = Math.ceil((currentDate + dayOfWeek) / 7);

    return {
      year,
      month,
      weekOfMonth,
    };
  }

  const currentWeekInfo = getCurrentWeekInfo();
  const { statisticsData } = useGetMockExamStatistics(
    1,
    selectedReportType,
    currentWeekInfo.year,
    currentWeekInfo.month,
    currentWeekInfo.weekOfMonth,
  );
  const router = useRouter();

  /**
   * 주차별 성장 막대그래프 (x축 월, 화, 수, 목, 금, 토, 일)
   */
  const weeklyGraph = () => {
    const dayOfWeek = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];
    if (!statisticsData) {
      return <div>Loading...</div>; // 로딩 중 메시지 또는 스피너 추가
    }
    // Week 배열을 기반으로 요일별 StickGraph를 렌더링합니다.
    return dayOfWeek.map((day, dayIndex) => {
      // 해당 요일에 해당하는 데이터가 있는지 확인합니다.
      const scoreAVG = statisticsData.scoreAVGList.find((score: ScoreAVGListType) => score.dayOfWeek === day);
      const height = scoreAVG ? scoreAVG.scoreAverage : 0;
      return (
        <div key={day} className="w-full flex justify-center space-x-2">
          <StickGraph height={height} color="blue" />
        </div>
      );
    });
  };

  /**
   * 월별 성장 막대그래프 (x축 1주차 ~ 6주차)
   */
  const monthlyGraph = () => {
    const weekOfMonth = [1, 2, 3, 4, 5, 6];
    if (!statisticsData) {
      return <div>Loading...</div>; // 로딩 중 메시지 또는 스피너 추가
    }
    // Week 배열을 기반으로 요일별 StickGraph를 렌더링합니다.
    return weekOfMonth.map((week, weekIndex) => {
      // 해당 요일에 해당하는 데이터가 있는지 확인합니다.
      const scoreAVG = statisticsData.scoreAVGList.find((score: ScoreAVGListType) => score.weekOfMonth === week);
      const height = scoreAVG ? scoreAVG.scoreAverage : 0;
      return (
        <div key={week} className="w-full flex justify-center space-x-2">
          <StickGraph height={height} color="blue" />
        </div>
      );
    });
  };

  /**
   * 년별 성장 막대그래프 (x축 1월 ~ 12월)
   */
  const yearGraph = () => {
    const monthOfYear = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    // Month 배열을 기반으로 월별 StickGraph를 렌더링합니다.
    return (
      <div className="flex w-full">
        {monthOfYear.map((month, monthIndex) => {
          // 해당 월에 해당하는 데이터가 있는지 확인합니다.
          const scoreAVG = statisticsData?.scoreAVGList.find((score: ScoreAVGListType) => score.month === month);
          const height = scoreAVG ? scoreAVG.scoreAverage : 0;
          return (
            <div key={month} className="w-full flex justify-center space-x-2">
              <StickGraph height={height} color="blue" />
            </div>
          );
        })}
      </div>
    );
  };

  /**
   * 필터값에 따라서 성장그래프의 막대그래프를 그려주는 함수 WEEK, MONTH, YEAR
   */
  const renderGraphLabelsByReportType = () => {
    if (selectedReportType === 'WEEKLY') {
      return weeklyGraph();
    } else if (selectedReportType === 'MONTHLY') {
      return monthlyGraph();
    } else if (selectedReportType === 'YEARLY' && statisticsData?.scoreAVGList) {
      return yearGraph();
    } else {
      return <div />;
    }
  };

  /**
   * 년도 성장그래프 X축 라벨
   * @param item 1~12월
   */
  const xAxisLabelYear = (item: number) => {
    return (
      <div key={item} className="flex border-t border-gray1 w-full overflow-x-auto justify-center text-h6">
        {`${item}`}
      </div>
    );
  };

  /**
   * 월별 성장그래프 X축 라벨
   */
  const xAxisLabelMonth = () => {
    return (
      <div className={'w-full flex justify-between border-t border-gray1'}>
        <div className="w-full flex justify-center text-h6">{'1주'}</div>
        <div className="w-full flex justify-center text-h6">{'2주'}</div>
        <div className="w-full flex justify-center text-h6">{'3주'}</div>
        <div className="w-full flex justify-center text-h6">{'4주'}</div>
        <div className="w-full flex justify-center text-h6">{'5주'}</div>
        <div className="w-full flex justify-center text-h6">{'6주'}</div>
      </div>
    );
  };

  /**
   * 주차별 성장 그래프 X축 라벨
   */
  const xAxisLabelWeekly = () => {
    return (
      <div className={'w-full flex justify-between border-t border-gray1'}>
        <div className="w-full flex justify-center text-h6">{'월'}</div>
        <div className="w-full flex justify-center text-h6">{'화'}</div>
        <div className="w-full flex justify-center text-h6">{'수'}</div>
        <div className="w-full flex justify-center text-h6">{'목'}</div>
        <div className="w-full flex justify-center text-h6">{'금'}</div>
        <div className="w-full flex justify-center text-h6">{'토'}</div>
        <div className="w-full flex justify-center text-h6">{'일'}</div>
      </div>
    );
  };

  /**
   * 필터값에 따라서 성장그래프의 라벨을 그려주는 함수 WEEK, MONTH, YEAR
   * @param selectedReportType
   */
  const renderLabelComponent = (selectedReportType: string) => {
    const monthOfYear = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    if (selectedReportType === 'WEEKLY') {
      return xAxisLabelWeekly();
    } else if (selectedReportType === 'MONTHLY') {
      return xAxisLabelMonth();
    } else if (selectedReportType === 'YEARLY' && statisticsData?.scoreAVGList) {
      return monthOfYear.map((item: number) => {
        return xAxisLabelYear(item);
      });
    } else {
      return <div />;
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-y-3 bg-white rounded-[32px] p-4 border-[1px] border-gray2">
        <div className={'flex justify-between items-center'}>
          <div className="font-bold text-h3">성장그래프</div>
          <button
            className={'flex items-center py-1 px-3 rounded-full border-[1px] border-gray2 text-h6'}
            onClick={() => {
              router.push('/home/growth-chart-view');
            }}>
            자세히
            <ArrowIcon />
          </button>
        </div>

        {/*주간, 월간, 연간 필터 session*/}
        <div className={'flex w-[100%] justify-evenly rounded-[12px] border-[1px] border-gray1'}>
          <div
            onClick={() => {
              setSelectedReportType('WEEKLY');
              setSelectedDateType('DATE');
            }}
            className={
              selectedReportType === 'WEEKLY'
                ? 'flex px-8 py-1 w-full border-[1px] border-gray1 justify-center items-center rounded-[12px] bg-gray0'
                : 'flex px-8 py-1 w-full justify-center items-center rounded-[12px] text-gray4'
            }>
            주간
          </div>
          <div
            onClick={() => {
              setSelectedReportType('MONTHLY');
              setSelectedDateType('WEEK_OF_MONTH');
            }}
            className={
              selectedReportType === 'MONTHLY'
                ? 'flex px-8 py-1 w-full border-[1px] border-gray1 justify-center items-center rounded-[12px] bg-gray0'
                : 'flex px-8 py-1 w-full justify-center items-center rounded-[12px] text-gray4'
            }>
            월간
          </div>
          <div
            onClick={() => {
              setSelectedReportType('YEARLY');
              setSelectedDateType('MONTH');
            }}
            className={
              selectedReportType === 'YEARLY'
                ? 'flex px-8 py-1 w-full border-[1px] border-gray1 justify-center items-center rounded-[12px] bg-gray0'
                : 'flex px-8 py-1 w-full justify-center items-center rounded-[12px] text-gray4'
            }>
            연간
          </div>
        </div>

        {/* 필터 */}
        <div className={'flex flex-col gap-y-1'}>
          <div className={'flex text-h6 gap-x-1 relative'}>
            {/*주차, 월간, 년도 선택 버튼*/}
            <div>
              {selectedReportType === 'WEEKLY' ? '주간' : selectedReportType === 'MONTHLY' ? '월간' : '년간'} 평균 점수
            </div>
          </div>
          <div className={'font-semibold text-h3 ml-2'}>{statisticsData?.totalAverage}점</div>

          {/* 그래프 */}
          <div className={''}>
            <div className={'relative'}>
              <div className="flex items-center space-x-1">
                <div className="xl:w-[97%] sm:w-[85%] border-t border-gray1 "></div>
                <div className="xl:w-[3%] sm:w-[15%] text-gray3 text-h5 ">100점</div>
              </div>

              {/*TODO: 총합 바꿔야 함. 어디서 가져올 수 있는지 못찾겠음*/}
              <div
                style={{
                  bottom:
                    (statisticsData?.totalAverage ?? 0) >= 100 ? '85%' : `${6 + (statisticsData?.totalAverage ?? 0)}%`,
                }}
                className={'w-full absolute flex items-center space-x-1'}>
                <div className="w-[86%] border-t border-dashed border-primary"></div>
                <div className="text-primary text-h5">평균</div>
              </div>

              <div className="w-full flex items-end overflow-x-scroll" style={{ width: '100%' }}>
                <div className={'w-full flex flex-col'}>
                  <div className="w-full justify-between">
                    <div className="flex h-32">{renderGraphLabelsByReportType()}</div>
                  </div>
                  <div className="w-full flex mt-10 justify-between">{renderLabelComponent(selectedReportType)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RecentGrowthChart;

const ArrowIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={17} fill="none" {...props}>
    <path stroke="#0D0E10" strokeLinecap="round" strokeLinejoin="round" d="m5 11.5 6-6M5 5.5h6v6" />
  </svg>
);
