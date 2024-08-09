import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import 'flowbite';
import Select from 'react-select';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/themes/airbnb.css';
import { getCars } from '../../controller/carController'; // Assuming there's a controller to fetch cars
import { addMaintenance } from '../../controller/MaintenanceController'; // Assuming there's a controller for maintenance

const AddMaintenanceForm = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    vehicle_id: '',
    maintenance_date: '',
    details: '',
    cost: '',
    amount_paid: '',
    trader: '',
    spare_parts: '',
    spare_parts_price: '',
    amount_paid_of_spare_parts: '',
    garage_id: '',
  });
  const [status, setStatus] = useState(null);
  const [errors, setErrors] = useState({});
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];

    flatpickr('#maintenance-date', {
      dateFormat: 'Y-m-d',
      minDate: today,
      onChange: (selectedDates, dateStr) => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          maintenance_date: dateStr,
        }));
      },
    });
  }, []);

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
  }, []);

  const carOptions = cars.map((car) => ({
    value: car.vehicle_id,
    label: `${car.make} ${car.model} ${car.year} - ${car.vehicle_id}`,
  }));

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleCarChange = (selectedOption) => {
    setSelectedCar(selectedOption);
    setFormData((prevFormData) => ({
      ...prevFormData,
      vehicle_id: selectedOption.value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.maintenance_date) errors.maintenance_date = t('Maintenance date is required');
    if (!formData.vehicle_id) errors.vehicle_id = t('Vehicle is required');
    if (!formData.details) errors.details = t('Details are required');
    if (!formData.cost) errors.cost = t('Cost is required');
    if (!formData.amount_paid) errors.amount_paid = t('Amount paid is required');
    if (!formData.trader) errors.trader = t('Trader is required');
    if (!formData.spare_parts) errors.spare_parts = t('Spare parts details are required');
    if (!formData.spare_parts_price) errors.spare_parts_price = t('Spare parts price is required');
    if (!formData.amount_paid_of_spare_parts) errors.amount_paid_of_spare_parts = t('Amount paid for spare parts is required');
    if (!formData.garage_id) errors.garage_id = t('Garage ID is required');

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setStatus('error');
      setErrors({ form: 'Invalid form, please fill in all required fields' });
      return;
    }

    const submissionData = new FormData();

    for (const key in formData) {
      if (formData[key] !== undefined && formData[key] !== null) {
        submissionData.append(key, formData[key]);
      }
    }

    setStatus('loading');
    try {
      const response = await addMaintenance(submissionData);
      if (response.success) {
        setStatus('success');
        setTimeout(() => navigate(-1), 2000);
      } else {
        setStatus('error');
        setErrors(response.message || 'An error occurred. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setErrors(error.message);
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
    <div className={`flex flex-col items-center min-h-screen bg-bodyBg-color text-heading-color ${i18n.language === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className={`w-full ${i18n.language === 'ar' ? 'text-right' : 'text-left'} p-10 mt-20 mb-10`}>
        <h1 className="text-3xl font-bold text-secondary-color">{t('Add')}</h1>
        <h3 className="font-bold text-l mt-3 text-heading-color cursor-pointer">{t('Maintenance Record')}</h3>
      </div>

      <form onSubmit={handleSubmit} className={`w-full ${i18n.language === 'ar' ? 'text-right' : 'text-left'} p-10 mt-15 mb-10 max-w-md mx-auto`}>
        <div className="mb-5">
          <label htmlFor="car" className="block mb-2 text-sm font-medium">{t('Car')}</label>
          <Select
            id="car"
            value={selectedCar}
            onChange={handleCarChange}
            options={carOptions}
            placeholder={t('Select Car')}
            className="rounded-none rounded-e-lg text-gray-900 focus:outline-none focus:border-secondary-color focus:ring focus:ring-secondary-color focus:ring-opacity-100 text-sm block w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            styles={customStyles}
            isDisabled={false}
            required
          />
        </div>

        <div className="mb-5">
          <label htmlFor="maintenance-date" className="block mb-2 text-sm font-medium">{t('Maintenance Date')}</label>
          <div className="relative max-w-sm">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
              </svg>
            </div>
            <input id="maintenance-date" name="maintenance_date" type="text" value={formData.maintenance_date} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={t('Select date')} required />
          </div>
        </div>

        <div className="mb-5">
          <label htmlFor="details" className="block mb-2 text-sm font-medium">{t('Details')}</label>
          <textarea id="details" name="details" value={formData.details} onChange={handleInputChange} className="rounded-lg rounded-e-lg text-gray-900 focus:outline-none focus:border-secondary-color focus:ring focus:ring-secondary-color focus:ring-opacity-100 text-sm block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder={t('Enter maintenance details')} required />
        </div>

        <div className="mb-5">
          <label htmlFor="cost" className="block mb-2 text-sm font-medium">{t('Cost')}</label>
          <input type="text" id="cost" name="cost" value={formData.cost} onChange={handleInputChange} className="rounded-lg rounded-e-lg text-gray-900 focus:outline-none focus:border-secondary-color focus:ring focus:ring-secondary-color focus:ring-opacity-100 text-sm block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder={t('Enter cost')} required />
        </div>

        <div className="mb-5">
          <label htmlFor="amount_paid" className="block mb-2 text-sm font-medium">{t('Amount Paid')}</label>
          <input type="text" id="amount_paid" name="amount_paid" value={formData.amount_paid} onChange={handleInputChange} className="rounded-lg rounded-e-lg text-gray-900 focus:outline-none focus:border-secondary-color focus:ring focus:ring-secondary-color focus:ring-opacity-100 text-sm block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder={t('Enter amount paid')} required />
        </div>

        <div className="mb-5">
          <label htmlFor="trader" className="block mb-2 text-sm font-medium">{t('Trader')}</label>
          <input type="text" id="trader" name="trader" value={formData.trader} onChange={handleInputChange} className="rounded-lg rounded-e-lg text-gray-900 focus:outline-none focus:border-secondary-color focus:ring focus:ring-secondary-color focus:ring-opacity-100 text-sm block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder={t('Enter trader name')} required />
        </div>

        <div className="mb-5">
          <label htmlFor="spare_parts" className="block mb-2 text-sm font-medium">{t('Spare Parts')}</label>
          <textarea id="spare_parts" name="spare_parts" value={formData.spare_parts} onChange={handleInputChange} className="rounded-lg rounded-e-lg text-gray-900 focus:outline-none focus:border-secondary-color focus:ring focus:ring-secondary-color focus:ring-opacity-100 text-sm block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder={t('Enter spare parts details')} required />
        </div>

        <div className="mb-5">
          <label htmlFor="spare_parts_price" className="block mb-2 text-sm font-medium">{t('Spare Parts Price')}</label>
          <input type="text" id="spare_parts_price" name="spare_parts_price" value={formData.spare_parts_price} onChange={handleInputChange} className="rounded-lg rounded-e-lg text-gray-900 focus:outline-none focus:border-secondary-color focus:ring focus:ring-secondary-color focus:ring-opacity-100 text-sm block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder={t('Enter spare parts price')} required />
        </div>

        <div className="mb-5">
          <label htmlFor="amount_paid_of_spare_parts" className="block mb-2 text-sm font-medium">{t('Amount Paid for Spare Parts')}</label>
          <input type="text" id="amount_paid_of_spare_parts" name="amount_paid_of_spare_parts" value={formData.amount_paid_of_spare_parts} onChange={handleInputChange} className="rounded-lg rounded-e-lg text-gray-900 focus:outline-none focus:border-secondary-color focus:ring focus:ring-secondary-color focus:ring-opacity-100 text-sm block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder={t('Enter amount paid for spare parts')} required />
        </div>

        <div className="mb-5">
          <label htmlFor="garage_id" className="block mb-2 text-sm font-medium">{t('Garage ID')}</label>
          <input type="text" id="garage_id" name="garage_id" value={formData.garage_id} onChange={handleInputChange} className="rounded-lg rounded-e-lg text-gray-900 focus:outline-none focus:border-secondary-color focus:ring focus:ring-secondary-color focus:ring-opacity-100 text-sm block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder={t('Enter garage ID')} required />
        </div>

        <div className="mb-5">
          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            {status === 'loading' ? t('Submitting...') : t('Submit')}
          </button>
          <button type="button" className="bg-gray-500 text-white m-5 rounded-md opacity-100 font-medium text-sm w-full sm:w-auto px-5 py-2.5 text-center" onClick={handleGoBack}>{t('Go Back')}</button>
        </div>
        {status === 'success' && (
          <div className="text-green-500">
            {t('Maintenance record added successfully! Redirecting...')}
          </div>
        )}
        {status === 'error' && (
          <div className="text-red-500">
            {errors.form ? t(errors.form) : t('An error occurred. Please try again.')}
          </div>
        )}
      </form>
    </div>
  );
};

export default AddMaintenanceForm;
