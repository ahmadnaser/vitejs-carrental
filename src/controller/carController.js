import axios from 'axios';
import { Car } from '../models/CarModel';

async function loadConfig() {
  const config = await import('../../config.json', {
    assert: { type: 'json' }
  });
  return config.default;
}

let config;

async function initializeConfig() {
  config = await loadConfig();
}

initializeConfig().catch(error => {
  console.error("Failed to load configuration:", error);
});

export const getCars = async () => {
  try {
    const response = await axios.get(`${config.Car}?endpoint=list_vehicles`);
    return response.data.map(car => 
      new Car(
        car.vehicle_id,
        car.make,
        car.model,
        car.year,
        car.color,
        car.status,
        car.mileage,
        car.last_oil_change_miles,
        car.last_oil_change_date,
        car.license_expiry_date,
        car.insurance_expiry_date,
        car.change_oil_every_month,
        car.change_oil_every_km,
        car.insurance_image,
        car.license_image,
        car.active
      )
    );
  } catch (error) {
    console.error("There was an error fetching the cars!", error);
    throw error;
  }
};

export const getCarById = async (vehicle_id) => {
  try {
    const response = await axios.get(`${config.Car}?endpoint=get_vehicle_by_id`, {
      params: { vehicle_id }
    });
    const car = response.data;
    return new Car(
      car.vehicle_id,
        car.make,
        car.model,
        car.year,
        car.color,
        car.status,
        car.mileage,
        car.last_oil_change_miles,
        car.last_oil_change_date,
        car.license_expiry_date,
        car.insurance_expiry_date,
        car.change_oil_every_month,
        car.change_oil_every_km,
        car.insurance_image,
        car.license_image,
        car.active
    );
  } catch (error) {
    console.error("There was an error fetching the car!", error);
    throw error;
  }
};

export const getAvailableCars = async (startDate, endDate) => {
  try {
    const response = await axios.get(`${config.Car}?endpoint=get_available_vehicles`, {
      params: { start_date: startDate, end_date: endDate }
    });
    return response.data.map(car => 
      new Car(
        car.vehicle_id,
        car.make,
        car.model,
        car.year,
        car.color,
        car.status,
        car.mileage,
        car.last_oil_change_miles,
        car.last_oil_change_date,
        car.license_expiry_date,
        car.insurance_expiry_date,
        car.change_oil_every_month,
        car.change_oil_every_km,
        car.insurance_image,
        car.license_image,
        car.active
      )
    );
  } catch (error) {
    console.error("There was an error fetching the available cars!", error);
    throw error;
  }
};


export const getAllCarsInMaintenance = async (startDate, endDate) => {
  try {
    const response = await axios.get(config.Car, {
      params: { start_date: startDate, end_date: endDate }
    });
    return response.data.map(car => 
      new Car(
        car.vehicle_id,
        car.make,
        car.model,
        car.year,
        car.color,
        car.status,
        car.mileage,
        car.last_oil_change_miles,
        car.last_oil_change_date,
        car.license_expiry_date,
        car.insurance_expiry_date,
        car.change_oil_every_month,
        car.change_oil_every_km,
        car.insurance_image,
        car.license_image,
        car.active
      )
    );
  } catch (error) {
    console.error("There was an error fetching the available cars!", error);
    throw error;
  }
};

export const AddCar = async (formData) => {
  
  try {
    const response = await fetch(`${config.Car}?endpoint=add_vehicle`, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json',
      },
    });

    let responseData;

    try {
      responseData = await response.json();
    } catch (jsonError) {
      return { success: false, message: 'Invalid response format from server' };
    }

    if (!response.ok) {
      const errorMessage = responseData?.message || 'An error occurred while processing the request.';
      return { success: false, message: errorMessage };
    }

    return { success: true, message: responseData.message };

  } catch (error) {
    return { success: false, message: `Network or server error: ${error.message}` };
  }
};
