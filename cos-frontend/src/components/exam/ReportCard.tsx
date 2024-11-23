interface ReportCard {
  title: string; // 카드의 제목
  main: string; // 굵은 글씨로 표현
  total: string; // 회색 글씨로 표현
}

// 분명히 리포트 카드가 있는데 왜 안
const ReportCard: React.FC<ReportCard> = ({ title, main, total }) => {
  return (
    <div className="w-1/2 bg-white rounded-xl p-3">
      <div>
        <div className="font-bold text-h6">{title}</div>
        <div className="flex items-end">
          <div className="font-bold text-h1">{main}</div>
          <div className="text-gray3 text-h6 mb-1">/{total}</div>
        </div>
      </div>
    </div>
  );
};

export default ReportCard;
