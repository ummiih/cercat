import 'react-responsive-carousel/lib/styles/carousel.min.css';

import Image from 'next/image';
import type { SVGProps } from 'react';
import * as React from 'react';
import { Carousel } from 'react-responsive-carousel';
import { useRecoilValue } from 'recoil';

import useBest3TipPosts from '@/lib/hooks/useBest3TipPosts';
import { certificateIdAtom } from '@/recoil/atom';

const CarouselCardView = () => {
  const certificateId = useRecoilValue(certificateIdAtom);
  const { bestTipPosts } = useBest3TipPosts(certificateId);

  function formatDate(isoString: string) {
    const date = new Date(isoString);
    const year = date.getFullYear().toString().slice(2); // 마지막 두 자리만 사용
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 월은 0부터 시작하므로 +1
    const day = date.getDate().toString().padStart(2, '0'); // 일자
    return `${year}.${month}.${day}`;
  }

  return (
    <div className="mx-auto max-w-7xl">
      <Carousel
        showThumbs={false}
        showStatus={false}
        infiniteLoop={true}
        autoPlay={true}
        interval={6000}
        showArrows={true}
        renderIndicator={(onClickHandler, isSelected, index, label) => {
          const indicatorClasses = `inline-block h-2 w-2 mr-2 rounded-full ${isSelected ? 'bg-black' : 'bg-gray2'}`;
          return (
            <button
              type="button"
              onClick={onClickHandler}
              className={indicatorClasses}
              aria-label={`Slide ${index}`}
              title={`${index + 1}`}
            />
          );
        }}>
        {bestTipPosts?.map((bestTipPost) => {
          return (
            <div key={bestTipPost.postId} className={'mx-[21.5px] mt-[12px] p-5 bg-gray0 rounded-[24px] mb-10'}>
              <div className={'relative w-full h-[100px]'}>
                <Image
                  src={bestTipPost.postContent.images[0].imageUrl}
                  alt={bestTipPost.postContent.images[0].imageUrl}
                  fill
                  className={'object-cover rounded-[16px]'}
                />
              </div>
              <div className={'text-h3 mt-[12px]'}>{bestTipPost.postContent.title}</div>
              <div className={'mt-[8px] text-gray4 line-clamp-4'}>{bestTipPost.postContent.content}</div>
              <div className={'mt-[24px] flex justify-between'}>
                <div className={'flex flex-col justify-start items-start'}>
                  <div className={'text-h6 text-gray3'}>
                    {formatDate(
                      bestTipPost.dateTime.modifiedAt
                        ? bestTipPost.dateTime.modifiedAt
                        : bestTipPost.dateTime.createdAt,
                    )}
                  </div>
                  <div className={'text-h6 text-gray3'}>{bestTipPost.user.nickname}</div>
                </div>
                <div>
                  <LikeCountIcon />
                  <div className={'text-blue text-[13px]'}>{bestTipPost.postStatus.likeCount}</div>
                </div>
              </div>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default CarouselCardView;

const LikeCountIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={25} height={24} fill="none" {...props}>
    <mask
      id="a"
      width={25}
      height={24}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: 'alpha',
      }}>
      <path fill="#D9D9D9" d="M.5 0h24v24H.5z" />
    </mask>
    <g mask="url(#a)">
      <path
        fill="#6283FD"
        d="M20.7 9.3q.575 0 1.038.462.462.463.462 1.038v1a1.7 1.7 0 0 1-.1.55l-2.65 6.3q-.2.45-.675.75t-.975.3H9.55q-.625 0-1.062-.437A1.45 1.45 0 0 1 8.05 18.2V9.925q0-.3.125-.588A1.6 1.6 0 0 1 8.5 8.85l5.075-5.025a.8.8 0 0 1 .375-.225.57.57 0 0 1 .375.025q.175.075.25.275a.9.9 0 0 1 .025.475l-1 4.925zM5.3 19.7q-.625 0-1.062-.437A1.45 1.45 0 0 1 3.8 18.2v-7.4q0-.625.438-1.063A1.45 1.45 0 0 1 5.3 9.3h.55q.624 0 1.063.437.437.438.437 1.063v7.425q0 .625-.437 1.05a1.47 1.47 0 0 1-1.063.425z"
      />
    </g>
  </svg>
);
