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
    const response = await axios.get(config.GetBeneficiaries);
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

export const addBeneficiary = async (beneficiaryData) => {
  try {
    const formData = new FormData();
    for (const key in beneficiaryData) {
      if (beneficiaryData.hasOwnProperty(key)) {
        formData.append(key, beneficiaryData[key]);
      }
    }
  
    const response = await axios.post(config.AddBeneficiary, formData, {
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
