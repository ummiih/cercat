import { useRecoilState } from 'recoil';

import StickGraph from '@/components/exam/StickGraph';
import { selectedRoundState } from '@/utils/recoilState';

// examreportpage에서 머문시간 그래프를 나타내는 컴포넌트
const GrowthGraph: React.FC = () => {
  const [selectedRound, setSelectedRound] = useRecoilState<Number | null>(selectedRoundState);

  const dummyData = [
    { height: 30, color: 'gray2' },
    { height: 50, color: 'blue' },
  ];

  return (
    <div>
      <div className="bg-white rounded-xl">
        <div className="text-h6 p-2">
          <div>주간 평균 점수</div>
          <div className="text-h3 font-bold">75.3점</div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-[85%] border-t border-gray1"></div>
          <div className="w-[15%] text-gray3 text-h5">20분</div>
        </div>
        <div className="flex items-end space-x-2">
          <div className="w-[85%]">
            <div className="flex h-32">
              <div className="w-full flex justify-center space-x-2">
                <StickGraph height={50} color="blue" />
              </div>
              <div className="w-full flex justify-center space-x-2">
                <StickGraph height={50} color="blue" />
              </div>
              <div className="w-full flex justify-center space-x-2">
                <StickGraph height={50} color="blue" />
              </div>
              <div className="w-full flex justify-center space-x-2">
                <StickGraph height={50} color="blue" />
              </div>
              <div className="w-full flex justify-center space-x-2">
                <StickGraph height={50} color="blue" />
              </div>
              <div className="w-full flex justify-center space-x-2">
                <StickGraph height={50} color="blue" />
              </div>
              <div className="w-full flex justify-center space-x-2">
                <StickGraph height={50} color="blue" />
              </div>
            </div>
            <div className="border-t border-gray1"></div>
          </div>
          <div className="w-[15%] text-gray3 text-h5">0분</div>
        </div>
        <div className="flex space-x-2">
          <div className="w-[85%] flex justify-between">
            <div className="w-full flex justify-center text-h6">{'월'}</div>
            <div className="w-full flex justify-center text-h6">{'화'}</div>
            <div className="w-full flex justify-center text-h6">{'수'}</div>
            <div className="w-full flex justify-center text-h6">{'목'}</div>
            <div className="w-full flex justify-center text-h6">{'금'}</div>
            <div className="w-full flex justify-center text-h6">{'토'}</div>
            <div className="w-full flex justify-center text-h6">{'일'}</div>
          </div>
          <div className="w-[15%] text-white text-h5">0분</div>
        </div>
      </div>
    </div>
  );
};

export default GrowthGraph;
