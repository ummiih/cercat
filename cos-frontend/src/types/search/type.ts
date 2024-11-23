export interface TrendingKeywordsResponseType {
  responseCode: string;
  message: string;
  result: TrendingKeywordType[];
}

export interface TrendingKeywordType {
  keyword: string;
  status: string;
}

/**
 * 최근 검색 기록
 */
export interface RecentSearchResponseType {
  responseCode: string;
  message: string;
  result: RecentSearchType[];
}
export interface RecentSearchType {
  keyword: string;
  createdAt: string;
}

/**
 * 자동 완성 검색어 조회
 */
export interface AutoCompleteSearchKeywordsResponseType {
  responseCode: string;
  message: string;
  result: string[];
}
