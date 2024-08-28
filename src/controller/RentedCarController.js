import axios from 'axios';

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


export const getContracts = async () => {
  try {
    const response = await axios.get(config.Rental);
    return response.data;
  
  } catch (error) {
    console.error("There was an error fetching the contracts!", error);
    throw error;
  }
};

export const getContractsByTenantId = async (tenantId, startDate, endDate) => {
  try {
    const response = await axios.get(config.Rental, {
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

export const getContractsByRentalId = async (rentalId) => {
  try {
    const response = await axios.get(config.Rental, {
      params: {
        rental_id: rentalId,
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

export const addContract = async (formData) => {  
  try {
    const response = await fetch(config.Rental, {
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

export const updateEndDate = async (rentalId, endDate = null) => {
  try {
    
    const payload = { rental_id: rentalId, end_date: endDate };

    const response = await axios.put(`${config.Rental}`, payload, {
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

export const updateContract = async (rentalId, formData) => {
  try {
  
    const payload = {
      rental_id: rentalId,
      tenant_id: formData.tenant_id,
      vehicle_id: formData.vehicle_id,
      start_date: formData.start_date,
      end_date: formData.end_date,
      price_perday: formData.price_perday,
      total_amount: formData.total_amount,
      amount_paid: formData.amount_paid,
      car_mileage: formData.car_mileage,
      note: formData.note,
      car_condition: formData.car_condition, 
      car_damage: formData.car_damage,        
      second_driver_id: formData.second_driver_id, 
    };
    const response = await axios.put(`${config.Rental}`, payload, {
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

export const deleteContractById = async (rentalId) => {
  try {
    const response = await axios.delete(`${config.Rental}`, {
      params: {
        rental_id: rentalId,
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