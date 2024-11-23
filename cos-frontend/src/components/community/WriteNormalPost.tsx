'use client';

import Image from 'next/image';
import React, { FormEvent, SVGProps, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import Header from '@/components/common/Header';
import EmptyTitleAlertModal from '@/components/community/EmptyTitleAlertModal';
import ImageDeleteButton from '@/components/community/ImageDeleteButton';
import { postCommentary } from '@/lib/api/community';
import { certificateIdAtom } from '@/recoil/atom';
import { createPostDataState, imagePreviewsState, imageUrlListState } from '@/recoil/community/atom';

interface Props {
  setIsClickedWriteButton: React.Dispatch<React.SetStateAction<boolean>>;
}

const WriteNormalPost = (props: Props) => {
  const { setIsClickedWriteButton } = props;
  const certificateId = useRecoilValue(certificateIdAtom);
  const [postData, setPostData] = useRecoilState(createPostDataState);
  const [imagePreviews, setImagePreviews] = useRecoilState<string[]>(imagePreviewsState);
  const [imageUrlList, setImageUrlList] = useRecoilState<File[]>(imageUrlListState);
  const imgRef = useRef<HTMLInputElement>(null);
  const [isTitleEmpty, setIsTitleEmpty] = useState(false);

  /**
   * 이미지 업로드 및 미리보기 함수
   */
  const saveImgFile = async () => {
    const files = imgRef.current?.files;
    if (!files) return;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreviews((prevImagePreviews) => [...prevImagePreviews, reader.result as string]);
      };
      reader.readAsDataURL(file);

      setImageUrlList((prevImageUrlList) => [...prevImageUrlList, file]);
    }
  };

  /**
   * 게시글 제목을 변경하는 함수
   * @param value 게시글 제목
   */
  const changePostDataTitle = (value: string) => {
    setPostData((prevState) => ({
      ...prevState,
      title: value,
    }));
  };

  /**
   * 게시글 내용을 변경하는 함수
   * @param value 게시글 내용
   */
  const changePostDataContent = (value: string) => {
    setPostData((prevState) => ({
      ...prevState,
      content: value,
    }));
  };

  /**
   * form 형식 제출 함수
   */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault(); // 폼 제출 시 새로고침 방지
    const formData = new FormData();

    imageUrlList.forEach((file, index) => {
      formData.append('files', file);
    });

    formData.append(
      'request',
      new Blob([JSON.stringify(postData)], {
        type: 'application/json',
      }),
    );

    try {
      await postCommentary(certificateId, 'NORMAL', formData).then(() => {
        //글쓰기 초기화
        setPostData(() => ({ title: '', content: '' }));
        setIsTitleEmpty(true);
        setImageUrlList([]);
        setImagePreviews([]);
        //글쓰기 페이지 내리기
        setIsClickedWriteButton(false);
      }); // API 호출
    } catch (error) {
      console.error('폼 제출 중 오류 발생:', error);
    }
  };

  /**
   * 예외 처리에 따라 제출 폼 형식 변경 함수
   */
  const handleException = (e: FormEvent) => {
    e.preventDefault(); // 폼 제출 시 새로고침 방지

    let isValid = true;

    if (postData.title === '') {
      setIsTitleEmpty(true);
      isValid = false;
    } else {
      setIsTitleEmpty(false);
    }

    if (isValid) {
      handleSubmit(e);
    }
  };

  const onBack = () => {
    setPostData(() => ({ title: '', content: '' }));
    setIsTitleEmpty(true);
    setImageUrlList([]);
    setImagePreviews([]);
    setIsClickedWriteButton(false);
  };

  return (
    <div>
      {isTitleEmpty ? <EmptyTitleAlertModal setIsTitleEmpty={setIsTitleEmpty} /> : null}
      <form onSubmit={handleException} className={'flex flex-col gap-y-3'}>
        <Header
          onBack={onBack}
          CancelIcon={CancelIcon}
          headerType={'dynamic'}
          title={'자유게시판 쓰기'}
          rightElement={
            <button type={'submit'} className={'bg-primary text-white text-h6 px-4 py-[6px] rounded-full'}>
              완료
            </button>
          }></Header>
        <div className={'m-5'}>
          {/* 제목, 글 작성 세션 */}
          <div className={'flex flex-col gap-y-2 mt-[16px]'}>
            <div className={'text-h3 font-bold ml-2'}>자유 게시글 작성</div>
            <div className={'flex flex-col gap-y-3'}>
              <input
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  changePostDataTitle(e.target.value);
                }}
                className={
                  'w-full border-gray2 border-[1px] rounded-[16px] py-3 px-4 placeholder:text-gray4 focus:outline-0'
                }
                placeholder={'제목'}></input>
              <textarea
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                  changePostDataContent(e.target.value);
                }}
                placeholder={'내용을 입력해주세요.'}
                className={
                  'w-full h-[300px] border-gray2 border-[1px] rounded-[16px] py-3 px-4 placeholder:text-gray4 focus:outline-0'
                }></textarea>
            </div>
          </div>

          {/* 이미지 추가 세션 */}
          <div className={'mt-3 flex gap-x-2 '}>
            <div className={'rounded-[8px] p-2 bg-gray0 w-[48px] h-[48px]'}>
              <label htmlFor="image">
                <AddImageIcon />
              </label>
              <input
                type={'file'}
                accept={'image/*'}
                id="image"
                name="image"
                ref={imgRef}
                onChange={saveImgFile}
                multiple
                style={{ display: 'none' }}></input>
            </div>
          </div>
          <div className={'mt-3 w-[375px] flex items-center overflow-x-scroll gap-x-3'}>
            {imagePreviews.map((img, i) => {
              return (
                <div key={i} className={'relative rounded-[8px]'}>
                  <ImageDeleteButton i={i} usage={'create'} />
                  <div className={'relative rounded-[8px] w-[80px] h-[80px] overflow-hidden'}>
                    <Image key={i} src={img} fill alt={img} className={'object-cover'}></Image>;
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </form>
    </div>
  );
};
export default WriteNormalPost;

function AddImageIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={34} height={30} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M3.139 29.528c-.663 0-1.217-.224-1.664-.67-.446-.447-.67-1.001-.67-1.664V9.584c0-.667.224-1.223.67-1.667.447-.445 1.001-.667 1.664-.667h5l3.083-3.389h8.528v1h-8.083L8.583 8.25H3.14c-.389 0-.708.13-.958.389a1.31 1.31 0 00-.375.944v17.611c0 .39.125.709.375.959s.569.375.958.375h24.333c.39 0 .708-.125.958-.375s.375-.57.375-.959V13.917h1v13.277c0 .663-.222 1.217-.666 1.664-.445.446-1 .67-1.667.67H3.14zM28.805 8.25V4.86h-3.388v-1h3.388V.472h1v3.389h3.39v1h-3.39V8.25h-1zm-13.5 15.889c1.62 0 2.984-.553 4.09-1.66 1.107-1.106 1.66-2.47 1.66-4.09 0-1.62-.553-2.984-1.66-4.09-1.106-1.107-2.47-1.66-4.09-1.66-1.62 0-2.983.553-4.09 1.66-1.106 1.106-1.66 2.47-1.66 4.09 0 1.62.554 2.984 1.66 4.09 1.107 1.107 2.47 1.66 4.09 1.66zm0-1c-1.351 0-2.48-.454-3.388-1.361-.908-.908-1.361-2.037-1.361-3.39 0-1.351.453-2.48 1.36-3.388.908-.908 2.038-1.361 3.39-1.361 1.351 0 2.481.454 3.388 1.36.908.908 1.361 2.038 1.361 3.39 0 1.352-.453 2.481-1.36 3.389-.908.907-2.038 1.36-3.39 1.36z"
        fill="#1C1B1F"
      />
    </svg>
  );
}

const CancelIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} fill="none" {...props}>
    <path stroke="#000" strokeLinecap="round" d="m8 8 16 16M24 8 8 24" />
  </svg>
);
