import React from 'react';
import { Legend, PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer } from 'recharts';

interface RadarData {
  subject: string;
  A: number;
  B: number;
}

interface RadarChartExampleProps {
  data: RadarData[] | undefined;
}

// 정답률
const RadarChartExample: React.FC<RadarChartExampleProps> = ({ data }) => {
  return (
    <ResponsiveContainer className="text-h7 text-start font-bold" width="100%" height="100%">
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <PolarRadiusAxis angle={90} domain={[0, 100]} />
        <Radar name="평균" dataKey="B" stroke="#696969" fill="#808080" fillOpacity={0.4} />
        <Radar name="2회" dataKey="A" stroke="#0000FF" fill="#4169E1" fillOpacity={0.4} />
        <Legend />
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default RadarChartExample;
