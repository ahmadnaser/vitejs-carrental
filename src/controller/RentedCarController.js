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
