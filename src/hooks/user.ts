import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { userService } from '../services/user.service';
import { UpdatePasswordDto, UpdateUserDto } from '../types';
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
