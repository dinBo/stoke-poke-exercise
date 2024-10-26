import { View, StyleSheet, Text, FlatList, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/core';

import { i18n } from '../translations/i18n';
import { getLocales } from 'expo-localization';
import { useCart } from '../contexts/CartContext';
import { roundTo2Digits } from '../util/util';
import { useOrder } from '../contexts/OrderContext';

const OrderItem = ({ order }) => {
  const [amount, setAmount] = useState(1)
  const { deleteOrder, updateOrderAmount } = useCart();
  const { resetOrder } = useOrder();

  const navigator = useNavigation();

  useEffect(() => {
    updateOrderAmount(order.orderId, amount)
  }, [amount])

  const handleReduceAmount = () => {
    if (amount >= 2) {
      setAmount(amount - 1)
    };
  }

  const handleIncreaseAmount = () => setAmount(amount + 1)

  const handleDeleteOrder = () => {
    Alert.alert(
      "Warning",
      "Are you sure you want to delete the order from the cart?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Yes", onPress: () => deleteOrder(order.orderId) }
      ]
    );
  }

  const handleEditOrder = () => {
    resetOrder(order)
    navigator.navigate('Home');
  }

  const calculateTotalPrice = () => roundTo2Digits(amount * order.priceTotal.price)

  return (
    <View style={styles.orderContainer}>
      {/* <Text>id: {order.orderId}</Text> */}
      <Text style={styles.orderTitle}>{order.bowl.name}</Text>
      <Text>Base: {order.base.name}</Text>
      <Text>Size: {order.size.name}</Text>
      <Text>Sauce: {order.sauce.name}</Text>
      <Text>Regular Price: {order.priceRegular.currency}{order.priceRegular.price}</Text>
      <Text>Total Price: {order.priceTotal.currency}{calculateTotalPrice()}</Text>

      <Text style={styles.sectionTitle}>Extra Ingredients:</Text>
      {order.extraIngredients.map((ingredient) => (
        <Text key={ingredient.id}>- {ingredient.name}</Text>
      ))}

      <Text style={styles.sectionTitle}>Other Ingredients:</Text>
      {order.otherIngredients.map((ingredient) => (
        <Text key={ingredient.id}>- {ingredient.name}</Text>
      ))}

      <Text style={styles.description}>{order.bowl.description}</Text>
      <Button icon="delete" mode="contained" onPress={handleDeleteOrder} />
      <Button icon="edit" mode="contained" onPress={handleEditOrder} />
      <Button mode="contained" onPress={handleReduceAmount}>-</Button>
      <Text>{amount}</Text>
      <Button mode="contained" onPress={handleIncreaseAmount}>+</Button>
    </View>
  );
};

export default function CartScreen() {
  const { orders } = useCart();

  const navigator = useNavigation();

  // useEffect(() => {
  //   const getIngredientsString = (ingredients) => {
  //     let ingStr = ''
  //     ingredients.map(ing => {
  //       ingStr = `${ingStr}, ${ing.name}`
  //     })
  //     return ingStr
  //   }
  //   console.log('*****************************');
  //   orders.map(order => {
  //     console.log(`orderId: ${order.orderId}`);
  //     console.log(`bowl: ${order.bowl.name}`);
  //     console.log(`size: ${order.size.name}`);
  //     console.log(`base: ${order.base.name}`);
  //     console.log(`sauce: ${order.sauce.name}`);
  //     console.log(`other ingredients: ${getIngredientsString(order.otherIngredients)}`);
  //     console.log(`extra ingredients: ${getIngredientsString(order.extraIngredients)}`);
  //   })
  // }, [orders])

  const calculateCummulativeOrdersPrice = () => {
    let cummulativePrice = 0;
    orders.map(order => cummulativePrice += (order.amount * order.priceTotal.price))
    return roundTo2Digits(cummulativePrice);
  }

  return (
    <View style={styles.container}>
      {/* <Text style={styles.text}>
        {i18n.t('welcomeCart')} {i18n.t('name')}
      </Text>
      <Text>Current locale: {i18n.locale}</Text>
      <Text>Device locale: {getLocales()[0].languageCode}</Text> */}
      <FlatList
        data={orders}
        keyExtractor={(item) => item.bowl.id.toString()}
        renderItem={({ item }) => <OrderItem order={item} />}
        contentContainerStyle={styles.listContainer}
      />
      <Text>Cummulative Orders Price: {orders[0]?.priceTotal.currency}{calculateCummulativeOrdersPrice()}</Text>
      <Button mode="contained" onPress={() => navigator.push('Checkout')}>Proceed to Checkout</Button>
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
  listContainer: {
    padding: 20,
  },
  orderContainer: {
    padding: 15,
    marginBottom: 20,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  orderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  description: {
    fontStyle: 'italic',
    marginTop: 10,
    color: '#6c757d',
  },
});
