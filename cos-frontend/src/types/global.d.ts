import React from 'react';

export type HeaderType = 'static' | 'dynamic' | 'second';

export interface MenuList {
  id: number;
  Icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
  ClickedIcon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
  name: string;
  path: string;
}

// 과목에 대한 정보
export interface SubjectInfo {
  // 과목의 연도 정보
  year: number;
  // 회차 리스트
  sessions: Session[];
}

// 과목 - 회차에 대한 정보
export interface Session {
  // 회차 정보 ex) 2023년 - 1회차
  sessionNumber: number;
  // 총 맞춘 정답 개수
  totalCorrect: number;
  // 총 문제 개수
  totalProblem: number;
  // 과목내 세부과목에 대한 정보를 담고있음
  subjects: SpecificSubject[];
}

// 과목별 세부 과목 내용을 담는 자료 Ex) 정보처리기사 - 데이터베이스 과목
export interface SpecificSubject {
  // 과목명
  name: string;
  // 정답 개수
  correctAnswer: Number | null;
  // 전체 문제 수
  totalProblems: Number | null;
  // 평균 머문 시간 (기존)
  averageTime: Number | null;
  // 과목에 머문 시간
  takenTime: Number | null;
}

// api 기준
export interface ExamInfo {
  responseCode: string;
  result: {
    // examYearWithRounds: Record<string, number[]>[];
    examYearWithRounds: examYearWithRounds[];
  };
}

export interface examYearWithRounds {
  year: string;
  rounds: number[];
}

export interface ExamResult {
  responseCode: string;
  result: MockExam[];
}

export interface MockExam {
  mockExamId: number;
  round: number;
  isTake: boolean;
}

export interface ProblemInfo {
  questionNum: number;
  choiceAnswer: multipleChoice;
}

export interface multipleChoice {
  problem: string;
  example: string[];
}
// 자격증 정보 공통 분류
export interface ExamInfoCommonCategory {
  intro: ExamInfoCommonType;
  schedule: ExamInfoCommonType;
  subject: ExamInfoCommonType;
  fee: ExamInfoCommonType;
  method: ExamInfoCommonType;
  qualifications: ExamInfoCommonType;
  criteria: ExamInfoCommonType;
}

// 자격증 응시 정보의 공통 타입
export interface ExamInfoCommonType {
  Icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
  title: string;
  content?: React.ReactElement;
}

// 공통 제목 type
export interface CommonTitleType {
  description: ExamInfoCommonType;
  examFee: ExamInfoCommonType;
  examSchedule: ExamInfoCommonType;
  subjectsInfo: ExamInfoCommonType;
  examFormat: ExamInfoCommonType;
  examEligibility: ExamInfoCommonType;
  examTimeLimit: ExamInfoCommonType;
  passingCriteria: ExamInfoCommonType;
}

// 목표 설정 type
export interface GoalSettingInfo {
  certificate?: Certificate;
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
}

//온보딩 자격증
export interface Certificate {
  certificateId: number;
  certificateName: string;
  isClick: boolean; // 자격증을 선택했을 경우
}

//온보딩 흥미 자격증 타입
export interface InterestCertificateOnboarding {
  certificateId: number;
  interestPriority: string;
  certificateName?: string;
}
export interface PostInterestCertificate {
  interestTargetList: InterestCertificateOnboarding[];
}
//게시판 즐겨찾기
export interface FavoriteBoard {
  certificateId: number;
  boardName: string;
  isFavorite: boolean;
}

//관심 자격증
export interface InterestCertificate {
  certificate: {
    certificateId: number;
    certificateName: string;
  };
  interestPriority: string;
}

export interface InterestCertificateResponseType {
  responseCode: string;
  message: string;
  result: InterestCertificate[];
}

/**
 * 사용자 정보 responseType
 */

export interface UserProfileResponseType {
  responseCode: string;
  message: string;
  result: UserProfile;
}

//userProfile
export interface UserProfile {
  userId?: number;
  nickname: string;
  email?: string;
  profileImage: string;
}

//모의고사 시험 문제 선지
export interface QuestionOptions {
  optionSequence: number;
  optionContent: string;
  optionImage: string;
}

//서버에 보낼 모의고사 시험 응시 결과
export interface UserAnswerRequests {
  questionId: number;
  selectOptionSeq: number; //1,2,3,4
  takenTime: number; // 밀리세컨드
  isCorrect?: boolean;
}

//서버에 보낼 과목별 채점 결과
export interface SubjectResultRequests {
  subjectId: number;
  score: number;
  createUserAnswerRequests: UserAnswerRequests[];
}

//모의고사 문제들 가져오기
export interface QuestionsResponseType {
  responseCode: string;
  message: string;
  result: QuestionsResponse[];
}

//모의고사 시험 문제, 선지 전체
export interface QuestionsResponse {
  questionId: number;
  mockExam: ReviewIncorrectMockExam;
  subject: {
    subjectId: number;
    subjectName: string;
    numberOfQuestions: number;
    totalScore: number;
  };
  questionSeq: number;
  questionText: string;
  questionImage: {
    id: number;
    imageUrl: string;
  };
  questionOptions: QuestionOptions[];
  correctOption: number;
  score: number;
}

export interface ReviewIncorrectAnswers {
  responseCode: string;
  result: {
    content: ReviewIncorrectAnswersContent[];
    hasNext: boolean;
  };
}

export interface ReviewIncorrectAnswersContent {
  question: QuestionsResponse;
  userAnswerId: number;
  selectOptionSeq: number;
  takenTime: number;
  isCorrect: boolean;
}

export interface ReviewIncorrectMockExam {
  mockExamId: number;
  examYear: number;
  round: number;
  timeLimit: number;
  certificate: Certificate;
}

//유저
interface User {
  userId: number;
  nickname: string;
  email: string;
  profileImage: string;
}

//태그
interface RecommendTags {
  tagType: string; //Lecture
  tagName: string;
}

//모의고사
interface MockExam {
  MockExamId: number;
  examYear: number;
  round: number;
  timeLimit: number;
  certificate: Certificate;
}

//과목
interface Subject {
  subjectId: number;
  subjectName: string;
  numberOfQuestions: number;
  totalScore: number;
}

//질문옵션(무엇을 의미하는지 파악 못함)
interface QuestionOptions {
  optionSequence: number;
  optionContent: string;
  optionImage: string;
}

export interface ResponsePostDetailType {
  responseCode: string;
  result: {
    postResponse: Post;
    postComments: PostComments[];
  };
}

//커뮤니티 포스트
export interface Post {
  postId: number;
  postContent: PostContent;
  postStatus: PostStatus;
  user: User;
  question?: Question;
  recommendTags: RecommendTags[];
  dateTime: DateTime;
}

export interface PostStatus {
  postType: string;
  likeCount: number;
  commentCount: number;
}

export interface PostContent {
  title: string;
  content: string;
  images: ImageType[];
}

export interface ImageType {
  id: number;
  imageUrl: string;
}

//커뮤니티 포스팅 댓글
interface PostComments {
  postCommentId: number;
  user: User;
  parentCommentId?: number;
  likeCount: number;
  content: string;
  dateTime: DateTime;
  childPostComments?: PostComments[];
  isLiked: boolean;
}

//날짜 타입
export interface DateTime {
  createdAt: string;
  modifiedAt: string;
}

//유저
interface User {
  userId: number;
  nickname: string;
  email: string;
  profileImage: string;
}

//태그
interface RecommendTags {
  tagType: string; //Lecture
  tagName: string;
}

//댓글 생성 양식
export interface GenerateComment {
  parentCommentId: null | number;
  content: string;
}

//모의고사
interface MockExam {
  MockExamId: number;
  examYear: number;
  round: number;
  timeLimit: number;
  certificate: Certificate;
}

//과목
interface Subject {
  subjectId: number;
  subjectName: string;
  numberOfQuestions: number;
  totalScore: number;
}

//질문옵션(무엇을 의미하는지 파악 못함)
interface QuestionOptions {
  optionSequence: number;
  optionContent: string;
  optionImage: string;
}

//질문
interface Question {
  questionId: number;
  mockExam: MockExam;
  subject: Subject;
  questionSeq: number;
  questionText: string;
  questionImage: string;
  questionOptions: QuestionOptions[];
  correctOption: number;
  score: number;
}

//온보딩 자격증
export interface CertificatesResponseType {
  responseCode: string;
  message: string;
  result: CertificateType[];
}

export interface CertificateType {
  certificateId: number;
  certificateName: string;
}
