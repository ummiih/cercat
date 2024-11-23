import React from 'react';

interface Props {
  children: React.ReactNode;
  Icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
}
/**
 목표 설정 페이지 타이틀 공통 컴포넌트 입니다.
 */
const GoalSettingTitle = (props: Props) => {
  const { children, Icon } = props;
  return (
    <div className="flex gap-x-1 ml-2 items-center">
      {/*아이콘, 제목*/}
      <Icon />
      <div className="font-bold text-h3">{children}</div>
    </div>
  );
};
export default GoalSettingTitle;
