import axios from 'axios';
import { Tenant } from '../models/tenantModel';

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


export const addTenants = async (formData) => {
  try {
    const response = await fetch(config.Tenant, {
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


export const getTenants = async () => {
  try {
    const response = await axios.get(config.Tenant, {
      headers: {
        'Accept': 'application/json',
      },
    });

    return response.data.map(tenantData => new Tenant(tenantData));

  } catch (error) {
    console.error('There was an error fetching the tenants!', error);
    throw error;
  }
};

export const getTenantById = async (idNumber) => {
  try {
    const response = await axios.get(`${config.Tenant}?id_number=${idNumber}`, {
      headers: {
        'Accept': 'application/json',
      },
    });

    return new Tenant(response.data);

  } catch (error) {
    console.error('There was an error fetching the tenant by ID!', error);
    throw error;
  }
};


export const getAccountStatmentById = async(tenantId, startDate, endDate) => {
  try {
    const response = await axios.get(config.Tenant, {
      params: {
        tenant_id: tenantId,
        start_date: startDate,
        end_date: endDate,
      },
    });
    if (response.data.message === "No contracts found") {
      return []; 
    }
    
    return response.data;
  } catch (error) {
    console.error("There was an error fetching the contracts by tenant ID!", error);
    throw error;
  }
};

export const deleteTenantById = async (tenantId) => {
  try {
    const response = await axios.delete(`${config.Tenant}`, {
      params: {
        tenant_id: tenantId,
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

export const updateTenant = async (formData) => {
  try { 
    const payload = {
      id_number: formData.get('id_number'),
      tenant_name: formData.get('tenant_name'),
      address: formData.get('address'),
      phone_number: formData.get('phone_number'),
      blood_type: formData.get('blood_type'),
      birth_date: formData.get('birth_date'),
      license_number: formData.get('license_number'),
      license_start_date: formData.get('license_start_date'),
      license_end_date: formData.get('license_end_date'),
    };

    if (formData.get('id_image')) {
      payload.id_image = await convertFileToBase64(formData.get('id_image'));
    }

    if (formData.get('license_image')) {
      payload.license_image = await convertFileToBase64(formData.get('license_image'));
    }
    const response = await axios.put(`${config.Tenant}`, payload, {
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

const convertFileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};
