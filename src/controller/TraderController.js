import axios from 'axios';
import { Trader } from '../models/TraderModel';

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


export const getTraders = async () => {
  try {
    const response = await axios.get(config.Trader);
    return response.data.map(
      trader => new Trader(trader.trader_id, trader.name, trader.contact_info, trader.type)
    );
  } catch (error) {
    console.error('Error fetching traders:', error);
    throw error;
  }
};


export const getTraderById = async (trader_id) => {
  try {
    const response = await axios.get(config.Trader,{
      params: { trader_id }
    });
    const trader = response.data;
    return new Trader(trader.trader_id, trader.name, trader.contact_info, trader.type);
  } catch (error) {
    console.error('Error fetching trader by ID:', error);
    throw error;
  }
};


export const addTrader = async (traderData) => {
  try {
    const formData = new FormData();
    for (const key in traderData) {
      if (traderData.hasOwnProperty(key)) {
        formData.append(key, traderData[key]);
      }
    }
  
    const response = await axios.post(config.Trader, formData, {
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

export const deleteTraderById = async (trader_id) => {
  try {
    const response = await axios.delete(`${config.Trader}`, {
      params: {
        trader_id: trader_id,
      },
      headers: {
        'Accept': 'application/json',
      },
    });

    if (response.status !== 200) {
      throw new Error('Failed to delete the trader');
    }

    return { success: true, message: 'Beneficiary deleted successfully' };

  } catch (error) {
    console.error('There was an error deleting the trader!', error);
    return { success: false, message: `Error: ${error.message}` };
  }
};

export const updateTrader = async (trader_id, formData) => {
  try {
    const payload = {
      trader_id: trader_id,
      name: formData.name,
      type: formData.type,
      contact_info: formData.contact_info,
    };

    const response = await axios.put(`${config.Trader}`, payload, {
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
