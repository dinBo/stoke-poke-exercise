import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import RadioButtonSection from "./RadioButtonSection";
import CheckboxSection from "./CheckboxSection";
import { SECTION_TYPES } from "../consts/stepConsts";
import { useOrder } from "../contexts/OrderContext";
import { i18n } from "../translations/i18n";
import { COLORS } from "../consts/colorsConsts";


export default Section = ({ step, section }) => {
  const [error, setError] = useState(null);

  const {
    priceRegular,
    priceTotal,
  } = useOrder();

  const getId = () => `${step.id}_${section.id}`

  return (
    <View key={getId()}>
      {/* <Text style={styles.sectionTitle}>{getId()}</Text> */}
      <Text style={styles.sectionTitle}>{i18n.t(section.title)}</Text>
      {section.description && <Text style={styles.sectionDescription}>{i18n.t(section.description)}</Text>}
      <View style={styles.sectionOptionsContainer}>
        {
          section.type === SECTION_TYPES.SINGLE_OPTION && (
            <RadioButtonSection step={step} section={section} setError={setError} />
          )
        }
        {
          section.type === SECTION_TYPES.MULTIPLE_OPTIONS && (
            <CheckboxSection step={step} section={section} error={error} setError={setError} />
          )
        }
      </View>
      {error && <Text>{error.message}</Text>}
      {step.showPrice && (
        <View>
          <View style={styles.textContainer}>
            <Text style={styles.content}>{i18n.t('regularPrice')}</Text>
            <Text style={styles.sectionTitle}>{`${priceRegular.currency}${priceRegular.price}`}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={[styles.content, { color: COLORS.RED }]}>{i18n.t('priceWithExtra')}</Text>
            <Text style={[styles.sectionTitle, { color: COLORS.RED }]}>{`${priceRegular.currency}${priceTotal.price}`}</Text>
          </View>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
  },
  sectionDescription: {
    marginBottom: 10,
  },
  sectionOptionsContainer: {
    marginBottom: 10,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  content: {
    fontSize: 16,
    marginBottom: 10,
  },
});
