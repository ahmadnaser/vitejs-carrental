import axios from 'axios';
import { CarMaintenance } from '../models/CarMaintenanceModel';

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

export const getMaintenanceRecords = async () => {
  try {
    const response = await axios.get(config.GetMaintenance);

    return response.data.map((maintenance) => new CarMaintenance({
      maintenance_id: maintenance.maintenance_id,
      vehicle_id: maintenance.vehicle_id,
      make: maintenance.make, 
      model: maintenance.model, 
      maintenance_date: maintenance.maintenance_date,
      details: maintenance.details,
      cost: maintenance.cost,
      amount_paid: maintenance.amount_paid,
      trader_name: maintenance.trader_name, 
      spare_parts: maintenance.spare_parts,
      spare_parts_price: maintenance.spare_parts_price,
      amount_paid_of_spare_parts: maintenance.amount_paid_of_spare_parts,
      garage_name: maintenance.garage_name, 
    }));
  } catch (error) {
    console.error('Error fetching maintenance records:', error);
    throw error;
  }
};


export const getMaintenanceByVehicleId = async (vehicleId) => {
  try {
    const response = await axios.get(`${config.GetMaintenanceByVehicleId}`, {
      params: { vehicle_id: vehicleId },
    });

    if (response.data.message === 'No maintenance records found') {
      console.warn('No maintenance records found for the given vehicle ID.');
      return [];
    }

    return response.data.map((maintenance) => new CarMaintenance({
      maintenance_id: maintenance.maintenance_id,
      vehicle_id: maintenance.vehicle_id,
      make: maintenance.make, 
      model: maintenance.model, 
      maintenance_date: maintenance.maintenance_date,
      details: maintenance.details,
      cost: maintenance.cost,
      amount_paid: maintenance.amount_paid,
      trader_name: maintenance.trader_name, 
      spare_parts: maintenance.spare_parts,
      spare_parts_price: maintenance.spare_parts_price,
      amount_paid_of_spare_parts: maintenance.amount_paid_of_spare_parts,
      garage_name: maintenance.garage_name, 
    }));
  } catch (error) {
    console.error('Error fetching maintenance records by vehicle ID:', error);
    throw error;
  }
};

export const getMaintenanceByGarageId = async (garageId, startDate, endDate) => {
  try {
    const response = await axios.get(`${config.GetMaintenanceByGarageId}`, {
      params: { 
        garage_id: garageId, 
        start_date: startDate,
        end_date: endDate
      }, 
    });

    if (response.data.message === 'No maintenance records found for the given criteria') {
      console.warn('No maintenance records found for the given criteria.');
      return [];
    }

    return response.data.map((maintenance) => new CarMaintenance({
      maintenance_id: maintenance.maintenance_id,
      vehicle_id: maintenance.vehicle_id,
      make: maintenance.make,
      model: maintenance.model,
      maintenance_date: maintenance.maintenance_date,
      details: maintenance.details,
      cost: maintenance.cost,
      amount_paid: maintenance.amount_paid,
      trader_name: maintenance.trader_name,
      spare_parts: maintenance.spare_parts,
      spare_parts_price: maintenance.spare_parts_price,
      amount_paid_of_spare_parts: maintenance.amount_paid_of_spare_parts,
      garage_name: maintenance.garage_name,
    }));
  } catch (error) {
    console.error('Error fetching maintenance records by garage ID:', error);
    throw error;
  }
};

export const getMaintenanceByTraderId = async (traderId, startDate, endDate) => {
  try {
    const response = await axios.get(`${config.GetMaintenanceByTraderId}`, {
      params: { 
        trader_id: traderId, 
        start_date: startDate,
        end_date: endDate
      }, 
    });

    if (response.data.message === 'No maintenance records found for the given criteria') {
      console.warn('No maintenance records found for the given criteria.');
      return [];
    }

    return response.data.map((maintenance) => new CarMaintenance({
      maintenance_id: maintenance.maintenance_id,
      vehicle_id: maintenance.vehicle_id,
      make: maintenance.make,
      model: maintenance.model,
      maintenance_date: maintenance.maintenance_date,
      details: maintenance.details,
      cost: maintenance.cost,
      amount_paid: maintenance.amount_paid,
      trader_name: maintenance.trader_name,
      spare_parts: maintenance.spare_parts,
      spare_parts_price: maintenance.spare_parts_price,
      amount_paid_of_spare_parts: maintenance.amount_paid_of_spare_parts,
      garage_name: maintenance.garage_name,
    }));
  } catch (error) {
    console.error('Error fetching maintenance records by trader ID:', error);
    throw error;
  }
};

export const addMaintenance = async (formData) => {
  try {
    const response = await fetch(config.AddMaintenance, {
      method: 'POST',
      body: formData,
      headers: { Accept: 'application/json' },
    });

    const responseData = await response.json(); 

    if (!response.ok) {
      return { success: false, message: responseData.message };
    }

    return { success: true, message: responseData.message };
  } catch (error) {
    console.error('Error adding maintenance record:', error);
    return { success: false, message: error.message };
  }
};
