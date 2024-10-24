import React, { createContext, useContext, useEffect, useState } from 'react';
import { BOWL_SIZE_ID, SECTION_TYPES, SECTION_IDS } from '../consts/stepConsts';

const PokeBowlContext = createContext(null)

export const usePokeBowl = () => {
  return useContext(PokeBowlContext)
}

export const PokeBowlProvider = ({ children }) => {
  const [bowl, setBowl] = useState({ id: 1, name: "Chicken Poke Bowl" });
  const [size, setSize] = useState({ id: 1, name: "Small" });
  const [base, setBase] = useState({ id: 1, name: "White Rice" });
  const [sauce, setSauce] = useState({ id: 1, name: "Ponzu sauce" });
  const [otherIngredients, setOtherIngredients] = useState([]);
  const [extraIngredients, setExtraIngredients] = useState([]);

  // useEffect(() => {
  //   console.log('-------------------------');
  //   console.log(`bowl: ${bowl.name}`);
  //   console.log(`size: ${size.name}`);
  //   console.log(`base: ${base.name}`);
  //   console.log(`sauce: ${sauce.name}`);
  // }, [bowl, size, base, sauce])

  const verifySizes = () => {
    let errorMessage;
    if (bowl.id === BOWL_SIZE_ID.SMALL && otherIngredients.length >= 5) {
      errorMessage = `* You’ve chosen the maximum amout of ingrediants for a small size bowl.`
    }
    if (bowl.id === BOWL_SIZE_ID.MEDIUM && otherIngredients.length >= 8) {
      errorMessage = `* You’ve chosen the maximum amout of ingrediants for a medium size bowl.`
    }
    if (bowl.id === BOWL_SIZE_ID.LARGE && otherIngredients.length >= 10) {
      errorMessage = `* You’ve chosen the maximum amout of ingrediants for a large size bowl.`
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
    // if (type === SECTION_TYPES.SINGLE_OPTION) {
    switch (id) {
      case SECTION_IDS.BOWL:
        return bowl;
      case SECTION_IDS.SIZE:
        return size;
      case SECTION_IDS.BASE:
        return base;
      case SECTION_IDS.SAUSE:
        return sauce;
      // TODO I have to remove as well, not only add ingredients
      // case SECTION_IDS.OTHER:
      //   verifySizes();
      //   setOtherIngredients(prevOtherIng => [...prevOtherIng, value]);
      // case SECTION_IDS.EXTRA:
      //   setExtraIngredients(value);
    }
    // }
    // if (type === SECTION_TYPES.MULTIPLE_OPTIONS) {

    // }
  }

  const updateSectionValue = (id, value) => {
    // if (type === SECTION_TYPES.SINGLE_OPTION) {
      switch (id) {
        case SECTION_IDS.BOWL:
          setBowl(value);
          return;
        case SECTION_IDS.SIZE:
          verifySizes();
          setSize(value);
          return;
        case SECTION_IDS.BASE:
          setBase(value);
          return;
        case SECTION_IDS.SAUSE:
          setSauce(value);
          return;
        // TODO I have to remove as well, not only add ingredients
        // case SECTION_IDS.OTHER:
        //   verifySizes();
        //   setOtherIngredients(prevOtherIng => [...prevOtherIng, value]);
        // case SECTION_IDS.EXTRA:
        //   setExtraIngredients(value);
      }
    // }
    // if (type === SECTION_TYPES.MULTIPLE_OPTIONS) {

    // }
  }

  const value = {
    bowl,
    setBowl,
    size,
    setSize,
    base,
    setBase,
    sauce,
    setSauce,
    otherIngredients,
    setOtherIngredients,
    extraIngredients,
    setExtraIngredients,
    getSectionValue,
    updateSectionValue,
  }

  return <PokeBowlContext.Provider value={value}>{children}</PokeBowlContext.Provider>
}