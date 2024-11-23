import { atom } from 'recoil';

import { Session } from '@/types/global';

// 선택된 회차에 대한 상태
export const selectedSessionState = atom<Session | null>({
  key: 'selectedSessionState',
  default: null,
});

// 회차 데이터 상태 관리
export const selectedRoundState = atom<Number | null>({
  key: 'selectedRoundState',
  default: null,
});
