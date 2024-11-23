'use client';

import React, { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';
import { KeyedMutator } from 'swr';

import Header from '@/components/common/Header';
import { postInterestCertificates } from '@/lib/api/onboarding';
import { interestCertificatesState } from '@/recoil/onboarding/atom';
import { InterestCertificateOnboarding, InterestCertificateResponseType } from '@/types/global';

export interface CertificationPriorityProps {
  onNext: () => void;
  onBefore: () => void;
  interestCertificateDataMutate?: KeyedMutator<InterestCertificateResponseType>;
}

const CertificationPriority: React.FC<CertificationPriorityProps> = ({
  onNext,
  onBefore,
  interestCertificateDataMutate,
}) => {
  const [interestCertificates, setInterestCertificates] = useRecoilState(interestCertificatesState);
  const [isClickedDoneButton, setIsClickedDoneButton] = useState(false); // 제출할 때, useEffect 를 움직이기 위한 트리거
  // 드래그 앤 드롭 작업이 끝났을 때 호출되는 함수입니다. 자격증의 순서를 변경합니다.
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const reorderedCertificates = Array.from(interestCertificates.interestTargetList);
    const [selectedCertificate] = reorderedCertificates.splice(result.source.index, 1);
    reorderedCertificates.splice(result.destination.index, 0, selectedCertificate);

    setInterestCertificates(() => ({ interestTargetList: reorderedCertificates }));
  };

  // 자격증 객체에서 certificateName 속성을 제거합니다. API 요청을 위한 데이터 정제 과정입니다.
  const sanitizeCertificates = (certificates: InterestCertificateOnboarding[]) =>
    certificates.map(({ certificateName, ...rest }) => rest);

  // 각 자격증에 새로운 우선 순위를 할당합니다. 이는 사용자가 설정한 드래그 앤 드롭 순서에 기반합니다.
  const updateCertificatesPriority = (certificates: InterestCertificateOnboarding[]) =>
    certificates.map((certificate, index) => ({
      ...certificate,
      interestPriority: ['HIGH', 'NORMAL', 'LOW'][index] || certificate.interestPriority,
    }));

  // 우선 순위가 업데이트된 자격증 목록을 서버에 전송하고, 로컬 상태를 업데이트합니다.
  const handleSubmit = () => {
    const prioritizedCertificates = updateCertificatesPriority(interestCertificates.interestTargetList);
    const sanitizedCertificates = sanitizeCertificates(prioritizedCertificates);
    setInterestCertificates(() => ({ interestTargetList: sanitizedCertificates }));
    setIsClickedDoneButton(true);
  };

  // post 요청
  useEffect(() => {
    if (!interestCertificates.interestTargetList[0].certificateName && isClickedDoneButton) {
      postInterestCertificates(interestCertificates).then((r) => {
        console.log('r', r);
      });
    }
  }, [isClickedDoneButton]);

  return (
    <div>
      <Header headerType={'dynamic'} onBack={onBefore} title={'종목설정'}></Header>

      <div className="grid gap-y-8 m-4">
        <div className="grid">
          <span className="text-h1 font-bold">
            우선 순위대로 <br /> 자격증을 설정해주세요
          </span>
          <span className="text-h5 text-gray4">우선 순위가 높은 종목부터 맨위로 끌어다 놓으세요.</span>
        </div>

        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="certificates">
            {(provided) => (
              <div className="grid gap-y-[16px]" ref={provided.innerRef} {...provided.droppableProps}>
                {interestCertificates.interestTargetList.map(({ certificateId, certificateName }, index) => (
                  <Draggable key={certificateId} draggableId={certificateId.toString()} index={index}>
                    {(provided) => (
                      <div
                        className="w-full h-16 bg-gray0 rounded-full flex items-center gap-x-3 p-2"
                        ref={provided.innerRef}
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}>
                        <div className="w-12 h-12 rounded-full bg-white p-[10px]">
                          <Icon />
                        </div>
                        <div className="text-h4 font-semibold">{certificateName}</div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>

      <button
        className={
          'w-full bg-gray2 h-[100px] rounded-t-[32px] text-white text-h3 fixed bottom-0 hover:bg-primary transition'
        }
        onClick={() => {
          handleSubmit();
          onNext();
          interestCertificateDataMutate ? interestCertificateDataMutate : null;
        }}>
        <div className="text-white text-h3 py-[25px]">완료</div>
      </button>
    </div>
  );
};

export default CertificationPriority;

function Icon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5.16024 20.1474C5.0204 20.1474 4.90317 20.0997 4.80855 20.0042C4.71396 19.9088 4.66666 19.7905 4.66666 19.6493C4.66666 19.5082 4.71396 19.3914 4.80855 19.299C4.90317 19.2065 5.0204 19.1602 5.16024 19.1602H22.8397C22.9796 19.1602 23.0968 19.208 23.1914 19.3034C23.286 19.3989 23.3333 19.5172 23.3333 19.6583C23.3333 19.7994 23.286 19.9162 23.1914 20.0087C23.0968 20.1012 22.9796 20.1474 22.8397 20.1474H5.16024ZM5.16024 14.4936C5.0204 14.4936 4.90317 14.4458 4.80855 14.3504C4.71396 14.2549 4.66666 14.1366 4.66666 13.9955C4.66666 13.8544 4.71396 13.7376 4.80855 13.6451C4.90317 13.5526 5.0204 13.5064 5.16024 13.5064H22.8397C22.9796 13.5064 23.0968 13.5541 23.1914 13.6496C23.286 13.745 23.3333 13.8633 23.3333 14.0044C23.3333 14.1455 23.286 14.2623 23.1914 14.3548C23.0968 14.4473 22.9796 14.4936 22.8397 14.4936H5.16024ZM5.16024 8.83971C5.0204 8.83971 4.90317 8.79198 4.80855 8.6965C4.71396 8.60105 4.66666 8.48277 4.66666 8.34166C4.66666 8.20054 4.71396 8.08373 4.80855 7.99126C4.90317 7.89878 5.0204 7.85254 5.16024 7.85254H22.8397C22.9796 7.85254 23.0968 7.90027 23.1914 7.99572C23.286 8.09117 23.3333 8.20946 23.3333 8.35059C23.3333 8.4917 23.286 8.60849 23.1914 8.70097C23.0968 8.79347 22.9796 8.83971 22.8397 8.83971H5.16024Z"
        fill="#0D0E10"
      />
    </svg>
  );
}
