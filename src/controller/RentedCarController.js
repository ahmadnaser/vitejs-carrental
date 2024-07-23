import axios from 'axios';
import { Contract } from '../models/ContractModel';

const API_URL = 'http://localhost/CarRentalSystem/fetch_rental_cars.php';
const ADD_API_URL = 'http://localhost/CarRentalSystem/add_rental_contract.php';
export const getContracts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.map(contract => 
      new Contract(
        contract.rental_id,
        contract.make,
        contract.model,
        contract.customer,
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
  const contract = new Contract(formData);

  const form = new FormData();
  for (const key in contract) {
    form.append(key, contract[key]);
  }

  try {
    const response = await fetch(ADD_API_URL, {
      method: 'POST',
      body: form,
      headers: {
        'Accept': 'application/json',
      },
    });

    const responseData = await response.json();

    if (!response.ok) {
      return { success: false, message: responseData.message };
    }

    return { success: true, message: responseData.message };

  } catch (error) {
    return { success: false, message: 'An unexpected error occurred' };
  }
};
