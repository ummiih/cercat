import Example from './SimpleChart';

interface Subject {
  name: string;
  correctAnswer: number;
  totalProblems: number;
  // Add other necessary fields
}

interface CorrectRateGraphProps {
  subjects: Subject[];
}

const CorrectRateGraph: React.FC<CorrectRateGraphProps> = ({ subjects }) => {
  const radarChartData = subjects?.map((subject) => {
    return {
      subject: subject.name,
      A: (subject.correctAnswer / subject.totalProblems) * 100,
      B: (subject.correctAnswer / subject.totalProblems) * 50,
      // Add other necessary fields
    };
  });

  return (
    <div>
      <div>
        <div className="font-bold text-h3 px-[3%]">과목별 정답률</div>
        <div className="h-60">
          <Example data={radarChartData} />
        </div>
      </div>
    </div>
  );
};

export default CorrectRateGraph;
