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