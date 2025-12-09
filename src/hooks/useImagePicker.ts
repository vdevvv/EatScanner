import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { DEFAULT_AVATAR } from '../constants/images';

export const useImagePicker = (initialImage?: string | null) => {
  const [selectedImage, setSelectedImage] = useState<string>(initialImage || DEFAULT_AVATAR);

  useEffect(() => {
    setSelectedImage(initialImage || DEFAULT_AVATAR);
  }, [initialImage]);

  const requestPermission = async (type: 'camera' | 'library') => {
    const fn = type === 'camera'
      ? ImagePicker.requestCameraPermissionsAsync
      : ImagePicker.requestMediaLibraryPermissionsAsync;

    const { status } = await fn();
    if (status !== 'granted') {
      Alert.alert('Permission required', `We need access to your ${type}.`);
      return false;
    }
    return true;
  };

  const processResult = (result: ImagePicker.ImagePickerResult) => {
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setSelectedImage(result.assets[0].uri);
      return result.assets[0];
    }
    return null;
  };

  const pickImageFromGallery = async () => {
    const hasPermission = await requestPermission('library');
    if (!hasPermission) return null;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    return processResult(result);
  };

  const takePhoto = async () => {
    const hasPermission = await requestPermission('camera');
    if (!hasPermission) return null;

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    return processResult(result);
  };

  const removePhoto = () => {
    setSelectedImage(DEFAULT_AVATAR);
  };

  return {
    selectedImage,
    pickImageFromGallery,
    takePhoto,
    removePhoto,
    isDefaultImage: selectedImage === DEFAULT_AVATAR,
  };
};