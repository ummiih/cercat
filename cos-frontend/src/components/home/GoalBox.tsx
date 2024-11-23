import { useRouter } from 'next/navigation';
import { SVGProps } from 'react';
import * as React from 'react';

import ScoredDonutChart from '@/components/home/goal-attaining/ScoredDonutChart';
const GoalBox = () => {
  const router = useRouter();
  return (
    <div className={'flex flex-col gap-y-4 p-4 bg-white rounded-[32px]'}>
      <div className={'flex justify-between'}>
        <div className={'text-h3 font-semibold'}>목표 달성</div>
        <button
          onClick={() => {
            router.push('/home/goal-setting');
          }}
          className={'flex items-center py-1 px-3 rounded-full border-[1px] border-gray2 text-h6'}>
          목표 수정 <ArrowIcon />
        </button>
      </div>

      <div className={'flex justify-between'}>
        <div className="w-[33%]">
          <div className="flex justify-center items-center">
            <div className={'font-normal text-h6 px-[20px] py-[2px] rounded-full bg-gray0'}>목표점수</div>
          </div>
          <div className="relative mt-[10px]">
            <ScoredDonutChart mainscore={65} totalscore={100} unit="점" />
          </div>
        </div>
        <div className="w-[33%]">
          <div className="flex justify-center items-center">
            <div className={'font-normal text-h6 px-[20px] py-[2px] rounded-full bg-gray0'}>공부시간</div>
          </div>
          <div className="relative mt-[10px]">
            <ScoredDonutChart mainscore={500} totalscore={1000} unit="분" />
          </div>
        </div>
        <div className="w-[33%]">
          <div className="flex justify-center items-center">
            <div className={'font-normal text-h6 px-[20px] py-[2px] rounded-full bg-gray0'}>모의고사</div>
          </div>
          <div className="relative mt-[10px]">
            <ScoredDonutChart mainscore={10} totalscore={30} unit="회" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalBox;

const ArrowIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={17} fill="none" {...props}>
    <path stroke="#0D0E10" strokeLinecap="round" strokeLinejoin="round" d="m5 11.5 6-6M5 5.5h6v6" />
  </svg>
);
