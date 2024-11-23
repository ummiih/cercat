'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

import CertificationPriority from '@/components/onboarding/CertificationPriority';
import ChooseCertification from '@/components/onboarding/ChooseCertification';
import ProfileSettings from '@/components/onboarding/ProfileSettings';

const OnBoardingComponents = () => {
  const parameter = useSearchParams();
  const accessToken: string | null = parameter.get('accessToken');
  const refreshToken: string | null = parameter.get('refreshToken');

  const [step, setStep] = useState<'ProfileSetting' | 'ChooseCertification' | 'CertificationPriority'>(
    'ProfileSetting',
  );
  const router = useRouter();

  const moveUnSignUp = () => {
    router.push('/');
  };

  const moveHome = () => {
    router.push('/home');
  };

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
    }
    if (refreshToken) {
      localStorage.setItem('refreshToken', refreshToken);
    }
  }, [accessToken, refreshToken]);

  return (
    <main>
      {step === 'ProfileSetting' && (
        <ProfileSettings onNext={() => setStep('ChooseCertification')} onBefore={moveUnSignUp} />
      )}
      {step === 'ChooseCertification' && (
        <ChooseCertification
          onNext={() => setStep('CertificationPriority')}
          onBefore={() => setStep('ProfileSetting')}
        />
      )}
      {step === 'CertificationPriority' && (
        <CertificationPriority onNext={moveHome} onBefore={() => setStep('ChooseCertification')} />
      )}
    </main>
  );
};
export default function OnBoarding() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OnBoardingComponents />
    </Suspense>
  );
}
