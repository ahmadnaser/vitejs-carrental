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


export const addPayment = async (formData) => {  
  try {
    const response = await fetch(config.Payment, {
      method: 'POST',
      body: formData,
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
    return { success: false, message: error.message };
  }
};

export const getPayments = async () => {
  try {
    const response = await axios.get(config.Payment);
    return response.data
  
  } catch (error) {
    console.error("There was an error fetching the payment!", error);
    throw error;
  }
};


export const geBankCheckById = async (check_id) => {
  try {
    const response = await axios.get(config.Payment, {
      params: { check_id }
    });
    const check = response.data;
    return check;
  } catch (error) {
    console.error("There was an error fetching the garage!", error);
    throw error;
  }
};