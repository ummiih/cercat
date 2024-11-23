import React from 'react';

interface Props {
  children: React.ReactElement;
}

/**
 * 설정된 목표 기간에 따라 누적 공부량을 보여주는 설명 컴포넌트입니다.
 * @param props children 에 Element 를 넣어 내부 값을 다르게 표현할 수 있습니다.
 */
const DescriptionItem = (props: Props) => {
  const { children } = props;
  return <div className="py-3 px-4 border-[1px] border-blue w-full rounded-[16px]">{children}</div>;
};
export default DescriptionItem;
