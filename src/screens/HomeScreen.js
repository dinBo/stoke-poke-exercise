import { View, StyleSheet, Text } from 'react-native';
import { i18n } from '../translations/i18n';
import { getLocales } from 'expo-localization';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {i18n.t('welcomeHome')} {i18n.t('name')}
      </Text>
      <Text>Current locale: {i18n.locale}</Text>
      <Text>Device locale: {getLocales()[0].languageCode}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  text: {
    fontSize: 20,
    marginBottom: 16,
  },
});
