import { sendRequest } from '@/lib/axios';
import { SubjectResultRequests } from '@/types/global';

export const postSubjectResultRequestsList = async (
  subjectResultRequestsList: SubjectResultRequests[],
  mockExamId: number,
) => {
  try {
    // 액세스 토큰을 헤더에 담아 요청 보내기
    const response = await sendRequest({
      headers: {
        'Access-Token': localStorage.getItem('accessToken'),
      },
      method: 'POST',
      data: { createSubjectResultRequests: subjectResultRequestsList },
      url: `/api/v2/mock-exams/${mockExamId}/mock-exam-results`,
    });
    // 성공적인 응답 처리
    return response.data;
  } catch (error) {
    // 에러 처리
    console.error('에러 발생:', error);
  }
};

export const deleteIncorrectQuestion = async (userAnswerId: number) => {
  try {
    // 액세스 토큰을 헤더에 담아 요청 보내기
    const response = await sendRequest({
      headers: {
        'Access-Token': localStorage.getItem('accessToken'),
      },
      method: 'PATCH',
      url: `/api/v2user-answers/${userAnswerId}/review`,
    });
    // 성공적인 응답 처리
    return response.data;
  } catch (error) {
    // 에러 처리
    console.error('에러 발생:', error);
  }
};
