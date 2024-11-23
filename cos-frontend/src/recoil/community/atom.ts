'use client';
import { atom } from 'recoil';

import {
  BoardType,
  CreatePostDataType,
  EditPostDataType,
  ExamReviewPostType,
  RecentSearchResult,
} from '@/types/community/type';
import { GenerateComment, ImageType } from '@/types/global';

//게시판 종류
export const boardTypeState = atom<BoardType>({
  key: 'boardTypeState',
  default: 'REVIEW',
});

//글 삭제 및 수정 모달창 조작
export let postingModalState = atom<boolean>({
  key: 'postingModalState',
  default: false,
});

//댓글 삭제 모달창 조작
export let commentModalState = atom<boolean>({
  key: 'commentModalState',
  default: false,
});

//댓글 삭제
export let commentDeleteState = atom<number>({
  key: 'commentDeleteState',
  default: 0,
});

//글 삭제
export let postDeleteState = atom<number>({
  key: 'postDeleteState',
  default: 0,
});

//댓글 생성
export let GenerateCommentState = atom<GenerateComment>({
  key: 'GenerateCommentState',
  default: {
    parentCommentId: null,
    content: '',
  },
});

export const imagePreviewsState = atom<string[]>({
  key: 'imagePreviewsState',
  default: [],
});

export const imageUrlListState = atom<File[]>({
  key: 'imageUrlListState',
  default: [],
});

export const pastImageUrlsState = atom<ImageType[]>({
  key: 'pastImageUrlsState',
  default: [],
});

export const createPostDataState = atom<CreatePostDataType>({
  key: 'createPostDataState',
  default: {
    title: '',
    content: '',
    tags: [],
    examYear: 2023,
    round: 1,
    questionSequence: 0,
  },
});

export const editPostDataState = atom<EditPostDataType>({
  key: 'editPostDataState',
  default: {
    postId: 0,
    title: '제목',
    content: '내용',
    removeImageIds: [],
  },
});

//검색 키워드 자동완성 데이터
export const autoCompleteSearchKeywordState = atom<string>({
  key: 'autoCompleteSearchKeywordState',
  default: '',
});

//최근 검색 기록
export const recentSearchResultState = atom<RecentSearchResult>({
  key: 'recentSearchResultState',
  default: {
    keyword: '',
    createdAt: '',
  },
});

//해설 게시글 번호 검색
export const commentarySearchQuestionSequence = atom<number>({
  key: 'commentarySearchQuestionSequence',
  default: undefined,
});

export const examReviewPostState = atom<ExamReviewPostType>({
  key: 'examReviewPostState',
  default: {
    examDifficulty: '',
    content: '',
  },
});
