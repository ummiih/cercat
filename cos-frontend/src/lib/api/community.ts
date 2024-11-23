import { BoardType, ExamReviewPostType } from '@/types/community/type';

import { sendRequest } from '../axios';

export const postFavoriteBoards = async (certificateId: number) => {
  try {
    // 액세스 토큰을 헤더에 담아 요청 보내기
    const response = await sendRequest({
      headers: {
        'Access-Token': localStorage.getItem('accessToken'),
      },
      method: 'POST',
      url: `/api/v2/favorite-boards/${certificateId}`,
    });
    // 성공적인 응답 처리
    return response.data;
  } catch (error) {
    // 에러 처리
    console.error('에러 발생:', error);
  }
};

export const postCommentary = async (certificateId: number, postType: string, formData: FormData) => {
  try {
    // 액세스 토큰을 헤더에 담아 요청 보내기
    const response = await sendRequest({
      headers: {
        'Access-Token': localStorage.getItem('accessToken'),
        'Content-Type': 'multipart/form-data',
      },
      method: 'POST',
      data: formData,
      url: `/api/v2/certificates/${certificateId}/${postType}/posts`,
    });
    console.log(response.data);
    // 성공적인 응답 처리
    return response.data;
  } catch (error) {
    // 에러 처리
    console.error('에러 발생:', error);
  }
};

export const putPostDetail = async (certificateId: number, postType: string, formData: FormData) => {
  try {
    // 액세스 토큰을 헤더에 담아 요청 보내기
    const response = await sendRequest({
      headers: {
        'Access-Token': localStorage.getItem('accessToken'),
        'Content-Type': 'multipart/form-data',
      },
      method: 'PUT',
      data: formData,
      url: `/api/v2/certificates/${certificateId}/${postType}/posts`,
    });
    console.log(response.data);
    // 성공적인 응답 처리
    return response.data;
  } catch (error) {
    // 에러 처리
    console.error('에러 발생:', error);
  }
};

// 통합 검색
export const getTotalSearchResults = async (certificateId: number, postType: BoardType, keyword: string) => {
  try {
    // 액세스 토큰을 헤더에 담아 요청 보내기
    if (postType !== 'REVIEW') {
      const response = await sendRequest({
        headers: {
          'Access-Token': localStorage.getItem('accessToken'),
        },
        method: 'GET',
        url: `/api/v2/certificates/${certificateId}/search?postType=${postType}&keyword=${keyword}&page=0&size=10&sortFields=subjectResultEntity.mockExamResultEntity.createdAt, questionEntity.questionSeq&sortDirections=DESC, ASC`,
      });
      console.log(response.data);
      // 성공적인 응답 처리
      return response.data;
    }
  } catch (error) {
    // 에러 처리
    console.error('에러 발생:', error);
  }
};

export const getCommentarySearchResults = async (
  certificateId: number,
  examYear: number,
  round: number,
  questionSequence: number,
) => {
  try {
    // 액세스 토큰을 헤더에 담아 요청 보내기
    const response = await sendRequest({
      headers: {
        'Access-Token': localStorage.getItem('accessToken'),
      },
      method: 'GET',
      url: `/api/v2/certificates/${certificateId}/posts?examYear=${examYear}&round=${round}&questionSequence=${questionSequence}&page=0&size=10&sortKey=id`,
    });
    console.log(response.data);
    // 성공적인 응답 처리
    return response.data;
  } catch (error) {
    // 에러 처리
    console.error('에러 발생:', error);
  }
};

// 통합 검색 전체 삭제
export const deleteAllSearchResults = async () => {
  try {
    // 액세스 토큰을 헤더에 담아 요청 보내기
    const response = await sendRequest({
      headers: {
        'Access-Token': localStorage.getItem('accessToken'),
      },
      method: 'DELETE',
      url: '/api/v2/search-logs/all',
    });
    console.log(response.data);
    // 성공적인 응답 처리
    return response.data;
  } catch (error) {
    // 에러 처리
    console.error('에러 발생:', error);
  }
};

// 특정 검색 기록 삭제
export const deleteEachSearchResult = async (keyword: string, createdAt: string) => {
  try {
    // 액세스 토큰을 헤더에 담아 요청 보내기
    const response = await sendRequest({
      headers: {
        'Access-Token': localStorage.getItem('accessToken'),
      },
      method: 'DELETE',
      url: `/api/v2/search-logs?keyword=${keyword}&createdAt=${createdAt}`,
    });
    console.log(response.data);
    // 성공적인 응답 처리
    return response.data;
  } catch (error) {
    // 에러 처리
    console.error('에러 발생:', error);
  }
};

// 따끈 후기 게시글
export const postExamReview = async (certificateId: number, postData: ExamReviewPostType) => {
  try {
    // 액세스 토큰을 헤더에 담아 요청 보내기
    const response = await sendRequest({
      headers: {
        'Access-Token': localStorage.getItem('accessToken'),
      },
      method: 'POST',
      data: postData,
      url: `/api/v2/certificates/${certificateId}/exam-reviews`,
    });
    console.log(response.data);
    // 성공적인 응답 처리
    return response.data;
  } catch (error) {
    // 에러 처리
    console.error('에러 발생:', error);
  }
};
