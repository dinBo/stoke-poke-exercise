import { View, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';

import { fetchSection } from '../services/ApiService';
import { STEP_TYPES } from '../consts/stepConsts';
import Section from '../components/Section';
import { COLORS } from '../consts/colorsConsts';
import PreviewSection from './PreviewSection';

export default Step = ({ step, currentStepId, resetSteps }) => {
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

    if (step.type === STEP_TYPES.PREVIEW) return;

    step.sections?.map(section => getSection(section));
  }, [])

  if (currentStepId !== step.id) return

  return (
    <View style={styles.stepContainer}>
      {
        step.type === STEP_TYPES.CREATE && sections.map((section, index) => <Section step={step} section={section} />)
      }
      {
        step.type === STEP_TYPES.PREVIEW && <PreviewSection resetSteps={resetSteps} />
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
