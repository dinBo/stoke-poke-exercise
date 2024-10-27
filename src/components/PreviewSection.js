import { View, StyleSheet, Text } from 'react-native';
import { Button } from "react-native-paper";

import { useOrder } from '../contexts/OrderContext';
import { useCart } from '../contexts/CartContext';
import { useNavigation } from '@react-navigation/core';
import { COLORS } from '../consts/colorsConsts';
import { i18n } from '../translations/i18n';

export default PreviewSection = ({ resetSteps }) => {
  const {
    orderId,
    bowl,
    size,
    base,
    sauce,
    otherIngredients,
    extraIngredients,
    priceRegular,
    priceTotal,
    resetOrder,
    isEditing,
  } = useOrder();

  const { addToOrders, updateOrder } = useCart();

  const navigator = useNavigation();

  const handleAddToCart = (navigateToScreen) => {
    if (isEditing) {
      updateOrder({
        orderId,
        bowl,
        size,
        base,
        sauce,
        otherIngredients,
        extraIngredients,
        priceRegular,
        priceTotal,
      })
      resetOrder();
      resetSteps();
      navigator.navigate('Cart')
    } else {
      addToOrders(
        orderId,
        bowl,
        size,
        base,
        sauce,
        otherIngredients,
        extraIngredients,
        priceRegular,
        priceTotal,
      )
      resetOrder();
      resetSteps();
      navigator.navigate(navigateToScreen)
    }
  }

  return (
    <View>
      <View style={styles.textContainer}>
        <Text style={styles.sectionTitle}>{`${bowl.name}`}</Text>
        <Text style={styles.sectionTitle}>{`${priceRegular.currency}${priceRegular.price}`}</Text>
      </View>
      <Text style={styles.content}>{`${size.name} size`}</Text>
      <Text style={styles.content}>{`${base.name} base`}</Text>
      <Text style={styles.content}>{`${sauce.name}`}</Text>
      {otherIngredients.length > 0 && (
        <Text style={styles.content}>Added ingredients:</Text>
      )}
      {
        otherIngredients.map((ingredient, index) => <Text style={[styles.content, styles.otherIngredientsContent, otherIngredients.length === index + 1 && { marginBottom: 10 }]}>{ingredient.name}</Text>)
      }
      {
        extraIngredients.map(ingredient => (
          <View style={styles.textContainer}>
            <Text style={styles.content}>{`${ingredient.name}`}</Text>
            <Text style={styles.sectionTitle}>{`${ingredient.currency}${ingredient.price}`}</Text>
          </View>
        ))
      }
      <View style={styles.horizontalLine} />
      <View style={styles.textContainer}>
        <Text style={[styles.content, styles.hightlightedRed]}>{i18n.t('fullPrice')}</Text>
        <Text style={[styles.content, styles.hightlightedRed, styles.sectionTitle]}>{`${priceTotal.currency}${priceTotal.price}`}</Text>
      </View>
      <Button
        mode="contained"
        style={[styles.button]}
        buttonColor={COLORS.BLACK}
        onPress={() => {
          handleAddToCart('Home');
        }}
      >
        {isEditing ? i18n.t('updateOrder') : i18n.t('addToCart')}
      </Button>
      <Button
        mode="outlined"
        style={[styles.button]}
        buttonColor={COLORS.WHITE}
        textColor={COLORS.BLACK}
        onPress={() => {
          handleAddToCart('CartStack');
        }}
      >
        {i18n.t('goToCheckout')}
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
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
    marginBottom: 10,
  },
  otherIngredientsContent: {
    marginBottom: 0,
    marginLeft: 20,
  },
  horizontalLine: {
    borderTopWidth: 1,
    borderColor: COLORS.GRAY,
    marginTop: 10,
    marginBottom: 15,
  },
  hightlightedRed: {
    color: COLORS.RED,
  },
  button: {
    width: '100%',
    borderRadius: 4,
    marginTop: 10,
  },
});
