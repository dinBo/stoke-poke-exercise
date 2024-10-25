import { Pressable, StyleSheet, Text, View } from "react-native";
import { Checkbox } from "react-native-paper";
import { useEffect, useState } from "react";

import { usePokeBowl } from "../contexts/PokeBoxlContext";
import { getSectionId } from "../util/util";


const CheckboxOption = ({ step, section, option, setError }) => {
  const {
    otherIngredients,
    extraIngredients,
    getSectionValue,
    updateSectionValue,
  } = usePokeBowl();

  const isOptionSelected = () => !!getSectionValue(getSectionId(step, section)).find(opt => opt.id === option.id);

  const [isSelected, setIsSelected] = useState(isOptionSelected());

  useEffect(() => {
    setIsSelected(isOptionSelected())
  }, [otherIngredients, extraIngredients])

  const getOptionId = () => `${step.id}_${section.id}_${option.id}`

  const getStatus = () => isSelected ? 'checked' : 'unchecked'

  const handlePressed = () => {
    try {
      let newSelection = [...getSectionValue(getSectionId(step, section))];
      let options = { isRemoving: false }
      if (isOptionSelected()) {
        const filteredSelection = newSelection.filter(opt => opt.id !== option.id);
        newSelection = [...filteredSelection]
        options.isRemoving = true;
      } else {
        newSelection = [...newSelection, option]
      }
      updateSectionValue(getSectionId(step, section), newSelection, options);
      setError(null)
    } catch (error) {
      setError(error)
    }
  }

  return (
    <Pressable style={styles.option} key={getOptionId()} onPress={handlePressed}>
      <Checkbox status={getStatus()} onPress={handlePressed} />
      <Text>{`${option.name}${option.price ? ` - ${option.currency}${option.price}` : ''}`}</Text>
      {/* <Text>{`key: ${getOptionId()}`}</Text> */}
    </Pressable>
  )
}

export default CheckboxSection = ({ step, section, setError }) => {
  return (
    <View>
      {
        section.options.map(option => (
          <CheckboxOption step={step} section={section} option={option} setError={setError} />
        ))
      }
    </View>
  )
}

const styles = StyleSheet.create({
  option: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});