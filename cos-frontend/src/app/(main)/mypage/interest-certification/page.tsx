'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import CertificationPriority from '@/components/onboarding/CertificationPriority';
import ChooseCertification from '@/components/onboarding/ChooseCertification';
import useGetInterestCertificates from '@/lib/hooks/useGetInterestCertificates';

const EditInterestCertification = () => {
  const [step, setStep] = useState<'ChooseCertification' | 'CertificationPriority'>('ChooseCertification');
  const router = useRouter();
  // 나의 관심 자격증 목록 바로 불러오기
  const { interestCertificateDataMutate } = useGetInterestCertificates();

  const moveMyPage = () => {
    router.push('/mypage');
  };

  return (
    <main>
      {step === 'ChooseCertification' && (
        <ChooseCertification onNext={() => setStep('CertificationPriority')} onBefore={moveMyPage} />
      )}
      {step === 'CertificationPriority' && (
        <CertificationPriority
          onNext={moveMyPage}
          onBefore={() => setStep('ChooseCertification')}
          interestCertificateDataMutate={interestCertificateDataMutate}
        />
      )}
    </main>
  );
};
export default EditInterestCertification;
