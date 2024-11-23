'use client';

import React, { SVGProps } from 'react';
import { useRecoilState } from 'recoil';

import { editPostDataState, imagePreviewsState, imageUrlListState, pastImageUrlsState } from '@/recoil/community/atom';
import { ImageType } from '@/types/global';

interface Props {
  usage: string; //create(글생성), edit(글수정)
  type?: string;
  //imgFiles(현재)과 imageUrls(과거)의 인덱스
  i: number;
}
const ImageDeleteButton = (props: Props) => {
  const { usage, i, type } = props;
  const [imagePreviews, setImagePreviews] = useRecoilState<string[]>(imagePreviewsState); // 파일 업로드
  const [imageUrlList, setImageUrlList] = useRecoilState<File[]>(imageUrlListState);
  const [pastImageUrls, setPastImageUrls] = useRecoilState<ImageType[]>(pastImageUrlsState);
  const [editPostData, setEditPostData] = useRecoilState(editPostDataState);

  //수정글에서(usage==edit) 미리보기에서 X버튼 클릭했을 때 삭제되도록 하는 함수
  const deletePreviewImage = () => {
    const copyImagePreviews = [...imagePreviews]; // 미리보기 imageUrl
    const copyImageUrlList = [...imageUrlList]; // formData를 세팅할 fileList
    const copyPastImageUrls = [...pastImageUrls]; // 과거에서 삭제할 경우

    //과거 이미지 url 리스트에서 해당 목록 삭제
    if (type === '과거 이미지 URL') {
      setPastImageUrls(copyPastImageUrls.filter((imageUrl) => imageUrl != pastImageUrls[i]));
    }

    //현재 이미지 url 리스트에서 해당 목록 삭제
    if (type === '현재 이미지 URL') {
      setImagePreviews(copyImagePreviews.filter((imageUrl) => imageUrl != imagePreviews[i]));
      setImageUrlList(copyImageUrlList.filter((file) => file != imageUrlList[i]));
    }
  };

  /**
   * 수정글에서(usage==edit) 진짜 삭제할 수 있도록 deleteImageUrls 리스트에 삭제할 url 을 추가하는 함수
   */
  const deleteImageData = () => {
    let copy: number[] = [];
    if (editPostData.removeImageIds) {
      copy = [...editPostData.removeImageIds];
      const copyPastImageUrls = [...pastImageUrls];

      if (type === '과거 이미지 URL' && !copy.includes(copyPastImageUrls[i].id)) {
        copy.push(copyPastImageUrls[i].id); //TODO: 눈여겨 보기 삭제하는거
        setEditPostData((prevState) => ({ ...prevState, removeImageIds: copy }));
      }
    }
  };

  /**
   * 글을 새로 생성할 때(usage==create), 선택된 imageUrl 을 제외하고 남은 imageUrl 로 새로운 리스트를 구성합니다.
   */
  const deleteImageUrl = () => {
    const copyImageUrlList = [...imageUrlList]; // 과거에서 삭제할 경우
    const copyImagePreviews = [...imagePreviews];
    setImageUrlList(copyImageUrlList.filter((imageUrl) => imageUrl != copyImageUrlList[i]));
    setImagePreviews(copyImagePreviews.filter((imagePreview) => imagePreview != copyImagePreviews[i]));
  };

  return (
    <div>
      <button
        className="absolute bg-red-600 rounded-full p-1 top-0 right-0 z-10"
        type={'button'}
        onClick={() => {
          if (usage === 'edit') {
            deletePreviewImage();
            deleteImageData();
          }
          if (usage === 'create') {
            deleteImageUrl();
          }
        }}>
        <div className={'absolute top-0 right-0'}>
          <DeleteIcon />
        </div>
      </button>
    </div>
  );
};
export default ImageDeleteButton;
const DeleteIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={21} height={20} fill="none" {...props}>
    <rect width={20} height={20} x={0.312} fill="#F4F5F7" rx={10} />
    <path stroke="#6E6F71" d="m13.848 6.464-7.071 7.071M6.777 6.464l7.071 7.071" />
  </svg>
);
