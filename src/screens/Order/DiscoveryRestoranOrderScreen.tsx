import React, { FC, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
  StatusBar, ActivityIndicator,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { COLORS } from '../../constants/colors';
import { HomeNavigationProp, HomeStackParamList } from '../../navigations/app.types';
import { useMenuItem } from '../../hooks/restaurants';
import Toast from 'react-native-toast-message';

const { width } = Dimensions.get('window');
const IMAGE_HEIGHT = width * 0.85;

interface RatingPillProps {
  platform: 'Trustpilot' | 'Google';
  rating: number | null;
  color: string;
  iconName: string;
}

const RatingPill: FC<RatingPillProps> = (
  {
    platform,
    rating,
    color,
    iconName,
  },
) => (
  <View style={[styles.ratingPill, { backgroundColor: color }]}>
    <MaterialCommunityIcons name={iconName as any} size={14} color="#fff" />
    <Text style={styles.ratingText}>
      {platform} {rating}
    </Text>
  </View>
);

type DiscoverOrderRouteProp = RouteProp<HomeStackParamList, 'DishDetailScreen'>

const DishDetailScreen = () => {
  const navigation = useNavigation<HomeNavigationProp>();
  const route = useRoute<DiscoverOrderRouteProp>();
  const { menuItemId, googleRating, restaurantName } = route.params;
  const { data, isError, error, isLoading } = useMenuItem(menuItemId);

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

  const handleOrderPress = () => {
    navigation.navigate('DiscoverRestoranWhere');
  };

  return (
    <View style={styles.root}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <View style={styles.imageContainer}>
        <Image source={{ uri: data.image }} style={styles.dishImage} />
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={30} color={COLORS.black} />
        </TouchableOpacity>
      </View>

      <View style={styles.wrapper}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.detailsCard}>
            <View style={styles.restaurantInfo}>
              <MaterialCommunityIcons
                name="home-outline"
                size={20}
                color="#333"
              />
              <Text style={styles.restaurantName}>{restaurantName}</Text>
            </View>

            <Text style={styles.dishName}>{data.name}</Text>
            <Text style={styles.dishDescription}>{data.description}</Text>

            <View style={styles.ratingsContainer}>
              <RatingPill
                platform="Google"
                rating={googleRating}
                color="#3f84f8"
                iconName="google"
              />
            </View>
          </View>
        </ScrollView>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.orderButton} onPress={handleOrderPress}>
          <Text style={styles.orderButtonText}>
            Order Now | AED {data.price}
          </Text>
        </TouchableOpacity>
      </View>
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
  root: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: IMAGE_HEIGHT,
    zIndex: 1,
  },
  dishImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 40,
    left: 15,
    padding: 8,
    borderRadius: 30,
  },
  wrapper: {
    flex: 1,
    marginTop: IMAGE_HEIGHT,
  },
  detailsCard: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 25,
    paddingBottom: 100,
    zIndex: 2,
  },
  restaurantInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
    marginLeft: 8,
  },
  dishName: {
    fontSize: 26,
    fontWeight: '700',
    color: '#333',
    marginBottom: 10,
  },
  dishDescription: {
    fontSize: 15,
    color: '#555',
    lineHeight: 22,
    marginBottom: 20,
  },
  ratingsContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  ratingPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 10,
  },
  ratingText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
    marginLeft: 6,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  orderButton: {
    backgroundColor: COLORS.red,
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default DishDetailScreen;
