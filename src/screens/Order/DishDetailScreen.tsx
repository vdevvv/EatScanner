import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  StatusBar, ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HomeNavigationProp, HomeStackParamList } from '../../navigations/app.types';
import { useMenu } from '../../hooks/restaurants';
import { MenuItem } from '../../types';
import RatingPill from '../../components/Restaurant/RatingPill';
import HighlightedCard from '../../components/Restaurant/HighlightedCard';
import MenuFilterButton from '../../components/Restaurant/MenuFilterButton';
import MenuItemCard from '../../components/Restaurant/MenuItemCard';
import { COLORS } from '../../constants/colors';
import Toast from 'react-native-toast-message';

const MAIN_IMAGE = require('../../assets/dumplings-top.jpg');

type DishDetailRouteProp = RouteProp<HomeStackParamList, 'Order'>

const DishDetailScreen = () => {
  const navigation = useNavigation<HomeNavigationProp>();
  const insets = useSafeAreaInsets();
  const route = useRoute<DishDetailRouteProp>();
  const { menuId, restaurant } = route.params;
  const { data, isLoading, isError, error } = useMenu(menuId);

  useEffect(() => {
    if (isError) {
      Toast.show({
        type: 'error',
        text1: error.message,
      });
      navigation.goBack();
    }
  }, [isError, data, error, navigation]);

  if (!data || isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const handleMenuItemPress = (item: MenuItem) => {
    navigation.navigate('DishDetailScreen', {
      menuItemId: item.id,
      googleRating: restaurant.googleRating,
      restaurantName: restaurant.name,
    });
  };

  const allItems = data?.categories?.flatMap(cat => cat.items);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground source={MAIN_IMAGE} style={styles.headerImageBackground}>
          <View style={[styles.headerContentOverlay, { paddingTop: insets.top }]}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </ImageBackground>
        <View style={styles.infoBlock}>
          <Text style={styles.restaurantTitle}>{restaurant.name}</Text>
          <Text style={styles.restaurantSubtitle}>{restaurant.description}</Text>
          <View style={styles.ratingsContainer}>
            <RatingPill
              iconName="star"
              text={`Google ${restaurant.googleRating}`}
              color="#3f84f8"
              isMaterial
            />
          </View>

          <View style={styles.locationContainer}>
            <Ionicons name="location" size={16} color="#888" />
            <Text style={styles.locationText}>{restaurant.city}</Text>
            <Text style={styles.distanceText}>{restaurant.distance} miles away</Text>
          </View>
        </View>

        <View style={styles.highlightedSection}>
          <View style={styles.highlightedHeader}>
            <Text style={styles.sectionTitle}>Highlighted items:</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.highlightedScroll}
          >
            {allItems?.filter(item => item.highlighted).map(item => (
              <HighlightedCard key={item.id} item={item} restaurantName={restaurant.name} />
            ))}
          </ScrollView>
        </View>

        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Menu</Text>
          <ScrollView
            style={styles.filterContainer}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {data?.categories.map(item => (
              <MenuFilterButton icon="" label={item.name} key={item.id} isActive={false} />
            ))}
          </ScrollView>

          <View>
            {allItems?.map((item) => (
              <MenuItemCard
                key={item.id}
                item={item}
                onPress={handleMenuItemPress}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  container: { flex: 1, backgroundColor: '#fff' },
  headerImageBackground: {
    width: '100%',
    height: 250,
  },
  headerContentOverlay: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    zIndex: 10,
    minHeight: 50,
  },
  backButton: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 20,
    padding: 5,
  },
  infoBlock: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 15,
    marginTop: -40,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  restaurantTitle: { fontSize: 24, fontWeight: '700', marginBottom: 4 },
  restaurantSubtitle: { fontSize: 14, color: '#888', marginBottom: 10 },
  ratingsContainer: { flexDirection: 'row', marginBottom: 8 },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  locationText: { fontSize: 14, color: '#333', marginLeft: 4 },
  distanceText: {
    fontSize: 14,
    color: '#888',
    marginLeft: 8,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 15,
    backgroundColor: '#f5f5f5',
  },
  highlightedSection: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  highlightedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 15,
  },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#333' },
  viewAllText: { fontSize: 14, color: '#E57373', fontWeight: '600' },
  highlightedScroll: { paddingBottom: 20 },
  menuSection: { paddingHorizontal: 20, paddingBottom: 80, marginTop: 10 },
  filterContainer: { marginVertical: 15 },
});

export default DishDetailScreen;
