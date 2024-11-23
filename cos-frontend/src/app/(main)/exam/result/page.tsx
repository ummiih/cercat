'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import Header from '@/components/common/Header';
import NavBar from '@/components/common/NavBar';
import AccuracyChart from '@/components/exam/AccuracyChart';
import IncorrectQuestions from '@/components/exam/IncorrectQuestions';
import MockExamReportHeader from '@/components/exam/MockExamReportHeader';
import MockExamResultReport from '@/components/exam/MockExamResultReport';
import TakenTimeGraphReport from '@/components/exam/TakenTimeGraphReport';
import UserExamAttemptsFilterContent from '@/components/exam/UserExamAttemptsFilterContent';
import useAverageSubjectInfo from '@/lib/hooks/useAverageSubjectInfo';
import useGetTestResults from '@/lib/hooks/useGetTestResults';
import { certificateIdAtom } from '@/recoil/atom';
import { mockExamIdState } from '@/recoil/exam/atom';
import { MockExamResultType } from '@/types/exam/type';

const Result = () => {
  const certificateId = useRecoilValue(certificateIdAtom);
  const [isClicked, setIsClicked] = useState<'시험결과' | '틀린문제'>('시험결과');
  const [mockExamId, setMockExamId] = useRecoilState(mockExamIdState);
  const { examResults } = useGetTestResults(mockExamId);
  const [userExamAttempt, setUserExamAttempt] = useState<number>(1);
  const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true);
  const router = useRouter();
  const { averageSubjectList } = useAverageSubjectInfo(certificateId);

  const onBack = () => {
    router.push('/exam');
  };

  useEffect(() => {
    if (examResults && examResults.length > 0 && isInitialLoad) {
      setUserExamAttempt(examResults.length);
      setIsInitialLoad(false); // 초기화 완료 후 상태 업데이트
    }
  }, [examResults, isInitialLoad]);

  const sumTotalTakenTime = () => {
    if (examResults && examResults.length > 0) {
      const subjectResults = examResults[examResults.length - 1]?.subjectResults;
      return subjectResults?.reduce((acc, curr) => acc + (curr.totalTakenTime || 0), 0) || 0;
    }
    return 0;
  };

  /**
   * ExamResults 리스트의 값이 1개 이상일 경우 필터 적용 1개일 경우는 적용 X
   * @param examResults 시험 결과
   */
  const displayComponentBasedOnExamResults = (examResults: MockExamResultType[] | null | undefined) => {
    if (isInitialLoad || !examResults || examResults.length === 0) {
      // 데이터 로드 중일 때 로딩 상태 표시
      return <div>Loading...</div>;
    }

    if (!isInitialLoad && examResults && examResults.length === 1) {
      return (
        <>
          {isClicked === '시험결과' ? (
            <div className={'flex flex-col gap-y-5'}>
              <MockExamResultReport
                timeLimit={examResults[examResults.length - 1]?.mockExam.timeLimit || 0}
                totalTakenTime={sumTotalTakenTime()}
                totalScore={300} //TODO: TotalScore 변경하기
                score={examResults[examResults.length - 1]?.totalScore || 0}
                subjectResults={examResults[examResults.length - 1]?.subjectResults || []}
              />
              <TakenTimeGraphReport
                totalTakenTime={sumTotalTakenTime()}
                subjectResults={examResults?.[examResults.length - 1]?.subjectResults || []}
                averageSubjectList={averageSubjectList || []}
                timeLimit={examResults?.[examResults.length - 1]?.mockExam?.timeLimit || 0}
              />
              <AccuracyChart
                subjectResults={examResults?.[examResults.length - 1]?.subjectResults || []}
                averageSubjectList={averageSubjectList || []}
              />
            </div>
          ) : (
            <div>
              <div>
                <IncorrectQuestions
                  submittedMockExamResultId={examResults[userExamAttempt - 1]?.mockExamResultId || 0}
                />
              </div>
            </div>
          )}
        </>
      );
    } else if (!isInitialLoad && examResults && examResults.length >= 2) {
      return (
        <>
          <UserExamAttemptsFilterContent
            userExamAttempts={examResults}
            userExamAttempt={userExamAttempt - 1}
            setUserExamAttempt={setUserExamAttempt}
          />
          {isClicked === '시험결과' ? (
            <div className={'flex flex-col gap-y-5'}>
              <MockExamResultReport
                timeLimit={examResults[userExamAttempt - 1]?.mockExam.timeLimit || 0}
                totalTakenTime={sumTotalTakenTime()}
                totalScore={300} //TODO: TotalScore 변경하기
                score={examResults[userExamAttempt - 1]?.totalScore || 0}
                subjectResults={examResults[userExamAttempt - 1]?.subjectResults || []}
              />
              <TakenTimeGraphReport
                totalTakenTime={sumTotalTakenTime()}
                subjectResults={examResults[userExamAttempt - 1]?.subjectResults || []}
                averageSubjectList={averageSubjectList || []}
                timeLimit={examResults[userExamAttempt - 1]?.mockExam.timeLimit || 0}
              />
              <AccuracyChart
                subjectResults={examResults[userExamAttempt - 1]?.subjectResults || []}
                averageSubjectList={averageSubjectList || []}
              />
            </div>
          ) : (
            <div>
              <div>
                <IncorrectQuestions
                  submittedMockExamResultId={examResults[userExamAttempt - 1]?.mockExamResultId || 0}
                />
              </div>
            </div>
          )}
        </>
      );
    } else {
      return null; // examResults가 비어 있는 경우 null을 반환
    }
  };

  return (
    <>
      <Header headerType={'dynamic'} title={'성적리포트'} onBack={onBack}></Header>
      <MockExamReportHeader isClicked={isClicked} setIsClicked={setIsClicked} />
      <div className={'bg-gray0 min-h-screen p-5'}>{displayComponentBasedOnExamResults(examResults)}</div>
      <div className={'h-[60px]'} />
      <NavBar />
    </>
  );
};

export default Result;
