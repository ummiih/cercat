import { useRouter } from 'next/navigation';
import qs from 'query-string';
import React, { SVGProps, useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useRecoilValue } from 'recoil';

import RoundFilter from '@/components/community/RoundFilter';
import YearFilter from '@/components/community/YearFilter';
import Post from '@/components/mypage/Post';
import useGetCommentarySearchResults from '@/lib/hooks/useGetCommentarySearchResults';
import useGetMockExams from '@/lib/hooks/useGetMockExams';
import useGetMockExamYears from '@/lib/hooks/useGetMockExamYears';
import { certificateIdAtom } from '@/recoil/atom';
import { BoardType, ResponsePostType } from '@/types/community/type';
import { MockExam } from '@/types/global';

interface Props {
  boardType: BoardType;
  searchValue: number;
  debouncedValue: number;
  setSearchValue: React.Dispatch<React.SetStateAction<number>>;
}
const CommentaryBoardList = (props: Props) => {
  const { boardType, debouncedValue, searchValue, setSearchValue } = props;
  const certificateId = useRecoilValue(certificateIdAtom);
  const [isOpenCommentaryRoundFilter, setIsOpenCommentaryRoundFilter] = useState<boolean>(false);
  const [isOpenCommentaryYearFilter, setIsOpenCommentaryYearFilter] = useState<boolean>(false);
  const [selectedCommentaryYearFilterContent, setSelectedCommentaryYearFilterContent] = useState<number | string>(
    '전체',
  );
  const [selectedCommentaryRoundFilterContent, setSelectedCommentaryRoundFilterContent] = useState<number | string>(
    '전체',
  );
  const { examYears } = useGetMockExamYears(); //해설 년도 필터값 데이터
  const [yearsWithAllOption, setYearsWithAllOption] = useState<Array<number | string>>([]); //해설 년도 필터값 데이터 Copy Array
  const { mockExams } = useGetMockExams(certificateId, selectedCommentaryYearFilterContent); //해설 회차 필터값
  const [roundsWithAllOption, setRoundsWithAllOption] = useState<Array<string | MockExam>>([]); //해설 회차 필터값 데이터 Copy Array
  const [ref, inView] = useInView();
  const router = useRouter();
  //해설 게시글 검색 결과
  const { commentarySearchResults, setSize } = useGetCommentarySearchResults(
    certificateId,
    selectedCommentaryYearFilterContent,
    selectedCommentaryRoundFilterContent,
    searchValue,
  );

  //필터 값에 '전체'를 추가하기 위한 트리거
  const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true);

  /**
   * 처음 시작할 때 Year, Round 필터 값에 '전체'를 추가하는 기능
   */
  useEffect(() => {
    if (isInitialLoad && examYears && mockExams) {
      const newExamYears = ['전체', ...examYears];
      const newExamRounds = ['전체', ...mockExams];
      setYearsWithAllOption(newExamYears);
      setRoundsWithAllOption(newExamRounds);
      setIsInitialLoad(false);
    }
  }, [examYears, isInitialLoad]);

  /**
   * Year 를 선택할 때마다 Round 필터 값에 '전체'를 추가하는 기능
   */
  useEffect(() => {
    if (mockExams) {
      const newExamRounds = ['전체', ...mockExams];
      setRoundsWithAllOption(newExamRounds);
    }
  }, [mockExams]);

  /**
   * 무한 스크롤 뷰 감지하고 size + 1 해줌
   */
  const getMoreItem = useCallback(async () => {
    if (commentarySearchResults) {
      await setSize((prev: number) => prev + 1);
    }
    return;
  }, [setSize]);

  useEffect(() => {
    if (inView) {
      getMoreItem();
    }
  }, [inView, getMoreItem]);

  const commentaryTopElement = (year: number, round: number, number: number) => {
    return (
      <div className={'flex gap-x-[6px] pb-3'}>
        <div className={'px-2 py-[2px] text-gray4 bg-gray0 rounded-[8px]'}>{year}년도</div>
        <div className={'px-2 py-[2px] text-gray4 bg-gray0 rounded-[8px]'}>{round}회차</div>
        <div className={'px-2 py-[2px] text-gray4 bg-gray0 rounded-[8px]'}>{number}번</div>
      </div>
    );
  };

  /**
   * 전체를 선택했을 경우 회차 선택되지 않도록
   */
  const controlDisabledFilter = () => {
    return selectedCommentaryYearFilterContent === '전체';
  };

  /**
   * 쿼리파라미터에서 검색어
   */
  useEffect(() => {
    if (debouncedValue !== undefined) {
      const query = {
        keyword: debouncedValue || '',
      };

      const url = qs.stringifyUrl({
        url: `/community/${certificateId}`,
        query: query,
      });

      router.push(url);
    }
  }, [debouncedValue, router]);

  /**
   * 해설 게시판 년도 필터가 전체면 회차 필터도 전체로 변경
   */
  useEffect(() => {
    if (selectedCommentaryYearFilterContent === '전체') {
      setSelectedCommentaryRoundFilterContent('전체');
    }
  }, [selectedCommentaryYearFilterContent]);

  /**
   * boardType 이 변경되면 필터값 초기화
   */
  useEffect(() => {
    setSelectedCommentaryYearFilterContent('전체');
  }, [boardType]);

  // 디바운싱 적용된 상태 업데이트
  const handleSearchValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? parseInt(e.target.value, 10) : 0;
    setSearchValue(value);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    // 년, 월, 일 추출
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1을 더함
    const day = String(date.getDate()).padStart(2, '0'); // 일자를 2자리로 맞춤

    // 원하는 형식으로 반환
    return `${year}.${month}.${day}`;
  };

  return (
    <div className={'relative px-5 flex flex-col gap-y-4 '}>
      {/*필터*/}
      <div className={'flex gap-x-2'}>
        {/*년도 필터*/}
        <div
          onClick={() => setIsOpenCommentaryYearFilter(!isOpenCommentaryYearFilter)}
          className={'flex-shrink-0 w-fit flex px-3 py-1 rounded-full bg-white '}>
          <span className={'text-gray4 text-h6'}>{selectedCommentaryYearFilterContent}년도</span>
          {isOpenCommentaryYearFilter ? <ActivationIcon /> : <DisableIcon />}
        </div>
        {isOpenCommentaryYearFilter ? (
          <YearFilter
            data={yearsWithAllOption}
            isOpenFilter={isOpenCommentaryYearFilter}
            setSelectedFilterContent={setSelectedCommentaryYearFilterContent}
            setIsOpenFilter={setIsOpenCommentaryYearFilter}
          />
        ) : null}

        {/*회차 필터*/}
        <button
          onClick={() => setIsOpenCommentaryRoundFilter(!isOpenCommentaryRoundFilter)}
          disabled={controlDisabledFilter()}
          className={'flex-shrink-0 w-fit flex px-3 py-1 rounded-full bg-white '}>
          <span className={'text-gray4 text-h6'}>{selectedCommentaryRoundFilterContent}회차</span>
          {selectedCommentaryYearFilterContent !== '전체' ? (
            isOpenCommentaryRoundFilter ? (
              <ActivationIcon />
            ) : (
              <DisableIcon />
            )
          ) : null}
        </button>
        {isOpenCommentaryRoundFilter ? (
          <RoundFilter
            data={roundsWithAllOption}
            isOpenFilter={isOpenCommentaryRoundFilter}
            setSelectedFilterContent={setSelectedCommentaryRoundFilterContent}
            setIsOpenFilter={setIsOpenCommentaryRoundFilter}
          />
        ) : null}

        {/*문제 번호 검색 필터*/}
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className={'flex items-center gap-x-1 py-1 px-3 bg-white rounded-full w-fit'}>
          <input
            value={searchValue === 0 || undefined ? '' : searchValue}
            type={'number'}
            onChange={handleSearchValueChange}
            className={'text-h6 text-black outline-none w-[80px] placeholder:text-gray4 border-b-[1px] border-black'}
            placeholder={'문항번호 검색'}
          />
          <QuestionSeqSearchIcon />
        </form>
      </div>
      <div className={'flex flex-col gap-y-4'}>
        {commentarySearchResults &&
          commentarySearchResults.map((userPosts: ResponsePostType, index: number) => {
            const postResponse = userPosts?.result?.postResponse; // 안전한 접근
            if (!postResponse) return null; // 데이터가 없는 경우 렌더링하지 않음

            return (
              <div key={postResponse.postId} ref={ref}>
                <Post
                  postId={postResponse.postId}
                  content={postResponse.postContent?.content || ''}
                  title={postResponse.postContent?.title || ''}
                  commentCount={postResponse.postStatus?.commentCount || 0}
                  createdAt={formatDate(postResponse.dateTime?.createdAt || '')}
                  imageUrl={
                    postResponse.postContent?.images?.length ? postResponse.postContent.images[0].imageUrl : null
                  }
                  likeCount={postResponse.postStatus?.likeCount || 0}
                  topElement={
                    postResponse.question
                      ? commentaryTopElement(
                          postResponse.question.mockExam.examYear,
                          postResponse.question.mockExam.round,
                          postResponse.question.questionSeq,
                        )
                      : undefined
                  }
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};
export default CommentaryBoardList;

const QuestionSeqSearchIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={21} height={20} fill="none" {...props}>
    <mask
      id="a"
      width={21}
      height={20}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: 'alpha',
      }}>
      <path fill="#D9D9D9" d="M.646 0h20v20h-20z" />
    </mask>
    <g mask="url(#a)">
      <path
        fill="#1C1B1F"
        d="m16.535 16.647-4.963-4.963a5 5 0 0 1-1.37.735q-.746.26-1.54.26-1.95 0-3.314-1.364Q3.982 9.95 3.982 8q0-1.948 1.365-3.314Q6.713 3.32 8.66 3.32q1.95 0 3.315 1.365T13.341 8q0 .817-.268 1.563a5 5 0 0 1-.727 1.346l4.963 4.963zm-7.873-5.05q1.506-.001 2.551-1.046T12.258 8t-1.045-2.551q-1.044-1.045-2.551-1.045T6.11 5.449 5.066 8t1.044 2.551 2.552 1.045"
      />
    </g>
  </svg>
);

const DisableIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={21} fill="none" {...props}>
    <path stroke="#727375" strokeLinecap="round" d="M13.5 9 10 12 6.5 9" />
  </svg>
);
const ActivationIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={21} fill="none" {...props}>
    <path stroke="#727375" strokeLinecap="round" d="M6.5 12 10 9l3.5 3" />
  </svg>
);
