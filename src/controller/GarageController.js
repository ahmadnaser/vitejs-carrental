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
    const response = await axios.get(config.GetGarages);
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
    const response = await axios.get(config.GetGaragesById, {
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
    const response = await fetch(config.AddGarage, {
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
