import axios from 'axios';
import { CarMaintenance } from '../models/CarMaintenanceModel';

async function loadConfig() {
  try {
    const config = await import('../../config.json', {
      assert: { type: 'json' },
    });
    return config.default;
  } catch (error) {
    console.error('Error loading configuration:', error);
    throw error;
  }
}

const configPromise = loadConfig();

export const getMaintenanceRecords = async () => {
  try {
    const config = await configPromise;
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
    const config = await configPromise;
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

export const addMaintenance = async (formData) => {
  try {
    const config = await configPromise;
    const response = await fetch(config.AddMaintenance, {
      method: 'POST',
      body: formData,
      headers: { Accept: 'application/json' },
    });

    const responseData = await response.json(); // Directly parse JSON

    if (!response.ok) {
      return { success: false, message: responseData.message };
    }

    return { success: true, message: responseData.message };
  } catch (error) {
    console.error('Error adding maintenance record:', error);
    return { success: false, message: error.message };
  }
};
