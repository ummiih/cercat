'use client';

import { atom } from 'recoil';

import { PostInterestCertificate } from '@/types/global';

//목표 설정 state
export let interestCertificatesState = atom<PostInterestCertificate>({
  key: 'interestCertificatesState',
  default: {
    interestTargetList: [],
  },
});
