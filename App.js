import { View, StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './src/screens/HomeScreen';
import CartScreen from './src/screens/CartScreen';
import { PokeBowlProvider } from './src/contexts/PokeBoxlContext';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <PokeBowlProvider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Cart" component={CartScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </PokeBowlProvider>
  );
}

const styles = StyleSheet.create({

});
