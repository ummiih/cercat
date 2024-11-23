//커뮤니티 태그
import React from 'react';

interface Props {
  children: React.ReactNode; //태그 내용
}

const CommunityTag = (props: Props) => {
  const { children } = props;
  return <div className="flex items-center px-2 py-[2px] bg-gray0 rounded-[8px] text-h6 text-gray4 ">{children}</div>;
};
export default CommunityTag;
