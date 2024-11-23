import StickGraph from '@/components/exam/StickGraph';
import { SubjectResultsType } from '@/types/exam/type';
import { AverageSubjectInfoType } from '@/types/home/type';

interface Props {
  subjectResults: SubjectResultsType[];
  averageSubjectList: AverageSubjectInfoType[];
  timeLimit: number;
  totalTakenTime: number;
}
const TakenTimeGraphReport = (props: Props) => {
  const { subjectResults, averageSubjectList, timeLimit, totalTakenTime } = props;

  const millisecondsToMinutes = (time: number) => {
    // 1분은 60000 밀리세컨드입니다.
    return Math.floor(time / 60000);
  };

  if (!subjectResults) {
    return <div>Error</div>;
  }

  return (
    <div className={'flex flex-col gap-y-3 p-4 rounded-[32px] bg-white'}>
      <div className={'pl-1 text-h3 font-semibold'}>머문시간 그래프</div>
      <div>
        {/*걸린 시간*/}
        <div className={'pl-2'}>
          <div className={'text-h6'}>걸린시간</div>
          <div className={'text-h3 font-semibold'}>{millisecondsToMinutes(totalTakenTime)}m</div>
        </div>
        {/*막대 그래프*/}
        <div className="flex items-center space-x-2">
          <div className="w-[85%] border-t border-gray1"></div>
          <div className="w-[15%] text-gray3 text-h5">{millisecondsToMinutes(timeLimit)}분</div>
        </div>
        <div className="flex items-end space-x-2">
          <div className="w-[85%]">
            <div className="flex h-32">
              {subjectResults?.map((subjectResult, index) => {
                return (
                  <div key={index} className="w-full flex justify-center space-x-2">
                    <StickGraph height={(subjectResult.totalTakenTime / timeLimit) * 100} color="second" />
                    <StickGraph
                      height={(averageSubjectList[index]?.totalTakenTime || 0 / timeLimit) * 100}
                      color="gray2"
                    />
                  </div>
                );
              })}
            </div>
            <div className="border-t border-gray1"></div>
          </div>
          <div className="w-[15%] text-gray3 text-h5">0분</div>
        </div>
        <div className="flex space-x-2">
          <div className="w-[85%] flex justify-between mt-[2%]">
            {subjectResults?.map((subjectResult, index) => (
              <div key={index} className="w-full flex justify-center text-h7">
                {subjectResult.subject.subjectName}
              </div>
            ))}
          </div>
          <div className="w-[15%] text-white text-h5">0분</div>
        </div>
      </div>
    </div>
  );
};
export default TakenTimeGraphReport;
