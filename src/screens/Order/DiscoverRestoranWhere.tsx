import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform, Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { COLORS } from '../../constants/colors';
import RestaurantHeader from '../../components/Home/CompleteOrderHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import DeliveryOptionCard from '../../components/Home/DeliveryOptionCard';
import { HomeNavigationProp, HomeStackParamList } from '../../navigations/app.types';
import { usePlaceOrder } from '../../hooks/orders';

const { width } = Dimensions.get('window');

type DiscoverRestoranRouteProp = RouteProp<HomeStackParamList, 'DiscoverRestoranWhere'>

const DiscoverRestoranWhere = () => {
  const navigation = useNavigation<HomeNavigationProp>();
  const route = useRoute<DiscoverRestoranRouteProp>();
  const { mutate } = usePlaceOrder();
  const data = route.params;
  const [selectedUrl, setSelectedUrl] = useState<string | null>(null);
  const isButtonActive = selectedUrl !== null;

  const handleSelectOption = (url: string | null) => {
    if (!url) return;
    setSelectedUrl(url);
  };

  const handleMakeOrder = async () => {
    if (!isButtonActive) return;
    await Linking.openURL(selectedUrl);
    mutate({
      menuItemId: data.itemId,
      deliveryService: 'Talabat',
    });
  };

  const deliveryOptions = [
    {
      id: 'careem',
      url: data.careemUrl,
      name: 'Careem',
      description: 'Estimated delivery:',
      deliveryTime: '25–35 min',
      price: data.price,
    },
    {
      id: 'deliveroo',
      url: data.deliverooUrl,
      description: 'Estimated delivery:',
      name: 'Deliveroo',
      deliveryTime: '20–30 min',
      price: data.price,
    },
    {
      id: 'noonfood',
      url: data.noonFoodUrl,
      description: 'Estimated delivery:',
      name: 'Noon Food',
      deliveryTime: '30–40 min',
      price: data.price,
    },
    {
      id: 'talabat',
      url: data.talabatUrl,
      description: 'Estimated delivery:',
      name: 'Talabat',
      deliveryTime: '15–25 min',
      price: data.price,
    },
  ].filter(opt => opt.url);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={28} color="#333" />
        </TouchableOpacity>

        <Text style={styles.screenTitle}>Where to Order</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.infoBlock}>
          <RestaurantHeader
            dishName={data.name}
            restaurantName={data.restaurantName}
            rating={data.rating}
            image={data.image}
          />
        </View>

        <View style={styles.optionsSection}>
          <Text style={styles.availableOnTitle}>Available on:</Text>

          <View>
            {deliveryOptions.map((option) => (
              <DeliveryOptionCard
                key={option.id}
                option={option}
                isSelected={selectedUrl === option.url}
                onSelect={() => handleSelectOption(option.url)}
              />
            ))}
          </View>

          <Text style={styles.footerNote}>
            Prices and availability may vary by platform.
          </Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.makeOrderButton,
            isButtonActive
              ? styles.makeOrderButtonActive
              : styles.makeOrderButtonInactive,
          ]}
          onPress={handleMakeOrder}
          disabled={!isButtonActive}
        >
          <Text style={[styles.makeOrderButtonText, isButtonActive
            ? styles.makeOrderButtonTextActive
            : styles.makeOrderButtonTextInactive]}
          >
            Make an order
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: Platform.OS === 'android' ? 10 : 0,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    width: width,
    position: 'relative',
  },
  backButton: { padding: 10, zIndex: 10 },
  screenTitle: {
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    top: Platform.OS === 'android' ? 10 : 0,
    paddingVertical: 10,
  },
  infoBlock: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  optionsSection: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  availableOnTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  footerNote: {
    fontSize: 12,
    color: '#888',
    marginTop: 10,
    textAlign: 'center',
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    backgroundColor: '#fff',
  },
  makeOrderButton: {
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    height: 55,
  },
  makeOrderButtonInactive: { backgroundColor: COLORS.stroke1 },
  makeOrderButtonActive: { backgroundColor: COLORS.red },
  makeOrderButtonText: { fontWeight: 'bold' },
  makeOrderButtonTextInactive: { color: COLORS.grey30 },
  makeOrderButtonTextActive: { color: COLORS.white },
});

export default DiscoverRestoranWhere;
