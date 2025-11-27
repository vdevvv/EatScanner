import React, { FC, RefObject, useCallback } from 'react';
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';

interface EditProfileBottomSheetProps {
  bottomSheetRef: RefObject<BottomSheet | null>;
  snapPoints: string[];
  onPickGallery: () => Promise<void>
  onTakePhoto: () => Promise<void>
  onRemovePhoto: () => Promise<void>
  isDefaultImage: boolean
}

const EditProfileBottomSheet: FC<EditProfileBottomSheetProps> = (
  {
    bottomSheetRef,
    snapPoints,
    onPickGallery,
    onTakePhoto,
    onRemovePhoto,
    isDefaultImage,
  },
) => {
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={0}
        appearsOnIndex={1}
        opacity={0.5}
      />
    ),
    [],
  );

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      backdropComponent={renderBackdrop}
      backgroundStyle={{ borderRadius: 24 }}
    >
      <BottomSheetView style={styles.sheetContent}>
        <Text style={styles.sheetTitle}>Change Profile Photo</Text>

        <TouchableOpacity style={styles.sheetOption} onPress={onPickGallery}>
          <Ionicons name="images-outline" size={24} color="#333" />
          <Text style={styles.sheetOptionText}>Choose from Gallery</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.sheetOption} onPress={onTakePhoto}>
          <Ionicons name="camera-outline" size={24} color="#333" />
          <Text style={styles.sheetOptionText}>Take Photo</Text>
        </TouchableOpacity>

        {!isDefaultImage && (
          <TouchableOpacity style={styles.sheetOption} onPress={onRemovePhoto}>
            <Ionicons name="trash-outline" size={24} color={COLORS.red} />
            <Text style={[styles.sheetOptionText, { color: COLORS.red }]}>
              Remove Current Photo
            </Text>
          </TouchableOpacity>
        )}
      </BottomSheetView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  sheetContent: {
    padding: 24,
    paddingBottom: 40,
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 24,
    textAlign: 'center',
    color: '#333',
  },
  sheetOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  sheetOptionText: {
    fontSize: 16,
    marginLeft: 16,
    color: '#333',
    fontWeight: '500',
  },
});

export default EditProfileBottomSheet;