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
    const response = await axios.get(config.Reservation);
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
  try {
    const response = await fetch(config.Reservation, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json',
      },
    });
    
    let responseData;

    try {
      responseData = await response.data;
    } catch (jsonError) {
      return { success: false, message: 'Invalid response format from server' };
    }

    if (response.status === 409) {
      return { success: false, message: 'Car is not available for the selected dates' };
    }

    if (!response.ok) {
      const errorMessage = responseData?.message || 'An error occurred while processing the request.';
      return { success: false, message: errorMessage };
    }

    return { success: true, message: responseData.message };

  } catch (error) {
    return { success: false, message: `Network or server error: ${error.message}` };
  }
};

