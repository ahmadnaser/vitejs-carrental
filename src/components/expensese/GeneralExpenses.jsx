import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/themes/airbnb.css';
import { getExpensesTypes, addExpense } from '../../controller/ExpensesController'; 
import { useTranslation } from 'react-i18next';

const GeneralExpensesForm = () => {
  const { t, i18n } = useTranslation();
  const [status, setStatus] = useState(null);
  const [formData, setFormData] = useState({
    expense_type_id: '',
    expense_date: new Date().toISOString().split('T')[0],
    amount: '',
    details: '',
  });
  const [expensesTypes, setExpensesTypes] = useState([]);
  const [selectedExpenseType, setSelectedExpenseType] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchExpensesTypes = async () => {
      try {
        const types = await getExpensesTypes();
        setExpensesTypes(types);
      } catch (error) {
        console.error('Error fetching expenses types:', error);
      }
    };

    fetchExpensesTypes();

    flatpickr('#expense-date', {
      dateFormat: 'Y-m-d',
      defaultDate: formData.expense_date,
      onChange: (selectedDates, dateStr) => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          expense_date: dateStr,
        }));
      },
    });
  }, [formData.expense_date]);

  const expenseTypeOptions = expensesTypes.map((type) => ({
    value: type.expense_type_id,
    label: type.type,
  }));

  const handleExpenseTypeChange = (selectedOption) => {
    setSelectedExpenseType(selectedOption);
    setFormData((prevFormData) => ({
      ...prevFormData,
      expense_type_id: selectedOption.value,
    }));
  };

  const convertArabicNumeralsToEnglish = (input) => {
    return input.replace(/[\u0660-\u0669]/g, (c) => c.charCodeAt(0) - 0x0660)
                .replace(/[\u06f0-\u06f9]/g, (c) => c.charCodeAt(0) - 0x06f0);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    const updatedValue = name === 'amount' ? convertArabicNumeralsToEnglish(value) : value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: updatedValue,
    }));
  };

  const handleSubmit = async () => {
    const validationErrors = {};
    if (!formData.expense_type_id) validationErrors.expense_type = t('Expense type is required.');
    if (!formData.amount.trim()) validationErrors.amount = t('Amount is required.');

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    try {
      const response = await addExpense(formData); 
      if (response.success) {
        setStatus('success');
        setFormData({
          expense_type_id: '',
          expense_date: new Date().toISOString().split('T')[0],
          amount: '',
          details: '',
        });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
      console.error('Error adding expense:', error);
    }
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: '#ffffff',
      color: '#000000',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#000000',
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: '#ffffff',
      color: '#000000',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#cccccc' : '#ffffff',
      color: '#000000',
    }),
  };

  return (
    <div
      className={`flex flex-col items-center min-h-screen bg-bodyBg-color text-heading-color ${
        i18n.language === 'ar' ? 'rtl' : 'ltr'
      }`}
    >
      <div
        className={`w-full ${
          i18n.language === 'ar' ? 'text-right' : 'text-left'
        } p-10 mt-20 mb-10`}
      >
        <h1 className="text-3xl font-bold text-secondary-color">
          {t('General Expense')}
        </h1>
      </div>

      <form
        className={`w-full ${
          i18n.language === 'ar' ? 'text-right' : 'text-left'
        } p-10 mt-15 mb-10 max-w-md mx-auto`}
      >
        <div className="mb-5">
          <label htmlFor="expense_type" className="block mb-2 text-sm font-medium">
            {t('Expense Type')}
          </label>
          <div className="relative max-w-sm">
            <Select
              id="expense_type"
              value={selectedExpenseType}
              onChange={handleExpenseTypeChange}
              options={expenseTypeOptions}
              placeholder={t('Select Expense Type')}
              className="rounded-none text-gray-900 focus:outline-none focus:border-secondary-color focus:ring focus:ring-secondary-color focus:ring-opacity-100 text-sm block dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              isDisabled={false}
              styles={customStyles}
              required
            />
            {errors.expense_type && (
              <span className="text-red-500 mt-2 text-sm">{errors.expense_type}</span>
            )}
          </div>
        </div>

        <div className="mb-5">
          <label htmlFor="expense-date" className="block mb-2 text-sm font-medium">
            {t('Date')}
          </label>
          <div className="relative max-w-sm">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
              </svg>
            </div>
            <input
              id="expense-date"
              name="expense_date"
              type="text"
              value={formData.expense_date}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder={t('Select date')}
              readOnly
            />
          </div>
        </div>

        <div className="mb-5">
          <label htmlFor="amount" className="block mb-2 text-sm font-medium">
            {t('Amount')}
          </label>
          <input
            type="text"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
            className="rounded-lg text-gray-900 focus:outline-none focus:border-secondary-color focus:ring focus:ring-secondary-color focus:ring-opacity-100 text-sm block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder={t('Enter amount')}
            required
          />
          {errors.amount && (
            <span className="text-red-500 mt-2 text-sm">{errors.amount}</span>
          )}
        </div>

        <div className="mb-5">
          <label htmlFor="details" className="block mb-2 text-sm font-medium">
            {t('Details')}
          </label>
          <textarea
            id="details"
            name="details"
            value={formData.details}
            onChange={handleInputChange}
            className="rounded-lg text-gray-900 focus:outline-none focus:border-secondary-color focus:ring focus:ring-secondary-color focus:ring-opacity-100 text-sm block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder={t('Enter details (optional)')}
          />
        </div>

        <div className="mb-5 mt-10 flex flex-col items-center justify-center sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
          <button
            type="button"
            onClick={handleSubmit}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {t('Add Expense')}
          </button>
        </div>

        {status === 'success' && (
          <div className="text-green-500 flex items-center justify-center">
            {t('Expense added successfully!')}
          </div>
        )}
        {status === 'error' && (
          <div className="text-red-500 flex items-center justify-center">{t('An error occurred. Please try again.')}</div>
        )}
      </form>
    </div>
  );
};

export default GeneralExpensesForm;
