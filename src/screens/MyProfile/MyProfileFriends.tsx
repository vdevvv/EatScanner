import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import RequestsTab from '../../components/Friends/RequestsTab';
import FriendsTab from '../../components/Friends/FriendsTab';
import { COLORS } from '../../constants/colors';

type TabType = 'friends' | 'received' | 'sent';

const FriendsScreen = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState<TabType>('friends');

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

  return (
    <SafeAreaView style={styles.safeArea} edges={['right', 'top', 'left']}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color="#333" style={{ marginRight: 10 }} />
          <Text style={styles.screenTitle}>Friends</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tabsContainer}>
        {renderTabButton('My Friends', 'friends')}
        {renderTabButton('Received', 'received')}
        {renderTabButton('Sent', 'sent')}
      </View>

      <View style={styles.contentContainer}>
        {activeTab === 'friends' && <FriendsTab />}
        {activeTab === 'received' && <RequestsTab type="received" />}
        {activeTab === 'sent' && <RequestsTab type="sent" />}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  headerContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
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