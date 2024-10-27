import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import HomeScreen from './src/screens/HomeScreen';
import CartScreen from './src/screens/CartScreen';
import CheckoutScreen from './src/screens/CheckoutScreen';
import { OrderProvider } from './src/contexts/OrderContext';
import { CartProvider, useCart } from './src/contexts/CartContext';
import { COLORS } from './src/consts/colorsConsts';
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

function AppTabs() {
  const { orders } = useCart();
  const cartItemCount = orders.length;

  return (
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
            <View style={styles.iconContainer}>
              <Feather name="shopping-cart" color={color} size={size} />
              {cartItemCount > 0 && (
                <View style={styles.badgeContainer}>
                  <Text style={styles.badgeText}>{cartItemCount}</Text>
                </View>
              )}
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaView style={styles.saw}>
      <CartProvider>
        <OrderProvider>
          <NavigationContainer>
            <AppTabs />
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
  iconContainer: {
    position: 'relative',
  },
  badgeContainer: {
    position: 'absolute',
    right: -10,
    top: -5,
    backgroundColor: COLORS.RED,
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
