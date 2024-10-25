import { View, StyleSheet, Text, FlatList } from 'react-native';
import { i18n } from '../translations/i18n';
import { getLocales } from 'expo-localization';
import { useCart } from '../contexts/CartContext';
import { useEffect } from 'react';

const OrderItem = ({ order }) => {
  return (
    <View style={styles.orderContainer}>
      <Text style={styles.orderTitle}>{order.bowl.name}</Text>
      <Text>Base: {order.base.name}</Text>
      <Text>Size: {order.size.name}</Text>
      <Text>Sauce: {order.sauce.name}</Text>
      <Text>Regular Price: {order.priceRegular.currency}{order.priceRegular.price}</Text>
      <Text>Total Price: {order.priceTotal.currency}{order.priceTotal.price}</Text>

      <Text style={styles.sectionTitle}>Extra Ingredients:</Text>
      {order.extraIngredients.map((ingredient) => (
        <Text key={ingredient.id}>- {ingredient.name}</Text>
      ))}

      <Text style={styles.sectionTitle}>Other Ingredients:</Text>
      {order.otherIngredients.map((ingredient) => (
        <Text key={ingredient.id}>- {ingredient.name}</Text>
      ))}

      <Text style={styles.description}>{order.bowl.description}</Text>
    </View>
  );
};

export default function CartScreen() {
  const { orders } = useCart();

  useEffect(() => {
    console.log('----------------------------');
    console.log(orders);
  }, [orders])

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
