import axios from 'axios';
import { ExpenseType } from '../models/ExpensesTypeModel';
import { Expense } from '../models/ExpensesModel';

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

export const getExpensesTypes = async () => {
  try {
   
    const response = await axios.get(`${config.Expenses}?endpoint=list_expense_types`);
    return response.data.map(
      expense => new ExpenseType(
        expense.expense_type_id,
        expense.type,
        expense.type_info
      )
    );
  } catch (error) {
    console.error('Error fetching expense types:', error);
    throw error;
  }
};

export const getExpensesTypesById = async (expense_type_id) => {
  try {
   
    const response = await axios.get(`${config.Expenses}?endpoint=get_expense_type_by_id`,{
      params: { expense_type_id }
    });
    return response.data.map(
      expense => new ExpenseType(
        expense.expense_type_id,
        expense.type,
        expense.type_info
      )
    );
  } catch (error) {
    console.error('Error fetching expense types:', error);
    throw error;
  }
};

export const addExpenseType = async (expenseData) => {
  try {
    const formData = new FormData();
    for (const key in expenseData) {
      if (expenseData.hasOwnProperty(key)) {
        formData.append(key, expenseData[key]);
      }
    }
  
    const response = await axios.post(`${config.Expenses}?endpoint=add_expense_type`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return { success: true, message: response.data.message };
    
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
    return { success: false, message: errorMessage };
  }
};

export const addExpense = async (expenseData) => {
  try {
    const formData = new FormData();
    for (const key in expenseData) {
      if (expenseData.hasOwnProperty(key)) {
        formData.append(key, expenseData[key]);
      }
    }
    const response = await axios.post(`${config.Expenses}?endpoint=add_expense`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return { success: true, message: response.data.message };
    
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
    return { success: false, message: errorMessage };
  }
};

export const getExpenses = async () => {
  try {
    const response = await axios.get(`${config.Expenses}?endpoint=list_expenses`);
    return response.data.map(
      expense => new Expense(
        expense.expenses_id,
        expense.expense_type_id,
        expense.expense_type_name,
        expense.expenses_amount,
        expense.expenses_date,
        expense.detail
      )
    );
  } catch (error) {
    console.error('Error fetching expenses:', error);
    throw error;
  }
};


export const deleteExpenseTypeById = async (expense_type_id) => {
  try {
    const response = await axios.delete(`${config.Expenses}`, {
      params: {
        expense_type_id: expense_type_id,
      },
      headers: {
        'Accept': 'application/json',
      },
    });

    if (response.status !== 200) {
      throw new Error('Failed to delete the expense type');
    }

    return { success: true, message: 'Expense type deleted successfully' };

  } catch (error) {
    console.error('There was an error deleting the expense type!', error);
    return { success: false, message: `Error: ${error.message}` };
  }
};

export const updateExpensesType = async (expense_type_id, formData) => {
  try {
    const payload = {
      expense_type_id: expense_type_id,
      type: formData.type,
      type_info: formData.type_info,
    };

    const response = await axios.put(`${config.Expenses}`, payload, {
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
