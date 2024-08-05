import axios from 'axios';
import { ContractView } from '../models/ContractViewModel';

async function loadConfig() {
  const config = await import('../../config.json', {
    assert: { type: 'json' }
  });
  return config.default;
}
const config = await loadConfig(); 

export const getContracts = async () => {
  try {
    const response = await axios.get(config.FetchRentedCarURL);
    return response.data.map(contract => 
      new ContractView(
        contract.rental_id,
        contract.vehicle_id,
        contract.make,
        contract.model,
        contract.customer,
        contract.tenantID,
        contract.start_date,
        contract.end_date,
        contract.end_date_agreed,
        contract.price_perday,
        contract.dayNum,
        contract.total_amount,
        contract.note,
        contract.remainingAmount,
        contract.timeReturned,
      )
    );
  } catch (error) {
    console.error("There was an error fetching the contracts!", error);
    throw error;
  }
};

export const getContractsByTenantId = async (tenantId, startDate, endDate) => {
  try {
    const response = await axios.get(`${config.FetchRentedCarByIdURL}`, {
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
    
    return response.data.map(contract => 
      new ContractView(
        contract.rental_id,
        contract.vehicle_id,
        contract.make,
        contract.model,
        contract.customer,
        contract.tenantID,
        contract.start_date,
        contract.end_date,
        contract.end_date_agreed,
        contract.price_perday,
        contract.dayNum,
        contract.total_amount,
        contract.note,
        contract.remainingAmount,
        contract.timeReturned,
      )
    );
  } catch (error) {
    console.error("There was an error fetching the contracts by tenant ID!", error);
    throw error;
  }
};

export const addContract = async (formData) => {  
  try {
    const response = await fetch(config.AdddRentalContract, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json',
      },
    });

    const responseText = await response.text();  
    const responseData = JSON.parse(responseText);  

    if (!response.ok) {
      return { success: false, message: responseData.message };
    }
  
    return { success: true, message: responseData.message };
  
  } catch (error) {
   
    return { success: false, message: error.message };
  }
};
