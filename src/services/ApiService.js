export const fetchSection = async (section) => {
  try {
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
}