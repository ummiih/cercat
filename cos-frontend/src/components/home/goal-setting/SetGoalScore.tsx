'use client';

import * as React from 'react';
import { useRecoilValue } from 'recoil';

import GoalSettingTitle from '@/components/home/goal-setting/GoalSettingTitle';
import SetGoalsItem from '@/components/home/goal-setting/SetGoalsItem';
import { goalSettingState } from '@/recoil/home/atom';

/**
 * 목표 점수를 설정하는 컴포넌트
 */
const SetGoalScore = () => {
  const goalData = useRecoilValue(goalSettingState);

  return (
    <div className="flex flex-col gap-y-2">
      <GoalSettingTitle Icon={SetGoalScoreIcon}>목표 점수 설정</GoalSettingTitle>

      <SetGoalsItem
        usage={'goalScore'}
        goalString={'총점'}
        unitString={'점'}
        actionString={goalData.goalScore == 100 ? '받기' : '이상 받기'} // 총점 변경
        ContentIcon={SetGoalScoreContentIcon}
      />
    </div>
  );
};
export default SetGoalScore;

function SetGoalScoreIcon(props: React.SVGProps<SVGSVGElement>) {
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
          d="M7.385 21.025a3.38 3.38 0 01-1.511-.41c-.478-.256-.93-.632-1.355-1.128-.634-.743-1.13-1.64-1.485-2.695A10.135 10.135 0 012.5 13.53c0-1.32.248-2.559.744-3.717a9.543 9.543 0 012.032-3.026 9.624 9.624 0 013.021-2.037C9.453 4.25 10.687 4 12 4c1.313 0 2.547.252 3.703.757a9.584 9.584 0 013.016 2.055 9.746 9.746 0 012.032 3.047c.5 1.166.749 2.415.749 3.749 0 1.18-.19 2.299-.572 3.354-.382 1.056-.917 1.955-1.607 2.696-.428.453-.873.795-1.335 1.024a3.199 3.199 0 01-2.23.245 3.83 3.83 0 01-.785-.294l-1.4-.7a3.297 3.297 0 00-.758-.269 3.763 3.763 0 00-.823-.089c-.288 0-.564.03-.828.09-.263.059-.51.148-.743.268l-1.39.7a3.56 3.56 0 01-.818.319c-.266.065-.542.09-.826.073zm.04-1.5c.15 0 .304-.017.462-.05.159-.033.313-.092.463-.175l1.4-.7c.35-.183.713-.317 1.088-.4a5.224 5.224 0 011.137-.125c.383 0 .767.042 1.15.125.383.083.75.217 1.1.4l1.425.7c.15.083.3.142.45.175.15.033.3.05.45.05.317 0 .618-.083.905-.25.286-.167.571-.417.855-.75.533-.633.948-1.392 1.245-2.275A8.53 8.53 0 0020 13.515c0-2.233-.775-4.127-2.325-5.682C16.125 6.278 14.233 5.5 12 5.5c-2.233 0-4.125.783-5.675 2.35C4.775 9.417 4 11.317 4 13.55c0 .95.156 1.875.467 2.775.312.9.74 1.658 1.283 2.275.283.333.558.57.825.712.267.142.55.213.85.213zM12 15.25c.486 0 .899-.17 1.24-.51.34-.341.51-.754.51-1.24 0-.14-.017-.278-.052-.414a1.99 1.99 0 00-.146-.396l1.548-2.03a3.993 3.993 0 01.923 1.6c.064.196.16.367.288.512a.62.62 0 00.487.218c.257 0 .455-.11.595-.331a.886.886 0 00.105-.732 5.644 5.644 0 00-2.053-3.015A5.535 5.535 0 0012 7.75a5.545 5.545 0 00-3.458 1.162 5.65 5.65 0 00-2.05 3.015.876.876 0 00.11.732.67.67 0 00.59.331.606.606 0 00.482-.218c.125-.145.22-.316.284-.512a4.1 4.1 0 011.513-2.177A4.119 4.119 0 0112 9.25c.337 0 .669.043.994.128.326.085.634.207.925.364l-1.563 2.062a2.694 2.694 0 00-.178-.037A1.05 1.05 0 0012 11.75c-.486 0-.9.17-1.24.51-.34.34-.51.754-.51 1.24s.17.899.51 1.24c.34.34.754.51 1.24.51z"
          fill="#6283FD"
        />
      </g>
    </svg>
  );
}

function SetGoalScoreContentIcon(props: React.SVGProps<SVGSVGElement>) {
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
          d="M8.125 7.092l2.608-3.47c.159-.215.347-.372.566-.472.219-.1.452-.15.701-.15.249 0 .482.05.701.15.219.1.407.257.566.471l2.608 3.471 4.02 1.368c.356.12.63.322.822.606.193.283.289.596.289.939 0 .158-.023.315-.07.471a1.44 1.44 0 01-.228.449l-2.635 3.573.1 3.83a1.52 1.52 0 01-.466 1.189 1.58 1.58 0 01-1.143.483l-.454-.056L12 18.733l-4.11 1.211a.693.693 0 01-.24.053 8.738 8.738 0 01-.213.003c-.444 0-.827-.161-1.15-.483a1.53 1.53 0 01-.46-1.188l.1-3.856-2.629-3.548a1.46 1.46 0 01-.228-.453 1.64 1.64 0 01.227-1.414c.197-.29.473-.496.828-.618l4-1.348zm.629.86L4.462 9.398a.605.605 0 00-.395.394.548.548 0 00.087.548l2.792 3.84-.12 4.16a.574.574 0 00.232.52c.166.128.352.16.557.096L12 17.696l4.385 1.285a.581.581 0 00.557-.096.574.574 0 00.231-.52l-.12-4.184 2.793-3.79a.548.548 0 00.087-.549.605.605 0 00-.395-.394l-4.292-1.496-2.765-3.683A.553.553 0 0012 4.02a.553.553 0 00-.48.25L8.753 7.952z"
          fill="#9E9FA1"
        />
      </g>
    </svg>
  );
}
function DownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={8} height={5} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M7.5 1L4 4 .5 1" stroke="#000" strokeLinecap="round" />
    </svg>
  );
}

function UpIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={8} height={5} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M.5 4L4 1l3.5 3" stroke="#000" strokeLinecap="round" />
    </svg>
  );
}
