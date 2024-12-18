import React, { createContext, useContext, useEffect, useState } from 'react';
import * as Crypto from 'expo-crypto';

import { BOWL_SIZE_ID, SECTION_IDS } from '../consts/stepConsts';
import { DEFAULT_BOWL_DATA } from '../consts/bowlConsts';
import { roundTo2Digits } from '../util/util';

const OrderContext = createContext(null)

export const useOrder = () => {
  return useContext(OrderContext)
}

export const OrderProvider = ({ children }) => {
  const [orderId, setOrderId] = useState(Crypto.randomUUID());
  const [bowl, setBowl] = useState(DEFAULT_BOWL_DATA.BOWL);
  const [size, setSize] = useState(DEFAULT_BOWL_DATA.SIZE);
  const [base, setBase] = useState(DEFAULT_BOWL_DATA.BASE);
  const [sauce, setSauce] = useState(DEFAULT_BOWL_DATA.SAUCE);
  const [otherIngredients, setOtherIngredients] = useState(DEFAULT_BOWL_DATA.OTHER_INGREDIENTS);
  const [extraIngredients, setExtraIngredients] = useState(DEFAULT_BOWL_DATA.EXTRA_INGREDIENTS);
  const [priceRegular, setPriceRegular] = useState(DEFAULT_BOWL_DATA.PRICE_REGULAR);
  const [priceTotal, setPriceTotal] = useState(DEFAULT_BOWL_DATA.PRICE_TOTAL);
  const [isEditing, setIsEditing] = useState(DEFAULT_BOWL_DATA.IS_EDITING);

  useEffect(() => {
    setPriceRegular({ currency: size.currency, price: size.price })
    setPriceTotal(calculateTotalPrice(size, extraIngredients))
  }, [size, extraIngredients])

  const calculateTotalPrice = (bowlSize, ingredients) => {
    let totalPrice = bowlSize.price
    ingredients.map(ing => {
      totalPrice += ing.price;
    })
    return {
      currency: bowlSize.currency,
      price: roundTo2Digits(totalPrice),
    }
  }

  // useEffect(() => {
  //   const getIngredientsString = (ingredients) => {
  //     let ingStr = ''
  //     ingredients.map(ing => {
  //       ingStr = `${ingStr}, ${ing.name}`
  //     })
  //     return ingStr
  //   }
  //   console.log('-------------------------');
  //   console.log(`orderId: ${orderId}`);
  //   console.log(`bowl: ${bowl.name}`);
  //   console.log(`size: ${size.name}`);
  //   console.log(`base: ${base.name}`);
  //   console.log(`sauce: ${sauce.name}`);
  //   console.log(`other ingredients: ${getIngredientsString(otherIngredients)}`);
  //   console.log(`extra ingredients: ${getIngredientsString(extraIngredients)}`);
  // }, [bowl, size, base, sauce, otherIngredients, extraIngredients])

  const verifySizes = (newSize) => {
    let errorMessage;
    if (newSize) {
      if (newSize.id === BOWL_SIZE_ID.SMALL && otherIngredients.length > 5) {
        errorMessage = `* Remove extra ingredients before changing to a small size bowl.`
      }
      if (newSize.id === BOWL_SIZE_ID.MEDIUM && otherIngredients.length > 8) {
        errorMessage = `* Remove extra ingredients before changing to a medium size bowl.`
      }
      if (newSize.id === BOWL_SIZE_ID.LARGE && otherIngredients.length > 10) {
        errorMessage = `* Remove extra ingredients before changing to a large size bowl.`
      }
    } else {
      if (size.id === BOWL_SIZE_ID.SMALL && otherIngredients.length >= 5) {
        errorMessage = `* You’ve chosen the maximum amout of ingredients for a small size bowl.`
      }
      if (size.id === BOWL_SIZE_ID.MEDIUM && otherIngredients.length >= 8) {
        errorMessage = `* You’ve chosen the maximum amout of ingredients for a medium size bowl.`
      }
      if (size.id === BOWL_SIZE_ID.LARGE && otherIngredients.length >= 10) {
        errorMessage = `* You’ve chosen the maximum amout of ingredients for a large size bowl.`
      }
    }
    if (errorMessage) {
      throw new Error(errorMessage)
    }
  }

  /**
   * @param {string} id The id of the section whose value should be returned.
   * The id is in the format: stepId_sectionId, see SECTION_IDS
   * 
   * @returns the value of the requested section
   */
  const getSectionValue = (id) => {
    switch (id) {
      case SECTION_IDS.BOWL:
        return bowl;
      case SECTION_IDS.SIZE:
        return size;
      case SECTION_IDS.BASE:
        return base;
      case SECTION_IDS.SAUSE:
        return sauce;
      case SECTION_IDS.OTHER:
        return otherIngredients;
      case SECTION_IDS.EXTRA:
        return extraIngredients;
    }
  }

  const updateSectionValue = (id, value, options) => {
    switch (id) {
      case SECTION_IDS.BOWL:
        setBowl(value);
        return;
      case SECTION_IDS.SIZE:
        verifySizes(value);
        setSize(value);
        return;
      case SECTION_IDS.BASE:
        setBase(value);
        return;
      case SECTION_IDS.SAUSE:
        setSauce(value);
        return;
      case SECTION_IDS.OTHER:
        if (!options?.isRemoving) {
          verifySizes();
        }
        setOtherIngredients(value);
        return;
      case SECTION_IDS.EXTRA:
        setExtraIngredients(value);
        return;
    }
  }

  const resetOrder = (order = null) => {
    setOrderId(order ? order.orderId : Crypto.randomUUID())
    setBowl(order ? order.bowl : DEFAULT_BOWL_DATA.BOWL);
    setSize(order ? order.size : DEFAULT_BOWL_DATA.SIZE);
    setBase(order ? order.base : DEFAULT_BOWL_DATA.BASE);
    setSauce(order ? order.sauce : DEFAULT_BOWL_DATA.SAUCE);
    setOtherIngredients(order ? order.otherIngredients : DEFAULT_BOWL_DATA.OTHER_INGREDIENTS);
    setExtraIngredients(order ? order.extraIngredients : DEFAULT_BOWL_DATA.EXTRA_INGREDIENTS);
    setIsEditing(order ? true : DEFAULT_BOWL_DATA.IS_EDITING)
  }

  const value = {
    orderId,
    bowl,
    size,
    base,
    sauce,
    otherIngredients,
    extraIngredients,
    priceRegular,
    priceTotal,
    isEditing,
    getSectionValue,
    updateSectionValue,
    resetOrder,
  }

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
}