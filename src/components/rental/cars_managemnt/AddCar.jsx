import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import 'flowbite';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/themes/airbnb.css';
import { AddCar } from '../../../controller/CarController';


const convertArabicNumbers = (input) => {
  const arabicNumbers = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  const englishNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

  return input.replace(/[٠-٩]/g, (d) => englishNumbers[arabicNumbers.indexOf(d)]);
};

const AddCarForm = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
    vehicle_id: '',
    color: '',
    mileage: '',
    last_oil_change_miles: '',
    last_oil_change_date: '',
    license_start_date: '',
    insurance_start_date: '',
    license_expiry_date: '',
    insurance_expiry_date: '',
    change_oil_every_km: '',
    change_oil_every_month: '',
    active: false,
    license_image: null,
    insurance_image: null,
  });
  const [status, setStatus] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    flatpickr('#lastOilChangeDate', {
      dateFormat: 'Y-m-d',
      onChange: (selectedDates, dateStr) => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          last_oil_change_date: dateStr,
        }));
      },
    });

    flatpickr('#licenseStartDate', {
      dateFormat: 'Y-m-d',
      onChange: (selectedDates, dateStr) => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          license_start_date: dateStr,
        }));
      },
    });

    flatpickr('#licenseExpiryDate', {
      dateFormat: 'Y-m-d',
      onChange: (selectedDates, dateStr) => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          license_expiry_date: dateStr,
        }));
      },
    });

    flatpickr('#insurance_start_date', {
      dateFormat: 'Y-m-d',
      onChange: (selectedDates, dateStr) => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          insurance_start_date: dateStr,
        }));
      },
    });

    flatpickr('#insurance_expiry_date', {
      dateFormat: 'Y-m-d',
      onChange: (selectedDates, dateStr) => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          insurance_expiry_date: dateStr,
        }));
      },
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleNumericInputChange = (e) => {
    const { name, value } = e.target;
    const convertedValue = convertArabicNumbers(value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: convertedValue,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: checked,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: files[0],
      }));
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.make.trim()) errors.make = t('Car make is required');
    if (!formData.model.trim()) errors.model = t('Car model is required');
    if (!formData.year.trim()) errors.year = t('Year of production is required');
    if (!formData.vehicle_id.trim()) errors.vehicle_id = t('Vehicle ID is required');
    if (!formData.color.trim()) errors.color = t('Color is required');
    if (!formData.mileage.trim()) errors.mileage = t('Mileage is required');
    if (!formData.last_oil_change_miles.trim()) errors.last_oil_change_miles = t('Last oil change miles is required');
    if (!formData.last_oil_change_date.trim()) errors.last_oil_change_date = t('Last oil change date is required');
    if (!formData.license_start_date.trim()) errors.license_start_date = t('License start date is required');
    if (!formData.license_expiry_date.trim()) errors.license_expiry_date = t('License expiry date is required');
    if (!formData.insurance_start_date.trim()) errors.insurance_start_date = t('Insurance start date is required');
    if (!formData.insurance_expiry_date.trim()) errors.insurance_expiry_date = t('Insurance expiry date is required');
    if (!formData.change_oil_every_km.trim()) errors.change_oil_every_km = t('Change oil every (km) is required');
    if (!formData.change_oil_every_month.trim()) errors.change_oil_every_month = t('Change oil every (month) is required');

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setStatus('error');
      return;
    }

    const formToSubmit = new FormData();

    for (let key in formData) {
      if (key === 'active') {
        formToSubmit.append(key, formData[key] ? '1' : '0');
      } else {
        formToSubmit.append(key, formData[key]);
      }
    }

    for (let [key, value] of formToSubmit.entries()) {
      console.log(`${key}: ${value}`);
    }

    setStatus('loading');
    try {
      const response = await AddCar(formToSubmit);
      if (response.success) {
        setStatus('success');
        setTimeout(() => navigate(-1), 2000);
      } else {
        setStatus('error');
        setErrors({ form: response.message });
      }
    } catch (error) {
      setStatus('error');
      setErrors({ form: 'An unexpected error occurred' });
    }
  };

  return (
    <div className={`flex flex-col items-center min-h-screen bg-bodyBg-color text-heading-color ${i18n.language === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className={`w-full ${i18n.language === 'ar' ? 'text-right' : 'text-left'} p-10 mt-20 mb-10`}>
        <h1 className="text-3xl font-bold text-secondary-color">{t('Add')}</h1>
        <h3 className="font-bold text-l mt-3 text-heading-color cursor-pointer">{t('New Car')}</h3>
      </div>

      <form onSubmit={handleSubmit} className={`w-full ${i18n.language === 'ar' ? 'text-right' : 'text-left'} p-10 mt-15 mb-10 max-w-md mx-auto`}>
        <div className="mb-5">
          <label htmlFor="make" className="block mb-2 text-sm font-medium">{t('Car Make')}</label>
          <input
            type="text"
            id="make"
            name="make"
            value={formData.make}
            onChange={handleInputChange}
            className="rounded-lg text-gray-900 focus:outline-none focus:border-secondary-color focus:ring focus:ring-secondary-color focus:ring-opacity-100 text-sm block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder={t('Car Make')}
            required
          />
        </div>

        <div className="mb-5">
          <label htmlFor="model" className="block mb-2 text-sm font-medium">{t('Car Model')}</label>
          <input
            type="text"
            id="model"
            name="model"
            value={formData.model}
            onChange={handleInputChange}
            className="rounded-lg text-gray-900 focus:outline-none focus:border-secondary-color focus:ring focus:ring-secondary-color focus:ring-opacity-100 text-sm block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder={t('Car Model')}
            required
          />
        </div>

        <div className="mb-5">
          <label htmlFor="year" className="block mb-2 text-sm font-medium">{t('Year of production')}</label>
          <input
            type="text"
            id="year"
            name="year"
            value={formData.year}
            onChange={handleNumericInputChange}
            className="rounded-lg text-gray-900 focus:outline-none focus:border-secondary-color focus:ring focus:ring-secondary-color focus:ring-opacity-100 text-sm block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder={t('Year of production')}
            required
          />
        </div>

        <div className="mb-5">
          <label htmlFor="vehicle_id" className="block mb-2 text-sm font-medium">{t('Vehicle ID')}</label>
          <input
            type="text"
            id="vehicle_id"
            name="vehicle_id"
            value={formData.vehicle_id}
            onChange={handleInputChange}
            className="rounded-lg text-gray-900 focus:outline-none focus:border-secondary-color focus:ring focus:ring-secondary-color focus:ring-opacity-100 text-sm block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder={t('Vehicle ID')}
            required
          />
        </div>

        <div className="mb-5">
          <label htmlFor="color" className="block mb-2 text-sm font-medium">{t('Color')}</label>
          <input
            type="text"
            id="color"
            name="color"
            value={formData.color}
            onChange={handleInputChange}
            className="rounded-lg text-gray-900 focus:outline-none focus:border-secondary-color focus:ring focus:ring-secondary-color focus:ring-opacity-100 text-sm block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder={t('Color')}
            required
          />
        </div>

        <div className="mb-5">
          <label htmlFor="mileage" className="block mb-2 text-sm font-medium">{t('Mileage')}</label>
          <input
            type="text"
            id="mileage"
            name="mileage"
            value={formData.mileage}
            onChange={handleNumericInputChange}
            className="rounded-lg text-gray-900 focus:outline-none focus:border-secondary-color focus:ring focus:ring-secondary-color focus:ring-opacity-100 text-sm block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder={t('Mileage')}
            required
          />
        </div>

        <div className="mb-5">
          <label htmlFor="last_oil_change_miles" className="block mb-2 text-sm font-medium">{t('Last Oil Change Miles')}</label>
          <input
            type="text"
            id="last_oil_change_miles"
            name="last_oil_change_miles"
            value={formData.last_oil_change_miles}
            onChange={handleNumericInputChange}
            className="rounded-lg text-gray-900 focus:outline-none focus:border-secondary-color focus:ring focus:ring-secondary-color focus:ring-opacity-100 text-sm block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder={t('Last Oil Change Miles')}
            required
          />
        </div>

        <div className="mb-5">
          <label htmlFor="last_oil_change_date" className="block mb-2 text-sm font-medium">{t('Last Oil Change Date')}</label>
          <div className="relative max-w-sm">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
              </svg>
            </div>
            <input
              type="text"
              id="lastOilChangeDate"
              name="last_oil_change_date"
              value={formData.last_oil_change_date}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder={t('Select date')}
            />
          </div>
        </div>

        <div className="mb-5">
          <label htmlFor="license_image" className="block mb-2 text-sm font-medium">{t('Copy of license Car')}</label>
          <input 
            name="license_image"  
            onChange={handleFileChange} 
            className={`block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 ${
              i18n.language === 'ar' ? 'pr-4' : 'pl-4'
            }`}
            type="file"  
          />
        </div>

        <div className="mb-5">
          <label htmlFor="license_start_date" className="block mb-2 text-sm font-medium">{t('Date Of Start License')}</label>
          <div className="relative max-w-sm">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
              </svg>
            </div>
            <input
              type="text"
              id="licenseStartDate"
              name="license_start_date"
              value={formData.license_start_date}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder={t('Select date')}
            />
          </div>
        </div>

        <div className="mb-5">
          <label htmlFor="license_expiry_date" className="block mb-2 text-sm font-medium">{t('Date Of End License')}</label>
          <div className="relative max-w-sm">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
              </svg>
            </div>
            <input
              type="text"
              id="licenseExpiryDate"
              name="license_expiry_date"
              value={formData.license_expiry_date}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder={t('Select date')}
            />
          </div>
        </div>

        <div className="mb-5">
          <label htmlFor="insurance_image" className="block mb-2 text-sm font-medium">{t('Copy of insurance Car')}</label>
          <input 
            name="insurance_image"  
            onChange={handleFileChange}  
            className={`block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 ${
              i18n.language === 'ar' ? 'pr-4' : 'pl-4'
            }`}
            type="file"  
          />
        </div>

        <div className="mb-5">
          <label htmlFor="insurance_start_date" className="block mb-2 text-sm font-medium">{t('Date Of Start Insurance')}</label>
          <div className="relative max-w-sm">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
              </svg>
            </div>
            <input
              type="text"
              id="insurance_start_date"
              name="insurance_start_date"
              value={formData.insurance_start_date}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder={t('Select date')}
            />
          </div>
        </div>

        <div className="mb-5">
          <label htmlFor="insurance_expiry_date" className="block mb-2 text-sm font-medium">{t('Date Of End Insurance')}</label>
          <div className="relative max-w-sm">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
              </svg>
            </div>
            <input
              type="text"
              id="insurance_expiry_date"
              name="insurance_expiry_date"
              value={formData.insurance_expiry_date}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder={t('Select date')}
            />
          </div>
        </div>

        <div className="mb-5">
          <label htmlFor="change_oil_every_km" className="block mb-2 text-sm font-medium">{t('Change Oil every (km)')}</label>
          <input
            type="text"
            id="change_oil_every_km"
            name="change_oil_every_km"
            value={formData.change_oil_every_km}
            onChange={handleNumericInputChange}
            className="rounded-lg text-gray-900 focus:outline-none focus:border-secondary-color focus:ring focus:ring-secondary-color focus:ring-opacity-100 text-sm block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder={t('In Kilometers')}
            required
          />
        </div>

        <div className="mb-5">
          <label htmlFor="change_oil_every_month" className="block mb-2 text-sm font-medium">{t('Change Oil every (Month)')}</label>
          <input
            type="text"
            id="change_oil_every_month"
            name="change_oil_every_month"
            value={formData.change_oil_every_month}
            onChange={handleNumericInputChange}
            className="rounded-lg text-gray-900 focus:outline-none focus:border-secondary-color focus:ring focus:ring-secondary-color focus:ring-opacity-100 text-sm block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder={t('In Months')}
            required
          />
        </div>

        <div className="flex items-center h-5 mt-8 mb-5">
          <input
            id="active"
            name="active"
            type="checkbox"
            checked={formData.active}
            onChange={handleCheckboxChange}
            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
          />
          <label htmlFor="active" className="ms-2 text-sm font-medium text-heading-color dark:text-gray-300">{t('Active?')}</label>
        </div>

        <div className="flex items-center h-5 mt-8 mb-5">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {status === 'loading' ? t('Submitting...') : t('Submit')}
          </button>
          <button
            type="button"
            className="bg-gray-500 text-white m-5 rounded-md opacity-100 font-medium text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            onClick={handleGoBack}
          >
            {t('Go Back')}
          </button>
        </div>
        {status === 'success' && (
          <div className="text-green-500">
            {t('Car added successfully! Redirecting...')}
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

export default AddCarForm;
