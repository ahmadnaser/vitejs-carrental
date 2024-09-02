import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Select from 'react-select';
import { getAvailableCars } from '../../../controller/CarController';
import { getReservationById, updateReservation } from '../../../controller/ReservationsController';
import { getTenants } from '../../../controller/TenantController';

const EditReservationForm = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { reservationId } = location.state || {}; 
  const [formData, setFormData] = useState({
    reservation_id: reservationId,
    tenant_id: '',
    vehicle_id: '',
    start_date: '',
    end_date: '',
    price_perday: '',
    total_amount: '',   
  });
  
  const [status, setStatus] = useState(null);
  const [errors, setErrors] = useState({});
  const [tenants, setTenants] = useState([]);
  const [selectedTenant, setSelectedTenant] = useState(null);
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [showCarWarning, setShowCarWarning] = useState(false);
  const [time, setTime] = useState('');
  const [returnTime, setReturnTime] = useState('');
  const [isAlternativeDriver, setIsAlternativeDriver] = useState(true);
  const [numDays, setNumDays] = useState('');
  const [secondDriverId, setSecondDriverId] = useState(null);
  const [isManualEdit, setIsManualEdit] = useState(false);

  const fetchTenants = async () => {
    try {
      const tenantsList = await getTenants();
      setTenants(tenantsList);
    } catch (error) {
      console.error('Error fetching tenants:', error);
    }
  };

  useEffect(() => {
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

  const fetchReservationData = async () => {
    if (!reservationId) return;
    try {
      const reservation = await getReservationById(reservationId);
      if (reservation) {
        const reservationData = reservation;

        const endDateTime = new Date(reservationData[0].end_date);
        const endDate = `${endDateTime.getFullYear()}-${String(endDateTime.getMonth() + 1).padStart(2, '0')}-${String(endDateTime.getDate()).padStart(2, '0')}`;
        const returnTime = `${String(endDateTime.getHours()).padStart(2, '0')}:${String(endDateTime.getMinutes()).padStart(2, '0')}`;

        const startDateTime = new Date(reservationData[0].start_date);
        const startDate = `${startDateTime.getFullYear()}-${String(startDateTime.getMonth() + 1).padStart(2, '0')}-${String(startDateTime.getDate()).padStart(2, '0')}`;
        const startTime = `${String(startDateTime.getHours()).padStart(2, '0')}:${String(startDateTime.getMinutes()).padStart(2, '0')}`;

        setFormData({
          reservation_id: reservationId,
          tenant_id: reservationData[0].tenant_id || '',
          vehicle_id: reservationData[0].vehicle_id || '',
          start_date: startDate,
          end_date: endDate,
          price_perday: reservationData[0].price_perday || '',
          total_amount: reservationData[0].total_amount || '', 
        });

        setTime(startTime); 
        setReturnTime(returnTime);
        setSelectedTenant({ value: reservationData[0].tenant_id, label: `${reservationData[0].tenant_name} - ${reservationData[0].tenant_id}` });
        setSecondDriverId({ value: reservationData[0].second_driver_id, label: `${reservationData[0].second_driver_name} - ${reservationData[0].second_driver_id}` });
        setSelectedCar({ value: reservationData[0].vehicle_id, label: `${reservationData[0].make} ${reservationData[0].model} - ${reservationData[0].vehicle_id}` });
      }
    } catch (error) {
      console.error('Error fetching reservation data:', error);
    }
  };

  useEffect(() => {
    fetchReservationData();
  }, [reservationId]);

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

  const tenantOptions = tenants.map(tenant => ({
    value: tenant.id_number,
    label: `${tenant.tenant_name} - ${tenant.id_number}`
  }));

  const carOptions = cars.map(car => ({
    value: car.vehicle_id,
    label: `${car.make} ${car.model} ${car.year} - ${car.vehicle_id}`
  }));

  const handleTenantChange = (selectedOption) => {
    setSelectedTenant(selectedOption);
    setFormData(prevFormData => ({
      ...prevFormData,
      tenant_id: selectedOption.value,
    }));
  };

  const handleTenantChange2 = (selectedOption) => {
    setSecondDriverId(selectedOption);
    setFormData(prevFormData => ({
      ...prevFormData,
      secondDriverId: selectedOption.value,
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
      [name]: value,
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
  }


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
        '٩': '9',
        '٫': '.'
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
  
      if (convertedValue.trim() === '') {
        errors[fieldName] = t(`${errorMessage} is required`);
      } else if (!onlyNumbersRegex.test(convertedValue)) {
        errors[fieldName] = t(`${errorMessage} must be a valid number`);
      }
    };
  
    if (!formData.start_date.trim()) errors.start_date = t('Start date is required');
    if (!formData.end_date.trim()) errors.end_date = t('End date is required');
    validateNumericField(formData.price_perday, 'price_perday', 'Price per day');
    validateNumericField(formData.total_amount, 'total_amount', 'Total amount');
  
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
  
    setStatus('loading');
    try {
      const submissionData = {
        ...formData,
        start_date: `${formData.start_date}T${time}:00`,
        end_date: `${formData.end_date}T${returnTime}:00`,
        second_driver_id: secondDriverId?.value || null, 
      };
      const response = await updateReservation(reservationId, submissionData);
      
      if (response.success) {
        setStatus('success');
        fetchTenants();
        setTimeout(() => navigate(-1), 2000);
      } else {
        setStatus('error');
        setErrors({ form: response.message });
      }
    } catch (error) {
      setStatus('error');
      setErrors({ form: error.message });
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
        <h1 className="text-3xl font-bold text-secondary-color">{t('Edit Reservation')}</h1>
      </div>

      <form onSubmit={handleSubmit} className={`w-full ${i18n.language === 'ar' ? 'text-right' : 'text-left'} p-10 mt-15 mb-10 max-w-md mx-auto`}>
        <div className="mb-5">
          <label htmlFor="tenant" className="block mb-2 text-sm font-medium">{t('Tenant')}</label>
          <Select
            id="tenant"
            value={selectedTenant}
            onChange={handleTenantChange}
            options={tenantOptions}
            placeholder={t('Select Tenant')}
            className="rounded-lg text-gray-900 focus:outline-none focus:border-secondary-color focus:ring focus:ring-secondary-color focus:ring-opacity-100 text-sm block w-full"
            styles={customStyles}
            required
          />
        </div>

        <div className="flex items-center h-5 mt-5 mb-5">
          <input 
            id="alternative-driver" 
            type="checkbox" 
            checked={isAlternativeDriver} 
            onChange={(e) => setIsAlternativeDriver(e.target.checked)} 
            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" 
          />
          <label htmlFor="alternative-driver" className="ms-2 text-sm font-medium text-heading-color dark:text-gray-300">
            {t('Alternative driver ?')}
          </label>
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
          </div>
        )}

        <div className="mb-5">
          <label htmlFor="car" className="block mb-2 text-sm font-medium">{t('Car')}</label>
          <Select
            id="car"
            value={selectedCar}
            onChange={handleCarChange}
            options={carOptions}
            placeholder={t('Select Car')}
            className="rounded-lg text-gray-900 focus:outline-none focus:border-secondary-color focus:ring focus:ring-secondary-color focus:ring-opacity-100 text-sm block w-full"
            styles={customStyles}
            required
          />
          {showCarWarning && <p className="text-red-500 mt-2">{t('Please select start and end date to get available cars')}</p>}
        </div>

        <div className="mb-5">
          <label htmlFor="start_date" className="block mb-2 text-sm font-medium">{t('Start Date')}</label>
          <input 
            id="start_date" 
            name="start_date" 
            type="date" 
            value={formData.start_date} 
            onChange={handleStartDateChange} 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-5">
          <label htmlFor="time" className="block mb-2 text-sm font-medium">{t('Start Time')}</label>
          <input 
            id="time" 
            type="time" 
            value={time} 
            onChange={(e) => setTime(e.target.value)} 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-5">
          <label htmlFor="end_date" className="block mb-2 text-sm font-medium">{t('End Date')}</label>
          <input 
            id="end_date" 
            name="end_date" 
            type="date" 
            value={formData.end_date} 
            onChange={handleEndDateChange} 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-5">
          <label htmlFor="return_time" className="block mb-2 text-sm font-medium">{t('Return Time')}</label>
          <input 
            id="return_time" 
            type="time" 
            value={returnTime} 
            onChange={(e) => setReturnTime(e.target.value)} 
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
          <label htmlFor="price_perday" className="block mb-2 text-sm font-medium">{t('Price Per Day')}</label>
          <input 
            type="text" 
            id="price_perday" 
            name="price_perday" 
            value={formData.price_perday} 
            onChange={handleInputChange} 
            className="rounded-lg text-gray-900 focus:outline-none focus:border-secondary-color focus:ring focus:ring-secondary-color focus:ring-opacity-100 text-sm block w-full"
            placeholder={t('Enter price per day')} 
            required 
          />
        </div>

        <div className="mb-5">
          <label htmlFor="total_amount" className="block mb-2 text-sm font-medium">{t('Total Amount')}</label>
          <input 
            type="text" 
            id="total_amount" 
            name="total_amount" 
            value={formData.total_amount} 
            onChange={handleInputChange} 
            className="rounded-lg text-gray-900 focus:outline-none focus:border-secondary-color focus:ring focus:ring-secondary-color focus:ring-opacity-100 text-sm block w-full"
            placeholder={t('Enter total amount')} 
            required readOnly
          />
        </div>

       
        <div className="flex items-center h-5 mt-8 mb-5">
          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            {status === 'loading' ? t('Editing...') : t('Edit')}
          </button>
          <button type="button" className="bg-gray-500 text-white m-5 rounded-md opacity-100 font-medium text-sm w-full sm:w-auto px-5 py-2.5 text-center" onClick={handleGoBack}>{t('Go Back')}</button>
        </div>

        {status === 'success' && (
          <div className="text-green-500">
            {t('Reservation Updated successfully! Redirecting...')}
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

export default EditReservationForm;