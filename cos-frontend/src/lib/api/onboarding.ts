import { sendRequest } from '@/lib/axios';
import { PostInterestCertificate } from '@/types/global';

export const postInterestCertificates = async (interestCertificates: PostInterestCertificate) => {
  try {
    // 액세스 토큰을 헤더에 담아 요청 보내기
    const response = await sendRequest({
      headers: {
        'Access-Token': localStorage.getItem('accessToken'),
      },
      method: 'POST',
      data: interestCertificates,
      url: '/api/v2/interest-certificates',
    });
    // 성공적인 응답 처리
    return response.data;
  } catch (error: any) {
    if (error) {
      console.log('error', error);
    }
  }
};

export const putInterestCertificates = async (interestCertificates: PostInterestCertificate) => {
  try {
    // 액세스 토큰을 헤더에 담아 요청 보내기
    const response = await sendRequest({
      headers: {
        'Access-Token': localStorage.getItem('accessToken'),
      },
      method: 'PUT',
      data: interestCertificates,
      url: '/api/v2/interest-certificates',
    });
    // 성공적인 응답 처리
    return response.data;
  } catch (error) {
    // 에러 처리
    console.error('에러 발생:', error);
  }
};

export const patchProfileData = async (profileData: FormData) => {
  try {
    // 액세스 토큰을 헤더에 담아 요청 보내기
    const response = await sendRequest({
      headers: {
        'Access-Token': localStorage.getItem('accessToken'),
        'Content-Type': 'multipart/form-data',
      },
      method: 'PATCH',
      data: profileData,
      url: '/api/v2/users/me',
    });
    // 성공적인 응답 처리
    return response.data;
  } catch (error) {
    // 에러 처리
    console.error('에러 발생:', error);
  }
};
