import axios from 'axios';
import { Garage } from '../models/GarageModel';

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

export const getGarages = async () => {
  try {
    const response = await axios.get(config.Garage);
    return response.data.map(garage => 
      new Garage(
        garage.garage_id,
        garage.name,
        garage.type,
        garage.location,
        garage.contact_info,
        garage.garage_info
      )
    );
  } catch (error) {
    console.error("There was an error fetching the garages!", error);
    throw error;
  }
};

export const getGarageById = async (garage_id) => {
  try {
    const response = await axios.get(config.Garage, {
      params: { garage_id }
    });
    const garage = response.data;
    return new Garage(
      garage.garage_id,
      garage.name,
      garage.type,
      garage.location,
      garage.contact_info,
      garage.garage_info
    );
  } catch (error) {
    console.error("There was an error fetching the garage!", error);
    throw error;
  }
};

export const addGarage = async (formData) => {
  const form = new FormData();
  for (const key in formData) {
    form.append(key, formData[key]);
  }

  try {
    const response = await fetch(config.Garage, {
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

export const updateGarage = async (garage_id,formData) => {
  try {
    const payload = {
      garage_id:garage_id,
      name: formData.name,
      type: formData.type,
      location: formData.location,
      contact_info: formData.contact_info,
      garage_info: formData.garage_info,
    };

    const response = await axios.put(`${config.Garage}`, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return { success: true, message: response.data.message };
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
    return { success: false, message: errorMessage };
  }
};


export const deleteGarageById = async (garage_id) => {
  try {
    const response = await axios.delete(`${config.Garage}`, {
      params: {
        garage_id: garage_id,
      },
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.status === 200) {
      throw new Error('Failed to delete the tenant');
    }

    return { success: true, message: 'Garage deleted successfully' };

  } catch (error) {
    console.error('There was an error deleting the tenant!', error);
    return { success: false, message: `Error: ${error.message}` };
  }
};