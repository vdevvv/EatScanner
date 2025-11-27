import React, { FC, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet, ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../constants/colors';
import { useFilters } from '../../hooks/restaurants';
import { DiscoveryNavigationProp } from '../../navigations/app.types';

interface ChipProps {
  label: string;
  active: boolean;
  onPress: () => void;
}

const Chip: FC<ChipProps> = ({ label, active, onPress }) => (
  <TouchableOpacity
    style={[styles.chip, active && styles.chipActive]}
    onPress={onPress}
  >
    <Text style={styles.chipText}>
      {label}
    </Text>
  </TouchableOpacity>
);

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

const Section: FC<SectionProps> = ({ title, children }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <View style={styles.chipContainer}>{children}</View>
  </View>
);

export default function FiltersScreen() {
  const { data, isLoading } = useFilters();
  const navigation = useNavigation<DiscoveryNavigationProp>();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  if (!data || isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const toggleSelection = (slug: string) => {
    setSelectedTags(prevState =>
      prevState.includes(slug)
        ? prevState.filter(i => i !== slug)
        : [...prevState, slug],
    );
  };

  const handleBack = () => navigation.goBack();
  const handleApply = () => navigation.navigate('Discovery', {selectedTags});

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <Text style={styles.backArrow}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Filters</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {Object.entries(data).map(([groupName, items], index) => (
          <Section key={index} title={groupName.replace(/_/g, ' ')}>
            {items.map((item) => (
              <Chip
                key={item.id}
                label={item.icon + ' ' + item.name}
                active={selectedTags.includes(item.slug)}
                onPress={() => toggleSelection(item.slug)}
              />
            ))}
          </Section>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
        <Text style={styles.applyButtonText}>Apply filters</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  backArrow: {
    fontSize: 26,
    color: '#222',
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#222',
  },
  scrollView: {
    paddingHorizontal: 16,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    borderWidth: 1,
    borderColor: COLORS.stroke1,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  chipActive: {
    backgroundColor: `${COLORS.red}33`,
    borderColor: COLORS.red,
  },
  chipText: {
    fontSize: 14,
    color: COLORS.black,
  },
  applyButton: {
    backgroundColor: COLORS.red,
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
