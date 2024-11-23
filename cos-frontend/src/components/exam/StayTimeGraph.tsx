import StickGraph from './StickGraph';

interface StayTimeGraphProps {
  title: string;
  takenTime: number;
  subjectTime: number[];
  subjectName: string[];
  maxTime: number;
}

// examreportpage에서 머문시간 그래프를 나타내는 컴포넌트
const StayTimeGraph: React.FC<StayTimeGraphProps> = ({ title, takenTime, maxTime, subjectTime, subjectName }) => {
  const dummyData = [
    { height: 30, color: 'gray2' },
    { height: 50, color: 'blue' },
  ];

  return (
    <div>
      <div>
        <div className="font-bold text-h3">{title} 그래프</div>
        <div className="text-h6 p-2">
          <div>걸린 시간</div>
          <div className="font-bold text-h3">{takenTime}m</div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-[85%] border-t border-gray1"></div>
          <div className="w-[15%] text-gray3 text-h5">{maxTime}분</div>
        </div>
        <div className="flex items-end space-x-2">
          <div className="w-[85%]">
            <div className="flex h-32">
              <div className="w-full flex justify-center space-x-2">
                <StickGraph height={10} color="gray2" />
                <StickGraph height={subjectTime[0]} color="second" />
              </div>
              <div className="w-full flex justify-center space-x-2">
                <StickGraph height={30} color="gray2" />
                <StickGraph height={subjectTime[1]} color="second" />
              </div>
              <div className="w-full flex justify-center space-x-2">
                <StickGraph height={90} color="gray2" />
                <StickGraph height={subjectTime[2]} color="second" />
              </div>
            </div>
            <div className="border-t border-gray1"></div>
          </div>
          <div className="w-[15%] text-gray3 text-h5">0분</div>
        </div>
        <div className="flex space-x-2">
          <div className="w-[85%] flex justify-between mt-[2%]">
            {subjectName.map((subject, index) => (
              <div key={index} className="w-full flex justify-center text-h7 font-bold">
                {subject}
              </div>
            ))}
          </div>
          <div className="w-[15%] text-white text-h5">0분</div>
        </div>
      </div>
    </div>
  );
};

export default StayTimeGraph;
