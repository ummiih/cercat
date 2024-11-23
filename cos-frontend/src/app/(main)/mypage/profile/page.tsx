'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { SVGProps, useCallback, useEffect, useRef, useState } from 'react';

import Header from '@/components/common/Header';
import { patchProfileData } from '@/lib/api/onboarding';
import useGetUserProfile from '@/lib/hooks/useGetUserProfile';

const ProfileSettings = () => {
  const { userProfile, userProfileMutate } = useGetUserProfile();
  const imgRef = useRef<HTMLInputElement>(null);
  const [uploadImage, setUploadImage] = useState<string | ArrayBuffer | null>();
  const router = useRouter();

  // 모든 자격증 리스트 불러오는 함수
  const getUserProfile = useCallback(async () => {
    return userProfile;
  }, []);

  const onNext = () => {
    router.push('/mypage');
  };

  // 이미지 미리보기 설정
  const handleImagePreview = async () => {
    const files = imgRef.current?.files;
    let reader = new FileReader();
    if (files) {
      reader.readAsDataURL(files[0]);
      reader.onloadend = () => {
        setUploadImage(reader.result);
      };
    }
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e: any) => {
    e.preventDefault(); // 폼 제출 시 새로고침 방지
    const formData = new FormData();
    if (imgRef.current && imgRef.current.files) {
      formData.append('file', imgRef.current.files[0]); // 파일을 formData에 추가

      const json = { nickname: e.target.nickname.value };
      formData.append(
        'request',
        new Blob([JSON.stringify(json)], {
          type: 'application/json',
        }),
      );

      try {
        await patchProfileData(formData).then(async () => {
          onNext();
          await userProfileMutate();
        });
      } catch (error) {
        console.error('폼 제출 중 오류 발생:', error);
      }
    }
  };

  useEffect(() => {
    if (userProfile) {
      getUserProfile();
    }
  }, []);

  return (
    <div>
      <Header headerType={'dynamic'} title={'프로필 변경'} rightElement={<EmptyIcon />} />
      <form onSubmit={handleSubmit} className="bg-gray0 min-h-screen">
        <div className="w-full mt-2"></div>
        <div className="flex flex-col gap-y-5 mx-5">
          {/* 프로필 사진 설정 섹션 */}
          <div className="flex flex-col justify-center items-center mt-5">
            <div className="relative w-fit">
              <div className="relative w-[100px] h-[100px] object-cover overflow-hidden rounded-full">
                <Image
                  alt={userProfile ? userProfile.userId?.toString() || '' : ''}
                  src={
                    typeof uploadImage === 'string'
                      ? uploadImage
                      : userProfile?.profileImage
                      ? userProfile?.profileImage
                      : '/person.png'
                  }
                  className={'object-cover'}
                  fill></Image>
              </div>
              <label htmlFor="input-file">
                <ProfileImageIcon className="absolute bottom-0 right-0" />
              </label>
              <input
                type="file"
                id={'input-file'}
                ref={imgRef}
                name="input-file"
                onChange={handleImagePreview}
                className="hidden"></input>
            </div>
          </div>

          {/* 닉네임 설정 섹션 */}
          <div className={'flex flex-col gap-y-2'}>
            <label className={'text-h3 font-bold'}>닉네임</label>
            <input
              className={'bg-neutral-100 rounded-[16px] py-3 px-4 placeholder:text-black focus:outline-none text-h4'}
              id="nickname"
              name="nickname"
              defaultValue={userProfile ? userProfile.nickname : ''}></input>
          </div>
        </div>

        <button
          type={'submit'}
          className={
            'w-full bg-gray2 h-[100px] rounded-t-[32px] text-white text-h3 fixed bottom-0 hover:bg-primary transition'
          }>
          <div className="text-white text-h3 py-[25px]">완료</div>
        </button>
      </form>
    </div>
  );
};
export default ProfileSettings;

function ProfileImageIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={35} height={35} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect x={0.838} y={0.886} width={33.6} height={33.6} rx={16.8} fill="#9E9FA1" />
      <mask
        id="prefix__a"
        style={{
          maskType: 'alpha',
        }}
        maskUnits="userSpaceOnUse"
        x={3}
        y={3}
        width={30}
        height={30}>
        <path fill="#D9D9D9" d="M3.237 3.286h28.8v28.8h-28.8z" />
      </mask>
      <g mask="url(#prefix__a)">
        <path
          d="M17.638 22.965c1.2 0 2.22-.42 3.06-1.26.84-.84 1.26-1.86 1.26-3.06s-.42-2.22-1.26-3.06c-.84-.84-1.86-1.26-3.06-1.26s-2.22.42-3.06 1.26c-.84.84-1.26 1.86-1.26 3.06s.42 2.22 1.26 3.06c.84.84 1.86 1.26 3.06 1.26zm0-1.92c-.672 0-1.24-.232-1.704-.696a2.317 2.317 0 01-.696-1.704c0-.672.232-1.24.696-1.704a2.317 2.317 0 011.704-.696c.672 0 1.24.232 1.704.696.464.464.696 1.032.696 1.704 0 .672-.232 1.24-.696 1.704a2.317 2.317 0 01-1.704.696zm-7.68 5.28c-.528 0-.98-.188-1.356-.564a1.849 1.849 0 01-.564-1.356v-11.52c0-.528.188-.98.564-1.356a1.849 1.849 0 011.356-.564h3.024l1.776-1.92h5.76l1.776 1.92h3.024c.528 0 .98.188 1.356.564.376.376.564.828.564 1.356v11.52c0 .528-.188.98-.564 1.356a1.849 1.849 0 01-1.356.564H9.958z"
          fill="#fff"
        />
      </g>
    </svg>
  );
}

const EmptyIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} fill="none" {...props}>
    <mask
      id="a"
      width={32}
      height={32}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: 'alpha',
      }}>
      <path fill="#D9D9D9" d="M0 0h32v32H0z" />
    </mask>
    <g mask="url(#a)">
      <path
        fill="#fff"
        d="m26.11 26.867-8.474-8.474a7 7 0 0 1-2.306 1.349 7.8 7.8 0 0 1-2.64.468q-3.19 0-5.402-2.206-2.211-2.207-2.211-5.384T7.283 7.23q2.207-2.21 5.383-2.21t5.397 2.207q2.22 2.208 2.22 5.385 0 1.378-.492 2.692a7.2 7.2 0 0 1-1.347 2.28l8.48 8.45zm-13.424-7.785q2.721 0 4.595-1.87 1.875-1.869 1.875-4.597 0-2.727-1.875-4.597t-4.595-1.87q-2.726 0-4.604 1.87-1.877 1.871-1.877 4.597 0 2.728 1.877 4.597t4.603 1.87"
      />
    </g>
  </svg>
);
