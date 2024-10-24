import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { i18n } from '../translations/i18n';
import { getLocales } from 'expo-localization';
import { useEffect, useState } from 'react';
import { fetchBowls, fetchSection, fetchSizes } from '../services/ApiService';
import { Button, Checkbox, RadioButton } from 'react-native-paper';
import { SECTION_TYPES, STEPS } from '../consts/stepConsts';

const Section = ({ section }) => {
  return (
    <View>
      <Text style={styles.sectionTitle}>{section.title}</Text>
      {section.description && <Text style={styles.sectionDescription}>{section.description}</Text>}
      {
        section.type === SECTION_TYPES.SINGLE_OPTION && (
          // <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
          <RadioButton.Group>
            {
              section.options.map(option => (
                <View style={styles.option} key={`${section.id}_${option.id}`}>
                  <RadioButton value={option.id} />
                  <Text>{option.name}</Text>
                </View>
              ))
            }
          </RadioButton.Group>
        )
      }
      {
        section.type === SECTION_TYPES.MULTIPLE_OPTIONS && (
          section.options.map(option => (
            <View style={styles.option} key={`${section.id}_${option.id}`}>
              <Checkbox value={option.id} />
              <Text>{option.name}</Text>
            </View>
          ))
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
        sections.map((section, index) => <Section section={section} key={section.id} />)
      }
    </View>
  )
}

export default function HomeScreen() {
  const [value, setValue] = useState();
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
