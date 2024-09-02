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
    const response = await axios.get(config.Maintenance);

    return response.data.map((maintenance) => new CarMaintenance({
      maintenance_id: maintenance.maintenance_id,
      vehicle_id: maintenance.vehicle_id,
      make: maintenance.make,
      model: maintenance.model,
      maintenance_date: maintenance.maintenance_date,
      details: maintenance.details,
      cost: maintenance.cost,
      trader_id: maintenance.trader_id,
      spare_parts: maintenance.spare_parts,
      spare_parts_price: maintenance.spare_parts_price,
      car_mileage: maintenance.car_mileage,
      garage_id: maintenance.garage_id,
      garage_expensese_id: maintenance.garage_expensese_id,
      spare_part_expensese_id: maintenance.spare_part_expensese_id,
      garage_name: maintenance.garage_name,
      trader_name: maintenance.trader_name,
      garage_expenses_amount: maintenance.garage_expenses_amount,
      spare_parts_expenses_amount: maintenance.spare_parts_expenses_amount,
      total_expenses: maintenance.total_expenses,
    }));
    
  } catch (error) {
    console.error('Error fetching maintenance records:', error);
    throw error;
  }
};


export const getMaintenanceByVehicleId = async (vehicleId) => {
  try {
    const response = await axios.get(`${config.Maintenance}`, {
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
      trader_id: maintenance.trader_id,
      spare_parts: maintenance.spare_parts,
      spare_parts_price: maintenance.spare_parts_price,
      car_mileage: maintenance.car_mileage,
      garage_id: maintenance.garage_id,
      garage_expensese_id: maintenance.garage_expensese_id,
      spare_part_expensese_id: maintenance.spare_part_expensese_id,
      garage_name: maintenance.garage_name,
      trader_name: maintenance.trader_name,
      garage_expenses_amount: maintenance.garage_expenses_amount,
      spare_parts_expenses_amount: maintenance.spare_parts_expenses_amount,
      total_expenses: maintenance.total_expenses,
    }));
    
  } catch (error) {
    console.error('Error fetching maintenance records by vehicle ID:', error);
    throw error;
  }
};

export const getMaintenanceByGarageId = async (garageId, startDate, endDate) => {
  try {
    const response = await axios.get(`${config.Maintenance}`, {
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
      trader_id: maintenance.trader_id,
      spare_parts: maintenance.spare_parts,
      spare_parts_price: maintenance.spare_parts_price,
      car_mileage: maintenance.car_mileage,
      garage_id: maintenance.garage_id,
      garage_expensese_id: maintenance.garage_expensese_id,
      spare_part_expensese_id: maintenance.spare_part_expensese_id,
      garage_name: maintenance.garage_name,
      trader_name: maintenance.trader_name,
      garage_expenses_amount: maintenance.garage_expenses_amount,
      spare_parts_expenses_amount: maintenance.spare_parts_expenses_amount,
      total_expenses: maintenance.total_expenses,
    }));
  } catch (error) {
    console.error('Error fetching maintenance records by garage ID:', error);
    throw error;
  }
};

export const getMaintenanceByTraderId = async (traderId, startDate, endDate) => {
  try {
    const response = await axios.get(`${config.Maintenance}`, {
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
      trader_id: maintenance.trader_id,
      spare_parts: maintenance.spare_parts,
      spare_parts_price: maintenance.spare_parts_price,
      car_mileage: maintenance.car_mileage,
      garage_id: maintenance.garage_id,
      garage_expensese_id: maintenance.garage_expensese_id,
      spare_part_expensese_id: maintenance.spare_part_expensese_id,
      garage_name: maintenance.garage_name,
      trader_name: maintenance.trader_name,
      garage_expenses_amount: maintenance.garage_expenses_amount,
      spare_parts_expenses_amount: maintenance.spare_parts_expenses_amount,
      total_expenses: maintenance.total_expenses,
    }));
  } catch (error) {
    console.error('Error fetching maintenance records by trader ID:', error);
    throw error;
  }
};

export const getMaintenanceById = async (maintenanceId) => {
  try {
    const response = await axios.get(`${config.Maintenance}`, {
      params: { 
        maintenance_id: maintenanceId
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
      trader_id: maintenance.trader_id,
      spare_parts: maintenance.spare_parts,
      spare_parts_price: maintenance.spare_parts_price,
      car_mileage: maintenance.car_mileage,
      garage_id: maintenance.garage_id,
      garage_expensese_id: maintenance.garage_expensese_id,
      spare_part_expensese_id: maintenance.spare_part_expensese_id,
      garage_name: maintenance.garage_name,
      trader_name: maintenance.trader_name,
      garage_expenses_amount: maintenance.garage_expenses_amount,
      spare_parts_expenses_amount: maintenance.spare_parts_expenses_amount,
      total_expenses: maintenance.total_expenses,
    }));
  } catch (error) {
    console.error('Error fetching maintenance records by ID:', error);
    throw error;
  }
};

export const addMaintenance = async (formData) => {
  try {
    const response = await fetch(config.Maintenance, {
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
export const deleteMaintenanceById = async (maintenanceId) => {
  try {
    const response = await axios.delete(`${config.Maintenance}`, {
      params: {
        maintenance_id: maintenanceId,
      },
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.status === 200) {
      throw new Error('Failed to delete the tenant');
    }

    return { success: true, message: 'Maintenance deleted successfully' };

  } catch (error) {
    console.error('There was an error deleting the tenant!', error);
    return { success: false, message: `Error: ${error.message}` };
  }
};

export const updateMaintenance = async (formData) => {
  try {
    const payload = {
      maintenance_id: formData.get('maintenance_id'),
      vehicle_id: formData.get('vehicle_id'),
      maintenance_date: formData.get('maintenance_date'),
      details: formData.get('details'),
      cost: formData.get('cost'),
      trader_id: formData.get('trader_id'),
      trader_name: formData.get('trader_name'),
      spare_parts: formData.get('spare_parts'),
      spare_parts_price: formData.get('spare_parts_price'),
      garage_id: formData.get('garage_id'),
      garage_name: formData.get('garage_name'),
      car_mileage: formData.get('car_mileage'),
    };

    const response = await axios.put(`${config.Maintenance}`, payload, {
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