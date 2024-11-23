import { PostType } from '@/types/community/type';

export type MyPageBoardType = 'COMMENTARY' | 'TIP' | 'NORMAL';

export interface ItemType {
  title: string;
  path?: string;
  version?: number;
}

export type DifficultyType = '' | '어려워요' | '조금 어려워요' | '보통이에요' | '쉬워요' | '너무 쉬워요';

export interface UserInfo {
  userId: number;
  nickname: string;
  email: string;
  profileImage: string;
}

/**
 ************ 내가 쓴 글 data-type *************
 */
export interface MyPostsResponseType {
  responseCode: string;
  message: string;
  result: {
    content: PostType[];
    hasNext: true;
  };
}
