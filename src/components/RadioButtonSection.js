import { Pressable, StyleSheet, Text, View } from "react-native";
import { RadioButton } from "react-native-paper";
import { useEffect, useState } from "react";

import { useOrder } from "../contexts/OrderContext";
import { getSectionId } from "../util/util";
import { COLORS } from "../consts/colorsConsts";


const RadioButtonOption = ({ step, section, option, setError }) => {
  const {
    bowl,
    size,
    base,
    sauce,
    getSectionValue,
    updateSectionValue,
  } = useOrder();

  const isOptionSelected = () => getSectionValue(getSectionId(step, section)).id === option.id;

  const [isSelected, setIsSelected] = useState(isOptionSelected());

  useEffect(() => {
    setIsSelected(isOptionSelected())
  }, [bowl, size, base, sauce])

  const getOptionId = () => `${step.id}_${section.id}_${option.id}`

  const getStatus = () => isSelected ? 'checked' : 'unchecked'

  const handlePressed = () => {
    try {
      updateSectionValue(getSectionId(step, section), option)
      setError(null)
    } catch (error) {
      setError(error)
    }
  }

  return (
    <Pressable style={styles.option} key={getOptionId()} onPress={handlePressed}>
      <RadioButton status={getStatus()} onPress={handlePressed} color={COLORS.RED} />
      <Text style={[styles.optionText, isSelected && styles.optionTextSelected]}>{`${option.name}${option.price ? ` - ${option.currency}${option.price}` : ''}`}</Text>
      {/* <Text>      </Text> */}
      {/* <Text>{`key: ${getOptionId()}`}</Text> */}
      {/* <Text>{`status: ${getStatus()}`}</Text> */}
      {/* <Text>      </Text> */}
      {/* <Text>{`selected: ${selectedOption.id}`}</Text> */}
    </Pressable>
  )
}

export default RadioButtonSection = ({ step, section, setError }) => {
  return (
    <View>
      {
        section.options?.map(option => (
          <RadioButtonOption step={step} section={section} option={option} setError={setError} />
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
  optionText: {
    fontWeight: '700',
    fontSize: 16,
  },
  optionTextSelected: {
    color: COLORS.RED,
  },
});