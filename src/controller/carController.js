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
        car.insurance_start_date,
        car.license_start_date,
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
        car.insurance_start_date,
        car.license_start_date,
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
        car.insurance_start_date,
        car.license_start_date,
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
        car.insurance_start_date,
        car.license_start_date,
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


export const deleteCarById = async (carId) => {
  try {
    const response = await axios.delete(`${config.Car}`, {
      params: {
        vehicle_id: carId,
      },
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.status === 200) {
      throw new Error('Failed to delete the tenant');
    }

    return { success: true, message: 'Tenant deleted successfully' };

  } catch (error) {
    console.error('There was an error deleting the tenant!', error);
    return { success: false, message: `Error: ${error.message}` };
  }
};

export const updateCar = async (form) => {
  try {
    console.log('FormData to be sent:', form);

    const payload = {
      vehicle_id: form.get('vehicle_id'),
      make: form.get('make'),
      model: form.get('model'),
      year: form.get('year'),
      color: form.get('color'),
      mileage: form.get('mileage'),
      last_oil_change_miles: form.get('last_oil_change_miles'),
      last_oil_change_date: form.get('last_oil_change_date'),
      license_start_date: form.get('license_start_date'),
      insurance_start_date: form.get('insurance_start_date'),
      license_expiry_date: form.get('license_expiry_date'),
      insurance_expiry_date: form.get('insurance_expiry_date'),
      change_oil_every_km: form.get('change_oil_every_km'),
      change_oil_every_month: form.get('change_oil_every_month'),
      active: form.get('active') === '1' || form.get('active') === true,
    };

    if (form.get('license_image')) {
      payload.license_image = await convertFileToBase64(form.get('license_image'));
    }
    if (form.get('insurance_image')) {
      payload.insurance_image = await convertFileToBase64(form.get('insurance_image'));
    }

    console.log('Payload to be sent:', payload);

    const response = await axios.put(`${config.Car}`, payload, {
      headers: { 'Content-Type': 'application/json' },
    });

    return { success: true, message: response.data.message };
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
    return { success: false, message: errorMessage };
  }
};

const convertFileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};
