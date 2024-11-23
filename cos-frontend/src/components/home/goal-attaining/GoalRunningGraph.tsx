import React, { SVGProps, useState } from 'react';

import HorizontalBarChart from '@/components/home/HorizontalBarChart';

interface Props {
  goalRunningGraphType: 'time' | 'exam';
  maintitle: string;
  subtitle: string;
  goaltime: number;
  presenttime: number;
  unit: string;
}

const GoalRunningGraph = (props: Props) => {
  const { goalRunningGraphType, maintitle, subtitle, goaltime, presenttime, unit } = props;

  const percentage = Math.round((presenttime / goaltime) * 100);
  let iconComponent;

  if (percentage === 0) {
    iconComponent = <UnCheckIcon className={'absolute bottom-0 right-0'} />;
  } else if (percentage < 100) {
    iconComponent = <UnCheckIcon className={'absolute bottom-0 right-0'} />;
  } else {
    iconComponent = <CheckIcon className={'absolute bottom-0 right-0'} />;
  }

  return (
    <div>
      <div className="bg-white border border-gray0 rounded-[24px] mt-[24px]">
        <div className="flex justify-between bg-gray0 rounded-[24px] items-center p-2">
          <div className="flex gap-x-3">
            <div className={'relative pr-1'}>
              <div className="w-[48px] h-[48px] rounded-full bg-white flex items-center justify-center">
                {goalRunningGraphType === 'time' ? <StopwatchIcon /> : <BookIcon />}
              </div>
              {iconComponent}
            </div>

            <div className="flex flex-col justify-center">
              <div className="font-semibold text-h4">
                {goaltime}
                {unit}
                {maintitle}
              </div>
              <div className="flex text-h6 space-between">
                {subtitle}
                <div className={`ml-1 ${presenttime === 0 ? 'text-gray3' : 'text-primary font-semibold'}`}>
                  {presenttime}
                  {unit}
                </div>
              </div>
            </div>
          </div>
          <MoveIcon />
        </div>
        <div className="flex w-[90%] mx-auto mt-[15%] mb-[5%] justify-center ">
          <HorizontalBarChart
            goalRunningGraphType={goalRunningGraphType}
            score={presenttime}
            total={goaltime}
            unit={unit}
          />
        </div>
      </div>
    </div>
  );
};

export default GoalRunningGraph;

const StopwatchIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} fill="none" {...props}>
    <mask
      id="a"
      width={32}
      height={32}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: 'alpha',
      }}>
      <path fill="#D9D9D9" d="M0 0h32v32H0z" />
    </mask>
    <g mask="url(#a)">
      <path
        fill="#1C1B1F"
        d="M13.077 3.128a.553.553 0 0 1-.564-.57q0-.24.162-.4A.55.55 0 0 1 13.077 2h5.846q.24 0 .402.164t.162.405a.54.54 0 0 1-.162.4.55.55 0 0 1-.402.16zm2.928 14.89a.54.54 0 0 0 .4-.161.55.55 0 0 0 .16-.402V11.71a.553.553 0 0 0-.57-.564.54.54 0 0 0-.4.162.55.55 0 0 0-.16.402v5.744q0 .24.165.402.164.162.405.162M16 27.996a10.3 10.3 0 0 1-4.144-.843 10.9 10.9 0 0 1-3.4-2.289 10.6 10.6 0 0 1-2.288-3.4 10.4 10.4 0 0 1-.835-4.143q0-2.19.835-4.136a10.8 10.8 0 0 1 2.288-3.4 10.8 10.8 0 0 1 3.4-2.288A10.4 10.4 0 0 1 16 6.662q1.998 0 3.827.713 1.83.714 3.305 2.008l.994-1.012a.58.58 0 0 1 .39-.173.53.53 0 0 1 .414.173.56.56 0 0 1 .185.402.56.56 0 0 1-.185.401l-1.012 1.012a11 11 0 0 1 2.003 3.204q.746 1.81.746 3.938a10.4 10.4 0 0 1-.835 4.136 10.6 10.6 0 0 1-2.288 3.4 10.9 10.9 0 0 1-3.4 2.288 10.3 10.3 0 0 1-4.144.843m-.002-1.128q3.966 0 6.753-2.785t2.787-6.751-2.784-6.754-6.752-2.787-6.753 2.785-2.787 6.75 2.784 6.755 6.752 2.787"
      />
    </g>
  </svg>
);

const BookIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} fill="none" {...props}>
    <mask
      id="a"
      width={32}
      height={32}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: 'alpha',
      }}>
      <path fill="#D9D9D9" d="M0 0h32v32H0z" />
    </mask>
    <g mask="url(#a)">
      <path
        fill="#1C1B1F"
        d="M8.537 21.59q1.824 0 3.535.428 1.71.43 3.391 1.355V9.95a10.8 10.8 0 0 0-3.29-1.65 12.3 12.3 0 0 0-3.636-.556q-1.227 0-2.134.165a14 14 0 0 0-2.044.554q-.307.103-.436.295a.75.75 0 0 0-.128.423v12.42q0 .343.256.51.257.166.564.055.693-.274 1.694-.425t2.228-.151m8.054 1.783a14 14 0 0 1 3.354-1.355 14.2 14.2 0 0 1 3.518-.428q1.228 0 2.242.148 1.014.15 1.68.368a.57.57 0 0 0 .564-.039q.255-.166.256-.525V9.182a.7.7 0 0 0-.128-.411q-.128-.18-.436-.308a11.7 11.7 0 0 0-2.024-.562 13 13 0 0 0-2.154-.157q-1.833 0-3.62.555T16.592 9.95zm-.564 1.337q-.237 0-.449-.06a1.8 1.8 0 0 1-.385-.154 14 14 0 0 0-3.211-1.315 13 13 0 0 0-3.445-.458 11.8 11.8 0 0 0-3.805.626q-.756.306-1.41-.185-.655-.492-.655-1.342V9.135q0-.532.276-.985t.778-.647a11.4 11.4 0 0 1 2.355-.676 14.3 14.3 0 0 1 2.46-.212q2.02 0 3.92.583t3.571 1.72a12.9 12.9 0 0 1 3.544-1.72 13.2 13.2 0 0 1 3.892-.583q1.235 0 2.454.212 1.22.213 2.356.676.502.194.781.647.28.453.28.985v12.687q0 .858-.722 1.328-.72.47-1.503.147a11 11 0 0 0-1.81-.434 12 12 0 0 0-1.836-.14q-1.756 0-3.426.458a14 14 0 0 0-3.193 1.315 1.8 1.8 0 0 1-.385.155 1.6 1.6 0 0 1-.432.06m2.486-12.774q0-.103.072-.223a.4.4 0 0 1 .194-.168 10 10 0 0 1 2.174-.732 11.3 11.3 0 0 1 2.386-.249q.66 0 1.242.07t1.212.21q.14.04.25.155a.4.4 0 0 1 .11.282q0 .282-.164.405-.165.124-.436.064a9 9 0 0 0-1.072-.16q-.55-.052-1.148-.051-1.104 0-2.157.207a10 10 0 0 0-1.989.61q-.288.12-.481.003-.193-.118-.193-.423m0 7.23q0-.108.072-.24a.4.4 0 0 1 .194-.18 8.5 8.5 0 0 1 2.174-.718 12.5 12.5 0 0 1 2.386-.233q.66 0 1.242.07t1.212.21q.14.04.25.155a.4.4 0 0 1 .11.282q0 .28-.164.405-.165.124-.436.064a9 9 0 0 0-1.072-.16q-.55-.052-1.148-.052-1.078 0-2.118.225-1.041.225-1.977.636-.305.146-.515.007t-.21-.47m0-3.59q0-.102.072-.222a.4.4 0 0 1 .194-.168 10 10 0 0 1 2.174-.732 11.3 11.3 0 0 1 2.386-.249q.66 0 1.242.07t1.212.21q.14.04.25.155a.4.4 0 0 1 .11.282q0 .282-.164.405-.165.124-.436.065a9 9 0 0 0-1.072-.162q-.55-.05-1.148-.05-1.104 0-2.157.207a10 10 0 0 0-1.989.61q-.288.12-.481.003-.193-.118-.193-.423"
      />
    </g>
  </svg>
);

const MoveIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" {...props}>
    <path stroke="#0D0E10" strokeLinecap="round" strokeLinejoin="round" d="m7.5 5 5 5-5 5" />
  </svg>
);
const UnCheckIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="none" {...props}>
    <rect width={15} height={15} x={0.5} y={0.5} fill="#9E9FA1" rx={7.5} />
    <rect width={15} height={15} x={0.5} y={0.5} stroke="#fff" rx={7.5} />
    <path stroke="#fff" d="M4 7.167 7.2 10.5l4.8-5" />
  </svg>
);

const CheckIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="none" {...props}>
    <rect width={15} height={15} x={0.5} y={0.5} fill="#3B3DFF" rx={7.5} />
    <rect width={15} height={15} x={0.5} y={0.5} stroke="#fff" rx={7.5} />
    <path stroke="#fff" d="M4 7.167 7.2 10.5l4.8-5" />
  </svg>
);
