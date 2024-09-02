import axios from 'axios';
import { Beneficiary } from '../models/BeneficiaryModel';

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


export const getBeneficiaries = async () => {
  try {
    const response = await axios.get(config.Beneficiary);
    return response.data.map(
      beneficiary => new Beneficiary(
        beneficiary.beneficiary_id, 
        beneficiary.name, 
        beneficiary.contact_info, 
        beneficiary.type
      )
    );
  } catch (error) {
    console.error('Error fetching beneficiaries:', error);
    throw error;
  }
};

export const getBeneficiaryById = async (beneficiary_id) => {
  try {
    const response = await axios.get(config.Beneficiary, {
      params: { beneficiary_id }
    });

    const beneficiaries = response.data;

    return beneficiaries.map(
      beneficiary => new Beneficiary(
        beneficiary.beneficiary_id, 
        beneficiary.name, 
        beneficiary.contact_info, 
        beneficiary.type
      )
    );
  } catch (error) {
    console.error("There was an error fetching the beneficiary!", error);
    throw error;
  }
};


export const addBeneficiary = async (beneficiaryData) => {
  try {
    const formData = new FormData();
    for (const key in beneficiaryData) {
      if (beneficiaryData.hasOwnProperty(key)) {
        formData.append(key, beneficiaryData[key]);
      }
    }
  
    const response = await axios.post(config.Beneficiary, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return { success: true, message: response.data.message };
    
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
    return { success: false, message: errorMessage };
  }
};

export const deleteBeneficiaryById = async (beneficiary_id) => {
  try {
    const response = await axios.delete(`${config.Beneficiary}`, {
      params: {
        beneficiary_id: beneficiary_id,
      },
      headers: {
        'Accept': 'application/json',
      },
    });

    if (response.status !== 200) {
      throw new Error('Failed to delete the beneficiary');
    }

    return { success: true, message: 'Beneficiary deleted successfully' };

  } catch (error) {
    console.error('There was an error deleting the beneficiary!', error);
    return { success: false, message: `Error: ${error.message}` };
  }
};

export const updateBeneficiary = async (beneficiary_id, formData) => {
  try {
    const payload = {
      beneficiary_id: beneficiary_id,
      name: formData.name,
      type: formData.type,
      contact_info: formData.contact_info,
    };

    const response = await axios.put(`${config.Beneficiary}`, payload, {
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