import React from 'react';
import { View, TextInput, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '../constants/colors';

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  colors: Theme;
}

export function SearchBar({ value, onChangeText, placeholder, colors }: Props) {
  return (
    <View style={[styles.container, { backgroundColor: colors.glass, borderColor: colors.border }]}>
      <Ionicons name="search" size={18} color={colors.textMuted} style={styles.icon} />
      <TextInput
        style={[styles.input, { color: colors.text }]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder ?? 'Cari event olahraga...'}
        placeholderTextColor={colors.textMuted}
        returnKeyType="search"
        accessibilityLabel="Kolom pencarian event"
      />
      {value.length > 0 && (
        <Pressable onPress={() => onChangeText('')} accessibilityRole="button" accessibilityLabel="Hapus pencarian">
          <Ionicons name="close-circle" size={18} color={colors.textMuted} />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 22,
    borderWidth: 1,
    paddingHorizontal: 16,
    height: 44,
    marginHorizontal: 16,
    marginVertical: 8,
  },
  icon: { marginRight: 10 },
  input: { flex: 1, fontSize: 14, fontWeight: '500', paddingVertical: 0 },
});
