import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { useState } from 'react';
import { Button, ProgressBar } from "react-native-paper";

import { i18n } from '../translations/i18n';
import { STEPS } from '../consts/stepConsts';
import { COLORS } from '../consts/colorsConsts';
import Step from '../components/Step';

const ProgressIndicator = ({ step }) => {
  const numberOfSteps = STEPS.length;
  const getProgress = () => step / numberOfSteps
  return (
    <View>
      <View style={styles.progressIndicatorTextContainer}>
        <Text style={[styles.progressIndicatorText, {fontWeight: '700'}]}>{`Step ${step}`}</Text>
        <Text style={[styles.progressIndicatorText]}>{` of ${numberOfSteps}`}</Text>
      </View>
      <ProgressBar progress={getProgress()} color={COLORS.RED} />
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
      <ScrollView style={styles.scrollView}>
        <ProgressIndicator step={currentStepId} />
        {/* <Text style={styles.text}>
          {i18n.t('welcomeHome')} {i18n.t('name')}
        </Text> */}
        {
          STEPS.map(step => (
            <Step step={step} key={step.id} currentStepId={currentStepId} resetSteps={resetSteps} />
          ))
        }
        <View style={styles.buttonsContainer}>
          {isBeforeButtonVisible() && (
            <Button
              mode="outlined"
              buttonColor={COLORS.WHITE}
              textColor={COLORS.BLACK}
              style={[styles.button, areBothButtonsVisible() && { width: '45%' }]}
              onPress={() => setCurrentStep(currentStepId - 1)}
            >
              Back
            </Button>
          )}
          {isNextButtonVisible() && (
            <Button
              icon="chevron-right"
              mode="contained"
              buttonColor={COLORS.BLACK}
              style={[styles.button, areBothButtonsVisible() && { width: '45%' }]}
              contentStyle={styles.buttonContent}
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
    // alignItems: 'center',
    // justifyContent: 'center',
    flex: 1,
  },
  scrollView: {
    // alignItems: 'center',
    // justifyContent: 'center',
    flex: 1,
    paddingHorizontal: 20,
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
    gap: 20,
    marginTop: 10,
    marginBottom: 30,
  },
  button: {
    width: '100%',
    // marginHorizontal: 10,
    borderRadius: 4,
  },
  buttonContent: {
    flexDirection: 'row-reverse'
  },
  stepContainer: {
    borderWidth: 1,
    borderColor: COLORS.GRAY,
    borderRadius: 4,
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 20,
  },
  progressIndicatorTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  progressIndicatorText: {
    fontSize: 16,
    marginBottom: 5,
  },
});
