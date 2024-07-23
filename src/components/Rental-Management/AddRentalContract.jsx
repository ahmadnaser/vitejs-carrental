import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import 'flowbite';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/themes/airbnb.css';
import { getAvailableCars } from '../../controller/carController';
import { addContract } from '../../controller/RentedCarController';
import SelectTenant from '../SelectTenant';

const AddRentalForm = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    tenant_id: '',
    second_driver_id: '',
    vehicle_id: '',
    start_date: '',
    end_date: '',
    price_perday: '',
    total_amount: '',
    amount_paid: '',
    car_mileage: '',
    note: '',
    check_number: '',
    bank_name: '',
    check_amount: '',
    check_date: '',
    car_condition: '',
    car_damage: ''
  });
  const [status, setStatus] = useState(null);
  const [errors, setErrors] = useState({});
  const [time, setTime] = useState('12:00');
  const [returnTime, setReturnTime] = useState('12:00');
  const [tenantInfo, setTenantInfo] = useState('');
  const [tenantInfo2, setTenantInfo2] = useState('');
  const [isSelectTenantOpen, setIsSelectTenantOpen] = useState(false);
  const [isSelectTenantOpen2, setIsSelectTenantOpen2] = useState(false);
  const [cars, setCars] = useState([]);
  const [isAlternativeDriver, setIsAlternativeDriver] = useState(false);
  const [numDays, setNumDays] = useState('');
  const [isBankCheck, setIsBankCheck] = useState(false);
  const [isCarState, setIsCarState] = useState(false);
  const [showCarWarning, setShowCarWarning] = useState(false);

  useEffect(() => {
    if (location.state && location.state.tenantName && location.state.idNumber) {
      setTenantInfo(`${location.state.tenantName}-${location.state.idNumber}`);
      setFormData(prevFormData => ({
        ...prevFormData,
        tenant_id: location.state.idNumber
      }));
    }

    const today = new Date().toISOString().split('T')[0];

    flatpickr('#from-date', {
      dateFormat: 'Y-m-d',
      minDate: today,
      onChange: (selectedDates, dateStr) => {
        setFormData(prevFormData => ({
          ...prevFormData,
          start_date: dateStr
        }));
      }
    });

    flatpickr('#to-date', {
      dateFormat: 'Y-m-d',
      minDate: today,
      onChange: (selectedDates, dateStr) => {
        setFormData(prevFormData => ({
          ...prevFormData,
          end_date: dateStr
        }));
      }
    });

    flatpickr('#timepicker', {
      enableTime: true,
      noCalendar: true,
      dateFormat: 'H:i',
      defaultDate: time,
      onChange: (selectedDates, dateStr) => {
        setTime(dateStr);
      }
    });

    flatpickr('#return-timepicker', {
      enableTime: true,
      noCalendar: true,
      dateFormat: 'H:i',
      defaultDate: returnTime,
      onChange: (selectedDates, dateStr) => {
        setReturnTime(dateStr);
      }
    });

  }, [time, returnTime, location.state]);

  useEffect(() => {
    if (formData.start_date && formData.end_date) {
      const from = new Date(formData.start_date);
      const to = new Date(formData.end_date);

      if (to < from) return;

      const diffTime = Math.abs(to - from);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setNumDays(diffDays);
    } else if (formData.start_date && numDays) {
      const from = new Date(formData.start_date);
      from.setDate(from.getDate() + parseInt(numDays));
      const formattedDate = from.toISOString().split('T')[0];
      setFormData(prevFormData => ({
        ...prevFormData,
        end_date: formattedDate
      }));
    }
  }, [formData.start_date, formData.end_date, numDays]);

  const fetchAvailableCars = async () => {
    if (!formData.start_date || !formData.end_date) {
      setShowCarWarning(true);
      return;
    }
    setShowCarWarning(false);
    try {
      const carsList = await getAvailableCars(formData.start_date, formData.end_date);
      setCars(carsList);
    } catch (error) {
      console.error('Failed to fetch cars', error);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleAddNewClick = () => {
    navigate('/tenants/add-tenants');
  };

  const handleSelectTenantClick = () => {
    setIsSelectTenantOpen(true);
  };

  const handleSelectTenantClick2 = () => {
    setIsSelectTenantOpen2(true);
  };

  const handleTenantSelect = (selectedTenant) => {
    setTenantInfo(selectedTenant);
    setIsSelectTenantOpen(false);
  };

  const handleTenantSelect2 = (selectedTenant) => {
    setTenantInfo2(selectedTenant);
    setIsSelectTenantOpen2(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.start_date) errors.start_date = t('Start date is required');
    if (!formData.end_date) errors.end_date = t('End date is required');
    if (!formData.vehicle_id) errors.vehicle_id = t('Vehicle is required');
    if (!formData.price_perday) errors.price_perday = t('Price per day is required');
    if (!formData.total_amount) errors.total_amount = t('Total amount is required');
    if (!formData.amount_paid) errors.amount_paid = t('Amount paid is required');
    if (!formData.car_mileage) errors.car_mileage = t('Car mileage is required');
    if (!formData.note) errors.note = t('Note is required');

    if (isBankCheck) {
      if (!formData.check_number) errors.check_number = t('Check number is required');
      if (!formData.check_amount) errors.check_amount = t('Check amount is required');
      if (!formData.bank_name) errors.bank_name = t('Bank name is required');
      if (!formData.check_date) errors.check_date = t('Check date is required');
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus('loading');
    try {
      const response = await addContract(formData);
      if (response.success) {
        setStatus('success');
        setTimeout(() => navigate(-1), 2000);
      } else {
        setStatus('error');
        if (response.message) {
          setErrors(response.message);
        } else {
          setErrors({ form: 'An unexpected error occurred' });
        }
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
        <h3 className="font-bold text-l mt-3 text-heading-color cursor-pointer">{t('Rental contracts')}</h3>
      </div>

      <form onSubmit={handleSubmit} className={`w-full ${i18n.language === 'ar' ? 'text-right' : 'text-left'} p-10 mt-15 mb-10 max-w-md mx-auto`} >
        <div className="mb-1">
          <label htmlFor="tenant" className="block mb-2 text-sm font-medium">{t('Tenants')}</label>
          <div className="flex">
            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
              </svg>
            </span>
            <input type="text" id="tenants" value={tenantInfo}
               onChange={(e) => setTenantInfo(e.target.value)} className="rounded-none rounded-e-lg text-gray-900 focus:outline-none focus:border-secondary-color focus:ring focus:ring-secondary-color focus:ring-opacity-100 text-sm block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder={t('Name of Tenants or ID Number')} disabled required />
          </div>
        </div>
        <div className='flex mt-0 mb-5 space-x-5'>
          <h6 className="font-bold text-sm mt-3 text-blue-400 cursor-pointer" onClick={handleAddNewClick}>{t('Add Tenant')}</h6>
          <h6 className="font-bold text-sm mt-3 text-blue-400 cursor-pointer" onClick={handleSelectTenantClick}>{t('Select Tenant')}</h6>
        </div>
        <div className="flex items-center h-5 mt-5 mb-5">
          <input id="alternative-driver" type="checkbox" checked={isAlternativeDriver} onChange={(e) => setIsAlternativeDriver(e.target.checked)} className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" />
          <label htmlFor="alternative-driver" className="ms-2 text-sm font-medium text-heading-color dark:text-gray-300">{t('Alternative driver ?')}</label>
        </div>
        {isAlternativeDriver && (
          <div className="mb-10 mt-10">
            <label htmlFor="tenant" className="block mb-2 text-sm font-medium">{t('Alternative Driver')}</label>
            <div className="flex">
              <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                </svg>
              </span>
              <input type="text" id="tenants" value={tenantInfo2}
                onChange={(e) => setTenantInfo2(e.target.value)} className="rounded-none rounded-e-lg text-gray-900 focus:outline-none focus:border-secondary-color focus:ring focus:ring-secondary-color focus:ring-opacity-100 text-sm block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder={t('Name of Tenants or ID Number')} disabled required />
            </div>
            <div className='flex mt-0 mb-5 space-x-5'>
              <h6 className="font-bold text-sm mt-3 text-blue-400 cursor-pointer" onClick={handleAddNewClick}>{t('Add Tenant')}</h6>
              <h6 className="font-bold text-sm mt-3 text-blue-400 cursor-pointer" onClick={handleSelectTenantClick2}>{t('Select Tenant')}</h6>
            </div>
          </div>
        )}

        <div className="mb-5">
          <label htmlFor="from-date" className="block mb-2 text-sm font-medium">{t('From Date')}</label>
          <div className="relative max-w-sm">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
              </svg>
            </div>
            <input id="from-date" data-datepicker data-datepicker-buttons data-datepicker-autoselect-today type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={t('Select date')} value={formData.start_date} onChange={handleInputChange} />
          </div>
        </div>

        <div className="mb-5">
          <label htmlFor="start_time" className="block mb-2 text-sm font-medium">{t('Time Out')}</label>
          <div className="relative">
            <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10-10-4.477-10-10Zm11-4a1 1 0 1 0-2 0v3a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clipRule="evenodd"/>
              </svg>
            </div>
            <input id="timepicker" type="text" className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={time} onChange={(e) => setTime(e.target.value)} required />
          </div>
        </div>

        <div className="mb-5">
          <label htmlFor="numDay" className="block mb-2 text-sm font-medium">{t('Number Of Day')}</label>
          <input type="text" id="numDay" value={numDays} onChange={(e) => setNumDays(e.target.value)} className="rounded-lg text-gray-900 focus:outline-none focus:border-secondary-color focus:ring focus:ring-secondary-color focus:ring-opacity-100 text-sm block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder={t('Number of Days')} required />
        </div>

        <div className="mb-5">
          <label htmlFor="to-date" className="block mb-2 text-sm font-medium">{t('To Date')}</label>
          <div className="relative max-w-sm">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
              </svg>
            </div>
            <input id="to-date" data-datepicker data-datepicker-buttons data-datepicker-autoselect-today type="text" value={formData.end_date} onChange={(e) => setToDate(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={t('Select date')} />
          </div>
        </div>

        <div className="mb-5">
          <label htmlFor="end_time" className="block mb-2 text-sm font-medium">{t('Return Time')}</label>
          <div className="relative">
            <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10-10-4.477-10-10Zm11-4a1 1 0 1 0-2 0v3a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clipRule="evenodd"/>
              </svg>
            </div>
            <input id="return-timepicker" type="text" className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={returnTime} onChange={(e) => setReturnTime(e.target.value)} required />
          </div>
        </div>

        <div className="mb-5">
          <label htmlFor="car" className="block mb-2 text-sm font-medium">{t('Car')}</label>
          <select id="cars" className="text-gray-900 focus:outline-none focus:border-secondary-color focus:ring focus:ring-secondary-color focus:ring-opacity-100 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" onClick={fetchAvailableCars} required>
            <option value="">{t('Select car')}</option>
            {cars.map(car => (
              <option key={car.vehicleId} value={car.vehicleId}>
                {car.make} {car.model} ({car.year}) / {car.vehicleId}
              </option>
            ))}
          </select>
          {showCarWarning && <p className="text-red-500 mt-2">{t('Please select start and end date to get available cars')}</p>}
        </div>

        <div className="mb-5">
          <label htmlFor="car_mileage" className="block mb-2 text-sm font-medium">{t('Car Mileage')}</label>
          <input type="text" id="car_mileage" name="car_mileage" value={formData.car_mileage} onChange={handleInputChange} className="rounded-lg rounded-e-lg text-gray-900 focus:outline-none focus:border-secondary-color focus:ring focus:ring-secondary-color focus:ring-opacity-100 text-sm block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder={t('Enter car mileage')} required />
        </div>

        <div className="mb-5">
          <label htmlFor="price_perday" className="block mb-2 text-sm font-medium">{t('Price Per Day')}</label>
          <input type="text" id="price_perday" name="price_perday" value={formData.price_perday} onChange={handleInputChange} className="rounded-lg rounded-e-lg text-gray-900 focus:outline-none focus:border-secondary-color focus:ring focus:ring-secondary-color focus:ring-opacity-100 text-sm block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder={t('Enter price per day')} required />
        </div>

        <div className="mb-5">
          <label htmlFor="total_amount" className="block mb-2 text-sm font-medium">{t('Total Amount')}</label>
          <input type="text" id="total_amount" name="total_amount" value={formData.total_amount} onChange={handleInputChange} className="rounded-lg rounded-e-lg text-gray-900 focus:outline-none focus:border-secondary-color focus:ring focus:ring-secondary-color focus:ring-opacity-100 text-sm block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder={t('Enter total amount')} required />
        </div>

        <div className="mb-5">
          <label htmlFor="amount_paid" className="block mb-2 text-sm font-medium">{t('Amount Paid')}</label>
          <input type="text" id="amount_paid" name="amount_paid" value={formData.amount_paid} onChange={handleInputChange} className="rounded-lg rounded-e-lg text-gray-900 focus:outline-none focus:border-secondary-color focus:ring focus:ring-secondary-color focus:ring-opacity-100 text-sm block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder={t('Enter amount paid')} required />
        </div>

        <div className="flex items-center h-5 mt-8 mb-5">
            <input id="bankCheck" type="checkbox" checked={isBankCheck} onChange={(e) => setIsBankCheck(e.target.checked)} className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" />
            <label htmlFor="bankCheck" className="ms-2 text-sm font-medium text-heading-color dark:text-gray-300">{t('Bank Check?')}</label>
        </div>

        {isBankCheck && (
          <div className="mb-10 mt-10">
            <div className=" mb-5">
              <label htmlFor="check_number" className="block mb-2 text-sm font-medium">{t('Check Number')}</label>
              <input type="text" id="check_number" name="check_number" value={formData.check_number} onChange={handleInputChange} className="rounded-lg rounded-e-lg text-gray-900 focus:outline-none focus:border-secondary-color focus:ring focus:ring-secondary-color focus:ring-opacity-100 text-sm block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder={t('Enter check number')} required />
            </div>

            <div className="mb-5">
              <label htmlFor="check_amount" className="block mb-2 text-sm font-medium">{t('Check Amount')}</label>
              <input type="text" id="check_amount" name="check_amount" value={formData.check_amount} onChange={handleInputChange} className="rounded-lg rounded-e-lg text-gray-900 focus:outline-none focus:border-secondary-color focus:ring focus:ring-secondary-color focus:ring-opacity-100 text-sm block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder={t('Enter check amount')} required />
            </div>

            <div className="mb-5">
              <label htmlFor="bank_name" className="block mb-2 text-sm font-medium">{t('Bank Name')}</label>
              <input type="text" id="bank_name" name="bank_name" value={formData.bank_name} onChange={handleInputChange} className="rounded-lg rounded-e-lg text-gray-900 focus:outline-none focus:border-secondary-color focus:ring focus:ring-secondary-color focus:ring-opacity-100 text-sm block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder={t('Enter bank name')} required />
            </div>

            <div className="mb-5">
              <label htmlFor="check_date" className="block mb-2 text-sm font-medium">{t('Check Date')}</label>
              <div className="relative max-w-sm">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                  </svg>
                </div>
                <input id="check_date" data-datepicker data-datepicker-buttons data-datepicker-autoselect-today type="text" name="check_date" value={formData.check_date} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={t('Select date')} />
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center h-5 mt-5 mb-5">
          <input id="carState" type="checkbox" checked={isCarState} onChange={(e) => setIsCarState(e.target.checked)} className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" />
          <label htmlFor="carState" className="ms-2 text-sm font-medium text-heading-color dark:text-gray-300">{t('Car State')}</label>
        </div>

        {isCarState && (
          <div className="mb-10 mt-10">
            <div className=" mb-5">
              <label htmlFor="car_condition" className="block mb-2 text-sm font-medium">{t('Car Condition')}</label>
              <input type="text" id="car_condition" name="car_condition" value={formData.car_condition} onChange={handleInputChange} className="rounded-lg rounded-e-lg text-gray-900 focus:outline-none focus:border-secondary-color focus:ring focus:ring-secondary-color focus:ring-opacity-100 text-sm block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder={t('Enter car condition')} required />
            </div>

            <div className="mb-5">
              <label htmlFor="car_damage" className="block mb-2 text-sm font-medium">{t('Car Damage')}</label>
              <input type="text" id="car_damage" name="car_damage" value={formData.car_damage} onChange={handleInputChange} className="rounded-lg rounded-e-lg text-gray-900 focus:outline-none focus:border-secondary-color focus:ring focus:ring-secondary-color focus:ring-opacity-100 text-sm block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder={t('Enter car damage details')} required />
            </div>
          </div>
        )}

        <div className="mb-5">
          <label htmlFor="note" className="block mb-2 text-sm font-medium">{t('Note')}</label>
          <input type="text" id="note" name="note" value={formData.note} onChange={handleInputChange} className="rounded-lg rounded-e-lg text-gray-900 focus:outline-none focus:border-secondary-color focus:ring focus:ring-secondary-color focus:ring-opacity-100 text-sm block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder={t('Enter note')} required />
        </div>

        <div className="flex items-center h-5 mt-5 mb-5">
          <input id="print" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" />
          <label htmlFor="print" className="ms-2 text-sm font-medium text-heading-color dark:text-gray-300">{t('Print')}</label>
        </div>

        <div className="mb-5">
          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          {status === 'loading' ? t('Submitting...') : t('Submit')}
          </button>
          <button type="button" className="bg-gray-500 text-white ml-5 mr-5 rounded-md opacity-100 font-medium text-sm w-full sm:w-auto px-5 py-2.5 text-center" onClick={handleGoBack}>{t('Go Back')}</button>
        </div>
        {status === 'success' && (
          <div className="text-green-500">
            {t('Rental Contract added successfully! Redirecting...')}
          </div>
        )}
        {status === 'error' && (
          <div className="text-red-500">
            {errors ? t(errors) : t('An error occurred. Please try again.')}
          </div>
        )}
      </form>

      <SelectTenant isOpen={isSelectTenantOpen} onClose={() => setIsSelectTenantOpen(false)} onSelect={handleTenantSelect} />
      <SelectTenant isOpen={isSelectTenantOpen2} onClose={() => setIsSelectTenantOpen2(false)} onSelect={handleTenantSelect2} />
    </div>
  );
};

export default AddRentalForm;
