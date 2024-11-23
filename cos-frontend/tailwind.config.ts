import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      // Brand colors
      primary: '#3B3DFF',
      second: '#6283FD',

      // Particular colors
      point: '#FF6A3B',

      // Achromatic colors
      black: '#0D0E10',
      gray4: '#727375',
      gray3: '#9E9FA1',
      gray2: '#CBCCCE',
      gray1: '#E4E5E7',
      gray0: '#F4F5F7',
      white: '#FFFFFF',
      blue: '#6283FD',
      sky: '#C8D3F9',

      // 그 외 추가 컬러
      // ...
    },
    fontSize: {
      //폰트 사이즈
      h1: '24px', // Head 1
      h2: '20px', // Title 1
      h3: '18px', // Title 2, 3
      h4: '16px', // Title 4, 5, SubTitle 1, Body1
      h5: '15px',
      h6: '14px', // SubTitle 2, Body2, Button
      h7: '12px',
    },
    screens: {
      sm: '375px',    // sm을 500px로 변경
      md: '700px',    // md를 850px로 변경
      lg: '1080px',   // lg를 1080px로 변경
      xl: '1440px',   // xl을 1440px로 변경
      '2xl': '1800px' // 2xl을 1800px로 변경
    }
  },
  plugins: [],
};
export default config;

// 주석
