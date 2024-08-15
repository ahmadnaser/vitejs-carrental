import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import 'flowbite';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/themes/airbnb.css';
import { addCar } from '../../../controller/carController';

const AddCarForm = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    carMake: '',
    carName: '',
    year: '',
    plateNumber: '',
    color: '',
    mileage: '',
    lastOilChangeMiles: '',
    lastOilChangeDate: '',
    dateOfLicense: '',
    endDateOfLicense: '',
    dateOfInsurance: '',
    endDateOfInsurance: '',
    changeOilKm: '',
    changeOilMonth: '',
    active: false,
    license_image_path: null,
    insurance_image_path: null,
  });
  const [status, setStatus] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];

    flatpickr('#lastOilChangeDate', {
      dateFormat: 'Y-m-d',
      minDate: today,
      onChange: (selectedDates, dateStr) => {
        setFormData(prevFormData => ({
          ...prevFormData,
          lastOilChangeDate: dateStr,
        }));
      }
    });

    flatpickr('#dateOfLicense', {
      dateFormat: 'Y-m-d',
      minDate: today,
      onChange: (selectedDates, dateStr) => {
        setFormData(prevFormData => ({
          ...prevFormData,
          dateOfLicense: dateStr,
        }));
      }
    });

    flatpickr('#endDateOfLicense', {
      dateFormat: 'Y-m-d',
      minDate: today,
      onChange: (selectedDates, dateStr) => {
        setFormData(prevFormData => ({
          ...prevFormData,
          endDateOfLicense: dateStr,
        }));
      }
    });

    flatpickr('#dateOfInsurance', {
      dateFormat: 'Y-m-d',
      minDate: today,
      onChange: (selectedDates, dateStr) => {
        setFormData(prevFormData => ({
          ...prevFormData,
          dateOfInsurance: dateStr,
        }));
      }
    });

    flatpickr('#endDateOfInsurance', {
      dateFormat: 'Y-m-d',
      minDate: today,
      onChange: (selectedDates, dateStr) => {
        setFormData(prevFormData => ({
          ...prevFormData,
          endDateOfInsurance: dateStr,
        }));
      }
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: checked,
    }));
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.carMake.trim()) errors.carMake = t('Car make is required');
    if (!formData.carName.trim()) errors.carName = t('Car name is required');
    if (!formData.year.trim()) errors.year = t('Year of production is required');
    if (!formData.plateNumber.trim()) errors.plateNumber = t('Plate number is required');
    if (!formData.color.trim()) errors.color = t('Color is required');
    if (!formData.mileage.trim()) errors.mileage = t('Mileage is required');
    if (!formData.lastOilChangeMiles.trim()) errors.lastOilChangeMiles = t('Last oil change miles is required');
    if (!formData.lastOilChangeDate.trim()) errors.lastOilChangeDate = t('Last oil change date is required');
    if (!formData.dateOfLicense.trim()) errors.dateOfLicense = t('Date of license is required');
    if (!formData.endDateOfLicense.trim()) errors.endDateOfLicense = t('End date of license is required');
    if (!formData.dateOfInsurance.trim()) errors.dateOfInsurance = t('Date of insurance is required');
    if (!formData.endDateOfInsurance.trim()) errors.endDateOfInsurance = t('End date of insurance is required');
    if (!formData.changeOilKm.trim()) errors.changeOilKm = t('Change oil every (km) is required');
    if (!formData.changeOilMonth.trim()) errors.changeOilMonth = t('Change oil every (month) is required');

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  

  const handleSubmit = async (e) => {

    e.preventDefault();
    
    const mappedData = {
      vehicle_id: formData.carMake, 
      make: formData.carMake,
      model: formData.carName,
      year: formData.year ? parseInt(formData.year, 10) : null,
      color: formData.color,
      mileage: formData.mileage ? parseInt(formData.mileage, 10) : null,
      last_oil_change_miles: formData.lastOilChangeMiles || null,
      last_oil_change_date: formData.lastOilChangeDate || null,
      license_expiry_date: formData.endDateOfLicense || null,
      insurance_expiry_date: formData.endDateOfInsurance || null,
      change_oil_every_km: formData.changeOilKm || null,
      change_oil_every_month: formData.changeOilMonth || null,
      license_image_path: formData.license_image_path || null,
      insurance_image_path: formData.insurance_image_path || null,
      active: formData.active,
    };

    if (!validateForm()) {
      setStatus('error');
      return;
    }
    console.log('Form data:', mappedData);

    setStatus('loading');
    try {
      const response = await addCar(mappedData);
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
          <label htmlFor="carMake" className="block mb-2 text-sm font-medium">{t('Car Make')}</label>
          <input
            type="text"
            id="carMake"
            name="carMake"
            value={formData.carMake}
            onChange={handleInputChange}
            className="rounded-lg text-gray-900 focus:outline-none focus:border-secondary-color focus:ring focus:ring-secondary-color focus:ring-opacity-100 text-sm block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder={t('Car Make')}
            required
          />
        </div>

        <div className="mb-5">
          <label htmlFor="carName" className="block mb-2 text-sm font-medium">{t('Car Model')}</label>
          <input
            type="text"
            id="carName"
            name="carName"
            value={formData.carName}
            onChange={handleInputChange}
            className="rounded-lg text-gray-900 focus:outline-none focus:border-secondary-color focus:ring focus:ring-secondary-color focus:ring-opacity-100 text-sm block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder={t('Car Model')}
            required
          />
        </div>

        <div className="mb-5">
          <label htmlFor="year" className="block mb-2 text-sm font-medium">{t('Year of production')}</label>
          <input
            type="number"
            id="year"
            name="year"
            value={formData.year}
            onChange={handleInputChange}
            className="rounded-lg text-gray-900 focus:outline-none focus:border-secondary-color focus:ring focus:ring-secondary-color focus:ring-opacity-100 text-sm block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder={t('Year of production')}
            required
          />
        </div>

        <div className="mb-5">
          <label htmlFor="plateNumber" className="block mb-2 text-sm font-medium">{t('Plate Number')}</label>
          <input
            type="text"
            id="plateNumber"
            name="plateNumber"
            value={formData.plateNumber}
            onChange={handleInputChange}
            className="rounded-lg text-gray-900 focus:outline-none focus:border-secondary-color focus:ring focus:ring-secondary-color focus:ring-opacity-100 text-sm block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder={t('Plate Number')}
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
            onChange={handleInputChange}
            className="rounded-lg text-gray-900 focus:outline-none focus:border-secondary-color focus:ring focus:ring-secondary-color focus:ring-opacity-100 text-sm block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder={t('Mileage')}
            required
          />
        </div>

        <div className="mb-5">
          <label htmlFor="lastOilChangeMiles" className="block mb-2 text-sm font-medium">{t('Last Oil Change Miles')}</label>
          <input
            type="text"
            id="lastOilChangeMiles"
            name="lastOilChangeMiles"
            value={formData.lastOilChangeMiles}
            onChange={handleInputChange}
            className="rounded-lg text-gray-900 focus:outline-none focus:border-secondary-color focus:ring focus:ring-secondary-color focus:ring-opacity-100 text-sm block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder={t('Last Oil Change Miles')}
            required
          />
        </div>

        <div className="mb-5">
          <label htmlFor="lastOilChangeDate" className="block mb-2 text-sm font-medium">{t('Last Oil Change Date')}</label>
          <div className="relative max-w-sm">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
              </svg>
            </div>
            <input
              type="text"
              id="lastOilChangeDate"
              name="lastOilChangeDate"
              value={formData.lastOilChangeDate}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder={t('Select date')}
            />
          </div>
        </div>

        <div className="mb-5">
          <label htmlFor="licenseCar" className="block mb-2 text-sm font-medium">{t('Copy of license Car')}</label>
          <input name="license_image_path"  onChange={handleChange} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" type="file"  />
        </div>

        <div className="mb-5">
          <label htmlFor="dateOfLicense" className="block mb-2 text-sm font-medium">{t('Date Of Start License')}</label>
          <div className="relative max-w-sm">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
              </svg>
            </div>
            <input
              type="text"
              id="dateOfLicense"
              name="dateOfLicense"
              value={formData.dateOfLicense}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder={t('Select date')}
            />
          </div>
        </div>

        <div className="mb-5">
          <label htmlFor="endDateOfLicense" className="block mb-2 text-sm font-medium">{t('Date Of End License')}</label>
          <div className="relative max-w-sm">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
              </svg>
            </div>
            <input
              type="text"
              id="endDateOfLicense"
              name="endDateOfLicense"
              value={formData.endDateOfLicense}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder={t('Select date')}
            />
          </div>
        </div>

        <div className="mb-5">
          <label htmlFor="InsuranceCar" className="block mb-2 text-sm font-medium">{t('Copy of license Car')}</label>
          <input name="insurance_image_path"  onChange={handleChange}  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" type="file"  />
        </div>

        <div className="mb-5">
          <label htmlFor="dateOfInsurance" className="block mb-2 text-sm font-medium">{t('Date Of Start Insurance')}</label>
          <div className="relative max-w-sm">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
              </svg>
            </div>
            <input
              type="text"
              id="dateOfInsurance"
              name="dateOfInsurance"
              value={formData.dateOfInsurance}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder={t('Select date')}
            />
          </div>
        </div>

        <div className="mb-5">
          <label htmlFor="endDateOfInsurance" className="block mb-2 text-sm font-medium">{t('Date Of End Insurance')}</label>
          <div className="relative max-w-sm">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
              </svg>
            </div>
            <input
              type="text"
              id="endDateOfInsurance"
              name="endDateOfInsurance"
              value={formData.endDateOfInsurance}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder={t('Select date')}
            />
          </div>
        </div>

        <div className="mb-5">
          <label htmlFor="changeOilKm" className="block mb-2 text-sm font-medium">{t('Change Oil every (km)')}</label>
          <input
            type="text"
            id="changeOilKm"
            name="changeOilKm"
            value={formData.changeOilKm}
            onChange={handleInputChange}
            className="rounded-lg text-gray-900 focus:outline-none focus:border-secondary-color focus:ring focus:ring-secondary-color focus:ring-opacity-100 text-sm block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder={t('In Kilometers')}
            required
          />
        </div>

        <div className="mb-5">
          <label htmlFor="changeOilMonth" className="block mb-2 text-sm font-medium">{t('Change Oil every (Month)')}</label>
          <input
            type="text"
            id="changeOilMonth"
            name="changeOilMonth"
            value={formData.changeOilMonth}
            onChange={handleInputChange}
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

        <div className="mb-5">
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
