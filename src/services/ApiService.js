import { getMockSectionData } from "../util/util";

export const fetchSection = async (section) => {
  try {
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
      return getMockSectionData(section)
    }
  } catch (error) {
    console.warn(`Error caught, returning mock data`);
    return getMockSectionData(section)
  }
}

export const submitOrders = async (orders) => {
  try {
    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/create_order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.EXPO_PUBLIC_API_TOKEN}`,
        'accept': 'application/json'
      },
      body: JSON.stringify(orders)
    });
    return await response.json();
  } catch (error) {
    console.error(`Error submitting order: `, error);
    throw new Error(`Error submitting order - ${error.message}`);
  }
}