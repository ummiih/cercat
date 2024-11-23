import DonutChart from './donutchart';

interface DonutChartProps {
  mainscore: number;
  totalscore: number;

  unit: string;
}

const ScoredDonutChart: React.FC<DonutChartProps> = ({ mainscore, totalscore, unit }) => {
  const chartData = []; // 예시 데이터
  chartData[0] = totalscore - mainscore;
  chartData[1] = mainscore;
  return (
    <div>
      <DonutChart data={chartData} />
      {/* 가운데에 위치할 텍스트 */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <p className="font-semibold text-h3">
          {mainscore}
          {unit}
        </p>
        <p className="text-h6 text-gray4">
          /{totalscore}
          {unit}
        </p>
      </div>
    </div>
  );
};

export default ScoredDonutChart;
