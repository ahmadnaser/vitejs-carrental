import axios from 'axios';
import { Car } from '../models/CarModel';

const API_URL = 'http://localhost/CarRentalSystem/get_cars.php';

export const getCars = async () => {
  try {
    const response = await axios.get(API_URL);
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
