//댓글 입력하는 칸
//link부분 수정 필요함
'use client';

import React, { FormEvent, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { KeyedMutator } from 'swr';

import { postCommentData } from '@/lib/api/communityPost';
import { GenerateCommentState } from '@/recoil/community/atom';
import { ResponsePostDetailType } from '@/types/global';

interface Props {
  link?: string; //버튼 눌렀을 때 데이터를 저장하는 경로 입력, api연결하면서 "?"수정 필요함
  padding?: string; //pl설정
  commentId?: number; //부모댓글 id
  postId: number; //포스트 id
  communityPostDataMutate: KeyedMutator<ResponsePostDetailType>; // communityPostData를 바로 불러오는 mutate함수
  setReplyOnOff?: React.Dispatch<React.SetStateAction<boolean>>;
}

const CommentWriting = (props: Props) => {
  const { link, padding, commentId, postId, communityPostDataMutate, setReplyOnOff } = props;
  const [generateComment, setGenerateComment] = useRecoilState(GenerateCommentState);

  useEffect(() => {
    if (commentId != null) {
      //부모댓글이 있을 때(대댓글일 때)
      setGenerateComment({ ...generateComment, parentCommentId: commentId });
    }
  }, [commentId]);

  /**
   * form 형식 제출 함수
   */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault(); // 폼 제출 시 새로고침 방지

    try {
      await postCommentData(postId, generateComment).then(() => {
        communityPostDataMutate();
      }); // API 호출
      setGenerateComment({ ...generateComment, content: '', parentCommentId: null });
      if (setReplyOnOff) {
        setReplyOnOff(false);
      }
    } catch (error) {
      console.error('댓글 제출 중 오류 발생:', error);
    }
  };

  return (
    <div className={padding}>
      <form
        onSubmit={handleSubmit}
        className="mt-6 mb-3 w-full h-14 px-4 py-2 bg-gray0 rounded-2xl border border-white justify-between items-center inline-flex ">
        <textarea
          className="text-gray4 text-[15px] font-normal font-['Pretendard Variable'] leading-snug bg-gray0 w-full outline-none "
          maxLength={500}
          value={generateComment.content}
          placeholder="의견을 남겨주세요."
          onChange={(e) => {
            setGenerateComment({ ...generateComment, content: e.target.value }); //textarea의 내용으로 content값을 바꿈
          }}></textarea>
        <div className="w-10 h-10 relative">
          <button type="submit" className="w-10 h-10 left-0 top-0 absolute bg-indigo-600 grid place-content-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="29" fill="none" viewBox="0 0 30 29">
              <path
                fill="#3B3DFF"
                d="M14.146 11.07v8.152c0 .147.046.267.14.36a.49.49 0 0 0 .361.14.533.533 0 0 0 .54-.542v-8.11l3.514 3.513a.4.4 0 0 0 .34.118.546.546 0 0 0 .34-.16.455.455 0 0 0 .14-.333.502.502 0 0 0-.14-.347l-3.874-3.833a1.12 1.12 0 0 0-.82-.347 1.12 1.12 0 0 0-.819.347l-3.875 3.875a.522.522 0 0 0-.139.333c0 .111.046.213.139.306a.471.471 0 0 0 .347.139c.14 0 .25-.047.334-.14l3.472-3.472ZM14.653 29c-2.005 0-3.885-.38-5.642-1.141a14.749 14.749 0 0 1-4.607-3.112 14.728 14.728 0 0 1-3.115-4.602C.526 18.392.145 16.512.145 14.507s.38-3.89 1.141-5.655a14.538 14.538 0 0 1 3.112-4.607A14.848 14.848 0 0 1 9 1.143C10.754.38 12.634 0 14.64 0c2.004 0 3.89.38 5.655 1.141 1.765.761 3.301 1.794 4.607 3.098a14.634 14.634 0 0 1 3.102 4.602c.762 1.763 1.143 3.647 1.143 5.652 0 2.005-.38 3.885-1.142 5.641a14.869 14.869 0 0 1-3.097 4.608 14.519 14.519 0 0 1-4.602 3.115C18.542 28.62 16.658 29 14.653 29Zm-.007-1c3.759 0 6.949-1.31 9.57-3.93 2.62-2.62 3.93-5.81 3.93-9.57 0-3.76-1.31-6.95-3.93-9.57C21.594 2.31 18.404 1 14.645 1c-3.76 0-6.95 1.31-9.57 3.93s-3.93 5.81-3.93 9.57c0 3.76 1.31 6.95 3.93 9.57s5.81 3.93 9.57 3.93Z"
              />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};
export default CommentWriting;
