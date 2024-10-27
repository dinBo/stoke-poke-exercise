import { View, StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './src/screens/HomeScreen';
import CartScreen from './src/screens/CartScreen';
import { OrderProvider } from './src/contexts/OrderContext';
import { CartProvider } from './src/contexts/CartContext';
import CheckoutScreen from './src/screens/CheckoutScreen';
import { Feather } from '@expo/vector-icons';
import { COLORS } from './src/consts/colorsConsts';
import { SafeAreaView } from 'react-native-safe-area-context';
import { i18n } from './src/translations/i18n';

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
    <SafeAreaView style={styles.saw}>
      <CartProvider>
        <OrderProvider>
          <NavigationContainer>
            <Tab.Navigator
              screenOptions={{
                headerShown: false,
                tabBarStyle: {
                  paddingBottom: 10,
                  paddingTop: 10,
                  height: 60,
                },
                tabBarLabelStyle: {
                  fontSize: 12,
                },
                tabBarActiveTintColor: COLORS.RED,
                tabBarInactiveTintColor: COLORS.BLACK,
              }}
            >
              <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                  tabBarLabel: i18n.t('home'),
                  tabBarIcon: ({ color, size }) => (
                    <Feather name="home" color={color} size={size} />
                  ),
                }}
              />
              <Tab.Screen
                name="CartStack"
                component={CartStackNavigator}
                options={{
                  tabBarLabel: i18n.t('cart'),
                  tabBarIcon: ({ color, size }) => (
                    <Feather name="shopping-cart" color={color} size={size} />
                  ),
                }}
              />
            </Tab.Navigator>
          </NavigationContainer>
        </OrderProvider>
      </CartProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  saw: {
    flex: 1,
  },
});
