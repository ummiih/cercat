import { sendRequest } from '@/lib/axios';

// 유저 정보 삭제
export const deleteUserInfo = async () => {
  try {
    const response = await sendRequest({
      headers: {
        'Access-Token': localStorage.getItem('accessToken'),
      },
      method: 'DELETE',
      url: '/api/v2/users/me',
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('에러 발생:', error);
  }
};

// 로그아웃
export const patchLogout = async () => {
  try {
    const response = await sendRequest({
      headers: {
        'Access-Token': localStorage.getItem('accessToken'),
      },
      method: 'PATCH',
      url: '/api/v2/logout',
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('에러 발생:', error);
  }
};
