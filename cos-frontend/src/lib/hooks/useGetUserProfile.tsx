import useSWR from 'swr';

import { swrGetFetcher } from '@/lib/axios';
import { UserProfileResponseType } from '@/types/global';

const useGetUserProfile = () => {
  const { data, error, mutate } = useSWR<UserProfileResponseType>('/api/v2/users/me', swrGetFetcher);
  return {
    userProfile: data ? data.result : null,
    isLoading: !error && !data,
    isError: error,
    userProfileMutate: mutate,
  };
};
export default useGetUserProfile;
