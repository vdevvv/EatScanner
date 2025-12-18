import React, {FC, useCallback} from 'react';
import {BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetModal, BottomSheetView} from "@gorhom/bottom-sheet";
import {SearchUser} from "../../types";
import {TouchableOpacity, View, Text, StyleSheet, Platform, Linking} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {COLORS} from "../../constants/colors";
import {LINKS} from "../../constants/app";

interface InviteActionSheetProps {
  bottomSheetRef: React.RefObject<BottomSheetModal | null>;
  contact: SearchUser | null;
}

const INVITE_MESSAGE = `Hey! Join me on TaalEat 🍔

${LINKS.app}
`;

const InviteActionSheet: FC<InviteActionSheetProps> = ({bottomSheetRef, contact}) => {
  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
      />
    ),
    []
  );

  const handleSendSMS = useCallback(async () => {
    if (!contact?.phone) return;

    const separator = Platform.OS === 'ios' ? '&' : '?';
    const url = `sms:${contact.phone}${separator}body=${encodeURIComponent(INVITE_MESSAGE)}`;

    const canOpen = await Linking.canOpenURL(url);
    if (canOpen) {
      await Linking.openURL(url);
    }
  }, [contact]);

  const handleSendWhatsApp = useCallback(async () => {
    if (!contact?.phone) return;

    const url = `https://wa.me/${contact.phone}?text=${encodeURIComponent(INVITE_MESSAGE)}`
    const canOpen = await Linking.canOpenURL(url);
    if (canOpen) {
      await Linking.openURL(url);
    } else {
      console.log('Cannot open WhatsApp link');
    }
  }, [contact]);

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      snapPoints={['30%']}
      backdropComponent={renderBackdrop}
      enablePanDownToClose
    >
      <BottomSheetView style={styles.contentContainer}>
        <Text style={styles.title}>Invite {contact?.fullName}</Text>
        <Text style={styles.subtitle}>Choose how to send the invitation</Text>

        <View style={styles.optionsContainer}>
          <TouchableOpacity style={styles.optionButton} onPress={handleSendSMS}>
            <View style={[styles.iconContainer, {backgroundColor: '#34C759'}]}>
              <Ionicons name="chatbubble" size={24} color="white"/>
            </View>
            <Text style={styles.optionText}>
              {Platform.OS === 'ios' ? 'iMessage / SMS' : 'SMS'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionButton} onPress={handleSendWhatsApp}>
            <View style={[styles.iconContainer, {backgroundColor: '#25D366'}]}>
              <Ionicons name="logo-whatsapp" size={24} color="white"/>
            </View>
            <Text style={styles.optionText}>WhatsApp</Text>
          </TouchableOpacity>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.black,
    textAlign: 'center',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginBottom: 25,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  optionButton: {
    alignItems: 'center',
    gap: 8,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.black,
  },
});

export default InviteActionSheet;