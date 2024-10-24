export const SECTION_TYPES = {
  SINGLE_OPTION: 'SINGLE_OPTION',
  MULTIPLE_OPTIONS: 'MULTIPLE_OPTIONS',
}

export const STEPS = [
  {
    id: 1,
    sections: [
      {
        id: 1,
        title: 'Make your own poke bowl',
        description: `Select the type of bowl your’d like, the size, add the base, sauce and all the added ingredients. We’ll take care of the rest!`,
        type: SECTION_TYPES.SINGLE_OPTION,
        data: 'bowls',
      },
    ],
  },
  {
    id: 2,
    sections: [
      {
        id: 1,
        title: 'Pick a size',
        order: 0,
        type: SECTION_TYPES.SINGLE_OPTION,
        data: 'sizes',
      },
      {
        id: 2,
        title: 'Pick a base',
        order: 1,
        type: SECTION_TYPES.SINGLE_OPTION,
        data: 'bases',
      },
      {
        id: 3,
        title: 'Pick a sauce',
        order: 2,
        type: SECTION_TYPES.SINGLE_OPTION,
        data: 'sauces',
      },
      {
        id: 4,
        title: 'Pick other ingredients',
        description: `Pick up to 5, 8 of 10 ingredients based on bowl size.`,
        order: 3,
        type: SECTION_TYPES.MULTIPLE_OPTIONS,
        data: 'ingredients',
      },
    ],
  },
  {
    id: 3,
    sections: [
      {
        id: 1,
        title: 'Pick an extra engredient',
        description: 'Weather its more sashimi or an ingrediant you’d like to try out, feel free to add whatever you’d like.',
        order: 0,
        type: SECTION_TYPES.MULTIPLE_OPTIONS,
        data: 'extra_ingredients',
      },
    ],
  },
]