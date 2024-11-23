import Chart, { ChartData, ChartOptions } from 'chart.js/auto';
import React, { useEffect, useRef } from 'react';

interface DonutChartProps {
  data: number[];
}

const DonutChart: React.FC<DonutChartProps> = ({ data }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    const ctx = chartRef.current?.getContext('2d');

    // 이전 차트 객체가 존재하면 파괴
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // 차트 객체 생성
    if (ctx) {
      // @ts-ignore
      chartInstance.current = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: [],
          datasets: [
            {
              data: data,
              backgroundColor: ['#E4E5E7', '#6283FD'], // 원하는 색상으로 변경
            },
          ],
        } as ChartData<'doughnut'>,
        options: {
          cutout: '80%', // 도넛 차트의 중앙을 빈 공간으로 만들기 위한 옵션
          responsive: true,
          plugins: {
            legend: {
              display: false, // 레이블 표시 여부를 설정
            },
          },
          elements: {
            arc: {
              borderRadius: 10, // 여기서 경계의 둥글기를 조절합니다.
            },
          },
        } as ChartOptions<'doughnut'>,
      });
    }
  }, [data]);

  return <canvas ref={chartRef} />;
};

export default DonutChart;
