import { useRouter } from 'next/navigation';
import { SVGProps } from 'react';
import * as React from 'react';

import GoalRunningGraph from '@/components/home/goal-attaining/GoalRunningGraph';

const TodayGoal = () => {
  const router = useRouter();

  return (
    <div className={'p-4 rounded-[32px] bg-white'}>
      <div className={'flex justify-between'}>
        <div className={'flex gap-x-[10px] items-center'}>
          <div className={'pl-1 text-h3 font-semibold'}>오늘 목표</div>
          <div className={'bg-gray0 rounded-[4px] text-h6 text-[#3B3DFFCC] font-semibold py-[2px] px-2 w-fit h-fit'}>
            목표 진행중
          </div>
        </div>
        <button
          onClick={() => {
            router.push('/home/goal-setting');
          }}
          className={'flex items-center py-1 px-3 rounded-full border-[1px] border-gray2 text-h6'}>
          목표 수정 <ArrowIcon />
        </button>
      </div>
      <GoalRunningGraph
        goalRunningGraphType={'time'}
        maintitle=" 공부하기"
        subtitle="오늘 공부한 시간"
        goaltime={60}
        presenttime={50}
        unit="분"
      />
      <GoalRunningGraph
        goalRunningGraphType={'exam'}
        maintitle=" 모의고사 풀기"
        subtitle="오늘 푼 모의고사"
        goaltime={3}
        presenttime={3}
        unit="회분"
      />
    </div>
  );
};
export default TodayGoal;

const ArrowIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={17} fill="none" {...props}>
    <path stroke="#0D0E10" strokeLinecap="round" strokeLinejoin="round" d="m5 11.5 6-6M5 5.5h6v6" />
  </svg>
);
