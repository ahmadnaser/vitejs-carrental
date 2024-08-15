import axios from 'axios';
import { Reservation } from '../models/Reservation';

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

export const getReservations = async () => {
  try {
    const response = await axios.get(config.GetReservations);
    const reservations = response.data.map(
      reservation =>
        new Reservation({
          reservation_id: reservation.reservation_id,
          tenant_id: reservation.tenant_id,
          second_driver_id: reservation.second_driver_id,
          vehicle_id: reservation.vehicle_id,
          start_date: reservation.start_date,
          end_date: reservation.end_date,
          price_perday: reservation.price_perday,
          total_amount: reservation.total_amount,
          amount_paid: reservation.amount_paid,
          status: reservation.status,
        })
    );

    return reservations;
  } catch (error) {
    console.error('There was an error fetching the reservations!', error);
    throw error;
  }
};

export const addReservation = async (formData) => {
  formData.reservation_id = null;
  formData.second_driver_id = null;
  const data = Object.fromEntries(formData.entries());
  const reservation = new Reservation(data);

  console.log('Reservation object:', reservation);

  const form = new FormData();
  for (const key in reservation) {
    if (reservation[key] !== undefined && reservation[key] !== null) {
      form.append(key, reservation[key]);
    }
  }

  console.log('Form data (FormData) to be sent:');
  for (const [key, value] of form.entries()) {
    console.log(`${key}: ${value}`);
  }

  try {
    const response = await fetch(config.AddReservation, {
      method: 'POST',
      body: form,
      headers: {
        'Accept': 'application/json',
      },
    });
    
    const responseData = await response.json();
    
    if (!response.ok) {
      console.log("mmm ",responseData.message);
      return { success: false, message: responseData.message };
    }
    
    return { success: true, message: responseData.message };

  } catch (error) {
    return { success: false, message: 'An unexpected error occurred' };
  }
};