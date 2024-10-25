import { View, StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './src/screens/HomeScreen';
import CartScreen from './src/screens/CartScreen';
import { OrderProvider } from './src/contexts/OrderContext';
import { CartProvider } from './src/contexts/CartContext';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <CartProvider>
      <OrderProvider>
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Cart" component={CartScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </OrderProvider>
    </CartProvider>
  );
}

const styles = StyleSheet.create({

});
