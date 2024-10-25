import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import RadioButtonSection from "./RadioButtonSection";
import CheckboxSection from "./CheckboxSection";
import { SECTION_TYPES } from "../consts/stepConsts";
import { usePokeBowl } from "../contexts/PokeBoxlContext";


export default Section = ({ step, section }) => {
  const [error, setError] = useState(null);

  const {
    priceRegular,
    priceTotal,
  } = usePokeBowl();

  const getId = () => `${step.id}_${section.id}`

  return (
    <View key={getId()}>
      {/* <Text style={styles.sectionTitle}>{getId()}</Text> */}
      <Text style={styles.sectionTitle}>{section.title}</Text>
      {section.description && <Text style={styles.sectionDescription}>{section.description}</Text>}
      {
        section.type === SECTION_TYPES.SINGLE_OPTION && (
          <RadioButtonSection step={step} section={section} setError={setError} />
        )
      }
      {
        section.type === SECTION_TYPES.MULTIPLE_OPTIONS && (
          <CheckboxSection step={step} section={section} setError={setError} />
        )
      }
      {error && <Text>{error.message}</Text>}
      {step.showPrice && (
        <View>
          <Text>{`Regular price: ${priceRegular.currency}${priceRegular.price}`}</Text>
          <Text>{`Price with extra ingredients: ${priceRegular.currency}${priceTotal.price}`}</Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
  },
});
