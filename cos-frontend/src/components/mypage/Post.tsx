import Image from 'next/image';
import { useRouter } from 'next/navigation';
import type { SVGProps } from 'react';
import * as React from 'react';
import { useRecoilValue } from 'recoil';

import { certificateIdAtom } from '@/recoil/atom';

interface Props {
  title: string;
  postId: number;
  content: string;
  imageUrl?: string | null;
  likeCount: number;
  commentCount: number;
  createdAt: string;
  topElement?: JSX.Element | null;
  bottomElement?: React.JSX.Element | null;
}
const Post = (props: Props) => {
  const { title, postId, content, imageUrl, likeCount, commentCount, createdAt, bottomElement, topElement } = props;
  const certificateId = useRecoilValue(certificateIdAtom);
  const router = useRouter();

  const onMove = () => {
    router.push(`/community/${certificateId}/${postId}`);
  };

  const formatDate = (dateString: string) => {
    // ISO 8601 형식의 날짜 문자열을 Date 객체로 변환
    const date = new Date(dateString);

    // 연도, 월, 일을 추출
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    // 'YYYY.MM.DD' 형식으로 반환
    return `${year}.${month}.${day}`;
  };

  return (
    <div className={'flex flex-col gap-y-1 bg-white p-5 rounded-[32px]'}>
      <div
        onClick={() => {
          onMove();
        }}>
        {/*best 태그, 해설게시판 태그*/}
        {topElement ? topElement : null}
        <div className={'flex gap-x-3 items-center justify-between'}>
          <div className={imageUrl ? 'flex flex-col gap-y-1 w-[60%]' : 'flex flex-col gap-y-1 w-full'}>
            <div className={'text-h4 font-semibold truncate'}>{title}</div>
            <div className={'text-h4 font-normal line-clamp-2'}>{content}</div>
            {/*좋아요 수, 댓글 수*/}
            <div className={'flex gap-x-2'}>
              <div className={'flex items-center'}>
                <LikeIcon />
                <span className={'text-h6 text-second'}>{likeCount}</span>
              </div>
              <div className={'flex items-center'}>
                <CommentIcon />
                <span className={'text-h6 text-point'}>{commentCount}</span>
              </div>
            </div>
          </div>
          {imageUrl ? (
            <div className={'relative h-[104px] w-[100px]'}>
              <Image src={imageUrl} alt={imageUrl} fill className={'object-cover rounded-[5px]'} />
            </div>
          ) : null}
        </div>
      </div>

      {/*작성일*/}
      <div className={'text-h6 text-gray3'}>작성일 {formatDate(createdAt)}</div>

      {/*수정, 삭제버튼*/}
      {bottomElement ? bottomElement : null}
    </div>
  );
};
export default Post;

const LikeIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" {...props}>
    <mask
      id="a"
      width={24}
      height={24}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: 'alpha',
      }}>
      <path fill="#D9D9D9" d="M0 0h24v24H0z" />
    </mask>
    <g mask="url(#a)">
      <path
        fill="#3B3DFF"
        d="M20.2 9.3q.575 0 1.038.463.462.462.462 1.037v1q0 .13-.025.277-.025.149-.075.273l-2.651 6.303a1.7 1.7 0 0 1-.674.747q-.475.3-.984.3H7.55V9.3l5.525-5.475a.8.8 0 0 1 .375-.225.5.5 0 0 1 .375.05q.175.1.25.3t.025.425l-1 4.925zm-11.95.3V19h9.05q.274 0 .563-.15a.97.97 0 0 0 .437-.5L21 12v-1.2a.78.78 0 0 0-.225-.575A.78.78 0 0 0 20.2 10h-7.95l1.1-5.45zM4.8 19.7q-.618 0-1.06-.44a1.44 1.44 0 0 1-.44-1.06v-7.4q0-.619.44-1.06.442-.44 1.06-.44h2.75v.7H4.8a.78.78 0 0 0-.575.225A.78.78 0 0 0 4 10.8v7.4q0 .35.225.575T4.8 19h2.75v.7z"
      />
    </g>
  </svg>
);

const CommentIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" {...props}>
    <mask
      id="a"
      width={24}
      height={24}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: 'alpha',
      }}>
      <path fill="#D9D9D9" d="M0 0h24v24H0z" />
    </mask>
    <g mask="url(#a)">
      <path
        fill="#FF6A3B"
        d="M4.35 16.2q-.474-1-.763-2.05A8 8 0 0 1 3.3 12q0-1.806.685-3.393a8.8 8.8 0 0 1 1.858-2.762 8.8 8.8 0 0 1 2.761-1.86 8.5 8.5 0 0 1 3.392-.685q1.804 0 3.393.685a8.8 8.8 0 0 1 2.764 1.858 8.8 8.8 0 0 1 1.861 2.761 8.5 8.5 0 0 1 .686 3.392 8.5 8.5 0 0 1-.685 3.393 8.8 8.8 0 0 1-1.86 2.764 8.8 8.8 0 0 1-2.762 1.861A8.5 8.5 0 0 1 12 20.7q-1.1 0-2.15-.288-1.05-.287-2.05-.762l-3.584 1.048a.68.68 0 0 1-.729-.186.68.68 0 0 1-.186-.729zm-.4 3.85 3.2-.95q.4-.1.712-.1.313 0 .688.2a7.4 7.4 0 0 0 1.675.6Q11.1 20 12 20q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4 6.325 6.325Q4 8.649 4 12q0 .9.2 1.775t.6 1.675q.175.325.2.687a1.7 1.7 0 0 1-.1.713z"
      />
    </g>
  </svg>
);
