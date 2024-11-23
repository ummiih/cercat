'use client';

import { useState } from 'react';

import AutoSubmitTimeUpModal from '@/components/exam/AutoSubmitTimeUpModal';
import Question from '@/components/exam/Question';
import SubmitConfirmationModal from '@/components/exam/SubmitConfirmationModal';
import TestSubmitOrCancel from '@/components/exam/TestSubmitOrCancle';
import UnsavedChangesWarningModal from '@/components/exam/UnsavedChangesWarningModal';

const Test = () => {
  const [isUnsavedChangesWarningModalOpen, setIsUnsavedChangesWarningModalOpen] = useState(false);
  const [isSubmitConfirmationModalOpen, setIsSubmitConfirmationModalOpen] = useState(false);
  const [isAutoSubmitTimeUpModalOpen, setIsAutoSubmitTimeUpModalOpen] = useState(false);

  return (
    <>
      <div>
        {/*그만두기 버튼 클릭시 모달칭*/}
        {isUnsavedChangesWarningModalOpen ? (
          <UnsavedChangesWarningModal
            setIsUnsavedChangesWarningModalOpen={setIsUnsavedChangesWarningModalOpen}
            isUnsavedChangesWarningModalOpen={isUnsavedChangesWarningModalOpen}
          />
        ) : null}

        {/*제출하기 버튼 클릭시 모달칭*/}
        {isSubmitConfirmationModalOpen ? (
          <SubmitConfirmationModal
            isSubmitConfirmationModalOpen={isSubmitConfirmationModalOpen}
            setIsSubmitConfirmationModalOpen={setIsSubmitConfirmationModalOpen}
          />
        ) : null}

        {/*시험 시간이 종료 되었을 때 모달칭*/}
        {isAutoSubmitTimeUpModalOpen ? (
          <AutoSubmitTimeUpModal
            isAutoSubmitTimeUpModalOpen={isAutoSubmitTimeUpModalOpen}
            setIsAutoSubmitTimeUpModalOpen={setIsAutoSubmitTimeUpModalOpen}
          />
        ) : null}

        {/*Header*/}
        <TestSubmitOrCancel
          isUnsavedChangesWarningModalOpen={isUnsavedChangesWarningModalOpen}
          setIsUnsavedChangesWarningModalOpen={setIsUnsavedChangesWarningModalOpen}
          isSubmitConfirmationModalOpen={isSubmitConfirmationModalOpen}
          setIsSubmitConfirmationModalOpen={setIsSubmitConfirmationModalOpen}
          isAutoSubmitTimeUpModalOpen={isAutoSubmitTimeUpModalOpen}
          setIsAutoSubmitTimeUpModalOpen={setIsAutoSubmitTimeUpModalOpen}
        />
        <Question />
      </div>
    </>
  );
};

export default Test;
