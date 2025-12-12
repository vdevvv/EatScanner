import React, {useCallback, useMemo, useRef, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Keyboard} from 'react-native';
import {Feather, Ionicons} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import RequestsTab from '../../components/Friends/RequestsTab';
import FriendsTab from '../../components/Friends/FriendsTab';
import {COLORS} from '../../constants/colors';
import BottomSheet from "@gorhom/bottom-sheet";
import AddFriendSheet from "../../components/Friends/AddFriendSheet";

type TabType = 'friends' | 'received' | 'sent';

const FriendsScreen = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState<TabType>('friends');
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['50%', '90%'], []);

  const renderTabButton = (label: string, tab: TabType) => (
    <TouchableOpacity
      style={[styles.tabButton, activeTab === tab && styles.activeTabButton]}
      onPress={() => setActiveTab(tab)}
    >
      <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  const handleOpenAddFriend = useCallback(() => {
    Keyboard.dismiss();
    bottomSheetRef.current?.expand();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea} edges={['right', 'top', 'left']}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color="#333" style={{marginRight: 10}}/>
          <Text style={styles.screenTitle}>Friends</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleOpenAddFriend} hitSlop={20}>
          <Feather size={20} name='user-plus'/>
        </TouchableOpacity>
      </View>

      <View style={styles.tabsContainer}>
        {renderTabButton('My Friends', 'friends')}
        {renderTabButton('Received', 'received')}
        {renderTabButton('Sent', 'sent')}
      </View>

      <View style={styles.contentContainer}>
        {activeTab === 'friends' && <FriendsTab handleExploreProfiles={handleOpenAddFriend}/>}
        {activeTab === 'received' && <RequestsTab type="received"/>}
        {activeTab === 'sent' && <RequestsTab type="sent"/>}
      </View>

      <AddFriendSheet
        bottomSheetRef={bottomSheetRef}
        snapPoints={snapPoints}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {flex: 1, backgroundColor: COLORS.white},
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
  screenTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tabButton: {
    paddingVertical: 12,
    marginRight: 20,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTabButton: {
    borderBottomColor: COLORS.black,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#999',
  },
  activeTabText: {
    color: COLORS.black,
    fontWeight: '600',
  },
  contentContainer: {
    flex: 1,
  },
});

export default FriendsScreen;