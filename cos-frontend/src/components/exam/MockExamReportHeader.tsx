import React from 'react';
interface Props {
  isClicked: '시험결과' | '틀린문제';
  setIsClicked: React.Dispatch<React.SetStateAction<'시험결과' | '틀린문제'>>;
}
const MockExamReportHeader = (props: Props) => {
  const { isClicked, setIsClicked } = props;
  return (
    <div className={'mt-3 flex w-full bg-white px-5'}>
      <div
        onClick={() => {
          setIsClicked('시험결과');
        }}
        className={
          isClicked === '시험결과'
            ? 'flex justify-center w-full py-2 text-black text-h6 border-b-[3px] border-b-primary'
            : 'flex justify-center w-full py-2 text-gray3 text-h6 font-semibold'
        }>
        시험결과
      </div>
      <div
        onClick={() => {
          setIsClicked('틀린문제');
        }}
        className={
          isClicked === '틀린문제'
            ? 'flex justify-center w-full py-2 text-black text-h6 border-b-[3px] border-b-primary'
            : 'flex justify-center w-full py-2 text-gray3 text-h6 font-semibold'
        }>
        틀린문제
      </div>
    </div>
  );
};
export default MockExamReportHeader;
