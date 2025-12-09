import React, { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export interface DeliveryOption {
  id: string;
  name: string;
  description: string;
  deliveryTime: string;
  price: string;
}

interface DeliveryOptionCardProps {
  option: DeliveryOption;
  isSelected: boolean;
  onSelect: () => void;
}

const DeliveryOptionCard: FC<DeliveryOptionCardProps> = (
  {
    option,
    isSelected,
    onSelect,
  },
) => {
  return (
    <TouchableOpacity
      style={[styles.deliveryCard, isSelected && styles.deliveryCardSelected]}
      onPress={onSelect}
      activeOpacity={0.8}
    >
      <View style={styles.deliveryCardContent}>
        <View
          style={[styles.radioButton, isSelected && styles.radioButtonSelected]}
        >
          {isSelected && <View style={styles.radioDot} />}
        </View>

        <View style={styles.deliveryTextWrapper}>
          <Text
            style={[
              styles.deliveryName,
              isSelected && styles.deliveryNameSelected,
            ]}
          >
            {option.name}
          </Text>

          <View style={styles.deliveryDetails}>
            <Text style={styles.deliveryDescription}>{option.description}</Text>
            <Text style={styles.deliveryTime}>
              {' '}
              | {option.deliveryTime}
            </Text>
            <Text style={styles.deliveryPrice}> | AED {option.price}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  deliveryCard: {
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    marginBottom: 10,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
  },
  deliveryCardSelected: { borderColor: '#333' },
  deliveryCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButton: {
    height: 22,
    width: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  radioButtonSelected: { borderColor: '#333' },
  radioDot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#333',
  },
  deliveryTextWrapper: { flex: 1 },
  deliveryName: { fontSize: 15, fontWeight: '500', color: '#333' },
  deliveryNameSelected: { fontWeight: '600' },
  deliveryDetails: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 2 },
  deliveryDescription: { fontSize: 13, color: '#888' },
  deliveryTime: {
    fontSize: 13,
    color: '#333',
    fontWeight: '500',
    marginLeft: 5,
  },
  deliveryPrice: { fontSize: 13, color: '#333', fontWeight: '500' },
});

export default DeliveryOptionCard;