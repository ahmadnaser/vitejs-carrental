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


export const setLogin = async (email, password) => {
    try {
      const response = await axios.post(config.Login, {
        email: email,  
        password: password  
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status === 200) {
        const { jwt, role } = response.data;
  
        localStorage.setItem('token', jwt);
        localStorage.setItem('role', role);
        
        return { success: true, message: 'Login successful', role };
    } else {
          console.log('xxxxxxxxxxx');
        return { success: false, message: 'Login failed' };
      }
    } catch (error) {
      console.error('Error logging in:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'An error occurred during login' 
      };
    }
  };
  
  


