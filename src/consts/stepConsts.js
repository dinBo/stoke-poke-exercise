export const SECTION_TYPES = {
  SINGLE_OPTION: 'SINGLE_OPTION',
  MULTIPLE_OPTIONS: 'MULTIPLE_OPTIONS',
}

export const STEP_TYPES = {
  CREATE: 'CREATE',
  PREVIEW: 'PREVIEW',
}

export const SECTIONS_DATA_MAPPING = {
  BOWL: 'bowls',
  SIZE: 'sizes',
  BASE: 'bases',
  SAUCE: 'sauces',
  OTHER: 'ingredients',
  EXTRA: 'extra_ingredients',
}

export const STEPS = [
  {
    id: 1,
    type: STEP_TYPES.CREATE,
    sections: [
      {
        id: 1,
        title: 'step11Title',
        description: `step11Description`,
        type: SECTION_TYPES.SINGLE_OPTION,
        data: SECTIONS_DATA_MAPPING.BOWL,
      },
    ],
  },
  {
    id: 2,
    type: STEP_TYPES.CREATE,
    sections: [
      {
        id: 1,
        title: 'step21Title',
        order: 0,
        type: SECTION_TYPES.SINGLE_OPTION,
        data: SECTIONS_DATA_MAPPING.SIZE,
      },
      {
        id: 2,
        title: 'step22Title',
        order: 1,
        type: SECTION_TYPES.SINGLE_OPTION,
        data: SECTIONS_DATA_MAPPING.BASE,
      },
      {
        id: 3,
        title: 'step23Title',
        order: 2,
        type: SECTION_TYPES.SINGLE_OPTION,
        data: SECTIONS_DATA_MAPPING.SAUCE,
      },
      {
        id: 4,
        title: 'step24Title',
        description: 'step24Description',
        order: 3,
        type: SECTION_TYPES.MULTIPLE_OPTIONS,
        data: SECTIONS_DATA_MAPPING.OTHER,
      },
    ],
  },
  {
    id: 3,
    type: STEP_TYPES.CREATE,
    showPrice: true,
    sections: [
      {
        id: 1,
        title: 'step31Title',
        description: 'step31Description',
        order: 0,
        type: SECTION_TYPES.MULTIPLE_OPTIONS,
        data: SECTIONS_DATA_MAPPING.EXTRA,
      },
    ],
  },
  {
    id: 4,
    type: STEP_TYPES.PREVIEW,
  },
]

/**
 * the mapping is in format: stepId_sectionId
 */
export const SECTION_IDS = {
  BOWL: '1_1',
  SIZE: '2_1',
  BASE: '2_2',
  SAUSE: '2_3',
  OTHER: '2_4',
  EXTRA: '3_1',
}

export const BOWL_SIZE_ID = {
  SMALL: 1,
  MEDIUM: 2,
  LARGE: 3,
}
