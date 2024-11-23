'use client';

import React, { ReactNode } from 'react';

export interface DoneButtonProps {
  children: ReactNode;
  onNext: () => void;
  postData?: () => void;
}

const DoneButton: React.FC<DoneButtonProps> = ({ children, onNext, postData }) => {
  return (
    <button
      className={
        'w-full bg-gray2 h-[100px] rounded-t-[32px] text-white text-h3 fixed bottom-0 hover:bg-primary transition'
      }
      onClick={() => {
        if (postData) {
          postData();
        }
        onNext();
      }}>
      <div className="text-white text-h3 py-[25px]">{children}</div>
    </button>
  );
};
export default DoneButton;
