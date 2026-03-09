import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {userService} from '../services/user.service';
import {AvatarUploadParams, UpdatePasswordDto, UpdateUserDto} from '../types';
import {handleApiError} from '../utils/handleApiError';
import Toast from 'react-native-toast-message';
import {useAuthStore} from "../stores/useAuthStore";

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
  const {setUser} = useAuthStore(state => state);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateUserDto) => userService.updateMe(data),
    onSuccess: (data) => {
      Toast.show({
        type: 'success',
        text1: 'Data successfully updated',
      });
      void queryClient.invalidateQueries({queryKey: ['me']});
      setUser(data);
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
  const {setUser} = useAuthStore(state => state);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (asset: AvatarUploadParams) => userService.uploadAvatar(asset),
    onSuccess: (data) => {
      Toast.show({
        type: 'success',
        text1: 'Avatar successfully uploaded',
      })
      void queryClient.invalidateQueries({queryKey: ['me']});
      setUser(data);
    },
    onError: (err) => handleApiError(err),
  })
}

export const useDeleteAvatar = () => {
  const {setUser} = useAuthStore(state => state);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => userService.deleteAvatar(),
    onSuccess: (data) => {
      Toast.show({
        type: 'success',
        text1: 'Avatar successfully deleted',
      })
      void queryClient.invalidateQueries({queryKey: ['me']});
      setUser(data);
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

export const useGetMyBadges = () => {
  return useQuery({
    queryKey: ['my-badges'],
    queryFn: () => userService.getMyBadges(),
    initialData: []
  })
}

export const useGetUserBadges = (userId: string) => {
  return useQuery({
    queryKey: ['user-badges', userId],
    queryFn: () => userService.getUserBadges(userId),
    initialData: []
  })
}

export const useInitiatePhoneUpdate = () => {
  return useMutation({
    mutationFn: (phone: string) => userService.initiatePhoneUpdate(phone),
    onError: (err) => handleApiError(err),
  });
};

export const useConfirmPhoneUpdate = () => {
  const queryClient = useQueryClient();
  const {setUser} = useAuthStore(state => state);

  return useMutation({
    mutationFn: (code: string) => userService.confirmPhoneUpdate(code),
    onSuccess: async (updatedUser) => {
      setUser(updatedUser);
      await queryClient.invalidateQueries({queryKey: ['me']});
      Toast.show({type: 'success', text1: 'Phone number updated successfully'});
    },
    onError: (err) => handleApiError(err),
  });
};

export const useToggleNotifications = () => {
  const queryClient = useQueryClient();

  const {setUser} = useAuthStore();

  return useMutation({
    mutationFn: (enabled: boolean) =>
      userService.toggleNotifications(enabled),

    onSuccess: (updatedUser) => {
      setUser(updatedUser);
    },
  });
};

export const useDeleteAccount = () => {
  const logout = useAuthStore((state) => state.signOut);

  return useMutation({
    mutationFn: () => userService.deleteMe(),
    onSuccess: async () => {
      Toast.show({
        type: 'success',
        text1: 'Account deleted successfully',
      });
      await logout();
    },
    onError: (err) => handleApiError(err),
  });
};
