import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import useGetExamResultRecent from '@/lib/hooks/useGetExamResultRecent';
import { timeLimitState } from '@/recoil/exam/atom';
import { Session } from '@/types/global';
import { selectedSessionState } from '@/utils/recoilState';

import SessionModal from './SessionModal';
import TimerModal from './TimerModal';

interface SubjectCard {
  timeLimit: number;
  round: number;
  mockExamId: number;
  total: number;
}

const SubjectCard: React.FC<SubjectCard> = ({ timeLimit, round, mockExamId, total }) => {
  const { examResultRecent } = useGetExamResultRecent(mockExamId);
  const [selectedSession, setSelectedSession] = useRecoilState<Session | null>(selectedSessionState);

  // 모달 관련 states
  const [sessionModalIsOpen, setSessionModalIsOpen] = useState(false);
  const [timerModalIsOpen, setTimerModalIsOpen] = useState(false);
  const [time, setTime] = useRecoilState(timeLimitState);

  //제한 시간 설정
  useEffect(() => {
    if (timeLimit != 0) {
      setTime(timeLimit);
    }
  }, [timeLimit]);

  // 모달이 열릴때 세션 상태 설정
  const openSessionModal = () => {
    setSessionModalIsOpen(true);
  };

  const closeSessionModal = () => {
    setSessionModalIsOpen(false);
  };

  const openTimerModal = () => {
    setTimerModalIsOpen(true);
  };

  const closeTimerModal = () => {
    setSelectedSession(null);
    setTimerModalIsOpen(false);
  };

  return (
    <div>
      <div className="flex flex-col gap-y-4 p-3 border-[1px] border-gray2 rounded-[32px]">
        <div className="font-semibold text-center pb-2 border-b border-gray1">{`${round}회차`}</div>
        <div>
          <div className="text-black text-center text-h7">최근 점수</div>
          {examResultRecent ? (
            <ul className="flex items-end justify-center">
              <li className="font-bold text-h2">{`${examResultRecent?.totalScore}점`}</li>
              <div className="mb-[3px] text-gray3 text-h6">{`/${total}점`}</div>
            </ul>
          ) : (
            <p className="text-center text-h2 font-semibold">미응시</p>
          )}
        </div>
        <button onClick={() => openSessionModal()} className="w-full bg-gray0 rounded-3xl py-3 text-h6">
          시험 보기
        </button>
      </div>
      {sessionModalIsOpen && (
        <SessionModal
          mockExamId={mockExamId}
          closeModal={closeSessionModal}
          openTimerModal={openTimerModal}
          total={total}
          round={round}
        />
      )}
      {/* 타이머 모달에 대한 코드 */}
      {timerModalIsOpen && (
        <TimerModal
          mockExamId={mockExamId}
          timeLimit={timeLimit}
          round={round}
          closeTimerModal={closeTimerModal}
          closeSessionModal={closeSessionModal}
        />
      )}
    </div>
  );
};

export default SubjectCard;
