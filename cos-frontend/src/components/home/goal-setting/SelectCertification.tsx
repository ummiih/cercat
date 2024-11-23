'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import FilterModal from '@/components/common/FilterModal';
import GoalSettingTitle from '@/components/home/goal-setting/GoalSettingTitle';
import useGetInterestCertificates from '@/lib/hooks/useGetInterestCertificates';
import { goalSettingCertificateId, goalSettingCertificateName } from '@/recoil/home/atom';

/**
 목표 설정 페이지 중 자격증 선택 컴포넌트 입니다.
 */
const SelectCertification = () => {
  const { interestCertificates } = useGetInterestCertificates();
  //FilterModal 을 열고 닫는 state
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // 선택된 자격증
  const [selectedCertificationName, setSelectedCertificationName] = useRecoilState<string | undefined>(
    goalSettingCertificateName,
  );
  // 선택된 자격증 Id
  const [selectedCertificationId, setSelectedCertificationId] = useRecoilState<number | undefined>(
    goalSettingCertificateId,
  );

  //FilterModal 을 열고 닫는 함수
  const modalHandler = () => {
    setIsModalOpen(!isModalOpen);
  };

  const initializeGoalSettingCertificateIdState = () => {
    if (interestCertificates) {
      return interestCertificates[0]?.certificate.certificateId;
    }
  };

  const initializeGoalSettingCertificateNameState = () => {
    if (interestCertificates) {
      return interestCertificates[0]?.certificate.certificateName;
    }
  };

  const fetchDataAndUpdateState = async () => {
    setSelectedCertificationName(initializeGoalSettingCertificateNameState);
    setSelectedCertificationId(initializeGoalSettingCertificateIdState);
  };

  useEffect(() => {
    fetchDataAndUpdateState();
  }, []);

  return (
    <div className="flex flex-col gap-y-2">
      <GoalSettingTitle Icon={SelectCertificationIcon}>자격증 선택</GoalSettingTitle>

      <div onClick={modalHandler} className="goal-setting-content">
        <div className="relative flex items-center justify-between">
          <div className="flex gap-x-2 items-center">
            <SelectCertificationContentIcon />
            <div className="text-h4">{selectedCertificationName}</div>
          </div>
          {isModalOpen ? <DropDownOnIcon /> : <DropDownOffIcon />}
        </div>
      </div>
      {isModalOpen ? (
        <FilterModal
          setIsOpen={setIsModalOpen}
          setIdState={setSelectedCertificationId}
          setDataState={setSelectedCertificationName}
          data={interestCertificates}
          className={'absolute top-[134px] w-[90%]'}
        />
      ) : null}
    </div>
  );
};
export default SelectCertification;

function SelectCertificationIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={24} height={25} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <mask
        id="prefix__a"
        style={{
          maskType: 'alpha',
        }}
        maskUnits="userSpaceOnUse"
        x={0}
        y={0}
        width={24}
        height={25}>
        <path fill="#D9D9D9" d="M0 .5h24v24H0z" />
      </mask>
      <g mask="url(#prefix__a)">
        <path
          d="M7.125 16.106a.725.725 0 01-.534-.216.726.726 0 01-.216-.535c0-.212.072-.39.216-.534a.726.726 0 01.534-.215h1.971c.213 0 .39.072.535.216a.726.726 0 01.215.534c0 .213-.072.39-.215.534a.726.726 0 01-.535.216h-1.97zm0-3.693a.726.726 0 01-.534-.215.727.727 0 01-.216-.535c0-.212.072-.39.216-.534a.726.726 0 01.534-.215h10.779c.212 0 .39.071.534.215a.726.726 0 01.216.535c0 .212-.072.39-.216.534a.726.726 0 01-.534.216H7.125zm0-3.692a.725.725 0 01-.534-.216.726.726 0 01-.216-.534c0-.213.072-.39.216-.534a.726.726 0 01.534-.216h10.779c.212 0 .39.072.534.216a.726.726 0 01.216.535c0 .212-.072.39-.216.534a.726.726 0 01-.534.215H7.125zm8.68 10.902a.828.828 0 01-.63-.255l-2.66-2.658a.714.714 0 01-.22-.53.75.75 0 01.236-.54.735.735 0 01.534-.232c.202 0 .38.077.535.232l2.206 2.222 4.925-4.925a.713.713 0 01.53-.22c.204.001.385.08.541.235.144.155.218.33.223.527a.7.7 0 01-.225.527l-5.36 5.36a.835.835 0 01-.635.257zM3.349 8.798a.806.806 0 01-.59-.237.794.794 0 01-.24-.587c0-.234.08-.43.237-.59a.794.794 0 01.588-.24c.234 0 .43.08.59.237.16.158.24.354.24.588 0 .233-.08.43-.238.59a.794.794 0 01-.587.24zm0 3.692a.81.81 0 01-.595-.244.81.81 0 01-.244-.595c0-.233.081-.429.244-.587a.822.822 0 01.595-.237c.233 0 .43.079.587.237a.798.798 0 01.237.588.822.822 0 01-.237.594.786.786 0 01-.587.244zm0 3.702a.81.81 0 01-.595-.244.81.81 0 01-.244-.595c0-.233.081-.429.244-.587a.822.822 0 01.595-.237c.233 0 .43.079.587.237a.798.798 0 01.237.587.822.822 0 01-.237.595.786.786 0 01-.587.244z"
          fill="#6283FD"
        />
      </g>
    </svg>
  );
}
function SelectCertificationContentIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <mask
        id="prefix__a"
        style={{
          maskType: 'alpha',
        }}
        maskUnits="userSpaceOnUse"
        x={0}
        y={0}
        width={24}
        height={24}>
        <path fill="#D9D9D9" d="M0 0h24v24H0z" />
      </mask>
      <g mask="url(#prefix__a)">
        <path
          d="M5.615 20c-.46 0-.844-.154-1.152-.462A1.565 1.565 0 014 18.385V5.615c0-.46.154-.844.463-1.152A1.565 1.565 0 015.615 4h12.77c.46 0 .844.154 1.152.463.309.308.463.692.463 1.152v12.77c0 .46-.154.844-.462 1.152a1.565 1.565 0 01-1.153.463H5.615zM5 5.615v12.77c0 .153.064.294.192.423.129.128.27.192.423.192h12.77a.588.588 0 00.423-.192.588.588 0 00.192-.423V5.615a.588.588 0 00-.192-.423.588.588 0 00-.423-.192H16.5v5.414a.39.39 0 01-.202.36.375.375 0 01-.413-.012l-.975-.597a.715.715 0 00-.41-.13.715.715 0 00-.41.13l-.975.597a.375.375 0 01-.413.012.39.39 0 01-.202-.36V5H5.615a.588.588 0 00-.423.192.588.588 0 00-.192.423z"
          fill="#727375"
        />
      </g>
    </svg>
  );
}

function DropDownOffIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={20} height={20} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M13.5 8.5l-3.5 3-3.5-3" stroke="#000" strokeLinecap="round" />
    </svg>
  );
}

function DropDownOnIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={20} height={20} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M6.5 11.5l3.5-3 3.5 3" stroke="#000" strokeLinecap="round" />
    </svg>
  );
}
