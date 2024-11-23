import { useRouter } from 'next/navigation';
import React, { type SVGProps } from 'react';

import { deleteUserInfo } from '@/lib/api/mypage';

interface Props {
  isUnRegisterModalOpen: boolean;
  setIsUnRegisterModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const UnRegisterModal = (props: Props) => {
  const { isUnRegisterModalOpen, setIsUnRegisterModalOpen } = props;
  const router = useRouter();

  const onMove = () => {
    router.push('/');
  };

  return (
    <>
      <div
        className={
          'absolute left-0 right-0 z-50 flex flex-col gap-y-2 justify-center bg-[rgba(0,0,0,0.6)] px-8 min-h-screen'
        }>
        <div
          onClick={() => {
            setIsUnRegisterModalOpen(!isUnRegisterModalOpen);
          }}
          className={'flex justify-end items-center'}>
          <div className={'text-white text-h6'}>닫기</div>
          <CancelIcon />
        </div>
        <div className={'flex flex-col gap-y-4 bg-white rounded-[32px] p-5'}>
          <div className={'flex flex-col gap-y-1'}>
            <div className={'text-h2 font-semibold text-black'}>정말 탈퇴 하시겠어요?</div>
            <div className={'flex items-center text-h6'}>탈퇴 후 모든 기록은 사라집니다.</div>
          </div>
          <div className={'flex justify-end gap-x-2'}>
            <button
              onClick={() => {
                setIsUnRegisterModalOpen(!isUnRegisterModalOpen);
              }}
              className={'bg-gray1 rounded-full text-gray4 py-[7px] px-4'}>
              취소
            </button>
            <button
              onClick={async () => {
                await deleteUserInfo();
                setIsUnRegisterModalOpen(!isUnRegisterModalOpen);
                onMove();
              }}
              className={'bg-point rounded-full text-white py-[7px] px-3'}>
              탈퇴하기
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default UnRegisterModal;

const CancelIcon = (props: SVGProps<SVGSVGElement>) => (
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
