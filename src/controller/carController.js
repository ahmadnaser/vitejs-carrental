import axios from 'axios';
import { Car } from '../models/CarModel';
import { CarMaintenance } from '../models/CarMaintenanceModel';

async function loadConfig() {
  const config = await import('../../config.json', {
    assert: { type: 'json' }
  });
  return config.default;
}
const config = await loadConfig();

export const getCars = async () => {
  try {
    const response = await axios.get(config.GetCars);
    return response.data.map(car => 
      new Car(
        car.vehicle_id,
        car.make,
        car.model,
        car.year,
        car.color,
        car.rental_rate,
        car.status,
        car.category,
        car.mileage,
        car.price_perday,
        car.last_oil_change_miles,
        car.last_oil_change_date,
        car.license_expiry_date,
        car.insurance_expiry_date,
        car.change_oil_every_month,
        car.change_oil_every_km
      )
    );
  } catch (error) {
    console.error("There was an error fetching the cars!", error);
    throw error;
  }
};

export const getCarById = async (vehicle_id) => {
  try {
    const response = await axios.get(config.GetCarsById, {
      params: { vehicle_id }
    });
    const car = response.data;
    return new Car(
      car.vehicle_id,
      car.make,
      car.model,
      car.year,
      car.color,
      car.rental_rate,
      car.status,
      car.category,
      car.mileage,
      car.price_perday,
      car.last_oil_change_miles,
      car.last_oil_change_date,
      car.license_expiry_date,
      car.insurance_expiry_date,
      car.change_oil_every_month,
      car.change_oil_every_km
    );
  } catch (error) {
    console.error("There was an error fetching the car!", error);
    throw error;
  }
};

export const getAvailableCars = async (startDate, endDate) => {
  try {
    const response = await axios.get(config.GetAvailableCars, {
      params: { start_date: startDate, end_date: endDate }
    });
    return response.data.map(car => 
      new Car(
        car.vehicle_id,
        car.make,
        car.model,
        car.year,
        car.color,
        car.rental_rate,
        car.status,
        car.category,
        car.mileage,
        car.price_perday,
        car.last_oil_chnage_miles,
        car.last_oil_change_date,
        car.license_expiry_date,
        car.insurance_expiry_date,
        car.change_oil_every_month,
        car.change_oil_every_km
      )
    );
  } catch (error) {
    console.error("There was an error fetching the available cars!", error);
    throw error;
  }
};


export const getAllCarsInMaintenance = async (startDate, endDate) => {
  try {
    const response = await axios.get(config.GetAllCarsInMaintenance, {
      params: { start_date: startDate, end_date: endDate }
    });
    return response.data.map(car => 
      new Car(
        car.vehicle_id,
        car.make,
        car.model,
        car.year,
        car.color,
        car.rental_rate,
        car.status,
        car.category,
        car.mileage,
        car.price_perday,
        car.last_oil_chnage_miles,
        car.last_oil_change_date,
        car.license_expiry_date,
        car.insurance_expiry_date,
        car.change_oil_every_month,
        car.change_oil_every_km
      )
    );
  } catch (error) {
    console.error("There was an error fetching the available cars!", error);
    throw error;
  }
};

export const addCar = async (formData) => {
  
  const form = new FormData();
  for (const key in formData) {
    form.append(key, formData[key]);
  }

  try {
    const response = await fetch(config.AddCar, {
      method: 'POST',
      body: form,
      headers: {
        'Accept': 'application/json',
      },
    });

    const responseData = await response.json();

    if (!response.ok) {
      return { success: false, message: responseData.message };
    }

    return { success: true, message: responseData.message };

  } catch (error) {
    return { success: false, message: 'An unexpected error occurred' };
  }
};
