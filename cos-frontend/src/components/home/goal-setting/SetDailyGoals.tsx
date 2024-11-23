'use client';

import { format } from 'date-fns';
import dayjs from 'dayjs';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import DescriptionItem from '@/components/home/goal-setting/DescriptionItem';
import DescriptionTag from '@/components/home/goal-setting/DescriptionTag';
import GoalSettingTitle from '@/components/home/goal-setting/GoalSettingTitle';
import SelectRepeatDayItem from '@/components/home/goal-setting/SelectRepeatDayItem';
import SetGoalsItem from '@/components/home/goal-setting/SetGoalsItem';
import { goalSettingState } from '@/recoil/home/atom';

/**
 * 매일 목표 설정 컴포넌트입니다.
 * 모의고사 공부량과 공부 시간을 설정할 수 있습니다.
 */
const SetDailyGoals = () => {
  //설정된 기간동안 모의고사을 설정한 요일이 얼마나 들어있는지 세는 state
  let [mockExamCount, setMockExamCount] = useState<number>(0);
  //설정된 기간동안 공부시간을 설정한 요일이 얼마나 들어있는지 세는 state
  let [studyTimeCount, setStudyTimeCount] = useState<number>(0);

  const [goalData, setGoalData] = useRecoilState(goalSettingState);

  /**
   * 자격증 준비 기간동안 얼마나 달성할 수 있는지 계산하는 함수
   */
  const calculateCumulativeStudy = (usage: string) => {
    if (usage == 'MockExam') {
      setMockExamCount(0);
    }
    if (usage == 'StudyTime') {
      setStudyTimeCount(0);
    }

    // 준비 기간 동안 설정한 요일이 얼마나 들어있는지 세기
    for (
      let date = dayjs(format(goalData.prepareStartDateTime, 'yyyy.MM.dd')).valueOf();
      date <= dayjs(format(goalData.prepareFinishDateTime, 'yyyy.MM.dd')).valueOf();
      date += 86400000
    ) {
      const day = dayjs(date);
      if (usage == 'MockExam' && goalData.mockExamRepeatDays.includes(day.get('day'))) {
        setMockExamCount((prevCount) => prevCount + 1);
      }
      if (usage == 'StudyTime' && goalData.studyRepeatDays.includes(day.get('day'))) {
        setStudyTimeCount((prevCount) => prevCount + 1);
      }
    }
  };

  //모의고사 전체 누적 공부량
  useEffect(() => {
    calculateCumulativeStudy('MockExam');
    setGoalData((prevGoalSettingData) => ({
      ...prevGoalSettingData,
      goalMockExams: mockExamCount * goalData.mockExamsPerDay,
    }));
  }, [
    mockExamCount,
    goalData.mockExamsPerDay,
    goalData.mockExamRepeatDays,
    goalData.prepareFinishDateTime,
    goalData.prepareStartDateTime,
  ]);

  //공부시간 전체 누적 공부량
  useEffect(() => {
    calculateCumulativeStudy('StudyTime');
    setGoalData((prevGoalSettingData) => ({
      ...prevGoalSettingData,
      goalStudyTime: studyTimeCount * goalData.studyTimePerDay,
    }));
  }, [
    studyTimeCount,
    goalData.studyTimePerDay,
    goalData.studyRepeatDays,
    goalData.prepareFinishDateTime,
    goalData.prepareStartDateTime,
  ]);

  return (
    <div className="flex flex-col gap-y-2">
      <GoalSettingTitle Icon={SetDailyGoalIcon}>매일 목표 설정</GoalSettingTitle>

      {/* 모의고사 목표 응시 횟수 */}
      <div className="flex flex-col gap-y-4">
        <div className="flex flex-col gap-y-2">
          <DescriptionTag>모의고사 공부 설정</DescriptionTag>
          <SetGoalsItem
            usage="goalMockExam"
            ContentIcon={MockExamIcon}
            goalString={'모의고사'}
            unitString={'회'}
            actionString={'풀기'}
          />
          <SelectRepeatDayItem usage={'MockExam'} />
          <DescriptionItem>
            <div className="text-h6">
              목표기간 <span className="text-primary">{goalData.goalPrepareDays}일 동안</span> 모의고사{' '}
              <span className="text-primary">{mockExamCount * goalData.mockExamsPerDay}회</span>를 풀어요!
            </div>
          </DescriptionItem>
        </div>

        {/* 목표 공부 시간 */}
        <div className="flex flex-col gap-y-2">
          <DescriptionTag>공부시간 설정</DescriptionTag>
          <SetGoalsItem
            usage="goalStudyTime"
            ContentIcon={TimeIcon}
            goalString={'공부시간'}
            unitString={'분'}
            actionString={'공부하기'}
          />
          <SelectRepeatDayItem usage={'StudyTime'} />
          <DescriptionItem>
            <div className="text-h6">
              목표기간 <span className="text-primary">{goalData.goalPrepareDays}일 동안</span> 공부시간{' '}
              <span className="text-primary">{studyTimeCount * goalData.studyTimePerDay}분</span>을 공부해요!
            </div>
          </DescriptionItem>
        </div>
      </div>
    </div>
  );
};
export default SetDailyGoals;

function SetDailyGoalIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={24} height={25} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <mask
        id="prefix__a"
        style={{
          maskType: 'alpha',
        }}
        maskUnits="userSpaceOnUse"
        x={0}
        y={0}
        width={24}
        height={25}>
        <path fill="#D9D9D9" d="M0 .5h24v24H0z" />
      </mask>
      <g mask="url(#prefix__a)">
        <path
          d="M8.904 6.538h1.923V4.615H8.904v1.923zm3.846 0V4.615h1.923v1.923H12.75zm-3.846 7.693v-1.923h1.923v1.923H8.904zm7.692-3.846V8.46h1.923v1.924h-1.923zm0 3.846v-1.923h1.923v1.923h-1.923zm-3.846 0v-1.923h1.923v1.923H12.75zm3.846-7.693V4.615h1.923v1.923h-1.923zm-5.77 1.923V6.538h1.924v1.923h-1.923zm-5.345 11.77V4.615h1.5v1.923h1.923v1.923H6.98v1.924h1.923v1.923H6.98v7.923h-1.5zm9.192-7.923v-1.923h1.923v1.923h-1.923zm-3.846 0v-1.923h1.923v1.923h-1.923zm-1.923-1.923V8.46h1.923v1.924H8.904zm3.846 0V8.46h1.923v1.924H12.75zm1.923-1.924V6.538h1.923v1.923h-1.923z"
          fill="#6283FD"
        />
      </g>
    </svg>
  );
}

function MockExamIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <mask
        id="prefix__a"
        style={{
          maskType: 'alpha',
        }}
        maskUnits="userSpaceOnUse"
        x={0}
        y={0}
        width={24}
        height={24}>
        <path fill="#D9D9D9" d="M0 0h24v24H0z" />
      </mask>
      <g mask="url(#prefix__a)">
        <path
          d="M6.5 16.038c.873 0 1.722.1 2.547.301.825.201 1.643.528 2.453.98V7.508a7.978 7.978 0 00-2.387-1.16A9.153 9.153 0 006.5 5.962c-.6 0-1.125.035-1.576.107-.45.072-.95.205-1.5.4a.605.605 0 00-.328.221.56.56 0 00-.096.318v9.015c0 .18.064.311.192.394a.43.43 0 00.423.03 7.684 7.684 0 011.267-.297 10.622 10.622 0 011.618-.111zm6 1.281a9.759 9.759 0 012.453-.98c.825-.2 1.674-.3 2.547-.3.6 0 1.14.037 1.618.111.48.074.901.173 1.267.296a.43.43 0 00.423-.029c.128-.083.192-.214.192-.394V7.008a.516.516 0 00-.096-.308.74.74 0 00-.327-.23 8.603 8.603 0 00-1.501-.4c-.45-.073-.976-.108-1.576-.108-.873 0-1.744.128-2.614.386a7.978 7.978 0 00-2.386 1.16v9.811zm-.5 1.137c-.156 0-.3-.02-.432-.059a2.165 2.165 0 01-.376-.15 9.966 9.966 0 00-2.27-.902A9.59 9.59 0 006.5 17.04c-.52 0-1.032.043-1.534.13-.502.087-.99.227-1.466.42a1.004 1.004 0 01-1.022-.131c-.319-.232-.478-.553-.478-.962V6.831c0-.248.065-.477.195-.689.13-.211.313-.359.547-.442a8.199 8.199 0 011.833-.563A10.624 10.624 0 016.5 4.962c.98 0 1.935.14 2.866.423A10.2 10.2 0 0112 6.615a10.2 10.2 0 012.634-1.23 9.836 9.836 0 012.866-.423c.649 0 1.29.058 1.925.175a8.2 8.2 0 011.833.563c.234.083.417.23.547.442.13.212.195.441.195.689v9.665c0 .41-.172.723-.516.943-.345.219-.71.256-1.1.111a7.2 7.2 0 00-1.418-.39 8.878 8.878 0 00-1.466-.122 9.59 9.59 0 00-2.421.307 9.968 9.968 0 00-2.271.901c-.12.062-.245.112-.376.151-.132.04-.276.059-.432.059zm1.885-9.508c0-.073.025-.147.076-.222a.508.508 0 01.18-.168 7.93 7.93 0 011.613-.53A8.287 8.287 0 0118.41 7.9c.286.035.581.086.885.153.086.02.16.065.224.135.064.069.095.155.095.257 0 .168-.05.29-.15.366-.1.075-.234.093-.401.052a5.942 5.942 0 00-.757-.103 11.252 11.252 0 00-.807-.028 8.269 8.269 0 00-3.033.585c-.171.065-.311.063-.42-.006-.108-.07-.162-.19-.162-.362zm0 5.423c0-.073.025-.15.076-.232.05-.081.11-.14.18-.178a6.71 6.71 0 011.613-.519 9.118 9.118 0 011.746-.173c.32 0 .624.018.91.053.287.035.582.086.886.153.086.02.16.065.224.135.064.069.095.155.095.257 0 .168-.05.29-.15.366-.1.075-.234.093-.401.052a5.942 5.942 0 00-.757-.103 11.3 11.3 0 00-.807-.028c-.523 0-1.038.053-1.544.16-.507.107-.99.26-1.45.457-.172.078-.319.077-.44-.003-.12-.08-.181-.212-.181-.397zm0-2.692c0-.073.025-.147.076-.222a.508.508 0 01.18-.168 7.93 7.93 0 011.613-.53 8.287 8.287 0 012.657-.13c.286.036.581.087.885.154.086.02.16.065.224.134.064.07.095.155.095.258 0 .168-.05.29-.15.365-.1.076-.234.093-.401.052a5.942 5.942 0 00-.757-.103 11.3 11.3 0 00-.807-.027c-.536 0-1.06.05-1.573.153-.513.103-1 .247-1.46.431-.171.066-.312.064-.42-.006-.108-.069-.162-.19-.162-.361z"
          fill="#9E9FA1"
        />
      </g>
    </svg>
  );
}
function TimeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <mask
        id="prefix__a"
        style={{
          maskType: 'alpha',
        }}
        maskUnits="userSpaceOnUse"
        x={0}
        y={0}
        width={24}
        height={24}>
        <path fill="#D9D9D9" d="M0 0h24v24H0z" />
      </mask>
      <g mask="url(#prefix__a)">
        <path
          d="M12.5 12.792V8.5a.484.484 0 00-.143-.357A.484.484 0 0012 8a.484.484 0 00-.357.143.484.484 0 00-.143.357v4.379c0 .107.018.208.056.3.037.094.1.184.186.27l3.05 3.05a.504.504 0 00.345.15.467.467 0 00.363-.15.49.49 0 00.16-.353.49.49 0 00-.16-.354l-3-3zM12 21a7.805 7.805 0 01-3.118-.626 8.065 8.065 0 01-2.543-1.713 8.065 8.065 0 01-1.713-2.543A7.805 7.805 0 014 13c0-1.109.209-2.149.626-3.118a8.066 8.066 0 011.713-2.543 8.066 8.066 0 012.543-1.713A7.805 7.805 0 0112 5c1.109 0 2.148.209 3.118.626.97.417 1.818.988 2.542 1.713a8.065 8.065 0 011.714 2.543c.417.97.626 2.009.626 3.118a7.805 7.805 0 01-.626 3.118 8.065 8.065 0 01-1.713 2.543 8.065 8.065 0 01-2.543 1.713c-.97.417-2.01.626-3.118.626zM2.78 7.26a.49.49 0 01-.159-.353.49.49 0 01.16-.354L5.554 3.78a.503.503 0 01.344-.15.467.467 0 01.363.15.49.49 0 01.16.354.49.49 0 01-.16.353L3.488 7.261a.503.503 0 01-.344.15.467.467 0 01-.363-.15zm18.44 0a.49.49 0 01-.355.16.49.49 0 01-.353-.16l-2.774-2.773a.503.503 0 01-.15-.344.467.467 0 01.15-.363.49.49 0 01.354-.16.49.49 0 01.354.16l2.773 2.773a.503.503 0 01.15.344.467.467 0 01-.15.363zM12 20c1.937 0 3.588-.682 4.953-2.047C18.318 16.588 19 14.937 19 13c0-1.937-.682-3.588-2.047-4.953C15.588 6.682 13.937 6 12 6c-1.937 0-3.588.682-4.953 2.047C5.682 9.412 5 11.063 5 13c0 1.937.682 3.588 2.047 4.953C8.412 19.318 10.063 20 12 20z"
          fill="#9E9FA1"
        />
      </g>
    </svg>
  );
}
