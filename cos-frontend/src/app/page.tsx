'use client';

import Link from 'next/link';
import { SVGProps, useEffect, useState } from 'react';

// `beforeinstallprompt` 타입 선언
declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
}

interface BeforeInstallPromptEvent extends Event {
  platforms: string[];
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
  prompt: () => Promise<void>;
}

export default function Page() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    // `beforeinstallprompt` 이벤트 리스너 등록
    const handleBeforeInstallPrompt = (event: BeforeInstallPromptEvent) => {
      event.preventDefault(); // 기본 동작 방지
      setDeferredPrompt(event); // 이벤트 저장
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      // 이벤트 리스너 제거
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  useEffect(() => {
    console.log('deferredPrompt', deferredPrompt);
  }, [deferredPrompt]);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // 설치 프로세스 실행
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      console.log('PWA 설치 완료');
    } else {
      console.log('PWA 설치 취소');
    }

    setDeferredPrompt(null); // 프로세스 완료 후 초기화
  };

  const isiOS = () => {
    if (typeof window === 'undefined') return false; // 서버 사이드에서는 항상 false 반환
    return /iPad|iPhone|iPod/.test(navigator.userAgent);
  };

  return (
    <div className={'flex flex-col justify-center items-center bg-primary min-h-screen'}>
      {isiOS() && <div className="ios-install-hint">Safari에서 공유 버튼을 누르고 홈 화면에 추가를 선택하세요.</div>}
      {/* iOS PWA 설정 */}
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="cercat" />
      <link rel="apple-touch-icon" href="/logo.png" />
      {deferredPrompt && (
        <button
          onClick={handleInstallClick}
          className="fixed bottom-5 right-5 bg-blue-500 text-white px-4 py-2 rounded-md shadow-lg">
          PWA 설치
        </button>
      )}
      <WhiteLogoIcon />
      <Link
        href="http://cercat.o-r.kr/oauth2/authorization/kakao"
        className={
          'flex gap-x-2 absolute bottom-5 justify-center bg-white rounded-[16px] font-semibold w-[90%] py-[14px]'
        }>
        <KakaoIcon />
        카카오로 시작하기
      </Link>
    </div>
  );
}

const WhiteLogoIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={179} height={32} fill="none" {...props}>
    <g fill="#fff" clipPath="url(#a)">
      <path d="M23.982 18.652c-1.26 3.194-4.37 5.466-8.007 5.466-4.75 0-8.61-3.862-8.61-8.603 0-4.742 3.86-8.604 8.61-8.604 3.637 0 6.75 2.269 8.007 5.467h7.141C29.666 5.347 23.428.053 15.971.053 7.441.053.5 6.987.5 15.511c0 8.523 6.94 15.457 15.471 15.457 7.457 0 13.695-5.295 15.149-12.32h-7.142zM111.479 18.652c-1.261 3.194-4.37 5.466-8.007 5.466-4.75 0-8.611-3.862-8.611-8.603 0-4.742 3.861-8.604 8.611-8.604 3.637 0 6.75 2.269 8.007 5.467h7.141C117.166 5.347 110.928.053 103.472.053 94.941.053 88 6.987 88 15.511c0 8.523 6.94 15.457 15.472 15.457 7.456 0 13.694-5.295 15.148-12.32h-7.141zM85.32 0c-8.425 0-15.281 6.847-15.281 15.268l-.061 15.704h6.86l.061-15.704c0-4.64 3.778-8.414 8.42-8.414zM168.553 16.736V.053h-6.861V4.26h-5.493v6.854h5.493v5.618c0 8.418 6.857 15.268 15.282 15.268v-6.854c-4.643 0-8.421-3.775-8.421-8.414z" />
      <path d="M174.533 11.653a3.965 3.965 0 0 0 3.967-3.964 3.965 3.965 0 0 0-3.967-3.964 3.966 3.966 0 0 0-3.968 3.964 3.966 3.966 0 0 0 3.968 3.964M152.71 14.832C152.349 6.623 145.572.053 137.273.053c-8.3 0-15.471 6.934-15.471 15.458 0 8.523 6.94 15.457 15.471 15.457 3.185 0 6.146-.967 8.61-2.62v2.624h6.861v-16.14zm-15.437 9.282c-4.75 0-8.611-3.858-8.611-8.603 0-4.746 3.861-8.603 8.611-8.603 4.749 0 8.61 3.857 8.61 8.603s-3.861 8.603-8.61 8.603M50.072 24.103c-.076 0-.148.015-.22.015-4.032 0-7.415-2.788-8.349-6.532h23.82v-2.071c0-8.528-6.94-15.462-15.47-15.462-8.532 0-15.472 6.934-15.472 15.458 0 8.523 6.94 15.457 15.471 15.457q.113 0 .22-.007v-6.862zm-.22-17.195c3.53 0 6.568 2.131 7.897 5.177h-15.79c1.329-3.042 4.366-5.177 7.893-5.177" />
      <path d="M57.016 30.972a3.966 3.966 0 0 0 3.968-3.964 3.966 3.966 0 0 0-3.968-3.964 3.966 3.966 0 0 0-3.967 3.964 3.966 3.966 0 0 0 3.967 3.964" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M.5 0h178v32H.5z" />
      </clipPath>
    </defs>
  </svg>
);

const KakaoIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={25} height={26} fill="none" {...props}>
    <g clipPath="url(#a)">
      <path
        fill="#F9E000"
        d="M24.5 19.7c0 2.966-2.39 5.37-5.34 5.37H5.84C2.89 25.07.5 22.667.5 19.7V6.303C.5 3.336 2.89.932 5.84.932h13.32c2.95 0 5.34 2.404 5.34 5.37z"
      />
      <path
        fill="#371C1D"
        d="M12.426 5.475c-4.767 0-8.633 3.055-8.633 6.823 0 2.453 1.637 4.603 4.094 5.805-.18.675-.653 2.441-.749 2.82-.117.47.17.464.363.339.149-.099 2.366-1.606 3.321-2.259q.78.117 1.604.118c4.766 0 8.632-3.055 8.632-6.823s-3.864-6.823-8.632-6.823"
      />
      <path
        fill="#F9E000"
        d="M6.402 11.043h.888s.004 2.44 0 3.01c0 .415.924.42.924.007l.004-2.983.884.002c.552 0 .552-.869 0-.869-.622 0-2.703-.017-2.703-.017-.52 0-.52.852 0 .852"
      />
      <mask
        id="b"
        width={4}
        height={5}
        x={6}
        y={10}
        maskUnits="userSpaceOnUse"
        style={{
          maskType: 'luminance',
        }}>
        <path
          fill="#fff"
          d="M6.402 11.043h.888s.004 2.44 0 3.01c0 .415.924.42.924.007l.004-2.983.884.002c.552 0 .552-.869 0-.869-.622 0-2.703-.017-2.703-.017-.52 0-.52.852 0 .852"
        />
      </mask>
      <g mask="url(#b)">
        <path fill="#F9E000" d="M9.656 10.19H5.881v4.283h3.775z" />
      </g>
      <path
        fill="#F9E000"
        d="m10.654 11.201.495 1.548h-1.03zm-.554-.725c-.218.483-1.008 2.756-1.27 3.358-.19.437.63.792.819.355l.177-.621h1.625s-.055.026.161.595c.175.46 1.02.141.845-.32-.25-.66-1.114-3.03-1.27-3.367-.072-.156-.333-.266-.585-.266-.21 0-.413.077-.5.266"
      />
      <mask
        id="c"
        width={5}
        height={5}
        x={8}
        y={10}
        maskUnits="userSpaceOnUse"
        style={{
          maskType: 'luminance',
        }}>
        <path
          fill="#fff"
          d="m10.654 11.201.495 1.548h-1.03zm-.554-.725c-.218.483-1.008 2.756-1.27 3.358-.19.437.63.792.819.355l.177-.621h1.625s-.055.026.161.595c.175.46 1.02.141.845-.32-.25-.66-1.114-3.03-1.27-3.367-.072-.156-.333-.266-.585-.266-.21 0-.413.077-.5.266"
        />
      </mask>
      <g mask="url(#c)">
        <path fill="#F9E000" d="M12.63 10.21H8.64v4.416h3.99z" />
      </g>
      <path
        fill="#F9E000"
        d="M12.766 10.618c0 .773.005 3.264.005 3.264s-.072.494.353.494l1.783-.004c.418 0 .415-.888 0-.888s-1.18-.005-1.18-.005.004-2.304.002-2.863c0-.272-.24-.406-.48-.406s-.483.137-.483.408"
      />
      <mask
        id="d"
        width={4}
        height={5}
        x={12}
        y={10}
        maskUnits="userSpaceOnUse"
        style={{
          maskType: 'luminance',
        }}>
        <path
          fill="#fff"
          d="M12.766 10.618c0 .773.005 3.264.005 3.264s-.072.494.353.494l1.783-.004c.418 0 .415-.888 0-.888s-1.18-.005-1.18-.005.004-2.304.002-2.863c0-.272-.24-.406-.48-.406s-.483.137-.483.408"
        />
      </mask>
      <g mask="url(#d)">
        <path fill="#F9E000" d="M15.325 10.21h-2.626v4.166h2.626z" />
      </g>
      <path
        fill="#F9E000"
        d="M15.438 10.496c.01.338-.012 3.403-.01 3.63 0 .358.912.358.912 0v-1.204l.269-.214 1.171 1.599c.238.312.982-.252.746-.564l-1.243-1.64s.845-.911 1.176-1.243c.195-.192-.408-.799-.6-.604l-1.51 1.51s.013-.831 0-1.292c-.004-.175-.218-.26-.436-.26-.235 0-.475.097-.47.284"
      />
      <mask
        id="e"
        width={4}
        height={5}
        x={15}
        y={10}
        maskUnits="userSpaceOnUse"
        style={{
          maskType: 'luminance',
        }}>
        <path
          fill="#fff"
          d="M15.438 10.496c.01.338-.012 3.403-.01 3.63 0 .358.912.358.912 0v-1.204l.269-.214 1.171 1.599c.238.312.982-.252.746-.564l-1.243-1.64s.845-.911 1.176-1.243c.195-.192-.408-.799-.6-.604l-1.51 1.51s.013-.831 0-1.292c-.004-.175-.218-.26-.436-.26-.235 0-.475.097-.47.284"
        />
      </mask>
      <g mask="url(#e)">
        <path fill="#F9E000" d="M18.76 10.057h-3.334v4.557h3.333z" />
      </g>
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M.5.932h24v24.137H.5z" />
      </clipPath>
    </defs>
  </svg>
);
