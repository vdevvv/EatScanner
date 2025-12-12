import React, {useEffect, useMemo, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Keyboard, ActivityIndicator,
} from 'react-native';
import {Ionicons, MaterialCommunityIcons} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS} from '../../constants/colors';
import {useDeleteAvatar, useMe, useUpdateMe, useUploadAvatar} from '../../hooks/user';
import InputField from '../../components/common/InputField';
import PageLoader from '../../components/Loader/PageLoader';
import {handleApiError} from '../../utils/handleApiError';
import {Controller, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {EditProfileSchema, editProfileSchema} from '../../schemas/user/edit-profile.schema';
import BottomSheet from '@gorhom/bottom-sheet';
import {useImagePicker} from '../../hooks/useImagePicker';
import EditProfileBottomSheet from '../../components/Profile/EditProfileBottomSheet';

const EditProfileScreen = ({shouldShowHeader = true}) => {
  const {data, isLoading, isError, error} = useMe();
  const {mutate: updateMe, isPending} = useUpdateMe();
  const {mutate: uploadAvatar, isPending: isUploadingAvatar} = useUploadAvatar();
  const {mutate: deleteAvatar} = useDeleteAvatar();
  const navigation = useNavigation();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['1%', '35%'], []);

  const {
    selectedImage,
    pickImageFromGallery,
    takePhoto,
    removePhoto,
    isDefaultImage,
  } = useImagePicker(data?.avatar);

  const {control, handleSubmit, reset, formState: {errors}} = useForm<EditProfileSchema>({
    resolver: zodResolver(editProfileSchema),
  });

  const handleOpenSheet = () => {
    Keyboard.dismiss();
    bottomSheetRef.current?.expand();
  };

  const handleCloseSheet = () => {
    bottomSheetRef.current?.close();
  };

  useEffect(() => {
    if (isError) {
      handleApiError(error);
    }
  }, []);

  useEffect(() => {
    if (data) {
      reset({
        phone: data.phone ?? '',
        fullName: data.fullName ?? '',
        userName: data.userName ?? '',
      });
    }
  }, [data]);

  if (isLoading || !data) {
    return <PageLoader/>;
  }

  const handleSave = (data: EditProfileSchema) => {
    updateMe(data);
  };

  const handleUploadImage = async (asset: any) => {
    if (!asset) return;

    const fileExtension = asset.uri.split('.').pop() || 'jpg';
    const fileName = `avatar_${Date.now()}.${fileExtension}`;
    const mimeType = asset.mimeType || `image/${fileExtension}`;

    uploadAvatar({
      uri: asset.uri,
      name: fileName,
      type: mimeType,
    });
  };

  return (
    <SafeAreaView style={[styles.safeArea, {marginBottom: shouldShowHeader ? 0 : 25}]}>
      {shouldShowHeader && (
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={28} color="#333"/>
          </TouchableOpacity>
          <Text style={styles.screenTitle}>Edit Profile</Text>
          <View style={{width: 48}}/>
        </View>
      )}

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.avatarSection}>
          <View style={styles.avatarContainer}>
            <TouchableOpacity onPress={handleOpenSheet} disabled={isUploadingAvatar}>
              <Image source={{uri: selectedImage}} style={styles.avatar}/>
              <View style={styles.editIconContainer}>
                {isUploadingAvatar ? (
                  <ActivityIndicator size="small" color="#333"/>
                ) : (
                  <MaterialCommunityIcons name="pencil" size={18} color="#333"/>
                )}
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.formContainer}>
          <View>
            <Controller
              control={control}
              name="fullName"
              render={({field: {onChange, value}}) => (
                <InputField
                  label="Full name"
                  value={value}
                  onChangeText={onChange}
                  autoCapitalize="words"
                />
              )}
            />
            {errors.fullName && <Text style={styles.errorText}>{errors.fullName.message}</Text>}
          </View>
          <View>
            <Controller
              control={control}
              name="userName"
              render={({field: {onChange, value}}) => (
                <InputField
                  label="User name"
                  value={value}
                  onChangeText={onChange}
                  autoCapitalize="none"
                />
              )}
            />
            {errors.userName && <Text style={styles.errorText}>{errors.userName.message}</Text>}
          </View>
          <View>
            <Controller
              control={control}
              name="phone"
              render={({field: {onChange, value}}) => (
                <InputField
                  label="Phone number"
                  value={value}
                  onChangeText={onChange}
                  keyboardType="phone-pad"
                />
              )}
            />
            {errors.phone && <Text style={styles.errorText}>{errors.phone.message}</Text>}
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.saveButton} disabled={isPending} onPress={handleSubmit(handleSave)}>
          <Text style={styles.saveButtonText}>{isPending ? 'Loading...' : 'Save changes'}</Text>
        </TouchableOpacity>
      </View>
      <EditProfileBottomSheet
        bottomSheetRef={bottomSheetRef}
        snapPoints={snapPoints}
        isDefaultImage={isDefaultImage}
        onPickGallery={async () => {
          const asset = await pickImageFromGallery();
          if (asset) {
            handleCloseSheet();
            await handleUploadImage(asset);
          }
        }}
        onRemovePhoto={async () => {
          deleteAvatar();
          removePhoto();
          handleCloseSheet();
        }}
        onTakePhoto={async () => {
          const asset = await takePhoto();
          if (asset) {
            handleCloseSheet();
            await handleUploadImage(asset);
          }
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: 10,
  },
  screenTitle: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  avatarSection: {
    alignItems: 'center',
    marginVertical: 30,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 6,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#eee',
  },
  formContainer: {
    marginBottom: 20,
    gap: 10,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f5f5f5',
  },
  saveButton: {
    backgroundColor: COLORS.red,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  errorText: {
    color: 'red',
  },
});

export default EditProfileScreen;
