export const SECTION_TYPES = {
  SINGLE_OPTION: 'SINGLE_OPTION',
  MULTIPLE_OPTIONS: 'MULTIPLE_OPTIONS',
}

export const STEPS = [
  {
    id: 'step_1',
    sections: [
      {
        id: 'step_1_section_1',
        title: 'Make your own poke bowl',
        description: `Select the type of bowl your’d like, the size, add the base, sauce and all the added ingredients. We’ll take care of the rest!`,
        type: SECTION_TYPES.SINGLE_OPTION,
        data: 'bowls',
      },
    ],
  },
  {
    id: 'step_2',
    sections: [
      {
        id: 'step_2_section_1',
        title: 'Pick a size',
        order: 0,
        type: SECTION_TYPES.SINGLE_OPTION,
        data: 'sizes',
      },
      {
        id: 'step_2_section_2',
        title: 'Pick a base',
        order: 1,
        type: SECTION_TYPES.SINGLE_OPTION,
        data: 'bases',
      },
      {
        id: 'step_2_section_3',
        title: 'Pick a sauce',
        order: 2,
        type: SECTION_TYPES.SINGLE_OPTION,
        data: 'sauces',
      },
      {
        id: 'step_2_section_4',
        title: 'Pick other ingredients',
        description: `Pick up to 5, 8 of 10 ingredients based on bowl size.`,
        order: 3,
        type: SECTION_TYPES.MULTIPLE_OPTIONS,
        data: 'ingredients',
      },
    ],
  },
  {
    id: 'step_3',
    sections: [
      {
        id: 'step_3_section_1',
        title: 'Pick an extra engredient',
        description: 'Weather its more sashimi or an ingrediant you’d like to try out, feel free to add whatever you’d like.',
        order: 0,
        type: SECTION_TYPES.MULTIPLE_OPTIONS,
        data: 'extra_ingredients',
      },
    ],
  },
]