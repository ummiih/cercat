import { ItemType } from '@/types/mypage/type';

export const boardContents: ItemType[] = [
  { title: '내가 작성한 글', path: '/mypage/writing' },
  { title: '내가 작성한 댓글', path: '/mypage/comment' },
];

export const goalContents: ItemType[] = [{ title: '이전 목표', path: '/home/goal-setting' }];

export const alarmContents: ItemType[] = [{ title: '알림설정', path: '/home/goal-setting' }];
export const etcContents: ItemType[] = [
  { title: '문의하기', path: '/home/goal-setting' },
  { title: '약관 및 개인정보 처리', path: '/home/goal-setting' },
  { title: '앱버전', version: 0.1 },
];
