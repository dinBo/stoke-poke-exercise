import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useLanguage } from '../contexts/LanguageContext';
import { COLORS } from '../consts/colorsConsts';
import { SimpleLineIcons } from '@expo/vector-icons';

const Header = () => {
  const { locale, changeLanguage } = useLanguage();

  return (
    <View style={styles.headerContainer}>
      <SimpleLineIcons name="menu" size={32} color={COLORS.RED} />
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
    backgroundColor: COLORS.WHITE,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
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
    backgroundColor: COLORS.GRAY,
    borderRadius: 4,
  },
});

export default Header;
