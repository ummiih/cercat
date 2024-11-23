import { ReviewIncorrectMockExam } from '@/types/global';

export interface AxiosResponseUserGoalsType {
  responseCode: string;
  message: string;
  result: UserCertGoalPeriodType[];
}
export interface UserCertGoalPeriodType {
  goalId: number;
  prepareStartDateTime: string;
  prepareFinishDateTime: string;
}

/**
 * 목표 기간 내 전체 주간
 */
export interface WeeklyGoalPeriodType {
  prepareDate: string;
  prepareYear: string;
  prepareMonth: number;
  prepareWeekly: number;
  formattedWeeklyPrepTime: string;
}

export interface ExamStaticsDataResponseType {
  responseCode: string;
  result: ExamStaticsDataType;
}

/**
 * 성장그래프 통계 타입
 */
export interface ExamStaticsDataType {
  totalAverage: number;
  scoreAVGList: ScoreAVGListType[];
}

/**
 * 성장 그래프 통계 각각의 데이터
 */
export interface ScoreAVGListType {
  scoreAverage: number;
  dayOfWeek?: string;
  weekOfMonth?: number;
  date: string;
  month?: number;
}

/**
 * 성장그래프 디테일 report 데이터 타입
 */
export interface DetailGradeReportType {
  mockExamResultId: number;
  round: number;
  mockExam: ReviewIncorrectMockExam;
  totalScore: number;
  createdAt: string;
}

//////////////////////////////////////////////////////
/**
 * 자격증 정보 타입
 */
export interface CertificateInfoType {
  certificate: {
    certificateId: number;
    certificateName: string;
  };
  examInfo: {
    examYear: number;
    round: number;
    examSchedule: {
      applicationStartDateTime: string;
      applicationDeadlineDateTime: string;
      resultAnnouncementDateTime: string;
      examDateTime: string;
    };
    examFee: {
      writtenExamFee: number;
      practicalExamFee: number;
    };
    examTimeLimit: {
      writtenExamTimeLimit: number;
      practicalExamTimeLimit: number;
    };
    passingCriteria: {
      subjectPassingCriteria: number;
      totalAvgCriteria: number;
      practicalPassingCriteria: number;
    };
    subjectsInfo: string;
    description: string;
    examFormat: string;
    examEligibility: string;
  };
}

/**
 * response 타입
 */
export interface CertificateInfoResponseType {
  responseCode: string;
  message: string;
  result: CertificateInfoType;
}

////////////////////////////////////////////////////
export interface AverageSubjectInfoResponseType {
  responseCode: string;
  result: AverageSubjectInfoType[];
}

/**
 * 과목별 정답률 평균 및 머문 시간 평균 조회
 */
export interface AverageSubjectInfoType {
  subject: {
    subjectId: number;
    subjectName: string;
    numberOfQuestions: number;
    totalScore: number;
  };
  correctRate: number;
  totalTakenTime: number;
}
////////////////////////////////////////////////////
/**
 * 목표 달성도 조회 데이터 타입
 */
export interface GoalAchievementResponseType {
  responseCode: string;
  message: string;
  result: GoalAchievementType;
}

export interface GoalAchievementType {
  goalId: number;
  goalScore: number;
  maxScore: number;
  studyTimePerDay: number;
  todayStudyTime: number;
  goalStudyTime: number;
  currentStudyTime: number;
  mockExamsPerDay: number;
  todayMockExams: number;
  goalMockExams: number;
  currentMockExams: number;
  goalDay: number;
}
//////////////////////////////////////////////////////
/**
 * 목표 설정했는지 여부
 */
export interface GoalSettingStatusResponseType {
  responseCode: string;
  message: string;
  result: boolean;
}

/**
 * 목표 상세 조회 Type
 */
export interface GoalSettingDataDetailResponseType {
  responseCode: string;
  message: string;
  result: {
    goalId: number;
    certificate: {
      certificateId: number;
      certificateName: string;
    };
    goalScore: number;
    prepareStartDateTime: string;
    prepareFinishDateTime: string;
    goalPrepareDays: number;
    mockExamsPerDay: number;
    goalMockExams: number;
    mockExamRepeatDays: number[];
    studyTimePerDay: number;
    goalStudyTime: number;
    studyRepeatDays: number[];
  };
}
