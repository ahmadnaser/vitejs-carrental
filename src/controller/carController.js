import axios from 'axios';
import { Car } from '../models/CarModel';

const API_URL = 'http://localhost/CarRentalSystem';

export const getCars = async () => {
  try {
    const response = await axios.get(`${API_URL}/get_cars.php`);
    return response.data.map(car => 
      new Car(
        car.vehicle_id,
        car.make,
        car.model,
        car.year,
        car.rental_rate,
        car.status,
        car.category,
        car.mileage
      )
    );
  } catch (error) {
    console.error("There was an error fetching the cars!", error);
    throw error;
  }
};

export const getAvailableCars = async (startDate, endDate) => {
  try {
    const response = await axios.get(`${API_URL}/get_available_cars.php`, {
      params: { start_date: startDate, end_date: endDate }
    });
    return response.data.map(car => 
      new Car(
        car.vehicle_id,
        car.make,
        car.model,
        car.year,
        car.rental_rate,
        car.status,
        car.category,
        car.mileage
      )
    );
  } catch (error) {
    console.error("There was an error fetching the available cars!", error);
    throw error;
  }
};
