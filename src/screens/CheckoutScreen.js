import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Picker } from '@react-native-picker/picker';

const CheckoutScreen = () => {
  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required('Full name is required'),
    address: Yup.string().required('Address is required'),
    phoneNumber: Yup.string()
      .required('Phone number is required')
      .matches(/^[0-9]+$/, 'Phone number must only contain digits'),
    paymentMethod: Yup.string().required('Please select a payment method'),
    note: Yup.string(),
  });

  const handleSubmit = (values) => {
    console.log('Form values:', values);
  };

  return (
    <Formik
      initialValues={{ fullName: '', address: '', phoneNumber: '', paymentMethod: '', note: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
        <View style={styles.formContainer}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            onChangeText={handleChange('fullName')}
            onBlur={handleBlur('fullName')}
            value={values.fullName}
          />
          {touched.fullName && errors.fullName && <Text style={styles.error}>{errors.fullName}</Text>}

          <Text style={styles.label}>Address</Text>
          <TextInput
            style={styles.input}
            onChangeText={handleChange('address')}
            onBlur={handleBlur('address')}
            value={values.address}
          />
          {touched.address && errors.address && <Text style={styles.error}>{errors.address}</Text>}

          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            onChangeText={handleChange('phoneNumber')}
            onBlur={handleBlur('phoneNumber')}
            value={values.phoneNumber}
            keyboardType="phone-pad"
          />
          {touched.phoneNumber && errors.phoneNumber && <Text style={styles.error}>{errors.phoneNumber}</Text>}

          <Text style={styles.label}>Payment Method</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={values.paymentMethod}
              onValueChange={(itemValue) => setFieldValue('paymentMethod', itemValue)}
            >
              <Picker.Item label="Select payment method" value="" />
              <Picker.Item label="Cash" value="cash" />
              <Picker.Item label="Card" value="card" />
            </Picker>
          </View>
          {touched.paymentMethod && errors.paymentMethod && <Text style={styles.error}>{errors.paymentMethod}</Text>}

          <Text style={styles.label}>Note</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            onChangeText={handleChange('note')}
            onBlur={handleBlur('note')}
            value={values.note}
            multiline
            numberOfLines={4}
          />
          {touched.note && errors.note && <Text style={styles.error}>{errors.note}</Text>}

          <Button title="Place Order" onPress={handleSubmit} />
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 4,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
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
});

export default CheckoutScreen;
