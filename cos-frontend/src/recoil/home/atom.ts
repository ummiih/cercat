'use client';

import { atom } from 'recoil';

import { GoalSettingInfo } from '@/types/global';
import { CertificateInfoType, UserCertGoalPeriodType, WeeklyGoalPeriodType } from '@/types/home/type';

//자격증 응시 정보 state
export const certificationInfoState = atom<CertificateInfoType>({
  key: 'certificationInfoState',
  default: {
    certificate: {
      certificateId: 0,
      certificateName: '',
    },
    examInfo: {
      examYear: 0,
      round: 0,
      examSchedule: {
        applicationStartDateTime: '',
        applicationDeadlineDateTime: '',
        resultAnnouncementDateTime: '',
        examDateTime: '',
      },
      examFee: {
        writtenExamFee: 0,
        practicalExamFee: 0,
      },
      examTimeLimit: {
        writtenExamTimeLimit: 0,
        practicalExamTimeLimit: 0,
      },
      passingCriteria: {
        subjectPassingCriteria: 0,
        totalAvgCriteria: 0,
        practicalPassingCriteria: 0,
      },
      subjectsInfo: '',
      description: '',
      examFormat: '',
      examEligibility: '',
    },
  },
});

//목표 설정 state
export let goalSettingState = atom<GoalSettingInfo>({
  key: 'goalSettingState',
  default: {
    goalScore: 100,
    prepareStartDateTime: '2024-01-21T06:45:07.833Z',
    prepareFinishDateTime: '2024-01-21T06:45:07.833Z',
    goalPrepareDays: 0,
    mockExamsPerDay: 0,
    goalMockExams: 0,
    mockExamRepeatDays: [],
    studyTimePerDay: 0,
    goalStudyTime: 0,
    studyRepeatDays: [],
  },
});

// 성장그래프 자세히 보기(그래프)
export const selectedReportTypeState = atom<'WEEKLY' | 'MONTHLY' | 'YEARLY'>({
  key: 'selectedReportTypeState',
  default: 'WEEKLY',
});

// 성장그래프 자세히 보기(각각 디테일)
export const selectedDateTypeState = atom<'DATE' | 'WEEK_OF_MONTH' | 'MONTH'>({
  key: 'selectedDateTypeState',
  default: 'DATE',
});
export const selectedPrepareTimeState = atom<UserCertGoalPeriodType>({
  key: 'selectedPrepareTime',
  default: {
    goalId: 0,
    prepareStartDateTime: '',
    prepareFinishDateTime: '',
  },
});

export const selectedPrepareWeeksBetweenState = atom<WeeklyGoalPeriodType>({
  key: 'selectedPrepareWeeksBetweenState',
  default: {
    prepareYear: '',
    prepareMonth: 0,
    prepareWeekly: 0,
    prepareDate: '',
    formattedWeeklyPrepTime: '',
  },
});
//목표 설정 자격증 name 선택
export const goalSettingCertificateName = atom<string | undefined>({
  key: 'goalSettingCertificateName',
  default: '정보처리기사',
});

//목표 설정 자격증 id 선택
export const goalSettingCertificateId = atom<number | undefined>({
  key: 'goalSettingCertificateId',
  default: 1,
});
