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

export const getBlackList = async () => {
  try {
    const response = await axios.get(config.BlackList);
    return response.data.map(blacklist => ({
        black_list_id: blacklist.black_list_id,
        id_number: blacklist.id_number,
        company: blacklist.company,
        address: blacklist.address,
        note: blacklist.note
    }));
  } catch (error) {
    console.error('Error fetching blacklist:', error);
    throw error;
  }
};

export const addToBlackList = async (blacklistData) => {
  try {
    const formData = new FormData();
    for (const key in blacklistData) {
      if (blacklistData.hasOwnProperty(key)) {
        formData.append(key, blacklistData[key]);
      }
    }
  
    const response = await axios.post(config.BlackList, formData, {
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
