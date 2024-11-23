'use client';

import React from 'react';
import { twMerge } from 'tailwind-merge';

interface Props {
  children?: React.ReactNode;
  className: string;
  Icon?: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
  onClick: (data?: Object) => void;
  onStep?: React.Dispatch<React.SetStateAction<string>>;
}
const Button = (props: Props) => {
  const { children, className, Icon, onClick, onStep } = props;
  return (
    <button
      onClick={() => {
        onClick();
        onStep ? onStep : null;
      }}
      className={twMerge('bg-blue-button', className)}>
      <div>{children}</div>
      <div className="mt-[2px]">{Icon ? <Icon /> : null}</div>
    </button>
  );
};
export default Button;
