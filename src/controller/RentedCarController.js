import { fetchRentedCars } from '../models/RentedCarModel';

export const getRentedCars = async () => {
  try {
    const rentedCars = await fetchRentedCars();
    return rentedCars;
  } catch (error) {
    console.error("There was an error in the controller!", error);
    return [];
  }
};
