import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Picker } from '@react-native-picker/picker';

import { COLORS } from '../consts/colorsConsts';
import { ScrollView } from 'react-native-gesture-handler';
import { useCart } from '../contexts/CartContext';
import { roundTo2Digits } from '../util/util';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/core';
import { i18n, useLanguage } from '../contexts/LanguageContext';
import { submitOrders } from '../services/ApiService';

const OrderSummary = () => {
  const { orders } = useCart();

  const calculateTotalPrice = (amount, price) => roundTo2Digits(amount * price)

  const calculateCummulativeOrdersPrice = () => {
    let cummulativePrice = 0;
    orders.map(order => cummulativePrice += (order.amount * order.priceTotal.price))
    return roundTo2Digits(cummulativePrice);
  }

  return (
    <View style={styles.stepContainer}>
      <Text style={styles.sectionTitle}>{i18n.t('orderSummary')}</Text>
      {
        orders.map(order => (
          <View style={styles.orderContainer}>
            <View style={[styles.textContainer, { marginBottom: 20 }]}>
              <Text style={styles.content}>{order.bowl.name}</Text>
              <Text style={styles.content}>x{order.amount}</Text>
              <Text style={styles.content}>{`${order.priceTotal.currency}${calculateTotalPrice(order.amount, order.priceTotal.price)}`}</Text>
            </View>
            {order.extraIngredients.length > 0 && <Text style={[styles.content, { marginLeft: 20 }]}>{i18n.t('with')}</Text>}
            {
              order.extraIngredients.map(ingredient => (
                <View style={styles.textContainer}>
                  <Text style={[styles.content, { marginLeft: 20 }]}>{ingredient.name}</Text>
                  <Text style={[styles.content, { marginLeft: 20 }]}>{`${ingredient.currency}${ingredient.price}`}</Text>
                </View>
              ))
            }
          </View>
        ))
      }
      <Text style={[styles.content, { marginVertical: 20, alignSelf: 'flex-end' }]}>{i18n.t('freeDelivery')}</Text>
      <View style={styles.horizontalLine} />
      <View style={[styles.textContainer, { marginBottom: 20 }]}>
        <Text style={[styles.content, { color: COLORS.RED }]}>{i18n.t('total')}</Text>
        <Text style={[styles.content, styles.sectionTitle, { color: COLORS.RED }]}>{`${orders[0] ? orders[0]?.priceTotal.currency : '$'}${calculateCummulativeOrdersPrice()}`}</Text>
      </View>
    </View>
  )
}

const CheckoutScreen = () => {
  const [focusedField, setFocusedField] = useState(null);
  const { orders, resetOrders } = useCart();
  const { locale, changeLanguage } = useLanguage();

  const navigator = useNavigation();

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required('Full name is required'),
    address: Yup.string().required('Address is required'),
    phoneNumber: Yup.string()
      .required('Phone number is required')
      .matches(/^[0-9]+$/, 'Phone number must only contain digits'),
    paymentMethod: Yup.string().required('Please select a payment method'),
    note: Yup.string(),
  });

  const getOrdersForSubmit = () => {
    return orders.map(order => ({
      bowlId: order.bowl.id,
      sizeId: order.size.id,
      baseId: order.base.id,
      sauceId: order.sauce.id,
      ingredients: order.otherIngredients.map(ingredient => ingredient.name),
      extraIngredients: order.extraIngredients.map(ingredient => ingredient.name),
    }))
  }

  const handleSubmit =  async (values) => {
    console.log('Form values:', values);
    const res = await submitOrders(getOrdersForSubmit());
    if (res.message === 'Success!') {
      Alert.alert(`Your order was submitted successfully!`);
      resetOrders()
    }
  };

  const getInputStyle = (field, touched, error) => {
    if (touched && error) {
      return {
        borderColor: COLORS.RED,
        backgroundColor: `${COLORS.RED}33`,
      };
    } else if (focusedField === field) {
      return { borderColor: COLORS.BLACK };
    } else {
      return { borderColor: COLORS.GRAY };
    }
  };

  return (
    <ScrollView style={styles.swContainer}>
      <Formik
        initialValues={{ fullName: '', address: '', phoneNumber: '', paymentMethod: '', note: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
          <>
            <View style={styles.stepContainer}>
              <Text style={styles.label}>{i18n.t('fullName')}</Text>
              <TextInput
                style={[styles.input, getInputStyle('fullName', touched.fullName, errors.fullName)]}
                onChangeText={handleChange('fullName')}
                onFocus={() => setFocusedField('fullName')}
                onBlur={() => {
                  handleBlur('fullName');
                  setFocusedField(null);
                }}
                value={values.fullName}
                placeholder={'e.g. John Doe'}
              />
              {touched.fullName && errors.fullName && <Text style={styles.error}>{errors.fullName}</Text>}

              <Text style={styles.label}>{i18n.t('address')}</Text>
              <TextInput
                style={[styles.input, getInputStyle('address', touched.address, errors.address)]}
                onChangeText={handleChange('address')}
                onFocus={() => setFocusedField('address')}
                onBlur={() => {
                  handleBlur('address');
                  setFocusedField(null);
                }}
                value={values.address}
                placeholder={'e.g. 24 Main Street, LA'}
              />
              {touched.address && errors.address && <Text style={styles.error}>{errors.address}</Text>}

              <Text style={styles.label}>{i18n.t('phoneNumber')}</Text>
              <TextInput
                style={[styles.input, getInputStyle('phoneNumber', touched.phoneNumber, errors.phoneNumber)]}
                onChangeText={handleChange('phoneNumber')}
                onFocus={() => setFocusedField('phoneNumber')}
                onBlur={() => {
                  handleBlur('phoneNumber');
                  setFocusedField(null);
                }}
                value={values.phoneNumber}
                keyboardType="phone-pad"
                placeholder={'e.g. +61 434561230'}
              />
              {touched.phoneNumber && errors.phoneNumber && <Text style={styles.error}>{errors.phoneNumber}</Text>}

              <Text style={styles.label}>{i18n.t('paymentMethod')}</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={values.paymentMethod}
                  onValueChange={(itemValue) => setFieldValue('paymentMethod', itemValue)}
                >
                  <Picker.Item label="Choose payment method" value="" />
                  <Picker.Item label="Cash" value="cash" />
                  <Picker.Item label="Card" value="card" />
                </Picker>
              </View>
              {touched.paymentMethod && errors.paymentMethod && <Text style={styles.error}>{errors.paymentMethod}</Text>}

              <Text style={styles.label}>{i18n.t('note')}</Text>
              <TextInput
                style={[styles.input, styles.textArea, getInputStyle('note', touched.note, errors.note)]}
                onChangeText={handleChange('note')}
                onFocus={() => setFocusedField('note')}
                onBlur={() => {
                  handleBlur('note');
                  setFocusedField(null);
                }}
                value={values.note}
                multiline
                numberOfLines={4}
                placeholder={i18n.t('notePlaceholder')}
              />
              {touched.note && errors.note && <Text style={styles.error}>{errors.note}</Text>}

            </View>
            <OrderSummary />
            {/* <Button title="Place Order" onPress={handleSubmit} /> */}
            <Button
              mode="outlined"
              style={[styles.button]}
              buttonColor={COLORS.WHITE}
              textColor={COLORS.BLACK}
              onPress={() => navigator.goBack()}
            >
              {i18n.t('backToCart')}
            </Button>
            <Button
              mode="contained"
              style={[styles.button, { marginBottom: 20 }]}
              buttonColor={COLORS.RED}
              onPress={handleSubmit}
            >
              {i18n.t('placeOrder')}
            </Button>
          </>
        )}
      </Formik>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  swContainer: {
    paddingHorizontal: 20,
  },
  stepContainer: {
    borderWidth: 1,
    borderColor: COLORS.GRAY,
    borderRadius: 4,
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 4,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: COLORS.GRAY,
    borderRadius: 4,
    marginBottom: 10,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  error: {
    fontSize: 12,
    color: 'red',
    marginBottom: 10,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
  },
  orderContainer: {
    marginTop: 20,
  },
  horizontalLine: {
    borderTopWidth: 1,
    borderColor: COLORS.GRAY,
    marginTop: 10,
    marginBottom: 15,
  },
  button: {
    width: '100%',
    borderRadius: 4,
    marginTop: 10,
  },
});

export default CheckoutScreen;
