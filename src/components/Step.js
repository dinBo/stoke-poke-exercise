import { View, StyleSheet, Text } from 'react-native';
import { useEffect, useState } from 'react';
import { Button } from "react-native-paper";

import { fetchSection } from '../services/ApiService';
import { STEP_TYPES } from '../consts/stepConsts';
import Section from '../components/Section';
import { useOrder } from '../contexts/OrderContext';
import { useCart } from '../contexts/CartContext';
import { useNavigation } from '@react-navigation/core';
import { COLORS } from '../consts/colorsConsts';

export default Step = ({ step, currentStepId, resetSteps }) => {
  const [sections, setSections] = useState([])
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

  useEffect(() => {
    const getSection = async (section) => {
      if (sections?.length !== 0) return;

      const sec = await fetchSection(section.data);
      setSections(prevSections => [...prevSections, {
        ...section,
        options: sec,
      }])
    }

    if (step.type === STEP_TYPES.PREVIEW) return;

    step.sections?.map(section => getSection(section));
  }, [])

  const handleAddToCart = () => {
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
    }
  }

  if (currentStepId !== step.id) return

  return (
    <View style={styles.stepContainer}>
      {
        step.type === STEP_TYPES.CREATE && sections.map((section, index) => <Section step={step} section={section} />)
      }
      {
        step.type === STEP_TYPES.PREVIEW && (
          <View>
            <Text style={styles.sectionTitle}>{`${bowl.name} ${priceRegular.currency}${priceRegular.price}`}</Text>
            <Text>{`${size.name} size`}</Text>
            <Text>{`${base.name} base`}</Text>
            <Text>{`${sauce.name}`}</Text>
            {otherIngredients.length > 0 && (
              <Text>Added ingredients:</Text>
            )}
            {
              otherIngredients.map(ingredient => <Text>{ingredient.name}</Text>)
            }
            {
              extraIngredients.map(ingredient => <Text>{`${ingredient.name} ${ingredient.currency}${ingredient.price}`}</Text>)
            }
            <Text>{`Full price: ${priceTotal.currency}${priceTotal.price}`}</Text>
            <Button
              icon="camera"
              mode="contained"
              style={[styles.button]}
              onPress={handleAddToCart}
            >
              {isEditing ? `Update Order` : `Add to Cart`}
            </Button>
            <Button
              icon="camera"
              mode="contained"
              style={[styles.button]}
              onPress={() => navigator.navigate('CartStack')}
            >
              Go to checkout
            </Button>
          </View>
        )
      }
    </View>
  )
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
  },
  button: {
    width: '100%',
    borderRadius: 4,
  },
  stepContainer: {
    borderWidth: 1,
    borderColor: COLORS.GRAY,
    borderRadius: 4,
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 20,
  },
});
