import SubjectGradeCard from '@/components/exam/SubjectGradeCard';
import { SubjectResultsType } from '@/types/exam/type';

type usageType = 'timeLimit' | 'takenTime';
interface Props {
  subjectResults: SubjectResultsType[];
  score: number;
  totalScore: number;
  totalTakenTime: number;
  timeLimit: number;
}
const MockExamResultReport = (props: Props) => {
  const { subjectResults, score, totalScore, totalTakenTime, timeLimit } = props;
  const formatTime = (time: number, usage: usageType) => {
    const totalSeconds = Math.floor(time / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const seconds = totalSeconds % 60;

    if (usage === 'timeLimit') {
      if (hours > 0) {
        // 1시간 이상일 때 "시간:분" 형식으로 출력
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}(시간)`;
      } else {
        // 1시간 미만일 때 "분:초" 형식으로 출력
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}(분)`;
      }
    } else {
      if (hours > 0) {
        // 1시간 이상일 때 "시간:분" 형식으로 출력
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
      } else {
        // 1시간 미만일 때 "분:초" 형식으로 출력
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
      }
    }
  };

  return (
    <>
      <div className={'flex flex-col gap-y-2'}>
        <div className={'text-h3 font-semibold'}>과목별 맞춘 문제 수</div>
        <div className={'flex'}>
          {subjectResults?.map((subjectResult, index) => {
            return (
              <div className={'w-full'} key={index}>
                <SubjectGradeCard
                  name={subjectResult.subject.subjectName}
                  correctAnswer={subjectResult.numberOfCorrect}
                  totalCorrect={20}></SubjectGradeCard>
              </div>
            );
          })}
        </div>
      </div>

      <div className={'flex gap-x-2'}>
        <div className={'px-4 py-3 rounded-[16px] bg-white w-full'}>
          <div className={'text-h6 font-semibold'}>최근 점수</div>
          <div className={'text-h1 font-semibold text-black'}>
            {score}점<span className={'text-gray3 text-h6 font-normal'}>/{totalScore}점</span>
          </div>
        </div>
        <div className={'px-4 py-3 rounded-[16px] bg-white w-full'}>
          <div className={'text-h6 font-semibold'}>걸린 시간</div>
          <div className={'text-h1 font-semibold text-black'}>
            {formatTime(totalTakenTime, 'takenTime')}
            <span className={'text-gray3 text-h6 font-normal'}>/{formatTime(timeLimit, 'timeLimit')}</span>
          </div>
        </div>
      </div>
    </>
  );
};
export default MockExamResultReport;
