'use client';

import * as React from 'react';
import { SVGProps } from 'react';

import { getTotalSearchResults } from '@/lib/api/community';
import useGetRecentSearchResults from '@/lib/hooks/useGetRecentSearchResults';
import { BoardType } from '@/types/community/type';

interface Props {
  setIsClickedAutoCompleteSearchKeywords: React.Dispatch<React.SetStateAction<boolean>>;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  searchValue: string;
  boardType: BoardType;
}
const SearchInput = (props: Props) => {
  const { boardType, setIsClickedAutoCompleteSearchKeywords, setSearchValue, searchValue } = props;
  const { mutate } = useGetRecentSearchResults();
  const handleSubmit = async () => {
    await getTotalSearchResults(1, boardType, searchValue).then((r) => console.log('검색 결과', r));
    await mutate().then((r) => console.log('response임', r));
  };

  return (
    <div className={'bg-white my-[6px] px-5 py-[10px]'}>
      <div className={'flex gap-x-3  items-center'}>
        <BackIcon />
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await handleSubmit();
          }}
          className={'flex gap-x-1 py-2 px-3 border-[1px] border-gray2 rounded-[16px] w-full'}>
          <SearchIcon />
          <input
            value={searchValue}
            title={'keyContent'}
            onChange={(e) => {
              setSearchValue(e.target.value);
              setIsClickedAutoCompleteSearchKeywords(true);
            }}
            className={'text-h4 text-gray4 outline-none'}
            placeholder={'궁금한 것을 검색해보세요.'}></input>
        </form>
      </div>
    </div>
  );
};
export default SearchInput;

const SearchIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={26} height={24} fill="none" {...props}>
    <mask
      id="a"
      width={26}
      height={24}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: 'alpha',
      }}>
      <path fill="#D9D9D9" d="M.646 0h24.775v24H.646z" />
    </mask>
    <g mask="url(#a)">
      <path
        fill="#727375"
        d="m20.76 20.154-6.464-6.261a5.7 5.7 0 0 1-1.78.988 6.1 6.1 0 0 1-2.024.35q-2.48 0-4.198-1.663T4.576 9.503q0-2.4 1.717-4.067Q8.011 3.77 10.49 3.77q2.479 0 4.199 1.664 1.72 1.665 1.72 4.066 0 1.043-.381 2.018a5.4 5.4 0 0 1-1 1.667l6.463 6.262zm-10.268-5.923q2.055 0 3.47-1.37 1.414-1.371 1.414-3.36 0-1.992-1.415-3.361-1.414-1.37-3.469-1.37T7.023 6.14 5.61 9.5t1.414 3.36 3.47 1.371"
      />
    </g>
  </svg>
);
const BackIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={33} height={32} fill="none" {...props}>
    <path stroke="#0D0E10" strokeLinecap="round" strokeLinejoin="round" d="m21.646 26-10-10 10-10" />
  </svg>
);
