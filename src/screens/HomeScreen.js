import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { i18n } from '../translations/i18n';
import { useEffect, useState } from 'react';
import { fetchSection } from '../services/ApiService';
import { Button } from 'react-native-paper';
import { STEPS, STEP_TYPES } from '../consts/stepConsts';
import Section from '../components/Section';
import { usePokeBowl } from '../contexts/PokeBoxlContext';

const Step = ({ step, currentStepId }) => {
  const [sections, setSections] = useState([])
  const {
    bowl,
    size,
    base,
    sauce,
    otherIngredients,
    extraIngredients,
    priceRegular,
    priceTotal,
  } = usePokeBowl();

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

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.text}>
          {i18n.t('welcomeHome')} {i18n.t('name')}
        </Text>
        {
          STEPS.map(step => (
            <Step step={step} key={step.id} currentStepId={currentStepId} />
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
