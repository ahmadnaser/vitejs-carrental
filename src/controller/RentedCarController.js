import axios from 'axios';
import { ContractView } from '../models/ContractViewModel';
import { Contract } from '../models/Contract';

const API_URL = 'http://localhost/CarRentalSystem/fetch_rental_cars.php';
const ADD_API_URL = 'http://localhost/CarRentalSystem/add_rental_contract.php';
export const getContracts = async () => {
  try {
    const response = await axios.get(API_URL);
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

export const addContract = async (formData) => {
  
  try {
    const response = await fetch(ADD_API_URL, {
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
   
    return { success: false, message: 'An unexpected error occurred' };
  }
};
