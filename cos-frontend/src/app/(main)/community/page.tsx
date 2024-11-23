'use client';

import React from 'react';

import Header from '@/components/common/Header';
import NavBar from '@/components/common/NavBar';
import CertificationClassificationItem from '@/components/onboarding/CertificationClassificationItem';
import useGetBoardList from '@/lib/hooks/useGetBoardList';
import { FavoriteBoard } from '@/types/global';

export default function Community() {
  // 관심 자격증 리스트 데이터 패칭
  const { boardList, isLoading, isError } = useGetBoardList();

  // CertificationClassificationItem 컴포넌트가 클릭됐을 때, 안됐을 때 아이콘
  const chooseClassificationItemIcon = (isCheck: boolean) => {
    let CHOOSE_CERTIFICATE_ICON;
    if (isCheck) {
      CHOOSE_CERTIFICATE_ICON = (
        <div className="pt-[1px]">
          <CheckIcon />
        </div>
      );
    } else {
      CHOOSE_CERTIFICATE_ICON = (
        <div className="pt-[1px]">
          <UnCheckIcon />
        </div>
      );
    }
    return CHOOSE_CERTIFICATE_ICON;
  };

  return (
    <>
      <Header />
      <div className={' border-t-[1px] border-gray0'}></div>
      <div className="grid gap-y-8 m-5 mt-6">
        <div className="grid gap-y-2">
          <div className="text-primary text-h4">게시판</div>
          <div className="text-black text-h1 font-bold">
            어떤 자격증 정보와 <br /> 소식이 궁금하신가요?
          </div>
        </div>
        {/* 자격증 선택 */}
        <div className="grid gap-y-4">
          {boardList
            ? boardList.map((certification: FavoriteBoard) => {
                return (
                  <CertificationClassificationItem
                    usage={'board'}
                    key={certification.certificateId}
                    certificateId={certification.certificateId}
                    certificateName={certification.boardName}
                    isClickState={certification.isFavorite}
                    isMoveButton={true}
                    path={certification.certificateId}
                    icon={chooseClassificationItemIcon(certification.isFavorite)}>
                    {certification.boardName}
                  </CertificationClassificationItem>
                );
              })
            : null}
        </div>
      </div>
      <NavBar />
    </>
  );
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="46" height="47" viewBox="0 0 46 47" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M25.0822 26.7182L25.412 29.6973L24.6868 30.5615L20.4441 27.0015L16.1555 32.1124L15.3608 32.1819L15.2913 31.3872L19.5799 26.2763L15.3372 22.7162L16.0623 21.852L19.0036 21.6177L25.7128 13.622L24.6128 12.699L25.338 11.8348L33.6165 18.7813L32.8914 19.6455L31.7914 18.7225L25.0822 26.7182ZM17.2592 22.8562L24.1654 28.6512L23.9356 26.3296L30.9271 17.9974L26.5771 14.3472L19.5855 22.6794L17.2592 22.8562Z"
        fill="#3B3DFF"
      />
    </svg>
  );
}

function UnCheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="46" height="47" viewBox="0 0 46 47" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M25.0822 26.7182L25.412 29.6973L24.6868 30.5615L20.4441 27.0015L16.1555 32.1124L15.3608 32.1819L15.2913 31.3872L19.5799 26.2763L15.3372 22.7162L16.0623 21.852L19.0036 21.6177L25.7128 13.622L24.6128 12.699L25.338 11.8348L33.6165 18.7813L32.8914 19.6455L31.7914 18.7225L25.0822 26.7182ZM17.2592 22.8562L24.1654 28.6512L23.9356 26.3296L30.9271 17.9974L26.5771 14.3472L19.5855 22.6794L17.2592 22.8562Z"
        fill="#9E9FA1"
      />
    </svg>
  );
}
