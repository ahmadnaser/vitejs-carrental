import axios from 'axios';

const API_URL = 'http://localhost/CarRentalSystem/fetch_rental_cars.php';

export const fetchRentedCars = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("There was an error fetching the data!", error);
    throw error;
  }
};
