import React, { FC } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DiscoveryNavigationProp } from '../../navigations/app.types';
import { COLORS } from '../../constants/colors';

interface SearchBarProps {
  searchQuery: string
  setSearchQuery: (val: string) => void
  debouncedSearch: (val: string) => void
}

const SearchBar: FC<SearchBarProps> = ({searchQuery, setSearchQuery, debouncedSearch}) => {
  const navigation = useNavigation<DiscoveryNavigationProp>();

  return (
    <View style={styles.searchContainer}>
      <Ionicons
        name="search-outline"
        size={20}
        color={COLORS.black}
        style={styles.searchIcon}
      />
      <TextInput
        style={styles.searchInput}
        placeholder="Search anything..."
        placeholderTextColor="#a0a0a0"
        value={searchQuery}
        onChangeText={(value) => {
          setSearchQuery(value)
          debouncedSearch(value)
        }}
      />
      <TouchableOpacity style={styles.filterButton} onPress={() => navigation.navigate('DiscoveryFiltersPage')}>
        <Ionicons name="options-outline" size={20} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderColor: COLORS.stroke1,
    borderWidth: 1,
    borderRadius: 12,
    height: 50,
    marginBottom: 25,
    paddingLeft: 10,
  },
  searchIcon: { marginRight: 8 },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  filterButton: {
    backgroundColor: `#9F0B08B2`,
    borderRadius: 12,
    height: '100%',
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default SearchBar;