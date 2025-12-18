import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {SectionList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {COLORS} from '../../constants/colors';
import {useContactsSync} from '../../hooks/useContactsSync';
import {SafeAreaView} from "react-native-safe-area-context";
import PageLoader from "../../components/Loader/PageLoader";
import {Ionicons} from "@expo/vector-icons";
import {useAcceptFriendRequest, useSendFriendRequest, useSyncContacts} from "../../hooks/friends";
import {prepareContactsForSync} from "../../utils/helpers";
import {handleApiError} from "../../utils/handleApiError";
import AddFriendListItem from "../../components/Friends/AddFriendListItem";
import {MyProfileNavigationProp} from "../../navigations/app.types";
import {getUnregisteredContacts} from "../../utils/contactsFilter";
import {FriendshipStatus, SearchUser} from "../../types";
import {DEFAULT_AVATAR} from "../../constants/images";
import InviteFriendCard from "../../components/Friends/InviteFriendCard";
import {BottomSheetModal, BottomSheetModalProvider} from "@gorhom/bottom-sheet";
import InviteActionSheet from "../../components/Friends/InviteActionSheet";
import {CountryCode, parsePhoneNumberFromString} from "libphonenumber-js";
import {useAuthStore} from "../../stores/useAuthStore";

const ContactFriendsScreen = () => {
  const navigation = useNavigation<MyProfileNavigationProp>();
  const {contactsRaw, isLoadingContacts} = useContactsSync();
  const {mutate: sendFriendRequest} = useSendFriendRequest();
  const {mutate: acceptFriendRequest} = useAcceptFriendRequest();
  const preparedContacts = prepareContactsForSync(contactsRaw);
  const {data: registeredUsers, isError, error, isLoading} = useSyncContacts(
    preparedContacts,
    preparedContacts.length > 0 && !isLoadingContacts
  )
  const inviteSheetRef = useRef<BottomSheetModal>(null);
  const [selectedContactForInvite, setSelectedContactForInvite] = useState<SearchUser | null>(null);
  const user = useAuthStore(state => state.user);
  const userRegion = useMemo(() => {
    const parsed = parsePhoneNumberFromString(user?.phone || '');
    return parsed?.country || 'AE';
  }, [user?.phone])

  useEffect(() => {
    if (isError) {
      handleApiError(error);
    }
  }, [isError, error])

  const handlePresentInviteModal = useCallback((contact: SearchUser) => {
    setSelectedContactForInvite(contact);
    inviteSheetRef.current?.present();
  }, []);

  const unregisteredContacts = useMemo(() => {
    if (!contactsRaw || !registeredUsers) return [];
    const rawUnregistered = getUnregisteredContacts(contactsRaw, registeredUsers, userRegion);

    return rawUnregistered.map((contact, index) => {
      const phoneNumber = contact.phoneNumbers?.[0]
      const region = phoneNumber?.countryCode
        ? (phoneNumber.countryCode.toUpperCase() as CountryCode)
        : userRegion;
      const parsed = parsePhoneNumberFromString(
        phoneNumber?.digits ?? phoneNumber?.number ?? '',
        region
      )
      const fullName = [contact.firstName, contact.lastName]
        .filter(Boolean)
        .join(' ')
        .trim();

      return {
        id: (contact as any).id || index,
        fullName,
        userName: '',
        phone: parsed?.format('E.164') ?? null,
        avatar: contact.image?.uri ?? DEFAULT_AVATAR,
        friendshipStatus: FriendshipStatus.NONE,
        friendshipId: null
      }
    }).filter(c => c.fullName && c.fullName !== ' ' && c.phone)
  }, [contactsRaw, registeredUsers, userRegion])

  if (isLoadingContacts || isLoading) {
    return <PageLoader/>
  }

  return (
    <BottomSheetModalProvider>
      <SafeAreaView style={styles.container} edges={['left', 'top', 'right']}>
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={25} color="#333"/>
          </TouchableOpacity>
        </View>
        <SectionList
          stickySectionHeadersEnabled={false}
          sections={[
            {
              title: 'Contacts on TaalEat',
              data: registeredUsers,
              renderItem: ({item}) => (
                <AddFriendListItem
                  item={item}
                  sendFriendRequest={() => sendFriendRequest(item.id)}
                  acceptFriendRequest={() => acceptFriendRequest(item.id)}
                  onCardPress={() =>
                    navigation.navigate('FriendsProfileScreen', {
                      userId: item.id,
                      friendshipStatus: item.friendshipStatus,
                    })
                  }
                />
              ),
            },
            {
              title: 'Invite to TaalEat',
              data: unregisteredContacts,
              renderItem: ({item}) => (
                <InviteFriendCard
                  item={item}
                  onInvite={handlePresentInviteModal}
                />
              ),
            },
          ]}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{marginHorizontal: 15}}
          renderSectionHeader={({section}) => (
            <Text style={styles.flatListHeader}>{section.title}</Text>
          )}
        />
        <InviteActionSheet
          bottomSheetRef={inviteSheetRef}
          contact={selectedContactForInvite}
        />
      </SafeAreaView>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  headerContainer: {
    paddingHorizontal: 26,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flatListHeader: {
    // textAlign: 'right',
    marginTop: 15,
    marginBottom: 8,
    fontWeight: '600',
    fontSize: 18,
  },
  flatListContentContainerStyle: {
    marginHorizontal: 15,
  }
});

export default ContactFriendsScreen;