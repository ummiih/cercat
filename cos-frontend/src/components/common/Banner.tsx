import Link from 'next/link';
import type { SVGProps } from 'react';
import * as React from 'react';

interface Props {
  title: string;
  buttonText: string;
  href?: string;
  setIsRandomMockExamModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Banner(props: Props) {
  const { title, buttonText, href, setIsRandomMockExamModalOpen } = props;

  return (
    <div className="py-[16px] px-[16px] rounded-[32px] bg-second">
      <div className="flex flex-col gap-y-3">
        <div className="text-white text-left text-h3 my-1">{title}</div>
        <Link href={href || ''}>
          <div
            onClick={() => {
              if (setIsRandomMockExamModalOpen) {
                setIsRandomMockExamModalOpen(true);
              }
            }}
            className="flex px-[12px] py-1 rounded-full items-center w-fit bg-white text-blue text-h6">
            {buttonText}
            <MoveIcon />
          </div>
        </Link>
      </div>
    </div>
  );
}

const MoveIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={17} height={17} fill="none" {...props}>
    <path stroke="#6283FD" strokeLinecap="round" strokeLinejoin="round" d="m5.75 11.5 6-6M5.75 5.5h6v6" />
  </svg>
);
