'use client';

import { GoalSettingInfo } from '@/types/global';

import { sendRequest } from '../axios';

export const postGoalSettingData = async (goalSettingInfo: GoalSettingInfo, certificateId: number | undefined) => {
  try {
    // 액세스 토큰을 헤더에 담아 요청 보내기
    const response = await sendRequest({
      headers: {
        'Access-Token': localStorage.getItem('accessToken'),
      },
      method: 'POST',
      data: goalSettingInfo,
      url: `/api/v2/certificates/${certificateId}/goals`,
    });
    // 성공적인 응답 처리
    return response.data;
  } catch (error) {
    // 에러 처리
    console.error('에러 발생:', error);
  }
};

export const putGoalSettingData = async (goalSettingInfo: GoalSettingInfo, goalId: number) => {
  try {
    // 액세스 토큰을 헤더에 담아 요청 보내기
    const response = await sendRequest({
      headers: {
        'Access-Token': localStorage.getItem('accessToken'),
      },
      method: 'PUT',
      data: goalSettingInfo,
      url: `/api/v2/goals/${goalId}`,
    });
    return response.data;
  } catch (error) {
    // 에러 처리
    console.error('에러 발생:', error);
  }
};
