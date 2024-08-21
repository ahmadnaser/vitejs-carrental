import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Select from 'react-select';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/themes/airbnb.css';
import { getCars } from '../../../controller/CarController';
import { getConfigCode } from '../../../controller/CodeController';

const CarAccountStatementForm = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    car_id: '',
    start_date: '',
    end_date: '',
  });
  const [status, setStatus] = useState(null);
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [errors, setErrors] = useState({});
  const [retrievedCode, setRetrievedCode] = useState(''); 
  const [enteredCode, setEnteredCode] = useState('');

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const carsList = await getCars(); 
        setCars(carsList);
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };
    fetchCars();

    const fetchConfigCode = async () => {
      try {
        const [config] = await getConfigCode();
        setRetrievedCode(config.code);
      } catch (error) {
        console.error('Error fetching config code:', error);
      }
    };
    fetchConfigCode();

    flatpickr('#from-date', {
      dateFormat: 'Y-m-d',
      onChange: (selectedDates, dateStr) => {
        setFormData(prevFormData => ({
          ...prevFormData,
          start_date: dateStr || ''
        }));
      }
    });

    flatpickr('#to-date', {
      dateFormat: 'Y-m-d',
      onChange: (selectedDates, dateStr) => {
        setFormData(prevFormData => ({
          ...prevFormData,
          end_date: dateStr || ''
        }));
      }
    });
  }, []);

  const carOptions = cars.map(car => ({
    value: car.id,
    label: `${car.make} ${car.model} - ${car.vehicle_id}`
  }));

  const handleCarChange = (selectedOption) => {
    setSelectedCar(selectedOption);
    setFormData(prevFormData => ({
      ...prevFormData,
      car_id: selectedOption ? selectedOption.value : ''
    }));
  };

  const handleCodeChange = (event) => {
    setEnteredCode(event.target.value);
  };

  const handleNavigation = (path) => {
    const validationErrors = {};
    if (!formData.car_id.trim()) validationErrors.car_id = t('Car is required.');
    if (enteredCode !== retrievedCode) validationErrors.code = t('The code you entered is incorrect.');

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    navigate(path, { state: formData });
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
    <div className={`flex flex-col items-center min-h-screen bg-bodyBg-color text-heading-color ${i18n.language === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className={`w-full ${i18n.language === 'ar' ? 'text-right' : 'text-left'} p-10 mt-20 mb-10`}>
        <h1 className="text-3xl font-bold text-secondary-color">{t('Car Statement')}</h1>
      </div>

      <form className={`w-full ${i18n.language === 'ar' ? 'text-right' : 'text-left'} p-10 mt-15 mb-10 max-w-md mx-auto`}>
        <div className="mb-5">
          <label htmlFor="car" className="block mb-2 text-sm font-medium">{t('Car')}</label>
          <div className="relative max-w-sm">
            <Select
              id="cars"
              value={selectedCar}
              onChange={handleCarChange}
              options={carOptions}
              placeholder={t('Select Car')}
              className="rounded-none text-gray-900 focus:outline-none focus:border-secondary-color focus:ring focus:ring-secondary-color focus:ring-opacity-100 text-sm block dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              isDisabled={false}
              styles={customStyles}
              required
            />
            {errors.car_id && <span className="text-red-500 mt-2 text-sm">{errors.car_id}</span>}
          </div>
        </div>

        <div className="mb-5">
          <label htmlFor="from-date" className="block mb-2 text-sm font-medium">{t('From Date')}</label>
          <input id="from-date" name="start_date" type="text" value={formData.start_date} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={t('Select date or leave it blank')} readOnly />
          {errors.start_date && <span className="text-red-500 mt-2 text-sm">{errors.start_date}</span>}
        </div>

        <div className="mb-5">
          <label htmlFor="to-date" className="block mb-2 text-sm font-medium">{t('To Date')}</label>
          <input id="to-date" name="end_date" value={formData.end_date} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={t('Select date or leave it blank')} />
          {errors.end_date && <span className="text-red-500 mt-2 text-sm">{errors.end_date}</span>}
        </div>

        <div className="mb-5">
          <label htmlFor="code" className="block mb-2 text-sm font-medium">{t('Code')}</label>
          <input
            type="password"
            id="code"
            value={enteredCode}
            onChange={handleCodeChange}
            className="rounded-lg text-gray-900 focus:outline-none focus:border-secondary-color focus:ring focus:ring-secondary-color focus:ring-opacity-100 text-sm block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder={t('Code')}
            required
          />
          {errors.code && <span className="text-red-500 mt-2 text-sm">{errors.code}</span>}
        </div>

        <div className="mb-5 mt-10 flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
          <button
            type="button"
            onClick={() => handleNavigation('/reports/car-statement/expenses-statement')}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {status === 'loading' ? t('Submitting...') : t('Car Expense')}
          </button>
          <button
            type="button"
            onClick={() => handleNavigation('/reports/customer-statement/contract')}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {status === 'loading' ? t('Submitting...') : t('Account Statement')}
          </button>
          <button
            type="button"
            onClick={() => handleNavigation('/reports/customer-statement/movements')}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {status === 'loading' ? t('Submitting...') : t('Car Movements')}
          </button>
        </div>

        {status === 'success' && (
          <div className="text-green-500">
            {t('Car Statement generated successfully!')}
          </div>
        )}
        {status === 'error' && (
          <div className="text-red-500">
            {t('An error occurred. Please try again.')}
          </div>
        )}
      </form>
    </div>
  );
};

export default CarAccountStatementForm;
