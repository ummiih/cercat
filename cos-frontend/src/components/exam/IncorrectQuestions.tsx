import { useCallback, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import IncorrectQuestionCard from '@/components/exam/IncorrectQuestionCard';
import useGetIncorrectQuestionsResult from '@/lib/hooks/useGetIncorrectQuestionsResult';
import { MockExamIncorrectQuestionsResult, MockExamIncorrectQuestionsResultResponseType } from '@/types/exam/type';
interface Props {
  submittedMockExamResultId: number;
}
const IncorrectQuestions = (props: Props) => {
  const { submittedMockExamResultId } = props;
  const [ref, inView] = useInView();
  const { incorrectQuestionsResult, setSize } = useGetIncorrectQuestionsResult(submittedMockExamResultId);

  const getMoreItem = useCallback(async () => {
    if (incorrectQuestionsResult) {
      setSize((prev: number) => prev + 1);
    }
    return;
  }, []);

  useEffect(() => {
    if (inView) {
      getMoreItem();
    }
  }, [inView]);

  return (
    <>
      <div className={'flex flex-col bg-gray0 gap-y-5'}>
        {incorrectQuestionsResult
          ? incorrectQuestionsResult.map((pastWrongQuestion: MockExamIncorrectQuestionsResultResponseType) => {
              return pastWrongQuestion?.result.content.map(
                (wrongQuestion: MockExamIncorrectQuestionsResult, index: number) => {
                  return (
                    <div key={index} ref={ref}>
                      <IncorrectQuestionCard
                        selectOptionSeq={wrongQuestion.selectOptionSeq}
                        mockExam={wrongQuestion.question.mockExam}
                        correctOption={wrongQuestion.question.correctOption}
                        questionOptions={wrongQuestion.question.questionOptions}
                        questionText={wrongQuestion.question.questionText}
                        questionSeq={wrongQuestion.question.questionSeq}></IncorrectQuestionCard>
                    </div>
                  );
                },
              );
            })
          : null}
      </div>
    </>
  );
};
export default IncorrectQuestions;
