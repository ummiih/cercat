//커뮤니티 댓글

'use client';

import { format } from 'date-fns';
import React, { useEffect } from 'react';

import { PostComments } from '@/types/global';

import CommentContent from './CommentContent';
import CommunityProfile from './CommunityProfile';

interface Props {
  isWriter: boolean;
  onClick: () => void; //답글달기 버튼 클릭 시 동작
  info: PostComments; //하위 컴포넌트에 넘겨줄 데이터
  profileModal?: () => void; //프로필의 ...버튼 클릭 시 동작
  DdabongClick?: () => void; //추천버튼 클릭 시 동작
}

const Comment = (props: Props) => {
  const { isWriter, onClick, info, profileModal, DdabongClick } = props;
  useEffect(() => {
    console.log('info', info);
  }, [info]);

  return (
    <div className="py-5">
      <CommunityProfile
        isWriter={isWriter}
        fontsizing={false} //폰트 사이즈를 크게 함
        date={
          info.dateTime.createdAt
            ? format(info.dateTime.createdAt, 'yy.MM.dd')
            : format(info.dateTime.modifiedAt, 'yy.MM.dd')
        }
        time={
          info.dateTime.createdAt ? format(info.dateTime.createdAt, 'HH:mm') : format(info.dateTime.modifiedAt, 'HH:mm')
        }
        imgSrc={info.user.profileImage}
        onClick={profileModal}>
        {/* ...버튼 클릭 시 동작 */}
        {info.user.nickname}
      </CommunityProfile>
      <CommentContent
        reply={true} //답글달기 유무
        onClick={onClick} //답글달기 버튼 클릭 시 동작
        ddabonhNumber={info.likeCount} //댓글 좋아요 수
        content={info.content} //내용
        isLike={info.isLiked} //사용자 좋아요 클릭 여부
        DdabongClick={DdabongClick}
      />
    </div>
  );
};
export default Comment;
