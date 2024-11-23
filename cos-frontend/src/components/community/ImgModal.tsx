//수정중
import React from 'react';

interface Props {}

const ImgModal = (props: Props) => {
  const {} = props;
  return (
    <div className="w-full h-full bg-black bg-opacity-60 flex-col justify-center items-center ">
      <div className="absolute w-[375px] h-12 px-5 justify-between items-center inline-flex">
        <div className="w-8 h-8 justify-center items-center gap-2 flex">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 18 18">
            <path stroke="#fff" stroke-linecap="round" d="m1.106.75 16 16m0-16-16 16" />
          </svg>
        </div>
        <div className="justify-start items-center gap-[70px] flex">
          <div className="text-center text-white text-base font-normal font-['Pretendard Variable'] leading-normal">
            1/2
          </div>
        </div>
        <div className="h-[29px] px-4 py-1 opacity-0 bg-indigo-600 rounded-[999px] justify-center items-center gap-2 flex">
          <div className="text-white text-sm font-medium font-['Pretendard Variable'] leading-[21px]">완료</div>
        </div>
      </div>
      <img className="w-[375px] rounded-[5px]" src="https://via.placeholder.com/375x389" />
    </div>
  );
};

export default ImgModal;
