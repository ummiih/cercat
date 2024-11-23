//따봉 아이콘
// 색, 가로, 세로 조정 가능

import React from 'react';
import { twMerge } from 'tailwind-merge';

interface Props {
  color: string; //컬러
  width: string; //가로
  height: string; //세로
  cursor?: string; //마우스 커서
  onClick?: () => void; //버튼 클릭 시 동작
}

const DdbongIcon = (props: Props) => {
  const { color, width, height, cursor, onClick } = props;
  return (
    <div className={twMerge('w-[24px] h-[24px] items-center flex justify-center', cursor)} onClick={onClick}>
      <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill="none" viewBox="0 0 23 20">
        <path
          fill={color}
          d="M20.57 7.066c.44 0 .834.174 1.182.523.349.348.523.742.523 1.182v1.458c0 .11-.004.226-.013.35a1.149 1.149 0 0 1-.075.343l-3.23 7.62c-.16.365-.433.672-.815.92-.383.247-.772.371-1.166.371H5.24V7.066L11.672.55c.154-.159.334-.259.54-.3a.813.813 0 0 1 .576.088c.174.1.303.25.387.448.084.199.101.408.053.628l-1.145 5.652h8.487Zm-14.343.428v11.352h10.876c.154 0 .32-.045.497-.134a.86.86 0 0 0 .4-.45l3.288-7.758V8.771c0-.2-.07-.369-.21-.509a.692.692 0 0 0-.508-.209h-9.676l1.331-6.622-5.998 6.063Zm-4.38 12.34c-.47 0-.871-.17-1.205-.507a1.648 1.648 0 0 1-.5-1.199V8.771c0-.461.166-.86.5-1.198a1.633 1.633 0 0 1 1.204-.507H5.24v.987H1.846a.706.706 0 0 0-.718.718v9.357a.7.7 0 0 0 .202.516.699.699 0 0 0 .516.202H5.24v.987H1.846Z"
        />
      </svg>
    </div>
  );
};

export default DdbongIcon;
