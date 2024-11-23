'use client';

import React, { ReactNode } from 'react';

interface ExamInfoItemProps {
  Icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
  title: string;
  element: ReactNode;
}
const ExamInfoItem: React.FC<ExamInfoItemProps> = ({ Icon, title, element }) => {
  return (
    <div className="p-4 rounded-[32px] bg-white">
      <div className="flex gap-x-1">
        <Icon />
        <div className="text-h3 font-semibold">{title}</div>
      </div>
      <div className="h-[1px] bg-gray1 my-2"></div>
      {element}
    </div>
  );
};
export default ExamInfoItem;
