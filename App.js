import { View, StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './src/screens/HomeScreen';
import CartScreen from './src/screens/CartScreen';
import { OrderProvider } from './src/contexts/OrderContext';
import { CartProvider } from './src/contexts/CartContext';
import CheckoutScreen from './src/screens/CheckoutScreen';

const Tab = createBottomTabNavigator();
const CartStack = createStackNavigator();

function CartStackNavigator() {
  return (
    <CartStack.Navigator>
      <CartStack.Screen name="Cart" component={CartScreen} />
      <CartStack.Screen name="Checkout" component={CheckoutScreen} />
    </CartStack.Navigator>
  );
}

export default function App() {
  return (
    <CartProvider>
      <OrderProvider>
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="CartStack" component={CartStackNavigator} />
          </Tab.Navigator>
        </NavigationContainer>
      </OrderProvider>
    </CartProvider>
  );
}

const styles = StyleSheet.create({

});
