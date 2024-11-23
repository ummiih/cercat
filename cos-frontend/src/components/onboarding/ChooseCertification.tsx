'use client';

import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import Header from '@/components/common/Header';
import CertificationClassificationItem from '@/components/onboarding/CertificationClassificationItem';
import Max3ErrorModal from '@/components/onboarding/Max3ErrorModal';
import NullErrorModal from '@/components/onboarding/NullErrorModal';
import useGetAllCertificates from '@/lib/hooks/useGetAllCertificates';
import { certificationsListState } from '@/recoil/atom';
import { Certificate } from '@/types/global';

export interface ChooseCertificationProps {
  onNext: () => void;
  onBefore: () => void;
}

const ChooseCertification: React.FC<ChooseCertificationProps> = ({ onNext, onBefore }) => {
  const [allCertifications, setAllCertifications] = useRecoilState(certificationsListState);
  const [isNullErrorModalOpen, setIsNullErrorModalOpen] = useState(false);
  const [isMax3ErrorModalOpen, setIsMax3ErrorModalOpen] = useState(false);
  // 데이터 패칭
  const { certificationsList, isLoading, isError } = useGetAllCertificates();

  /**
   * 선택된 자격증이 하나도 없는지 검사하는 함수 -> 하나도 없으면 에러 발생
   * @param certificates 선택된 자격증이 담긴 리스트
   */
  const allIsClickFalse = (certificates: Certificate[]) => {
    return certificates.every((certificate) => !certificate.isClick);
  };

  /**
   * Recoil 상태를 초기화하는 함수
   * @param apiResponse Certification id와 name
   */
  const initializeGoalSettingState = (apiResponse: any) => {
    return apiResponse.map((res: any) => ({
      certificateId: res.certificateId,
      certificateName: res.certificateName,
      isClick: false,
    }));
  };

  /**
   * API 에서 데이터를 가져와 Recoil 상태 업데이트 해주는 함수
   */
  const fetchDataAndUpdateState = async () => {
    try {
      const response = certificationsList;
      if (response) {
        const initialState = initializeGoalSettingState(response);
        setAllCertifications(initialState); // 여기에서 변환된 배열을 Recoil 상태에 설정
      } else {
        console.error('Failed to fetch goal setting data');
      }
    } catch (error) {
      console.error('Error fetching goal setting data:', error);
    }
  };

  // CertificationClassificationItem 컴포넌트가 클릭됐을 때, 안됐을 때 아이콘바꾸는 함수
  const chooseClassificationItemIcon = (isCheck: boolean) => {
    let icon;
    if (isCheck) {
      icon = (
        <div className="p-2">
          <CheckIcon />
        </div>
      );
    } else {
      icon = (
        <div className="p-2">
          <UnCheckIcon />
        </div>
      );
    }
    return icon;
  };

  useEffect(() => {
    if (!isLoading && !isError && certificationsList) {
      fetchDataAndUpdateState().then((r) => console.log(r));
    }
  }, [isLoading, isError]);

  return (
    <div className={'relative'}>
      <Header headerType={'dynamic'} title={'종목선택'} onBack={onBefore} />
      {isNullErrorModalOpen ? (
        <NullErrorModal isErrorModalOpen={isNullErrorModalOpen} setIsErrorModalOpen={setIsNullErrorModalOpen} />
      ) : null}
      {isMax3ErrorModalOpen ? (
        <Max3ErrorModal
          isErrorModalOpen={isMax3ErrorModalOpen}
          setIsErrorModalOpen={setIsMax3ErrorModalOpen}></Max3ErrorModal>
      ) : null}

      {/* 온보딩 멘트 */}
      <div className="grid gap-y-8 m-4">
        <div className="grid">
          <span className="text-h1 font-bold">
            학습하고자 하는 <br /> 자격증을 선택해주세요!
          </span>
          <span className="text-h5 text-gray4">마이페이지에서 다시 선택할 수 있어요.</span>
        </div>

        <div className="grid gap-y-4">
          {allCertifications
            ? allCertifications.map((certification) => {
                return (
                  <CertificationClassificationItem
                    usage={'onboarding'}
                    className={'certificationItem-click'}
                    key={certification.certificateId}
                    certificateId={certification.certificateId}
                    certificateName={certification.certificateName}
                    isClickState={certification.isClick}
                    isErrorModalOpen={isMax3ErrorModalOpen}
                    setIsErrorModalOpen={setIsMax3ErrorModalOpen}
                    icon={chooseClassificationItemIcon(certification.isClick)}>
                    {certification.certificateName}
                  </CertificationClassificationItem>
                );
              })
            : null}
        </div>
      </div>

      {/* 완료 버튼 */}
      <button
        className={
          'w-full bg-gray2 h-[100px] rounded-t-[32px] text-white text-h3 fixed bottom-0 hover:bg-primary transition'
        }
        onClick={() => {
          if (allIsClickFalse(allCertifications)) {
            setIsNullErrorModalOpen(!isNullErrorModalOpen);
          } else {
            onNext();
          }
        }}>
        <div className="text-white text-h3 py-[25px]">완료</div>
      </button>
    </div>
  );
};
export default ChooseCertification;

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12.6957 21.4069L24.6744 9.41119C24.7836 9.31432 24.9148 9.26162 25.0678 9.25309C25.2209 9.24453 25.3601 9.29762 25.4855 9.41235C25.5994 9.53849 25.6564 9.67652 25.6564 9.82645C25.6564 9.97639 25.5994 10.1083 25.4855 10.2223L13.3795 22.3283C13.1858 22.522 12.9578 22.6189 12.6957 22.6189C12.4336 22.6189 12.2057 22.522 12.012 22.3283L6.5094 16.8257C6.40113 16.7165 6.34401 16.5853 6.33803 16.4323C6.33206 16.2792 6.39213 16.14 6.51827 16.0146C6.6444 15.9007 6.77958 15.8437 6.9238 15.8437C7.06804 15.8437 7.20284 15.9007 7.3282 16.0146L12.6957 21.4069Z"
        fill="#3B3DFF"
      />
    </svg>
  );
}

function UnCheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12.6957 21.4069L24.6744 9.41119C24.7836 9.31432 24.9148 9.26162 25.0678 9.25309C25.2209 9.24453 25.3601 9.29762 25.4855 9.41235C25.5994 9.53849 25.6564 9.67652 25.6564 9.82645C25.6564 9.97639 25.5994 10.1083 25.4855 10.2223L13.3795 22.3283C13.1858 22.522 12.9578 22.6189 12.6957 22.6189C12.4336 22.6189 12.2057 22.522 12.012 22.3283L6.5094 16.8257C6.40113 16.7165 6.34401 16.5853 6.33803 16.4323C6.33206 16.2792 6.39213 16.14 6.51827 16.0146C6.6444 15.9007 6.77958 15.8437 6.9238 15.8437C7.06804 15.8437 7.20284 15.9007 7.3282 16.0146L12.6957 21.4069Z"
        fill="#9E9FA1"
      />
    </svg>
  );
}
