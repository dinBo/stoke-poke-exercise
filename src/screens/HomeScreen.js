import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { i18n } from '../translations/i18n';
import { getLocales } from 'expo-localization';
import { useEffect, useState } from 'react';
import { fetchBowls, fetchSection, fetchSizes } from '../services/ApiService';
import { Button, Checkbox, RadioButton } from 'react-native-paper';
import { SECTION_TYPES, STEPS } from '../consts/stepConsts';
import { usePokeBowl } from '../contexts/PokeBoxlContext';
import { getSectionId } from '../util/util';

const RadioButtonOption = ({ step, section, option }) => {
  const {
    bowl,
    size,
    base,
    sauce,
    getSectionValue,
    updateSectionValue,
  } = usePokeBowl();
  const isOptionSelected = () => getSectionValue(getSectionId(step, section)).id === option.id;

  const [isSelected, setIsSelected] = useState(isOptionSelected());

  useEffect(() => {
    setIsSelected(isOptionSelected())
  }, [bowl, size, base, sauce])

  const getOptionId = () => `${step.id}_${section.id}_${option.id}`

  const getStatus = () => isSelected ? 'checked' : 'unchecked'

  const handleRBPressed = () => updateSectionValue(getSectionId(step, section), option);

  return (
    <View style={styles.option} key={getOptionId()}>
      <RadioButton status={getStatus()} onPress={handleRBPressed} />
      <Text>{option.name}</Text>
      {/* <Text>      </Text> */}
      {/* <Text>{`key: ${getOptionId()}`}</Text> */}
      {/* <Text>{`status: ${getStatus()}`}</Text> */}
      {/* <Text>      </Text> */}
      {/* <Text>{`selected: ${selectedOption.id}`}</Text> */}
    </View>
  )
}

const CheckboxOption = ({ step, section, option }) => {
  const getId = () => `${step.id}_${section.id}_${option.id}`
  return (
    <View style={styles.option} key={getId()}>
      <Checkbox value={option.id} />
      <Text>{option.name}</Text>
      <Text>{`key: ${getId()}`}</Text>
    </View>
  )
}

const RadioButtonSection = ({ step, section }) => {
  return (
    <View>
      {
        section.options.map(option => (
          <RadioButtonOption step={step} section={section} option={option} />
        ))
      }
    </View>
  )
}

const CheckboxSection = ({ step, section }) => {
  return (
    <View>
      {
        section.options.map(option => (
          <CheckboxOption step={step} section={section} option={option} />
        ))
      }
    </View>
  )
}

const Section = ({ step, section }) => {
  const getId = () => `${step.id}_${section.id}`
  return (
    <View key={getId()}>
      <Text style={styles.sectionTitle}>{getId()}</Text>
      <Text style={styles.sectionTitle}>{section.title}</Text>
      {section.description && <Text style={styles.sectionDescription}>{section.description}</Text>}
      {
        section.type === SECTION_TYPES.SINGLE_OPTION && (
          <RadioButtonSection step={step} section={section} />
        )
      }
      {
        section.type === SECTION_TYPES.MULTIPLE_OPTIONS && (
          <CheckboxSection step={step} section={section} />
        )
      }
    </View>
  )
}

const Step = ({ step, currentStepId }) => {
  const [sections, setSections] = useState([])

  useEffect(() => {
    const getSection = async (section) => {
      if (sections?.length !== 0) return;

      const sec = await fetchSection(section.data);
      setSections(prevSections => [...prevSections, {
        ...section,
        options: sec,
      }])
    }
    step.sections.map(section => getSection(section));
  }, [])

  if (currentStepId !== step.id) return

  return (
    <View>
      {
        sections.map((section, index) => <Section step={step} section={section} />)
      }
    </View>
  )
}

export default function HomeScreen() {
  const [currentStepId, setCurrentStep] = useState(1);

  useEffect(() => {
    // console.log(currentStepId);
  }, [currentStepId])

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
  option: {
    flexDirection: 'row',
    alignItems: 'center',
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
