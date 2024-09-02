import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Select from 'react-select';
import { getAvailableCars } from '../../../controller/CarController';
import { addContract } from '../../../controller/RentedCarController';
import { getTenants } from '../../../controller/TenantController';
import { getTenantById } from '../../../controller/TenantController';
import { getCarById } from '../../../controller/CarController';
import {pdf} from '@react-pdf/renderer';
import Contract from '../../paper_documents/Contract';

const AddRentalForm = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    tenant_id: '',
    vehicle_id: '',
    start_date: '',
    end_date: '',
    price_perday: '',
    total_amount: '',
    amount_paid: '',
    car_mileage: '',
    note: '',
  });
  const [status, setStatus] = useState(null);
  const [errors, setErrors] = useState({});
  const [time, setTime] = useState('12:00');
  const [returnTime, setReturnTime] = useState('12:00');
  const [tenants, setTenants] = useState([]);
  const [selectedTenant, setSelectedTenant] = useState(null);
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [isAlternativeDriver, setIsAlternativeDriver] = useState(false);
  const [secondDriverId, setSecondDriverId] = useState(null);
  const [numDays, setNumDays] = useState('');
  const [isBankCheck, setIsBankCheck] = useState(false);
  const [paymentDate, setPaymentDate] = useState('');
  const [isPrintChecked, setIsPrintChecked] = useState(false);
  const [isManualEdit, setIsManualEdit] = useState(false);
  const [bankDetails, setBankDetails] = useState({
    check_number: '',
    bank_name: '',
    check_holder: '',
    account_number: '',
    check_date: '',
    check_image: null,
  });
  const [isCarState, setIsCarState] = useState(false);
  const [carCondition, setCarCondition] = useState({
    car_condition: '',
    car_damage: ''
  });
  const [showCarWarning, setShowCarWarning] = useState(false);

  useEffect(() => {
    if (location.state && location.state.tenantName && location.state.idNumber) {
      const selectedTenantOption = {
        value: location.state.idNumber,
        label: `${location.state.tenantName} - ${location.state.idNumber}`
      };
      setSelectedTenant(selectedTenantOption);
      setFormData(prevFormData => ({
        ...prevFormData,
        tenant_id: location.state.idNumber
      }));
    }

  }, [location.state]);

  useEffect(() => {
    const fetchTenants = async () => {
      try {
        const tenantsList = await getTenants();
        setTenants(tenantsList);
      } catch (error) {
        console.error('Error fetching tenants:', error);
      }
    };

    fetchTenants();
  }, []);

  useEffect(() => {
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
        console.error('Error fetching cars:', error);
      }
    };

    fetchAvailableCars();
  }, [formData.start_date, formData.end_date]);

  const tenantOptions = tenants.map(tenant => ({
    value: tenant.id_number,
    label: `${tenant.tenant_name} - ${tenant.id_number}`
  }));

  const carOptions = cars.map(car => ({
    value: car.vehicle_id,
       label: `(${car.vehicle_id}) - ${car.make} ${car.model} `
  }));

  useEffect(() => {
    if (!isManualEdit) {
      if (formData.start_date && formData.end_date) {
        const from = new Date(formData.start_date);
        const to = new Date(formData.end_date);
        if (to < from) return;
        const diffTime = Math.abs(to - from);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        setNumDays(diffDays);
      }
    }
  }, [formData.start_date, formData.end_date]);
  
  useEffect(() => {
    if (isManualEdit && formData.start_date && numDays) {
      const from = new Date(formData.start_date);
      from.setDate(from.getDate() + parseInt(numDays, 10) - 1);
      setFormData(prevFormData => ({
        ...prevFormData,
        end_date: from.toISOString().split('T')[0],
      }));
    }
  }, [numDays, isManualEdit]);

  
  useEffect(() => {
    const arabicToEnglishMap = {
        '٠': '0',
        '١': '1',
        '٢': '2',
        '٣': '3',
        '٤': '4',
        '٥': '5',
        '٦': '6',
        '٧': '7',
        '٨': '8',
        '٩': '9'
    };

    const convertArabicNumbers = (input) => {
        if (typeof input !== 'string') {
            input = String(input);
        }
        return input.replace(/[٠-٩]/g, (match) => arabicToEnglishMap[match]);
    };

    if (formData.price_perday && numDays) {
        const pricePerDay = parseFloat(convertArabicNumbers(formData.price_perday));
        const days = parseInt(convertArabicNumbers(numDays), 10);

        if (!isNaN(pricePerDay) && !isNaN(days)) {
            const totalAmount = pricePerDay * days;
            setFormData(prevFormData => ({
                ...prevFormData,
                total_amount: totalAmount
            }));
        }
    }
  }, [formData.price_perday, numDays]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleAddNewClick = () => {
    navigate('/tenants/add-tenants');
  };

  const handleTenantChange = (selectedOption) => {
    setSelectedTenant(selectedOption);
    setFormData(prevFormData => ({
      ...prevFormData,
      tenant_id: selectedOption.value
    }));
  };

  const handleTenantChange2 = (selectedOption) => {
    setSecondDriverId(selectedOption);
    setFormData(prevFormData => ({
      ...prevFormData,
      secondDriverId: selectedOption.value
    }));
  };

  const handleCarChange = (selectedOption) => {
    setSelectedCar(selectedOption);
    setFormData(prevFormData => ({
      ...prevFormData,
      vehicle_id: selectedOption.value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleBankDetailsChange = (e) => {
    const { name, value, files } = e.target;
    setBankDetails(prevDetails => ({
      ...prevDetails,
      [name]: files ? files[0] : value
    }));
  };

  const handleCarConditionChange = (e) => {
    const { name, value } = e.target;
    setCarCondition(prevCondition => ({
      ...prevCondition,
      [name]: value
    }));
  };
  const handleNumDaysChange = (e) => {
    setIsManualEdit(true); 
    setNumDays(e.target.value);
  };
  
  const handleStartDateChange = (e) => {
    setIsManualEdit(false); 
    setFormData(prevFormData => ({
      ...prevFormData,
      start_date: e.target.value,
    }));
  };
  
  const handleEndDateChange = (e) => {
    setIsManualEdit(false); 
    setFormData(prevFormData => ({
      ...prevFormData,
      end_date: e.target.value,
    }));
  };

  const handlePrintClick = async (form) => {
    setStatus('loading');
    try {
      const tenantData = await getTenantById(form.tenant_id);
      const carData = await getCarById(form.vehicle_id);
  
      const blob = await pdf(<Contract formData={form} tenant={tenantData} car={carData} />).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `contract_${tenantData.tenant_name}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (err) {
      setErrors({ form: err.message });
    } finally {
      setStatus(null);
    }
  };
  

  const validateForm = () => {
    const errors = {};
    const arabicNumberRegex = /[٠-٩]/g;
    const arabicDecimalRegex = /٫/g; 
    const onlyNumbersRegex = /^[0-9]+(\.[0-9]+)?$/; 

    const convertArabicNumbers = (input) => {
        if (typeof input !== 'string') {
            input = String(input);
        }

        const arabicToEnglishMap = {
            '٠': '0',
            '١': '1',
            '٢': '2',
            '٣': '3',
            '٤': '4',
            '٥': '5',
            '٦': '6',
            '٧': '7',
            '٨': '8',
            '٩': '9'
        };

        return input.replace(arabicNumberRegex, (match) => arabicToEnglishMap[match])
        .replace(arabicDecimalRegex, '.'); 
    };

    const validateNumericField = (fieldValue, fieldName, errorMessage) => {
        const convertedValue = convertArabicNumbers(fieldValue);

        setFormData(prevFormData => ({
            ...prevFormData,
            [fieldName]: convertedValue
        }));

        if (!onlyNumbersRegex.test(convertedValue)) {
            errors[fieldName] = t(`${errorMessage} must be a valid number`);
        } else if (convertedValue.trim() === '') {
            errors[fieldName] = t(`${errorMessage} is required`);
        }
    };

    if (!formData.start_date.trim()) errors.start_date = t('Start date is required');
    if (!formData.end_date.trim()) errors.end_date = t('End date is required');
    if (!formData.vehicle_id.trim()) errors.vehicle_id = t('Vehicle is required');
    if (!formData.car_mileage.trim()) errors.car_mileage = t('Car Mileage is required');
    if (!formData.note.trim()) errors.note = t('Note is required');

    validateNumericField(formData.price_perday, 'price_perday', 'Price per day');
    validateNumericField(formData.total_amount, 'total_amount', 'Total amount');
    validateNumericField(formData.amount_paid, 'amount_paid', 'Amount paid');

    if (isBankCheck) {
        validateNumericField(bankDetails.check_number, 'check_number', 'Check number');
        if (!bankDetails.bank_name.trim()) errors.bank_name = t('Bank name is required');
        if (!paymentDate.trim()) errors.check_date = t('Check date is required');
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setStatus('error');
      setErrors({ form: 'Invalid Form, please fill in all required fields' });
      return;
    }

    const startTimestamp = `${formData.start_date}T${time}:00`;
    const endTimestamp = `${formData.end_date}T${returnTime}:00`;

    const submissionData = new FormData();

    submissionData.append('start_timestamp', startTimestamp);
    submissionData.append('end_timestamp', endTimestamp);

    Object.keys(formData).forEach((key) => {
      if (key !== 'start_date' && key !== 'end_date') {
        submissionData.append(key, formData[key]);
      }
    });

    if (isBankCheck) {
      Object.keys(bankDetails).forEach((key) => {
        if (key === 'check_image') {
          if (bankDetails[key]) {
            submissionData.append(key, bankDetails[key]);
          }
        } else {
          submissionData.append(key, bankDetails[key]);
          submissionData.append('check_date', paymentDate);
        }
      });
    }

    
    if (isCarState) {
      Object.keys(carCondition).forEach((key) => {
        submissionData.append(key, carCondition[key]);
      });
    }
    
    setStatus('loading');
    try {
      const response = await addContract(submissionData);
      if (response.success) {
        setStatus('success');

        if (isPrintChecked) {
          await handlePrintClick(formData); 
        }

        setTimeout(() => navigate(-1), 2000);
      } else {
        setStatus('error');
        if (response.message) {
          setErrors({form:response.message});
        } else {
          setErrors({ form: response.message });
        }
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
        <h3 className="font-bold text-l mt-3 text-heading-color cursor-pointer">{t('Rental contracts')}</h3>
      </div>

      <form onSubmit={handleSubmit} className={`w-full ${i18n.language === 'ar' ? 'text-right' : 'text-left'} p-10 mt-15 mb-10 max-w-md mx-auto`}>
        <div className="mb-1">
          <label htmlFor="tenant" className="block mb-2 text-sm font-medium">{t('Tenants')}</label>
          <div className="relative max-w-sm">
            <Select
              id="tenants"
              value={selectedTenant}
              onChange={handleTenantChange}
              options={tenantOptions}
              placeholder={t('Name of Tenants or ID Number')}
              className="rounded-none text-gray-900 focus:outline-none focus:border-secondary-color focus:ring focus:ring-secondary-color focus:ring-opacity-100 text-sm block dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              isDisabled={false}
              styles={customStyles}
              required
            />
          </div>
        </div>
        <div className='flex mt-0 mb-5 space-x-5'>
          <h6 className="font-bold text-sm mt-3 text-blue-400 cursor-pointer" onClick={handleAddNewClick}>{t('Add Tenant')}</h6>
        </div>
        <div className="flex items-center h-5 mt-5 mb-5">
          <input id="alternative-driver" type="checkbox" checked={isAlternativeDriver} onChange={(e) => setIsAlternativeDriver(e.target.checked)} className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" />
          <label htmlFor="alternative-driver" className="ms-2 text-sm font-medium text-heading-color dark:text-gray-300">{t('Alternative driver ?')}</label>
        </div>
        {isAlternativeDriver && (
          <div className="mb-10 mt-10">
            <label htmlFor="tenant2" className="block mb-2 text-sm font-medium">{t('Alternative Driver')}</label>
            <div className="relative max-w-sm">
              <Select
                id="tenant2"
                value={secondDriverId}
                onChange={handleTenantChange2}
                options={tenantOptions}
                placeholder={t('Name of Tenants or ID Number')}
                className="rounded-none rounded-e-lg text-gray-900 focus:outline-none focus:border-secondary-color focus:ring focus:ring-secondary-color focus:ring-opacity-100 text-sm block dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                styles={customStyles}
                isDisabled={false}
                required
              />
            </div>
            <div className='flex mt-0 mb-5 space-x-5'>
              <h6 className="font-bold text-sm mt-3 text-blue-400 cursor-pointer" onClick={handleAddNewClick}>{t('Add Tenant')}</h6>
            </div>
          </div>
        )}

      <div className="mb-5">
          <label htmlFor="from-date" className="block mb-2 text-sm font-medium">{t('Start Date')}</label>
          <input 
            id="from-date" 
            name="start_date" 
            type="date" 
          
            onChange={handleStartDateChange} 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-5">
          <label htmlFor="start_time" className="block mb-2 text-sm font-medium">{t('Start Time')}</label>
          <input 
            id="timepicker" 
            type="time" 
            value={time} 
            onChange={(e) => setTime(e.target.value)} 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-5">
          <label htmlFor="numDays" className="block mb-2 text-sm font-medium">{t('Number of Days')}</label>
          <input 
            type="text" 
            id="numDays" 
            value={numDays} 
            onChange={handleNumDaysChange}  
            className="rounded-lg text-gray-900 focus:outline-none focus:border-secondary-color focus:ring focus:ring-secondary-color focus:ring-opacity-100 text-sm block w-full"
            placeholder={t('Number of Days')} 
            required 
          />
        </div>

        <div className="mb-5">
          <label htmlFor="to_date" className="block mb-2 text-sm font-medium">{t('End Date')}</label>
          <input 
            id="to_date" 
            name="end_date" 
            type="date" 
            value={formData.end_date} 
            onChange={handleEndDateChange} 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-5">
          <label htmlFor="end_time" className="block mb-2 text-sm font-medium">{t('Return Time')}</label>
          <input 
            id="return-timepicker" 
            type="time" 
            value={returnTime} 
            onChange={(e) => setReturnTime(e.target.value)} 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

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
          <input type="text" id="total_amount" name="total_amount" value={formData.total_amount} onChange={handleInputChange} className="rounded-lg rounded-e-lg text-gray-900 focus:outline-none focus:border-secondary-color focus:ring focus:ring-secondary-color focus:ring-opacity-100 text-sm block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder={t('Enter total amount')} required readOnly />
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
              <input type="text" id="check_number" name="check_number" value={bankDetails.check_number} onChange={handleBankDetailsChange} className="rounded-lg rounded-e-lg text-gray-900 focus:outline-none focus:border-secondary-color focus:ring focus:ring-secondary-color focus:ring-opacity-100 text-sm block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder={t('Enter check number')} required />
            </div>

            <div className="mb-5">
              <label htmlFor="bank_name" className="block mb-2 text-sm font-medium">{t('Bank Name')}</label>
              <input type="text" id="bank_name" name="bank_name" value={bankDetails.bank_name} onChange={handleBankDetailsChange} className="rounded-lg rounded-e-lg text-gray-900 focus:outline-none focus:border-secondary-color focus:ring focus:ring-secondary-color focus:ring-opacity-100 text-sm block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder={t('Enter bank name')} required />
            </div>

            <div className="mb-5">
              <label htmlFor="account_number" className="block mb-2 text-sm font-medium">{t('Account Number')}</label>
              <input type="text" id="account_number" name="account_number" value={bankDetails.account_number} onChange={handleBankDetailsChange} className="rounded-lg rounded-e-lg text-gray-900 focus:outline-none focus:border-secondary-color focus:ring focus:ring-secondary-color focus:ring-opacity-100 text-sm block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder={t('Account Number')} required />
            </div>

            <div className="mb-5">
              <label htmlFor="check_holder" className="block mb-2 text-sm font-medium">{t('Check Holder')}</label>
              <input type="text" id="check_holder" name="check_holder" value={bankDetails.check_holder} onChange={handleBankDetailsChange} className="rounded-lg rounded-e-lg text-gray-900 focus:outline-none focus:border-secondary-color focus:ring focus:ring-secondary-color focus:ring-opacity-100 text-sm block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder={t('Check holder')} required />
            </div>

            <div className="mb-5">
              <label htmlFor="check_date" className="block mb-2 text-sm font-medium">{t('Due Date')}</label>
              <input
                type="date"
                id="check_date"
                name="check_date"
                value={paymentDate}
                onChange={(e) => setPaymentDate(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="check_image"
                className={`block mb-2 text-sm font-medium ${i18n.language === 'ar' ? 'text-right' : 'text-left'}`}
              >
                {t('Copy of Check')}
              </label>
              <input
                name="check_image"
                className={`block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 ${
                  i18n.language === 'ar' ? 'pr-4' : 'pl-4'
                }`}
                type="file"
                onChange={handleBankDetailsChange}
                required
              />
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
              <input type="text" id="car_condition" name="car_condition" value={carCondition.car_condition} onChange={handleCarConditionChange} className="rounded-lg rounded-e-lg text-gray-900 focus:outline-none focus:border-secondary-color focus:ring focus:ring-secondary-color focus:ring-opacity-100 text-sm block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder={t('Enter car condition')} required />
            </div>

            <div className="mb-5">
              <label htmlFor="car_damage" className="block mb-2 text-sm font-medium">{t('Car Damage')}</label>
              <input type="text" id="car_damage" name="car_damage" value={carCondition.car_damage} onChange={handleCarConditionChange} className="rounded-lg rounded-e-lg text-gray-900 focus:outline-none focus:border-secondary-color focus:ring focus:ring-secondary-color focus:ring-opacity-100 text-sm block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder={t('Enter car damage details')} required />
            </div>
          </div>
        )}

        <div className="mb-5">
          <label htmlFor="note" className="block mb-2 text-sm font-medium">{t('Note')}</label>
          <input type="text" id="note" name="note" value={formData.note} onChange={handleInputChange} className="rounded-lg rounded-e-lg text-gray-900 focus:outline-none focus:border-secondary-color focus:ring focus:ring-secondary-color focus:ring-opacity-100 text-sm block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder={t('Enter note')} required />
        </div>

        <div className="flex items-center h-5 mt-8 mb-5">
          <input 
            id="print" 
            type="checkbox" 
            checked={isPrintChecked} 
            onChange={(e) => setIsPrintChecked(e.target.checked)} 
            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" 
          />
          <label htmlFor="print" className="ms-2 text-sm font-medium text-heading-color dark:text-gray-300">
            {t('Print?')}
          </label>
        </div>


        <div className="flex items-center h-5 mt-8 mb-5">
          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            {status === 'loading' ? t('Submitting...') : t('Submit')}
          </button>
          <button type="button" className="bg-gray-500 text-white m-5 rounded-md opacity-100 font-medium text-sm w-full sm:w-auto px-5 py-2.5 text-center" onClick={handleGoBack}>{t('Go Back')}</button>
        </div>
        {status === 'success' && (
          <div className="text-green-500">
            {t('Rental Contract added successfully! Redirecting...')}
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

export default AddRentalForm;
