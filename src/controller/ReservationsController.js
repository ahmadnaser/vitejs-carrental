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

    return { success: true, message: responseData?.message };

  } catch (error) {
    return { success: false, message: `Network or server error: ${error.message}` };
  }
};

export const getReservationById = async (reservation_id) => {
  try {
    const response = await axios.get(config.Reservation, {
      params: {
        reservation_id: reservation_id,
      },
    });
    if (response.data.message === "No contracts found") {
      console.warn("No contracts found for the given criteria.");
      return []; 
    }
    
    return response.data;
  } catch (error) {
    console.error("There was an error fetching the contracts by tenant ID!", error);
    throw error;
  }
};

export const getReservationByVehicleId = async (vehicle_id) => {
  try {
    const response = await axios.get(config.Reservation, {
      params: {
        vehicle_id: vehicle_id,
      },
    });
    if (response.data.message === "No contracts found") {
      console.warn("No contracts found for the given criteria.");
      return []; 
    }
    
    return response.data;
  } catch (error) {
    console.error("There was an error fetching the contracts by vehicle ID!", error);
    throw error;
  }
};

export const updateEndDate = async (reservation_id, endDate = null) => {
  try {
    
    const payload = { reservation_id: reservation_id, end_date: endDate };

    const response = await axios.put(`${config.Reservation}`, payload, {
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

export const updateReservation = async (reservationId, formData) => {
  try {
  
    const payload = {
      reservation_id: reservationId,
      tenant_id: formData.tenant_id,
      vehicle_id: formData.vehicle_id,
      start_date: formData.start_date,
      end_date: formData.end_date,
      price_perday: formData.price_perday,
      total_amount: formData.total_amount,
      second_driver_id: formData.second_driver_id, 
    };
    const response = await axios.put(`${config.Reservation}`, payload, {
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

export const deleteReservationById = async (reservationId) => {
  try {
    const response = await axios.delete(`${config.Reservation}`, {
      params: {
        reservation_id: reservationId,
      },
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.status === 200) {
      throw new Error('Failed to delete the tenant');
    }

    return { success: true, message: 'Tenant deleted successfully' };

  } catch (error) {
    console.error('There was an error deleting the tenant!', error);
    return { success: false, message: `Error: ${error.message}` };
  }
};