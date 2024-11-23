import { useRouter } from 'next/navigation';
import { SVGProps } from 'react';
import * as React from 'react';

import { ItemType } from '@/types/mypage/type';
interface Props {
  category: string;
  contents: ItemType[];
}

const MyPageItem = (props: Props) => {
  const { category, contents } = props;
  const router = useRouter();

  return (
    <div className={'flex flex-col gap-y-3 bg-white rounded-[24px] p-4'}>
      <div className={'text-h6 text-gray4'}>{category}</div>
      <div className={'flex flex-col gap-y-2'}>
        {contents.map((content: ItemType, index: number) => {
          return (
            <div key={index} className={'px-5 py-5 flex justify-between bg-gray0 rounded-[16px] '}>
              <div className={'text-h6'}>{content.title}</div>
              {content.version ? (
                <div className={'text-h6 text-gray3'}>{content.version}</div>
              ) : (
                <MoveIcon
                  onClick={() => {
                    if (content.path) {
                      router.push(content.path);
                    }
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default MyPageItem;

const MoveIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={21} fill="none" {...props}>
    <path stroke="#9E9FA1" strokeLinecap="round" strokeLinejoin="round" d="m7.5 5.5 5 5-5 5" />
  </svg>
);
