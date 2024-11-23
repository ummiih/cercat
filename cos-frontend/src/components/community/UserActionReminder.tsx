import { ReactNode } from 'react';
import * as React from 'react';

interface Props {
  content: string;
  button: ReactNode;
}
const UserActionReminder = (props: Props) => {
  const { content, button } = props;
  return (
    <div className={'flex flex-col gap-y-3 px-5 py-4 rounded-[32px] bg-second'}>
      <div className={'text-white font-semibold'}>{content}</div>
      {button}
    </div>
  );
};
export default UserActionReminder;
