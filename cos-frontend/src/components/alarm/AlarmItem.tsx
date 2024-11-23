import { format, formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

interface Props {
  time: string;
  targetPostId?: number;
  alarmText: string;
  moveButton?: (targetPostId: number) => React.JSX.Element;
}
const AlarmItem = (props: Props) => {
  const { time, moveButton, alarmText, targetPostId } = props;

  const formatDate = (date: string) => {
    const d = new Date(date);
    const now = Date.now();
    const diff = (now - d.getTime()) / 1000; // 현재 시간과의 차이(초)
    if (diff < 60 * 1) {
      // 1분 미만일땐 방금 전 표기
      //TODO: 몊분 전
      return '방금 전';
    }
    if (diff < 60 * 60 * 24 * 7) {
      // 7일 미만일땐 시간차이 출력(몇시간 전, 몇일 전)
      return formatDistanceToNow(d, { addSuffix: true, locale: ko });
    }
    if (diff < 60 * 60 * 24 * 30 * 12) {
      // 1년, 1달 기준
      //TODO: 날짜로 나오게 하는게 좋을 것 같다.
      return formatDistanceToNow(d, { addSuffix: true, locale: ko });
    }
    if (diff > 60 * 60 * 24 * 30 * 12) {
      // 1년 넘어가면
      return format(d, 'yy.MM.dd'); // 날짜 포맷
    }
  };

  return (
    <div className={'flex flex-col gap-y-1 bg-white rounded-[32px] py-4 px-5'}>
      <div className={'text-h6 text-gray3'}>{formatDate(time)}</div>
      <div>{alarmText}</div>
      {moveButton && targetPostId ? moveButton(targetPostId) : null}
    </div>
  );
};
export default AlarmItem;
