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

export const getConfigCode = async () => {
  try {
    const response = await axios.get(config.ConfigCode, {
      headers: {
        'Accept': 'application/json',
      },
    });

    return response.data.map((config) => ({
      id: config.id,
      code: config.code,
    }));
  } catch (error) {
    console.error('Error fetching config codes!', error);
    throw error;
  }
};
export const updateConfigCode = async (newCode, oldCode) => {
  try {
    const payload = { newCode, oldCode };

    const response = await axios.put(config.ConfigCode, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return {
      success: true,
      message: response.data.message,
    };
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || 'An unexpected error occurred';

    return {
      success: false,
      message: errorMessage,
    };
  }
};
