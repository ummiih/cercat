export interface AlarmResponseType {
  responseCode: string;
  message: string;
  result: Alarm[];
}

export interface Alarm {
  alarmId: number;
  targetPostId: number;
  alarmType: AlarmType;
  alarmText: string;
  alarmTime: string;
}

export type AlarmType =
  | 'NEW_LIKE_ON_POST'
  | 'NEW_COMMENT_ON_POST'
  | 'NEW_LIKE_ON_COMMENT'
  | 'REPLY_ON_COMMENT'
  | 'BEFORE_APPLICATION'
  | 'START_APPLICATION'
  | 'DEADLINE';
