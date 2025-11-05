import {isAxiosError} from "axios";
import Toast from 'react-native-toast-message';

export const handleApiError = (
  err: unknown,
  fallbackMessage = 'Unexpected error'
) => {
  if (isAxiosError(err) && err.response) {
    const error = err.response.data;

    if (Array.isArray(error.message)) {
      Toast.show({
        type: 'error',
        text1: error.message[0]
      });
    } else {
      Toast.show({
        type: 'error',
        text1: error.message || fallbackMessage
      });
    }
  } else {
    Toast.show({
      type: 'error',
      text1: 'Network Error'
    });
  }
}