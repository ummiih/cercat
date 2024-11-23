'use client';

import { useRecoilState } from 'recoil';

import useGetMockExamDetail from '@/lib/hooks/useGetMockExamDetail';
import { selectedDateTypeState } from '@/recoil/home/atom';
import { DetailGradeReportType } from '@/types/home/type';

interface Props {
  prepareYear: string;
  prepareMonth: number | undefined;
  prepareWeekly: number | undefined;
  prepareDate: string | undefined;
  scoreAverage: number;
  dayOfWeek: string | undefined; //주차면 요일, 월별 몇주차, 년도 몇월
}
const DetailedGradeReport = (props: Props) => {
  const { scoreAverage, dayOfWeek, prepareYear, prepareMonth, prepareWeekly, prepareDate } = props;
  const [selectedDateType, setSelectedDateType] = useRecoilState<'DATE' | 'WEEK_OF_MONTH' | 'MONTH'>(
    selectedDateTypeState,
  );

  const { statisticsDetailData } = useGetMockExamDetail(
    selectedDateType,
    prepareYear,
    prepareMonth,
    prepareWeekly,
    prepareDate,
  );

  /**
   * 모의고사 응시 날짜를 format 하는 함수
   * @param date 모의고사 응시 날짜
   */
  const formattedDate = (date: Date) => {
    let month = date.getMonth() + 1;
    let day = date.getDate();

    month = parseInt(('0' + month).slice(-2));
    day = parseInt(('0' + day).slice(-2));

    let formattedDate = month + '.' + day;
    return formattedDate;
  };

  return (
    <>
      <div className={'rounded-[24px] border-[1px] border-gray2 bg-white'}>
        <div className={'flex justify-around py-4 rounded-[24px] border-b-[1px] border-gray2 bg-gray0'}>
          <div className={'font-semibold text-h6'}>{dayOfWeek}</div>
          <div className={'font-semibold text-h6'}>치룬 모의고사</div>
          <div className={'font-semibold text-h6'}>점수</div>
        </div>
        {/* 주간 성적 */}
        <div className={'max-h-[220px] overflow-y-scroll'}>
          {statisticsDetailData?.content.map((detail: DetailGradeReportType, index: number) => {
            return (
              <div key={index} className={'flex justify-around py-4 text-h6'}>
                <div>{formattedDate(new Date(detail.createdAt))}</div>
                <div>
                  {detail.mockExam.examYear}년도 {detail.mockExam.round}회차
                </div>
                <div>{detail.totalScore}점</div>
              </div>
            );
          })}
        </div>
        <div
          className={
            'flex justify-center text-primary text-h6 font-semibold border-t-[1px] border-gray2 rounded-b-[24px] py-4 bg-white'
          }>
          <div>평균 점수: {scoreAverage}</div>
        </div>
      </div>
    </>
  );
};
export default DetailedGradeReport;
