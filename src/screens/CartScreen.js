import { View, StyleSheet, Text, FlatList, Alert, Pressable } from 'react-native';
import { useEffect, useState } from 'react';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/core';

import { i18n } from '../translations/i18n';
import { getLocales } from 'expo-localization';
import { useCart } from '../contexts/CartContext';
import { roundTo2Digits } from '../util/util';
import { useOrder } from '../contexts/OrderContext';
import { COLORS } from '../consts/colorsConsts';
import { Feather } from '@expo/vector-icons';

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

  const getIngredientsString = (ingredients) => {
    let ingStr = ''
    if (ingredients.length === 0) {
      return '-'
    }
    ingredients.map(ing => {
      if (!ingStr) {
        ingStr = ing.name;
      }
      ingStr = `${ingStr}, ${ing.name}`
    })
    return ingStr
  }

  return (
    <View style={styles.stepContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.sectionTitle}>{order.bowl.name}</Text>
        <Text style={styles.sectionTitle}>{`${order.priceTotal.currency}${calculateTotalPrice()}`}</Text>
      </View>
      <Text style={styles.content}>{order.size.name}</Text>
      <Text style={styles.content}>{order.base.name}</Text>
      <Text style={styles.content}>{order.sauce.name}</Text>
      <Text style={styles.content}>{getIngredientsString(order.otherIngredients)}</Text>
      {order.extraIngredients.length !== 0 && order.extraIngredients.map((ingredient) => (
        <Text style={styles.content} key={ingredient.id}>{ingredient.name}</Text>
      ))}
      {order.extraIngredients.length === 0 && (
        <Text style={styles.content}>-</Text>
      )}
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonsContainerSection}>
          <Pressable style={styles.actionButton} onPress={handleDeleteOrder}>
            <Feather name="trash-2" size={24} color="black" />
          </Pressable>
          <Pressable style={styles.actionButton} onPress={handleEditOrder}>
            <Feather name="edit" size={24} color="black" />
          </Pressable>
        </View>
        <View style={styles.buttonsContainerSection}>
          <Pressable style={[styles.amountButton, { borderTopRightRadius: 0, borderBottomRightRadius: 0 }]} onPress={handleReduceAmount}>
            <Feather name="chevron-down" size={18} color="black" />
          </Pressable>
          <View style={styles.amountIndicator}>
            <Text>{amount}</Text>
          </View>
          <Pressable style={[styles.amountButton, { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }]} onPress={handleIncreaseAmount}>
            <Feather name="chevron-up" size={18} color="black" />
          </Pressable>
        </View>
      </View>
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
  //   console.log(JSON.stringify(orders));
  //   // orders.map(order => {
  //   //   console.log(`orderId: ${order.orderId}`);
  //   //   console.log(`bowl: ${order.bowl.name}`);
  //   //   console.log(`size: ${order.size.name}`);
  //   //   console.log(`base: ${order.base.name}`);
  //   //   console.log(`sauce: ${order.sauce.name}`);
  //   //   console.log(`other ingredients: ${getIngredientsString(order.otherIngredients)}`);
  //   //   console.log(`extra ingredients: ${getIngredientsString(order.extraIngredients)}`);
  //   // })
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
      <View style={[styles.stepContainer, { marginTop: 0 }]}>
        <View style={styles.textContainer}>
          <Text style={styles.content}>{i18n.t('subtotal')}</Text>
          <Text style={styles.sectionTitle}>{orders[0]?.priceTotal.currency}{calculateCummulativeOrdersPrice()}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.content}>{i18n.t('deliveryFee')}</Text>
          <Text style={styles.sectionTitle}>{orders[0]?.priceTotal.currency}{'0'}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.sectionTitle}>{i18n.t('total')}</Text>
          <Text style={[styles.sectionTitle, { color: COLORS.RED }]}>{orders[0]?.priceTotal.currency}{calculateCummulativeOrdersPrice()}</Text>
        </View>
        <Button
          mode="outlined"
          style={[styles.button]}
          buttonColor={COLORS.WHITE}
          textColor={COLORS.BLACK}
          onPress={() => navigator.navigate('Home')}
        >
          {i18n.t('orderMore')}
        </Button>
        <Button
          mode="contained"
          style={[styles.button]}
          buttonColor={COLORS.RED}
          onPress={() => navigator.push('Checkout')}
        >
          {i18n.t('proceedToCheckout')}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  stepContainer: {
    borderWidth: 1,
    borderColor: COLORS.GRAY,
    borderRadius: 4,
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 20,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
  },
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  buttonsContainerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  actionButton: {
    borderWidth: 1,
    borderColor: COLORS.BLACK,
    borderRadius: 4,
    marginRight: 5,
    height: 45,
    width: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  amountButton: {
    backgroundColor: COLORS.GRAY,
    borderColor: COLORS.BLACK,
    borderRadius: 4,
    height: 45,
    width: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  amountIndicator: {
    borderWidth: 1,
    borderColor: COLORS.GRAY,
    height: 45,
    width: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '100%',
    borderRadius: 4,
    marginTop: 10,
  },
});
