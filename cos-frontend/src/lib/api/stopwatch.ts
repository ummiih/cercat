import { sendRequest } from '@/lib/axios';

export const postStudyTimes = async (goalId: number, studyTime: number) => {
  try {
    // 액세스 토큰을 헤더에 담아 요청 보내기
    const response = await sendRequest({
      headers: {
        'Access-Token': localStorage.getItem('accessToken'),
      },
      method: 'POST',
      url: `/api/v2/goals/${goalId}/study-times?studyTime=${studyTime}`,
    });
    // 성공적인 응답 처리
    return response.data;
  } catch (error: any) {
    if (error) {
      console.log('error', error);
    }
  }
};
