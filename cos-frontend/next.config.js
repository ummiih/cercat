/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['github.com', 'k.kakaocdn.net', 'storage.googleapis.com', 't1.kakaocdn.net', 'img1.kakaocdn.net'],
  },
  reactStrictMode: false,
  swcMinify: true,
};

const withPWA = require('next-pwa')({
  dest: 'public', // Service Worker와 캐시를 저장할 위치
  disable: false, // 개발 환경에서도 PWA 활성화
  register: true,
  skipWaiting: true,
  // disable: process.env.NODE_ENV === 'development', // 개발 환경에서는 PWA 비활성화
});

module.exports = withPWA({
  reactStrictMode: true,
});
