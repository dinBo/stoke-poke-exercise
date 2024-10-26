import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import { Button } from "react-native-paper";

import { i18n } from '../translations/i18n';
import { fetchSection } from '../services/ApiService';
import { STEPS, STEP_TYPES } from '../consts/stepConsts';
import Section from '../components/Section';
import { useOrder } from '../contexts/OrderContext';
import { useCart } from '../contexts/CartContext';
import { useNavigation } from '@react-navigation/core';

const Step = ({ step, currentStepId, resetSteps }) => {
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
  } = useOrder();

  const { addToOrders } = useCart();

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

  if (currentStepId !== step.id) return

  return (
    <View>
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
              Add to Cart
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

export default function HomeScreen() {
  const [currentStepId, setCurrentStep] = useState(1);

  const isBeforeButtonVisible = () => currentStepId > 1

  const isNextButtonVisible = () => currentStepId < STEPS.length

  const areBothButtonsVisible = () => isBeforeButtonVisible() && isNextButtonVisible()

  const resetSteps = () => setCurrentStep(1)

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.text}>
          {i18n.t('welcomeHome')} {i18n.t('name')}
        </Text>
        {
          STEPS.map(step => (
            <Step step={step} key={step.id} currentStepId={currentStepId} resetSteps={resetSteps} />
          ))
        }
        <View style={styles.buttonsContainer}>
          {isBeforeButtonVisible() && (
            <Button
              icon="camera"
              mode="contained"
              style={[styles.button, areBothButtonsVisible() && { width: '50%' }]}
              onPress={() => setCurrentStep(currentStepId - 1)}
            >
              Back
            </Button>
          )}
          {isNextButtonVisible() && (
            <Button
              icon="camera"
              mode="contained"
              style={[styles.button, areBothButtonsVisible() && { width: '50%' }]}
              onPress={() => setCurrentStep(currentStepId + 1)}
            >
              Next
            </Button>
          )}
        </View>
      </ScrollView>
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
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    width: '100%',
  },
});
