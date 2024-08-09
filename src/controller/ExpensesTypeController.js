import axios from 'axios';
import { ExpenseType } from '../models/ExpensesTypeModel';

async function loadConfig() {
  const config = await import('../../config.json', {
    assert: { type: 'json' }
  });
  return config.default;
}

const config = await loadConfig();

export const getExpensesTypes = async () => {
  try {
   
    const response = await axios.get(config.GetExpensesTypes);
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
  
    const response = await axios.post(config.AddExpenseType, formData, {
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
