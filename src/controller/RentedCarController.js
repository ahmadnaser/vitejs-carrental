import axios from 'axios';
import { Contract } from '../models/ContractModel';

const API_URL = 'http://localhost/CarRentalSystem/fetch_rental_cars.php';

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
        contract.payment_status
      )
    );
  } catch (error) {
    console.error("There was an error fetching the contracts!", error);
    throw error;
  }
};
