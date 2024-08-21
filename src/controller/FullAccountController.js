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


export const getFullAccountStatment = async(startDate, endDate) => {
  try {
    const response = await axios.get(config.Financial, {
      params: {
        start_date: startDate,
        end_date: endDate,
      },
    });
    if (response.data.message === "Not found") {
      return []; 
    }
    
    return response.data;
  } catch (error) {
    console.error("There was an error fetching the contracts by tenant ID!", error);
    throw error;
  }
};

