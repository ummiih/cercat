'use client';

import { atom } from 'recoil';

import { SubjectResultRequests, UserAnswerRequests } from '@/types/global';

export const subjectResultRequestsList = atom<SubjectResultRequests[]>({
  key: 'subjectResultRequestsList',
  default: [],
});

//목표 설정 state
export let subjectResultRequests = atom({
  key: 'subjectResultRequests',
  default: {
    subjectId: 0,
    score: 0,
    userAnswerRequests: [],
  },
});

export let userAnswerRequests = atom<UserAnswerRequests>({
  key: 'userAnswerRequests',
  default: {
    questionId: 1,
    selectOptionSeq: 0,
    takenTime: 0,
    isCorrect: false,
  },
});

//목표 설정 state
export let userAnswerRequestsList = atom<UserAnswerRequests[]>({
  key: 'userAnswerRequestsList',
  default: [],
});

export const sessionRecordedState = atom<boolean>({
  key: 'sessionRecordedState',
  default: false,
});

export const questionIndex = atom<number>({
  key: 'questionIndex',
  default: 0,
});

export const stopwatchTime = atom<number>({
  key: 'stopwatchTime',
  default: 0,
});

export const stopwatchIsRunning = atom<boolean>({
  key: 'stopwatchIsRunning',
  default: true,
});

export const timerIsPaused = atom<boolean>({
  key: 'timerIsPaused',
  default: false,
});

export const stopwatchIsPaused = atom<boolean>({
  key: 'stopwatchIsPaused',
  default: false,
});

//모의고사 응시 번호
export const mockExamIdState = atom<number>({
  key: 'mockExamIdState',
  default: 1,
});

export const timeLimitState = atom<number>({
  key: 'timeLimitState',
  default: 0,
});

export const submittedMockExamResultIdState = atom<number>({
  key: 'submittedMockExamResultIdState',
  default: 0,
});
