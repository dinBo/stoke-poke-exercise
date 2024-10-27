import { SECTIONS_DATA_MAPPING } from "../consts/stepConsts";
import { BASES_MOCK, BOWLS_MOCK, EXTRA_INGREDIENTS_MOCK, OTHER_INGREDIENTS_MOCK, SAUCES_MOCK, SIZES_MOCK } from "../mocks/mocks";

export const fetchSection = async (section) => {
  if (process.env.EXPO_PUBLIC_USE_MOCK_DATA !== "true") {
    try {
      console.log('Using live server data');
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/${section}?currentPage=1`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.EXPO_PUBLIC_API_TOKEN}`
        },
      });
      const returnedData = await response.json();
      return returnedData.data;
    } catch (error) {
      console.error(`Error fetching ${section}: `, error);
      throw new Error(`Error fetching ${section} - ${error.message}`);
    }
  } else {
    console.log('Using mock data');
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
}