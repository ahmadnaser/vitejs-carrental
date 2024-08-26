import axios from 'axios';
import { User } from '../models/UserModel';

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

export const getUserByEmail = async (email) => {
  try {
    const response = await axios.get(config.User, {
      params: { email }
    });
    const user = response.data;
    return new User(user.email, user.password, user.name, user.phone, user.address, user.role);
  } catch (error) {
    console.error('Error fetching user by email:', error);
    throw error;
  }
};


export const updateUserDetails = async (
  email,
  new_name = null,
  new_address = null,
  old_password = null,
  new_password = null
) => {
  try {
    const payload = { email };

    if (new_name) {
      payload.new_name = new_name;
    }

    if (new_address) {
      payload.new_address = new_address;
    }

    if (old_password && new_password) {
      payload.old_password = old_password;
      payload.new_password = new_password;
    }

  

    const response = await axios.put(`${config.User}`, payload, {
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
