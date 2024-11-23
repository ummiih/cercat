'use client';
import { format } from 'date-fns';
import { useParams } from 'next/navigation';
import React, { useState } from 'react';
import { SVGProps } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import Header from '@/components/common/Header';
import NavBar from '@/components/common/NavBar';
import Comment from '@/components/community/Comment';
import CommentBar from '@/components/community/CommentBar';
import CommentReply from '@/components/community/CommentReply';
import CommentWriting from '@/components/community/CommentWriting';
import CommunityPost from '@/components/community/CommunityPosting';
import CommunityProfile from '@/components/community/CommunityProfile';
import CommunityTag from '@/components/community/CommunityTag';
import EditPost from '@/components/community/EditPost';
import PostingModal from '@/components/community/PostingModal';
import Question from '@/components/community/Question';
import { postToggleLikeData } from '@/lib/api/communityPost';
import useBest3TipPosts from '@/lib/hooks/useBest3TipPosts';
import useGetCommunityPost from '@/lib/hooks/useGetCommunityPost';
import useGetLikeStatus from '@/lib/hooks/useGetLikeStatus';
import useGetUserProfile from '@/lib/hooks/useGetUserProfile';
import { certificateIdAtom } from '@/recoil/atom';
import { commentDeleteState, commentModalState, postDeleteState, postingModalState } from '@/recoil/community/atom';
import { PostComments, RecommendTags } from '@/types/global';

const CommunityDetailPage = () => {
  const params = useParams();
  const certificateId = useRecoilValue(certificateIdAtom);
  //커뮤니티 포스트에 해당하는 데이터를 가져옴
  const { communityPostData, isLoading, isError, communityPostDataMutate } = useGetCommunityPost(params.id);
  //댓글의 답글달기 버튼을 클릭했을 때 사용
  const [replyOnOff, setReplyOnOff] = useState<boolean>(false);
  //몇번째 댓글의 답글달기 버튼이 클릭됐는지 확인하기 위해 사용
  const [commentNumber, setCommentNumber] = useState<number>(0);
  //대댓글을 달 때 부모댓글의 아이디를 넘겨주기 위해 사용
  const [parentId, setParentId] = useState<number>(0);
  //포스팅 삭제 및 수정기능 모달창 관련 조작
  const [onPostModal, setOnPostModal] = useRecoilState(postingModalState);
  //댓글 삭제 모달창 관련 조작
  const [onCommentModal, setOnCommentModal] = useRecoilState(commentModalState);
  //삭제하는 댓글의 아이디를 넘기기 위해 사용
  const [commentDelete, setCommentDelete] = useRecoilState(commentDeleteState);
  //삭제하는 글의 아이디를 넘기기 위해 사용
  const [postDelete, setPostDelete] = useRecoilState(postDeleteState);
  const [likeTargetType, setLikeTargetType] = useState<'POST' | 'COMMENT'>('POST');
  const { likeStatus, likeStatusMutate } = useGetLikeStatus(likeTargetType, params.id);
  //현재 사용자 정보 가져오기, (글, 댓글) 작성자인지 아닌지 체크하기 위함.
  const { userProfile } = useGetUserProfile();
  //해설 게시글 문제보기 버튼을 클릭했는지 체크하기 위해 사용
  const [isClickQuestionButton, setIsClickQuestionButton] = useState(false);
  //꿀팁 게시판 Best 태그
  const { bestTipPosts } = useBest3TipPosts(certificateId);
  //수정 modal
  const [isClickEditPost, setIsClickEditPost] = useState(false);

  //답글달기 버튼 클릭시에 사용
  const commentReplyControll = (index: number, id: number) => {
    setReplyOnOff(!replyOnOff); //대댓글 작성란을 열고 닫음
    setParentId(id); //대댓글의 부모 아이디 저장
    setCommentNumber(index); //몇 번째 댓글에 대댓글 작성란을 열 것인지 저장
  };

  /**
   * 좋아요 버튼 클릭시 이벤트 함수
   * @param likeTargetType 'POST' | 'COMMENT', 게시글의 댓글인지 댓글의 대댓글인지
   * @param id 어떤 것의 댓글 or 대댓글을 달건지
   */
  const handlePostLikeClick = async (likeTargetType: 'POST' | 'COMMENT', id: number) => {
    // 상태 업데이트를 기다리는 Promise 사용
    await new Promise<void>((resolve) => {
      setLikeTargetType(likeTargetType);
      resolve();
    });

    // 상태 업데이트가 완료된 후에 나머지 로직을 실행
    await postToggleLikeData(id, likeTargetType);
    await likeStatusMutate();
    await communityPostDataMutate();
  };

  return (
    <>
      {onPostModal ? ( //글 삭제 및 수정 모달창
        <PostingModal
          editOnOff={true}
          afterDelete="/community/Comhwal_level1/"
          postId={params.id}
          setIsClickEditPost={setIsClickEditPost}>
          글 메뉴
        </PostingModal>
      ) : null}
      {/* 댓글 삭제 모달창 */}
      {onCommentModal ? (
        <PostingModal editOnOff={false} postId={params.id}>
          댓글 메뉴
        </PostingModal>
      ) : null}
      {isClickQuestionButton ? (
        <Question
          isClickQuestionButton={isClickQuestionButton}
          setIsClickQuestionButton={setIsClickQuestionButton}
          examYear={communityPostData?.postResponse?.question?.mockExam.examYear}
          questionSeq={communityPostData?.postResponse?.question?.questionSeq}
          examRound={communityPostData?.postResponse?.question?.mockExam.round}
          content={communityPostData?.postResponse?.question?.questionText}
          questionOptions={communityPostData?.postResponse.question?.questionOptions}
          correctOption={communityPostData?.postResponse?.question?.correctOption}
        />
      ) : null}
      {isClickEditPost ? (
        <EditPost
          postId={params.id}
          mockExamId={communityPostData?.postResponse.question?.mockExam.mockExamId}
          setIsClickEditPost={setIsClickEditPost}
        />
      ) : (
        <div className="mb-[100px]">
          {/* <ImgModal></ImgModa> */}
          <Header
            headerType={'dynamic'}
            title={
              communityPostData && communityPostData.postResponse?.postStatus.postType === 'COMMENTARY'
                ? '해설 게시글'
                : communityPostData?.postResponse?.postStatus.postType === 'TIP'
                ? '꿀팁 게시글'
                : '자유 게시글'
            }></Header>
          {communityPostData ? ( //데이터가 있을 때만 뜨도록 함
            <div>
              <div className="pt-[21px]"></div>
              <div className="mx-[20px]">
                <CommunityProfile
                  isWriter={userProfile?.userId === communityPostData.postResponse?.user.userId}
                  fontsizing={true} //폰트 크기를 작게
                  date={format(communityPostData.postResponse?.dateTime.createdAt, 'yy.MM.dd')} //날짜
                  time={format(communityPostData.postResponse?.dateTime.createdAt, 'HH:mm')} //시간
                  imgSrc={communityPostData.postResponse.user.profileImage} //프로필 이미지
                  onClick={() => {
                    //...버튼 클릭했을 때 동작
                    setOnPostModal(!onPostModal);
                    setPostDelete(communityPostData.postResponse.postId);
                  }}>
                  {communityPostData.postResponse.user.nickname}
                </CommunityProfile>
                <div className="pb-[16px]"></div>
                {/* 꿀팁 게시글 Best 태그 */}
                {bestTipPosts?.map((bestTipPost, index) => {
                  if (bestTipPost.postId === communityPostData?.postResponse.postId)
                    return (
                      <div className={'px-3 py-[2px] text-white bg-primary rounded-full w-fit font-light'}>BEST</div>
                    );
                })}
                {/* 해설 태그 && 문제보기 버튼 */}
                {communityPostData.postResponse?.question ? (
                  <div className={'flex w-full justify-between'}>
                    <div className={'flex gap-x-2'}>
                      <CommunityTag>{communityPostData.postResponse?.question?.mockExam.examYear}년도</CommunityTag>
                      <CommunityTag>{communityPostData.postResponse?.question?.mockExam.round}회차</CommunityTag>
                      <CommunityTag>{communityPostData.postResponse?.question?.questionSeq}번</CommunityTag>
                    </div>
                    <button
                      onClick={() => {
                        setIsClickQuestionButton(!isClickQuestionButton);
                      }}
                      className={
                        'flex items-center px-3 py-1 rounded-full border-[1px] border-gray2 text-gray4 text-h6'
                      }>
                      문제보기
                      <MoveIcon />
                    </button>
                  </div>
                ) : null}
                <CommunityPost
                  subject={communityPostData.postResponse?.postContent.title}
                  content={communityPostData.postResponse?.postContent.content}
                  images={communityPostData.postResponse?.postContent.images}></CommunityPost>
                {/* 꿀팁 태그 */}
                <div className={'flex gap-x-2'}>
                  {communityPostData.postResponse.recommendTags
                    ? communityPostData.postResponse.recommendTags?.map((tag: RecommendTags, index: number) => {
                        return <CommunityTag key={index}>{tag.tagName}</CommunityTag>;
                      })
                    : null}
                </div>
                <CommentBar
                  empathy={communityPostData.postResponse?.postStatus.likeCount} //공감수
                  comment={communityPostData.postResponse?.postStatus.commentCount} //댓글수
                  isLike={likeStatus} //사용자 좋아요 클릭 여부
                  onClick={async () => {
                    //추천버튼 클릭 시 동작
                    handlePostLikeClick('POST', communityPostData.postResponse.postId);
                    //mutete를 사용하여 반영이 바로 되도록 구현
                  }}></CommentBar>
                <CommentWriting
                  postId={communityPostData.postResponse.postId}
                  communityPostDataMutate={communityPostDataMutate}></CommentWriting>
                <div className="h-2"></div>
                {communityPostData.postComments?.toReversed().map((postComment: PostComments, index: number) => {
                  return (
                    <div key={index}>
                      <Comment
                        isWriter={userProfile?.userId === postComment.user.userId}
                        profileModal={() => {
                          //프로필 부분의 ...버튼 클릭시 동작
                          setOnCommentModal(!onCommentModal); //댓글 삭제 모달창 띄움
                          setCommentDelete(postComment.postCommentId); //삭제 버튼 클릭시에 넘겨줄 댓글id를 저장함
                        }}
                        //답글하기 버튼 클릭시 동작
                        onClick={() => commentReplyControll(index, postComment.postCommentId)}
                        //하위 컴포넌트에 넘겨줄 정보
                        info={postComment}
                        //추천버튼 클릭시에 동작
                        DdabongClick={async () => {
                          //추천버튼 클릭 시 동작
                          handlePostLikeClick('COMMENT', postComment.postCommentId).then(() => {
                            communityPostDataMutate();
                          });
                        }}></Comment>
                      {postComment.childPostComments?.map(
                        //대댓글
                        //AxiosResponse<PostComments>
                        (childPostComment: PostComments, index: number) => {
                          return (
                            <CommentReply //대댓글
                              key={index}
                              isWriter={userProfile?.userId === childPostComment.user.userId}
                              profileModal={() => {
                                //프로필의 ...버튼 클릭 시 동작
                                setOnCommentModal(!onCommentModal);
                                setCommentDelete(childPostComment.postCommentId);
                              }}
                              info={childPostComment} //하위 컴포넌트에 넘겨줄 정보
                              DdabongClick={async () => {
                                //추천버튼 클릭 시 동작
                                handlePostLikeClick('COMMENT', childPostComment.postCommentId).then(() => {
                                  communityPostDataMutate();
                                });
                              }}></CommentReply>
                          );
                        },
                      )}
                      {replyOnOff ? ( //답글달기 버튼이 눌러졌고
                        commentNumber == index ? ( //답글달기가 눌러진 댓글의 순서와 현재 보여져야할 댓글의 순서가 일치하면
                          <div>
                            {/* 대댓글을 생성하는 입력란이 보여짐 */}
                            <CommentWriting
                              setReplyOnOff={setReplyOnOff}
                              communityPostDataMutate={communityPostDataMutate}
                              postId={communityPostData.postResponse.postId}
                              commentId={parentId}
                              padding="pl-[48px]"></CommentWriting>
                          </div>
                        ) : null
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : null}
          {isClickEditPost ? null : <NavBar />}
        </div>
      )}
    </>
  );
};
export default CommunityDetailPage;

const MoveIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={17} height={16} fill="none" {...props}>
    <path stroke="#727375" strokeLinecap="round" strokeLinejoin="round" d="m5.646 11 6-6M5.646 5h6v6" />
  </svg>
);
