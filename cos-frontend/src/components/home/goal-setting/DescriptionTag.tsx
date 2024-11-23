import React from 'react';

interface Props {
  children: React.ReactNode;
}

/**
 * 태그 형태의 설명 컴포넌트 입니다.
 * @param props children 을 활용하여 안에 들어가는 내용을 설정할 수 있습니다.
 */
const DescriptionTag = (props: Props) => {
  const { children } = props;

  return <div className="px-2 py-1 bg-blue text-white rounded-[8px] text-h6 font-semibold w-fit">{children}</div>;
};
export default DescriptionTag;
