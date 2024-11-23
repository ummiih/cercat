import React, { useCallback, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import Post from '@/components/mypage/Post';
import useGetUserPosts from '@/lib/hooks/useGetUserPosts';
import { PostType } from '@/types/community/type';
import { MyPageBoardType, MyPostsResponseType } from '@/types/mypage/type';

interface Props {
  boardType: MyPageBoardType;
  isDeleteWarningModalOpen: boolean;
  setIsDeleteWarningModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setDeletePostId: React.Dispatch<React.SetStateAction<number>>;
  selectedFilterContent: '최신순' | '인기순';
  setIsClickEditPost: React.Dispatch<React.SetStateAction<boolean>>;
}
const MyPageCommentaryBoardList = (props: Props) => {
  const {
    boardType,
    isDeleteWarningModalOpen,
    setIsDeleteWarningModalOpen,
    setDeletePostId,
    selectedFilterContent,
    setIsClickEditPost,
  } = props;
  const [ref, inView] = useInView();
  const { userPostsList, setSize } = useGetUserPosts(boardType, selectedFilterContent == '최신순' ? 'DESC' : 'ASC');
  /**
   * 무한 스크롤 뷰 감지하고 size+1 해줌
   */
  const getMoreItem = useCallback(async () => {
    if (userPostsList) {
      await setSize((prev: number) => prev + 1);
    }
    return;
  }, [userPostsList]);

  useEffect(() => {
    if (inView) {
      getMoreItem();
    }
  }, [inView, getMoreItem]);

  const commentaryTopElement = (year: number, round: number, number: number) => {
    return (
      <div className={'flex gap-x-[6px] pb-3'}>
        <div className={'px-2 py-[2px] text-gray4 bg-gray0 rounded-[8px]'}>{year}년도</div>
        <div className={'px-2 py-[2px] text-gray4 bg-gray0 rounded-[8px]'}>{round}회차</div>
        <div className={'px-2 py-[2px] text-gray4 bg-gray0 rounded-[8px]'}>{number}번</div>
      </div>
    );
  };

  const bottomElement = (postId: number) => {
    return (
      <div className={'flex justify-end gap-x-2'}>
        <button
          onClick={() => {
            setIsClickEditPost(true);
            setDeletePostId(postId);
          }}
          className={'bg-gray0 py-2 px-4 rounded-[12px]'}>
          수정
        </button>
        <button
          onClick={() => {
            setIsDeleteWarningModalOpen(!isDeleteWarningModalOpen);
            setDeletePostId(postId);
          }}
          className={'bg-black text-white py-2 px-4 rounded-[12px]'}>
          삭제
        </button>
      </div>
    );
  };

  return (
    <>
      <div className={'flex flex-col gap-y-4'}>
        {userPostsList.map((userPosts: MyPostsResponseType) => {
          return userPosts?.result.content.map((userPost: PostType) => {
            return (
              <div key={userPost.postId} ref={ref}>
                <Post
                  postId={userPost.postId}
                  content={userPost.postContent.content}
                  title={userPost.postContent.title}
                  commentCount={userPost.postStatus.commentCount}
                  createdAt={userPost.dateTime.modifiedAt ? userPost.dateTime.modifiedAt : userPost.dateTime.createdAt}
                  bottomElement={bottomElement(userPost.postId)}
                  imageUrl={userPost.postContent.images.length !== 0 ? userPost.postContent.images[0].imageUrl : null}
                  likeCount={userPost.postStatus.likeCount}
                  topElement={
                    userPost.question
                      ? commentaryTopElement(
                          userPost.question.mockExam.examYear,
                          userPost.question.mockExam.round,
                          userPost.question.questionSeq,
                        )
                      : null
                  }></Post>
              </div>
            );
          });
        })}
      </div>
    </>
  );
};
export default MyPageCommentaryBoardList;
