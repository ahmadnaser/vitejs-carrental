import axios from 'axios';
import { Tenant } from '../models/tenantModel';

async function loadConfig() {
  const config = await import('../../config.json', {
    assert: { type: 'json' }
  });
  return config.default;
}
const config = await loadConfig();

export const addTenants = async (formData) => {
  const tenant = new Tenant(formData);
  
  const form = new FormData();
  for (const key in tenant) {
    form.append(key, tenant[key]);
  }

  try {
    const response = await axios.post(config.AddTenant, form, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    });

    return { success: true, message: response.data.message };

  } catch (error) {
    const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
    return { success: false, message: errorMessage };
  }
};

export const getTenants = async () => {
  try {
    const response = await axios.get(config.GetTenants, {
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
    const response = await axios.get(`${config.GetTenantsById}?id_number=${idNumber}`, {
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
    const response = await axios.get(config.GetAccountStatment, {
      params: {
        tenant_id: tenantId,
        start_date: startDate,
        end_date: endDate,
      },
    });
    if (response.data.message === "No contracts found") {
      console.warn("No contracts found for the given criteria.");
      return []; 
    }
    
    return response.data;
  } catch (error) {
    console.error("There was an error fetching the contracts by tenant ID!", error);
    throw error;
  }
};