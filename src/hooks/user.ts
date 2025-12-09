import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { userService } from '../services/user.service';
import { AvatarUploadParams, UpdatePasswordDto, UpdateUserDto } from '../types';
import { handleApiError } from '../utils/handleApiError';
import Toast from 'react-native-toast-message';

export const useUser = (id: string) => {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => userService.getById(id),
    enabled: !!id,
  });
};

export const useMe = () => {
  return useQuery({
    queryKey: ['me'],
    queryFn: () => userService.getMe(),
  });
};

export const useUpdateMe = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateUserDto) => userService.updateMe(data),
    onSuccess: () => {
      Toast.show({
        type: 'success',
        text1: 'Data successfully updated',
      });
      void queryClient.invalidateQueries({ queryKey: ['me'] });
    },
    onError: (err) => handleApiError(err),
  });
};

export const useUpdatePassword = () => {
  return useMutation({
    mutationFn: (data: UpdatePasswordDto) => userService.updatePassword(data),
    onSuccess: () => {
      Toast.show({
        type: 'success',
        text1: 'Password successfully updated ',
      });
    },
    onError: (err) => handleApiError(err),
  });
};

export const useUploadAvatar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (asset: AvatarUploadParams) => userService.uploadAvatar(asset),
    onSuccess: () => {
      Toast.show({
        type: 'success',
        text1: 'Avatar successfully uploaded',
      })
      void queryClient.invalidateQueries({ queryKey: ['me'] });
    },
    onError: (err) => handleApiError(err),
  })
}

export const useDeleteAvatar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => userService.deleteAvatar(),
    onSuccess: () => {
      Toast.show({
        type: 'success',
        text1: 'Avatar successfully deleted',
      })
      void queryClient.invalidateQueries({ queryKey: ['me'] });
    },
    onError: (err) => handleApiError(err),
  })
}

export const useGetUserStats = (id: string) => {
  return useQuery({
    queryKey: ['user-stats', id],
    queryFn: () => userService.getUserStats(id),
    initialData: {
      friendsCount: 0,
      savedCount: 0,
      favoritesCount: 0,
    },
  });
};

export const useGetMyStats = () => {
  return useQuery({
    queryKey: ['user-stats'],
    queryFn: () => userService.getMyStats(),
    initialData: {
      friendsCount: 0,
      savedCount: 0,
      favoritesCount: 0,
    },
  });
};
