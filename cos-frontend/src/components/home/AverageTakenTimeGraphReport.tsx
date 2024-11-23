import StickGraph from '@/components/exam/StickGraph';
import { AverageSubjectInfoType } from '@/types/home/type';

interface Props {
  subjectResults: AverageSubjectInfoType[] | undefined;
  timeLimit: number | undefined;
  totalTakenTime: number;
}

const AverageTakenTimeGraphReport = (props: Props) => {
  const { subjectResults, timeLimit, totalTakenTime } = props;

  const millisecondsToMinutes = (time: number) => {
    // 1분은 60000 밀리세컨드입니다.
    return Math.floor(time / 60000);
  };

  const totalTime = totalTakenTime;
  if (totalTime === undefined || timeLimit === undefined || subjectResults === undefined) {
    return <div>로딩중...</div>;
  }

  return (
    <div className={'flex flex-col gap-y-3 p-4 rounded-[32px] bg-white'}>
      <div className={'pl-1 text-h3 font-semibold'}>머문시간 그래프</div>
      <div>
        {/*걸린 시간*/}
        <div className={'pl-2'}>
          <div className={'text-h6'}>걸린시간</div>
          <div className={'text-h3 font-semibold'}>{millisecondsToMinutes(totalTime)}m</div>
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
                    <StickGraph height={millisecondsToMinutes(subjectResult.totalTakenTime)} color="second" />
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
export default AverageTakenTimeGraphReport;
