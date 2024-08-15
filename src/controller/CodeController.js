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

export const updateConfigCode = async (newCode) => {
  try {
    const response = await axios.put(config.ConfigCode, { newCode }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    return response.data.message;
  } catch (error) {
    console.error('Error updating config code!', error);
    throw error;
  }
};
