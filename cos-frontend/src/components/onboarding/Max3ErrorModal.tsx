import type { SVGProps } from 'react';
import * as React from 'react';

interface Props {
  setIsErrorModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isErrorModalOpen: boolean;
}
const Max3ErrorModal = (props: Props) => {
  const { setIsErrorModalOpen, isErrorModalOpen } = props;
  return (
    <>
      <div
        className={
          'absolute left-0 right-0 z-50 flex flex-col gap-y-2 justify-center bg-black opacity-60 px-8 min-h-screen'
        }>
        <div onClick={() => setIsErrorModalOpen(!isErrorModalOpen)} className={'flex justify-end items-center'}>
          <div className={'text-white text-h6'}>닫기</div>
          <CancleIcon />
        </div>
        <div className={'flex flex-col gap-y-1 bg-white rounded-[32px] p-5'}>
          <div className={'text-h2 font-semibold text-black'}>최대 3개 이하만 선택해주세요!</div>
          <div>
            <div className={'flex items-center text-h6 gap-x-1'}>
              3개 이하의 자격증을 선택하면 <LogoIcon /> 이
            </div>
          </div>
          <div className={'text-h6'}>선택된 자격증에 맞게 학습 관리를 도와드려요!</div>
        </div>
      </div>
    </>
  );
};
export default Max3ErrorModal;

const CancleIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={25} height={24} fill="none" {...props}>
    <mask
      id="a"
      width={25}
      height={24}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: 'alpha',
      }}>
      <path fill="#D9D9D9" d="M.646 0h24v24h-24z" />
    </mask>
    <g mask="url(#a)">
      <path
        fill="#fff"
        d="M12.646 12.708 7.4 17.954a.5.5 0 0 1-.345.15.47.47 0 0 1-.363-.15.5.5 0 0 1-.16-.354.5.5 0 0 1 .16-.354L11.938 12 6.692 6.754a.5.5 0 0 1-.15-.344.47.47 0 0 1 .15-.364.5.5 0 0 1 .354-.16.5.5 0 0 1 .354.16l5.246 5.246 5.246-5.246a.5.5 0 0 1 .344-.15.47.47 0 0 1 .364.15.5.5 0 0 1 .16.354.5.5 0 0 1-.16.354L13.353 12l5.247 5.246a.5.5 0 0 1 .15.344.47.47 0 0 1-.15.364.5.5 0 0 1-.354.16.5.5 0 0 1-.354-.16z"
      />
    </g>
  </svg>
);

const LogoIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={67} height={13} fill="none" {...props}>
    <g clipPath="url(#a)">
      <path
        fill="#2B2B2B"
        d="M8.798 7.494a3.23 3.23 0 0 1-3 2.05 3.23 3.23 0 0 1-3.226-3.226 3.23 3.23 0 0 1 3.226-3.226c1.363 0 2.53.85 3 2.05h2.676A5.81 5.81 0 0 0 5.797.52 5.803 5.803 0 0 0 0 6.317c0 3.196 2.6 5.796 5.797 5.796a5.805 5.805 0 0 0 5.675-4.62H8.797zM41.58 7.494a3.23 3.23 0 0 1-3 2.05 3.23 3.23 0 0 1-3.226-3.226 3.23 3.23 0 0 1 3.226-3.226c1.363 0 2.53.85 3 2.05h2.676A5.805 5.805 0 0 0 38.58.52a5.803 5.803 0 0 0-5.796 5.797c0 3.196 2.6 5.796 5.796 5.796a5.805 5.805 0 0 0 5.676-4.62H41.58zM31.78.5a5.73 5.73 0 0 0-5.726 5.725l-.023 5.89h2.57l.023-5.89A3.16 3.16 0 0 1 31.78 3.07zM62.965 6.776V.52h-2.57v1.578h-2.06v2.57h2.06v2.107A5.733 5.733 0 0 0 66.12 12.5V9.93a3.16 3.16 0 0 1-3.155-3.155z"
      />
      <path fill="#3B3DFF" d="M65.205 4.87a1.486 1.486 0 1 0 0-2.973 1.486 1.486 0 0 0 0 2.973" />
      <path
        fill="#2B2B2B"
        d="M57.029 6.062C56.893 2.984 54.354.52 51.245.52s-5.797 2.6-5.797 5.797 2.6 5.796 5.797 5.796a5.77 5.77 0 0 0 3.226-.983v.985h2.57V6.062zm-5.784 3.48a3.23 3.23 0 0 1-3.226-3.225 3.23 3.23 0 0 1 3.226-3.227 3.23 3.23 0 0 1 3.226 3.227 3.23 3.23 0 0 1-3.226 3.226M18.573 9.539c-.028 0-.055.005-.082.005a3.23 3.23 0 0 1-3.128-2.45h8.925v-.776c0-3.198-2.6-5.798-5.797-5.798a5.803 5.803 0 0 0-5.797 5.797 5.803 5.803 0 0 0 5.88 5.793V9.537zm-.082-6.449c1.323 0 2.46.8 2.959 1.942h-5.916A3.23 3.23 0 0 1 18.49 3.09"
      />
      <path fill="#3B3DFF" d="M21.175 12.115a1.486 1.486 0 1 0 0-2.973 1.486 1.486 0 0 0 0 2.973" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 .5h66.691v12H0z" />
      </clipPath>
    </defs>
  </svg>
);
