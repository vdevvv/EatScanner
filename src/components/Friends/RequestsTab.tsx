import React, {FC, useEffect, useMemo} from 'react';
import {View, Text, StyleSheet, FlatList, ActivityIndicator} from 'react-native';
import {
  useGetSentRequests,
  useGetReceivedRequests,
  useAcceptFriendRequest,
  useCancelFriendRequest,
} from '../../hooks/friends';
import {handleApiError} from '../../utils/handleApiError';
import RequestItem from './RequestItem';
import PageLoader from '../Loader/PageLoader';
import {useNavigation} from '@react-navigation/native';
import {FriendsNavigationProp} from '../../navigations/app.types';

interface RequestsTabProps {
  type: 'sent' | 'received';
}

const RequestsTab: FC<RequestsTabProps> = ({type}) => {
  const navigation = useNavigation<FriendsNavigationProp>();
  const hook = type === 'sent' ? useGetSentRequests : useGetReceivedRequests;
  const {mutate: acceptRequest} = useAcceptFriendRequest();
  const {mutate: cancelRequest} = useCancelFriendRequest();
  const {
    data,
    isError,
    error,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    isLoading,
  } = hook();

  const requests = useMemo(() => {
    return data?.pages.flatMap((page) => page.data) || [];
  }, [data]);

  useEffect(() => {
    if (isError) handleApiError(error);
  }, [isError, error]);

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      void fetchNextPage();
    }
  };

  if (isLoading) {
    return <PageLoader/>;
  }

  if (requests.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.noResultsText}>
          {type === 'sent' ? 'No sent requests' : 'No received requests'}
        </Text>
      </View>
    );
  }

  const handleAction = (userId: string) => {
    if (type === 'received') {
      acceptRequest(userId);
    } else {
      cancelRequest(userId);
    }
  };

  return (
    <FlatList
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
      data={requests}
      keyExtractor={(item) => item.id}
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={isFetchingNextPage ? <ActivityIndicator style={{marginVertical: 20}}/> : null}
      renderItem={({item}) => (
        <RequestItem
          item={item}
          type={type}
          onPress={() => navigation.navigate('FriendsProfileScreen', {
            userId: item.userId,
            friendshipStatus: type === 'sent' ? 'SENT' : 'RECEIVED'
          })}
          onAction={() => handleAction(item.userId)}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 20,
    flexGrow: 1,
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noResultsText: {
    color: '#999',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default RequestsTab;