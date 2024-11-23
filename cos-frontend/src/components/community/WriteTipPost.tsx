'use client';

import Image from 'next/image';
import React, { FormEvent, SVGProps, useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { KeyedMutator } from 'swr';

import Header from '@/components/common/Header';
import EmptyTitleAlertModal from '@/components/community/EmptyTitleAlertModal';
import ImageDeleteButton from '@/components/community/ImageDeleteButton';
import { postCommentary } from '@/lib/api/community';
import { createPostDataState, imagePreviewsState, imageUrlListState } from '@/recoil/community/atom';
import { ResponsePostType } from '@/types/community/type';

interface Props {
  setIsClickedWriteButton: React.Dispatch<React.SetStateAction<boolean>>;
  mutate: KeyedMutator<ResponsePostType[]>;
}

const WriteTipPost = (props: Props) => {
  const { setIsClickedWriteButton, mutate } = props;
  const [postData, setPostData] = useRecoilState(createPostDataState);
  const [imagePreviews, setImagePreviews] = useRecoilState<string[]>(imagePreviewsState);
  const [imageUrlList, setImageUrlList] = useRecoilState<File[]>(imageUrlListState);
  const imgRef = useRef<HTMLInputElement>(null);
  // 입력 필드 목록을 관리하는 상태
  const [onlineCourseInputs, setOnlineCourseInputs] = useState<string[]>([]);
  const [workbookInputs, setWorkbookInputs] = useState<string[]>([]);
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
  const [isTitleEmpty, setIsTitleEmpty] = useState(false);

  /**
   * 추천 강의 새 입력 필드를 추가하는 함수
   */
  const addOnlineCourseInput = () => {
    setOnlineCourseInputs([...onlineCourseInputs, '']); // 기존 입력 필드 목록에 빈 문자열을 추가
  };

  /**
   * 추천 문제집 새 입력 필드를 추가하는 함수
   */
  const addWorkbookInputs = () => {
    setWorkbookInputs([...workbookInputs, '']); // 기존 입력 필드 목록에 빈 문자열을 추가
  };

  /**
   * 추천 인강 입력 필드 값 변경 함수
   */
  const handleChangeOnlineCourseInput = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const newInputs = [...onlineCourseInputs];
    newInputs[index] = event.target.value; // 변경된 값을 해당 인덱스의 입력 필드에 반영
    setOnlineCourseInputs(newInputs);
  };

  /**
   * 추천 문제집 입력 필드 값 변경 함수
   */
  const handleChangeWorkBookInput = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const newInputs = [...workbookInputs];
    newInputs[index] = event.target.value; // 변경된 값을 해당 인덱스의 입력 필드에 반영
    setWorkbookInputs(newInputs);
  };

  /**
   * 추천 인강 삭제
   */
  const deleteOnlineCourseInputs = (i: number) => {
    const copyOnlineCourseInputs = [...onlineCourseInputs];
    setOnlineCourseInputs(copyOnlineCourseInputs.filter((onlineCourseInput, index) => index != i));
  };

  /**
   * 추천 문제집 삭제
   */
  const deleteWorkBookInputs = (i: number) => {
    const copyWorkbookInputs = [...workbookInputs];
    setWorkbookInputs(copyWorkbookInputs.filter((workBookInput, index) => index != i));
  };

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
   * 추천 인강, 추천 문제집 요구하는 post 타입으로 변경
   */
  const changeTags = () => {
    onlineCourseInputs.filter((lecture) => lecture !== '');
    workbookInputs.filter((book) => book !== '');

    const updatedTags = [
      ...(postData.tags || []),
      ...onlineCourseInputs
        .filter((lecture) => lecture !== '')
        .map((lecture) => ({ tagType: 'LECTURE', tagName: lecture })),
      ...workbookInputs.filter((book) => book !== '').map((book) => ({ tagType: 'BOOK', tagName: book })),
    ];

    setPostData((prevState) => ({
      ...prevState,
      tags: updatedTags,
    }));

    setIsSubmitEnabled(true);
  };

  /**
   * 제출 함수 postData.tags 가 변경됨에 따라 아래의 useEffect 가 실행되어 제출됨.
   */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    changeTags(); // 태그 변경 함수 호출
  };

  useEffect(() => {
    if (isSubmitEnabled && !isTitleEmpty) {
      // 태그가 업데이트된 후 실행할 로직
      const formData = new FormData();
      imageUrlList.forEach((file) => {
        formData.append('files', file);
      });
      formData.append('request', new Blob([JSON.stringify(postData)], { type: 'application/json' }));

      // API 호출 로직
      const response = postCommentary(1, 'TIP', formData)
        .then(async (response) => {
          //글 불러옴
          console.log(response);
          //글쓰기 초기화
          setPostData(() => ({ title: '', content: '', tags: [] }));
          setIsTitleEmpty(true);
          setImageUrlList([]);
          setImagePreviews([]);
          //제출 트리거 조정
          setIsSubmitEnabled(false);
          //글쓰기 페이지 내리기
          setIsClickedWriteButton(false);
        })
        .catch((error) => {
          console.error('폼 제출 중 오류 발생:', error);
        });
    }
  }, [isSubmitEnabled]);

  const onBack = () => {
    //글쓰기 초기화
    setPostData(() => ({ title: '', content: '', tags: [] }));
    setIsTitleEmpty(true);
    setImageUrlList([]);
    setImagePreviews([]);
    //제출 트리거 조정
    setIsSubmitEnabled(false);
    //글쓰기 페이지 내리기
    setIsClickedWriteButton(false);
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

  return (
    <div>
      {isTitleEmpty ? <EmptyTitleAlertModal setIsTitleEmpty={setIsTitleEmpty} /> : null}
      <form onSubmit={handleException} className={'flex flex-col gap-y-3'}>
        <Header
          onBack={onBack}
          CancelIcon={CancelIcon}
          headerType={'dynamic'}
          title={'꿀팁게시판 쓰기'}
          rightElement={
            <button type={'submit'} className={'bg-primary text-white text-h6 px-4 py-[6px] rounded-full'}>
              완료
            </button>
          }></Header>

        <div className={'mx-5'}>
          {/* 제목, 글 작성 세션 */}
          <div className={'flex flex-col gap-y-2 mt-[16px]'}>
            <div className={'text-h3 font-bold ml-2'}>꿀팁 작성</div>
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

          {/* 인강 추천 태그 세션*/}
          <div className={'flex flex-col gap-y-2 mt-[16px]'}>
            <div className={'text-h3 font-bold ml-2'}>
              추천 인강 <span className={'font-normal text-gray3 text-h4'}>(선택)</span>
            </div>
            <div className={'flex flex-col gap-y-3'}>
              {onlineCourseInputs.map((input: string, index: number) => (
                <div
                  key={index}
                  className={
                    'flex justify-between items-center w-full border-gray2 border-[1px] rounded-[16px] py-3 px-4'
                  }>
                  <input
                    type="text"
                    value={input}
                    placeholder={'인강 제목'}
                    className={'w-[90%] placeholder:text-gray4 focus:outline-0'}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      handleChangeOnlineCourseInput(index, event)
                    }
                  />
                  <DeleteIcon onClick={() => deleteOnlineCourseInputs(index)} />
                </div>
              ))}
            </div>
            <button
              onClick={() => addOnlineCourseInput()}
              type={'button'}
              className={'flex items-center justify-center bg-second rounded-[16px] py-3 px-4 text-white text-h6'}>
              <PlusIcon /> 추가
            </button>
          </div>

          {/* 문제집 추천 태그 세션*/}
          <div className={'flex flex-col gap-y-2 mt-[16px]'}>
            <div className={'text-h3 font-bold ml-2'}>
              추천 문제집 <span className={'font-normal text-gray3 text-h4'}>(선택)</span>
            </div>
            <div className={'flex flex-col gap-y-3'}>
              {workbookInputs.map((input: string, index: number) => (
                <div
                  key={index}
                  className={
                    'flex justify-between items-center w-full border-gray2 border-[1px] rounded-[16px] py-3 px-4'
                  }>
                  <input
                    type="text"
                    value={input}
                    placeholder={'문제집 제목'}
                    className={'w-[90%] placeholder:text-gray4 focus:outline-0'}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChangeWorkBookInput(index, event)}
                  />
                  <DeleteIcon onClick={() => deleteWorkBookInputs(index)} />
                </div>
              ))}
            </div>
            <button
              onClick={() => addWorkbookInputs()}
              type={'button'}
              className={'flex items-center justify-center bg-second rounded-[16px] py-3 px-4 text-white text-h6'}>
              <PlusIcon /> 추가
            </button>
          </div>

          {/* 이미지 추가 세션 */}
          <div className={'flex gap-x-2 mt-[12px]'}>
            <div className={'rounded-[8px] p-2 bg-gray0  w-[48px] h-[48px]'}>
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
export default WriteTipPost;

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
const DeleteIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={21} height={21} fill="none" {...props}>
    <path stroke="#6E6F71" d="m13.827 6.964-7.07 7.071M6.756 6.964l7.071 7.071" />
  </svg>
);
const PlusIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={21} height={20} fill="none" {...props}>
    <path stroke="#fff" d="M15.792 10h-10M10.792 5v10" />
  </svg>
);
