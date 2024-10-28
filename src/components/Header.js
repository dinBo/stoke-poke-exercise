import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useLanguage, i18n } from '../contexts/LanguageContext';
import { COLORS } from '../consts/colorsConsts';

const Header = () => {
  const { locale, changeLanguage } = useLanguage();

  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>{i18n.t('home')}</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={locale}
          onValueChange={(value) => changeLanguage(value)}
          style={styles.picker}
        >
          <Picker.Item label="English" value="en" />
          <Picker.Item label="Serbian" value="sr" />
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 60,
    backgroundColor: COLORS.GRAY,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  headerTitle: {
    color: COLORS.BLACK,
    fontSize: 18,
    fontWeight: 'bold',
  },
  pickerContainer: {
    width: 120,
    backgroundColor: COLORS.WHITE,
    borderRadius: 4,
  },
  picker: {
    width: '100%',
    height: 40,
  },
});

export default Header;
