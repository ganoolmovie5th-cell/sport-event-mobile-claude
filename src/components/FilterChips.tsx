import React from 'react';
import { ScrollView, Pressable, Text, StyleSheet } from 'react-native';
import { Theme } from '../constants/colors';

interface ChipData {
  key: string;
  label: string;
  emoji?: string;
}

interface Props {
  items: ChipData[];
  selected: string | null;
  onSelect: (key: string | null) => void;
  colors: Theme;
}

export function FilterChips({ items, selected, onSelect, colors }: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <Pressable
        style={[
          styles.chip,
          {
            backgroundColor: !selected ? colors.primary : colors.surface,
            borderColor: !selected ? colors.primary : colors.border,
          },
        ]}
        onPress={() => onSelect(null)}
        accessibilityRole="button"
        accessibilityLabel="Semua"
      >
        <Text style={[styles.chipText, { color: !selected ? '#fff' : colors.textSecondary }]}>
          Semua
        </Text>
      </Pressable>
      {items.map((item) => (
        <Pressable
          key={item.key}
          style={[
            styles.chip,
            {
              backgroundColor: selected === item.key ? colors.primary : colors.surface,
              borderColor: selected === item.key ? colors.primary : colors.border,
            },
          ]}
          onPress={() => onSelect(selected === item.key ? null : item.key)}
          accessibilityRole="button"
          accessibilityLabel={item.label}
        >
          <Text style={[styles.chipText, { color: selected === item.key ? '#fff' : colors.textSecondary }]}>
            {item.emoji ? `${item.emoji} ` : ''}{item.label}
          </Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 16, paddingVertical: 10, gap: 8 },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 20,
    borderWidth: 1,
  },
  chipText: { fontSize: 13, fontWeight: '600' },
});
