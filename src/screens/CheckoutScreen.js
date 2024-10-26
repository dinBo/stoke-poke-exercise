import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

const CheckoutScreen = () => {
  // Validation schema (optional)
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    address: Yup.string().required('Address is required'),
    note: Yup.string(),
    price: Yup.number().required('Price is required').positive('Price must be positive'),
  });

  const handleSubmit = (values) => {
    // Process form values here
    console.log('Form values:', values);
  };

  return (
    <Formik
      initialValues={{ name: '', address: '', note: '', price: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View style={styles.formContainer}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            onChangeText={handleChange('name')}
            onBlur={handleBlur('name')}
            value={values.name}
          />
          {touched.name && errors.name && <Text style={styles.error}>{errors.name}</Text>}

          <Text style={styles.label}>Address</Text>
          <TextInput
            style={styles.input}
            onChangeText={handleChange('address')}
            onBlur={handleBlur('address')}
            value={values.address}
          />
          {touched.address && errors.address && <Text style={styles.error}>{errors.address}</Text>}

          <Text style={styles.label}>Note</Text>
          <TextInput
            style={styles.input}
            onChangeText={handleChange('note')}
            onBlur={handleBlur('note')}
            value={values.note}
          />
          {touched.note && errors.note && <Text style={styles.error}>{errors.note}</Text>}

          <Text style={styles.label}>Price</Text>
          <TextInput
            style={styles.input}
            onChangeText={handleChange('price')}
            onBlur={handleBlur('price')}
            value={values.price}
            keyboardType="numeric"
          />
          {touched.price && errors.price && <Text style={styles.error}>{errors.price}</Text>}

          <Button title="Submit" onPress={handleSubmit} />
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
  error: {
    fontSize: 12,
    color: 'red',
    marginBottom: 10,
  },
});

export default CheckoutScreen;
