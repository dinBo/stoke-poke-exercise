import { SECTIONS_DATA_MAPPING } from "../consts/stepConsts";
import { BASES_MOCK, BOWLS_MOCK, EXTRA_INGREDIENTS_MOCK, OTHER_INGREDIENTS_MOCK, SAUCES_MOCK, SIZES_MOCK } from "../mocks/mocks";

export const getSectionId = (step, section) => `${step.id}_${section.id}`

export const roundTo2Digits = (num) => Math.round((num + Number.EPSILON) * 100) / 100

export const getMockSectionData = (section) => {
  switch (section) {
    case SECTIONS_DATA_MAPPING.BOWL:
      return BOWLS_MOCK.options;
    case SECTIONS_DATA_MAPPING.SIZE:
      return SIZES_MOCK.options;
    case SECTIONS_DATA_MAPPING.BASE:
      return BASES_MOCK.options;
    case SECTIONS_DATA_MAPPING.SAUCE:
      return SAUCES_MOCK.options;
    case SECTIONS_DATA_MAPPING.OTHER:
      return OTHER_INGREDIENTS_MOCK.options;
    case SECTIONS_DATA_MAPPING.EXTRA:
      return EXTRA_INGREDIENTS_MOCK.options;
  }
}