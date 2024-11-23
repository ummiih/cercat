import { useRecoilState } from 'recoil';

import useMockExamQuestions from '@/lib/hooks/useMockExamQuestions';
import { subjectResultRequestsList, userAnswerRequestsList } from '@/recoil/exam/atom';
import { SubjectResultRequests, UserAnswerRequests } from '@/types/global';

/**
 * 채점해주는 커스텀 훅
 */
const useCalculateScore = (mockExamId: number) => {
  const [userAnswerList, setUserAnswerList] = useRecoilState<UserAnswerRequests[]>(userAnswerRequestsList);
  const [subjectResultList, setSubjectResultList] = useRecoilState(subjectResultRequestsList);
  const { questions, isLoading, isError } = useMockExamQuestions(mockExamId);
  /**
   * 사용자가 선택한 각 선택지가 맞았는지 틀렸는지 채점
   */
  const calculateScore = () => {
    if (isLoading || isError || !questions) {
      console.log('Questions are loading or an error occurred');
      return;
    }

    const updatedUserAnswerList = userAnswerList.map((userAnswer, index) => {
      const isCorrect = questions ? questions[index].correctOption === userAnswer.selectOptionSeq : false;
      return { ...userAnswer, isCorrect: isCorrect };
    });

    setUserAnswerList(updatedUserAnswerList);
    return updatedUserAnswerList; // 변경된 리스트 반환
  };

  /**
   * calculateScore 으로 맞았는지 틀렸는지 채점한 결과를 토대로 과목마다 점수 부여
   * 서버 post 형식에 맞도록 데이터 형식 포멧
   */
  const prepareAndScoreSubjectResults = async () => {
    if (userAnswerList.length !== 0 && questions) {
      let newUserAnswerList: UserAnswerRequests[] = []; // 과목 문제 갯수만큼 userAnswerList 를 자름
      const newSubjectResultList: SubjectResultRequests[] = []; // 자른 newUserAnswerList 를 추가

      questions.map((question, index: number) => {
        if (question.subject.numberOfQuestions !== newUserAnswerList.length) {
          newUserAnswerList.push(userAnswerList[index]);
        } else {
          const newSubjectResult: SubjectResultRequests = {
            subjectId: question.subject.subjectId - 1,
            score: newUserAnswerList.filter((userAnswer) => userAnswer.isCorrect).length * questions[index].score,
            createUserAnswerRequests: newUserAnswerList,
          };
          newSubjectResultList.push(newSubjectResult);
          newUserAnswerList = [];
          newUserAnswerList.push(userAnswerList[index]);
        }
        if (index === questions.length - 1) {
          //마지막 인덱스 반영
          const newSubjectResult: SubjectResultRequests = {
            subjectId: question.subject.subjectId,
            score: newUserAnswerList.filter((userAnswer) => userAnswer.isCorrect).length * questions[index].score,
            createUserAnswerRequests: newUserAnswerList,
          };
          newSubjectResultList.push(newSubjectResult);
          newUserAnswerList = [];
        }
      });
      setSubjectResultList(newSubjectResultList);
    }
  };

  return { calculateScore, prepareAndScoreSubjectResults, userAnswerList };
};
export default useCalculateScore;
