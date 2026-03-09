import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SearchBar from './SearchBar';
import { COLORS } from '../../constants/colors';

interface DiscoveryHeaderProps {
  address: string | null
  searchQuery: string,
  setSearchQuery: (val: string) => void,
  debouncedSearch: (val: string) => void,
  showNoResults?: boolean,
}

const DiscoveryHeader: FC<DiscoveryHeaderProps> = (
  {
    address,
    searchQuery,
    setSearchQuery,
    debouncedSearch,
    showNoResults,
  },
) => {
  return (
    <>
      <View style={styles.locationContainer}>
        <Text style={styles.locationLabel}>Current location</Text>
        <View style={styles.locationDetails}>
          <Ionicons name="location-sharp" size={20} color="#000" />
          <Text style={styles.locationText}>{address || "Location not shared"}</Text>
        </View>
      </View>
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        debouncedSearch={debouncedSearch}
      />
      {showNoResults && (
        <View style={styles.noResultsContainer}>
          <Ionicons name="search-outline" size={48} color="#ccc" />
          <Text style={styles.noResultsText}>No results found</Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  locationContainer: {
    marginBottom: 20,
  },
  locationLabel: {
    fontSize: 14,
    color: '#a0a0a0',
    fontWeight: '500',
    marginBottom: 4,
  },
  locationDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    marginLeft: 5,
  },
  noResultsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  noResultsText: {
    marginTop: 10,
    fontSize: 16,
    color: COLORS.grey30,
    textAlign: 'center',
  },
});

export default DiscoveryHeader;
