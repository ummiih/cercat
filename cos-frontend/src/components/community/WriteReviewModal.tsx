'use client';
import React, { FormEvent, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import { postExamReview } from '@/lib/api/community';
import { examReviewPostState } from '@/recoil/community/atom';
import { DifficultyType } from '@/types/mypage/type';

export interface Props {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isModalOpen: boolean;
}

const WriteReviewModal = (props: Props) => {
  const { setIsModalOpen, isModalOpen } = props;
  const [difficultyType, setDifficultyType] = useState<DifficultyType>('');
  const [examReviewPost, setExamReviewPost] = useRecoilState(examReviewPostState);

  useEffect(() => {
    if (difficultyType === '너무 쉬워요') {
      setExamReviewPost((prevState) => ({ ...prevState, examDifficulty: 'TOO_EASY' }));
    } else if (difficultyType === '쉬워요') {
      setExamReviewPost((prevState) => ({ ...prevState, examDifficulty: 'EASY' }));
    } else if (difficultyType === '보통이에요') {
      setExamReviewPost((prevState) => ({ ...prevState, examDifficulty: 'NORMAL' }));
    } else if (difficultyType === '어려워요') {
      setExamReviewPost((prevState) => ({ ...prevState, examDifficulty: 'TOO_DIFFICULT' }));
    } else {
      setExamReviewPost((prevState) => ({ ...prevState, examDifficulty: 'LITTLE_DIFFICULT' }));
    }
  }, [difficultyType]);

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await postExamReview(1, examReviewPost);
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <div
        className={
          'absolute left-0 right-0 z-50 flex flex-col gap-y-2 justify-center bg-[rgba(0,0,0,0.6)] px-8 min-h-screen'
        }>
        <div className={'flex flex-col gap-y-4 bg-white rounded-[32px] p-5'}>
          <div className={'flex flex-col gap-y-1'}>
            <div>
              <div className={'text-h2 font-semibold text-black'}>컴퓨터 활용능력</div>
              <div className={'text-h2 font-semibold text-black'}>시험은 어땠나요?</div>
            </div>
            <div className={'flex items-center text-h6'}>크루들에게 시험 후기를 공유해보세요!</div>
          </div>
          {/*난이도 태그*/}
          <div className={'flex flex-col gap-y-3'}>
            <div className={'flex flex-col gap-y-2'}>
              <div className={'flex gap-x-2'}>
                <button
                  onClick={() => setDifficultyType('너무 쉬워요')}
                  className={
                    difficultyType === '너무 쉬워요'
                      ? 'py-2 px-3 bg-[#49D8F8] text-h6 text-white rounded-full'
                      : 'py-2 px-3 bg-gray0 text-h6 text-gray3 rounded-full'
                  }>
                  너무 쉬워요
                </button>
                <button
                  onClick={() => setDifficultyType('쉬워요')}
                  className={
                    difficultyType === '쉬워요'
                      ? 'py-2 px-3 bg-[#4BEA3E] text-h6 text-white rounded-full'
                      : 'py-2 px-3 bg-gray0 text-h6 text-gray3 rounded-full'
                  }>
                  쉬워요
                </button>
                <button
                  onClick={() => setDifficultyType('보통이에요')}
                  className={
                    difficultyType === '보통이에요'
                      ? 'py-2 px-3 bg-[#F8BC49] text-h6 text-white rounded-full'
                      : 'py-2 px-3 bg-gray0 text-h6 text-gray3 rounded-full'
                  }>
                  보통이에요
                </button>
              </div>
              <div className={'flex gap-x-2'}>
                <button
                  onClick={() => setDifficultyType('조금 어려워요')}
                  className={
                    difficultyType === '조금 어려워요'
                      ? 'py-2 px-3 bg-[#F89249] text-h6 text-white rounded-full'
                      : 'py-2 px-3 bg-gray0 text-h6 text-gray3 rounded-full'
                  }>
                  조금 어려워요
                </button>
                <button
                  onClick={() => setDifficultyType('어려워요')}
                  className={
                    difficultyType === '어려워요'
                      ? 'py-2 px-3 bg-[#F85449] text-h6 text-white rounded-full'
                      : 'py-2 px-3 bg-gray0 text-h6 text-gray3 rounded-full'
                  }>
                  어려워요
                </button>
              </div>
            </div>
            {/*입력창*/}
            <form
              className={'flex flex-col gap-y-4'}
              onSubmit={(e) => {
                handleFormSubmit(e).then((r) => {
                  console.log(r);
                });
              }}>
              <textarea
                onChange={(e) => {
                  if (e.target.value.length <= 80) {
                    setExamReviewPost((prevState) => ({ ...prevState, content: e.target.value }));
                  } else {
                    e.target.value = e.target.value.substr(0, 80);
                  }
                }}
                className={
                  'w-full placeholder:text-gray4 text-black h-[92px] border-[1px] border-gray2 rounded-[16px] px-4 py-3 outline-none'
                }
                placeholder={'내용을 입력해주세요.(80자)'}></textarea>
              {/*버튼*/}
              <div className={'flex justify-end gap-x-2'}>
                <button
                  onClick={() => {
                    setIsModalOpen(!isModalOpen);
                  }}
                  className={'text-gray4 bg-gray1 rounded-full py-2 px-6'}>
                  취소
                </button>
                <button type={'submit'} className={'text-white bg-black rounded-full py-2 px-6'}>
                  완료
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default WriteReviewModal;
