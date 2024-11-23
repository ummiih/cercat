import Link from 'next/link';

// 이후 모듈화
const WrongQuestionsSummaryBox = () => {
  return (
    <div className="mx-auto mt-4 p-3 rounded-3xl bg-second">
      <div className="px-2">
        <div className="text-white font-bold text-left text-h4 my-1">지금까지 틀린문제만 모아봤어요.</div>
        <Link href="/exam/wrong">
          <div className="inline-block rounded-3xl bg-white text-blue text-h6 my-1 px-3 py-1">틀린 문제 풀기 ➚</div>
        </Link>
      </div>
    </div>
  );
};

export default WrongQuestionsSummaryBox;
