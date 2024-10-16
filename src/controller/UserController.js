import axios from 'axios';


const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_KEY = import.meta.env.VITE_SECRET_API_KEY;

console.log('BASE_URL:', BASE_URL);
console.log('API_KEY:', API_KEY);

async function deleteUserByPhoneEmail(phone, email, password) {
  try {
    const response = await axios.delete(`${BASE_URL}/users/deleteUserByPhoneEmail`, {
      headers: {
        'x-api-key': API_KEY,  
        'Content-Type': 'application/json'
      },
      data: { phone, email, password }  
    });


    if (response.data.success) {
      return { success: true, message: response.data.message };
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
}


export default deleteUserByPhoneEmail;
