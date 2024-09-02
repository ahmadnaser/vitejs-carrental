import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Select from 'react-select';
import { getCars } from '../../../controller/CarController'; 
import { getGarages } from '../../../controller/GarageController'; 
import { getTraders } from '../../../controller/TraderController'; 
import { updateMaintenance, getMaintenanceById } from '../../../controller/MaintenanceController'; 

const EditCarMaintenanceForm = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { maintenanceId } = location.state || {};
  const [formData, setFormData] = useState({
    maintenance_id: maintenanceId,
    vehicle_id: '',
    maintenance_date: '',
    details: '',
    cost: '',
    amount_paid: '',
    trader_id: '',
    trader_name: '',
    spare_parts: '',
    spare_parts_price: '',
    amount_paid_of_spare_parts: '',
    garage_id: '',
    garage_name: '',
    car_mileage: '',
    check_number: '',
    bank_name: '',
    check_holder: '',
    account_number: '',
    check_date: '',
    check_image: null,
    check_number2: '',
    bank_name2: '',
    check_holder2: '',
    account_number2: '',
    check_date2: '',
    check_image2: null,
  });
  const [status, setStatus] = useState(null);
  const [errors, setErrors] = useState({});
  const [cars, setCars] = useState([]);
  const [garages, setGarages] = useState([]);
  const [traders, setTraders] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [selectedGarage, setSelectedGarage] = useState(null);
  const [selectedTrader, setSelectedTrader] = useState(null);
  const [isOilChange, setIsOilChange] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [carsList, garagesList, tradersList, maintenanceData] = await Promise.all([
          getCars(),
          getGarages(),
          getTraders(),
          getMaintenanceById(maintenanceId)
        ]);

        setCars(carsList);
        setGarages(garagesList);
        setTraders(tradersList);
        setFormData(prevFormData => ({
          ...prevFormData,
          ...maintenanceData[0] 
        }));

        const initialCar = carsList.find(car => car.vehicle_id === maintenanceData[0].vehicle_id);
        if (initialCar) {
          setSelectedCar({
            value: initialCar.vehicle_id,
            label: `${initialCar.make} ${initialCar.model} ${initialCar.year} - ${initialCar.vehicle_id}`
          });
        }

        const initialGarage = garagesList.find(garage => garage.garage_id === maintenanceData[0].garage_id);
        if (initialGarage) {
          setSelectedGarage({
            value: initialGarage.garage_id,
            label: initialGarage.name
          });
        }

        const initialTrader = tradersList.find(trader => trader.trader_id === maintenanceData[0].trader_id);
        if (initialTrader) {
          setSelectedTrader({
            value: initialTrader.trader_id,
            label: initialTrader.name
          });
        }

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [maintenanceId]);

  const carOptions = cars.map((car) => ({
    value: car.vehicle_id,
    label: `${car.make} ${car.model} ${car.year} - ${car.vehicle_id}`,
  }));

  const garageOptions = garages.map((garage) => ({
    value: garage.garage_id,
    label: garage.name,
  }));

  const traderOptions = traders.map((trader) => ({
    value: trader.trader_id,
    label: trader.name,
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

  const handleGarageChange = (selectedOption) => {
    setSelectedGarage(selectedOption);
    setFormData((prevFormData) => ({
      ...prevFormData,
      garage_id: selectedOption.value,
      garage_name: selectedOption.label,
    }));
  };

  const handleTraderChange = (selectedOption) => {
    setSelectedTrader(selectedOption);
    setFormData((prevFormData) => ({
      ...prevFormData,
      trader_id: selectedOption.value,
      trader_name: selectedOption.label,
    }));
  };

  const convertToEnglishNumbers = (str) => {
    return str.replace(/[\u0660-\u0669\u06F0-\u06F9]/g, (c) => {
      return c.charCodeAt(0) & 0xF;
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const englishValue = convertToEnglishNumbers(value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: englishValue,
    }));
  };


  const validateForm = () => {
    const errors = {};
    if (!formData.maintenance_date.trim()) errors.maintenance_date = t('Maintenance date is required');
    if (!formData.vehicle_id.trim()) errors.vehicle_id = t('Vehicle is required');
    if (!formData.details.trim()) errors.details = t('Details are required');
    if (!formData.trader_id) errors.trader_id = t('Trader is required');
    if (!formData.spare_parts.trim()) errors.spare_parts = t('Spare parts details are required');
    if (!formData.garage_id) errors.garage_id = t('Garage ID is required');

   
    if (formData.car_mileage ){
      if (!formData.car_mileage.trim()) errors.check_number2 = t('Car Mileage is required');
    }

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

    submissionData.append('trader_name', selectedTrader ? selectedTrader.label : '');
    submissionData.append('garage_name', selectedGarage ? selectedGarage.label : '');

    for (const [key, value] of submissionData.entries()) {
      console.log(`${key}: ${value}`);
    }

    setStatus('loading');
    try {
      const response = await updateMaintenance(submissionData);
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
        <h1 className="text-3xl font-bold text-secondary-color">{t('Edit')}</h1>
        <h3 className="font-bold text-l mt-3 text-heading-color cursor-pointer">{t('Maintenance Record')}</h3>
      </div>

      <form onSubmit={handleSubmit} className={`w-full ${i18n.language === 'ar' ? 'text-right' : 'text-left'} p-10 mt-15 mb-10 max-w-md mx-auto`}>
        <div className="mb-1">
          <label htmlFor="garage" className="block mb-2 text-sm font-medium">{t('Garage')}</label>
          <div className="relative max-w-sm">
            <Select
              id="garage"
              value={selectedGarage}
              onChange={handleGarageChange}
              options={garageOptions}
              placeholder={t('Select Garage')}
              className="rounded-none text-gray-900 focus:outline-none focus:border-secondary-color focus:ring focus:ring-secondary-color focus:ring-opacity-100 text-sm block dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              isDisabled={false}
              styles={customStyles}
              required
            />
          </div>
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
        </div>

        <div className="mb-5">
          <label htmlFor="maintenance-date" className="block mb-2 text-sm font-medium">{t('Maintenance Date')}</label>
            <input 
            id="maintenance-date" 
            name="maintenance_date" 
            type="text" 
            value={formData.maintenance_date} 
            onChange={handleInputChange} 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
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
          <label htmlFor="trader" className="block mb-2 text-sm font-medium">{t('Trader')}</label>
          <Select
            id="trader"
            value={selectedTrader}
            onChange={handleTraderChange}
            options={traderOptions}
            placeholder={t('Select Trader')}
            className="rounded-none rounded-e-lg text-gray-900 focus:outline-none focus:border-secondary-color focus:ring focus:ring-secondary-color focus:ring-opacity-100 text-sm block w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            styles={customStyles}
            isDisabled={false}
            required
          />
        </div>
       
        <div className="mb-5">
          <label htmlFor="spare_parts" className="block mb-2 text-sm font-medium">{t('Spare Parts')}</label>
          <textarea id="spare_parts" name="spare_parts" value={formData.spare_parts} onChange={handleInputChange} className="rounded-lg rounded-e-lg text-gray-900 focus:outline-none focus:border-secondary-color focus:ring focus:ring-secondary-color focus:ring-opacity-100 text-sm block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder={t('Enter spare parts details')} required />
        </div>

        <div className="mb-5">
          <label htmlFor="spare_parts_price" className="block mb-2 text-sm font-medium">{t('Spare Parts Price')}</label>
          <input type="text" id="spare_parts_price" name="spare_parts_price" value={formData.spare_parts_price} onChange={handleInputChange} className="rounded-lg rounded-e-lg text-gray-900 focus:outline-none focus:border-secondary-color focus:ring focus:ring-secondary-color focus:ring-opacity-100 text-sm block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder={t('Enter spare parts price')} required />
        </div>

        <div className="flex items-center h-5 mt-8 mb-5">
          <input
            id="oilCheck"
            type="checkbox"
            checked={isOilChange}
            onChange={(e) => setIsOilChange(e.target.checked)}
            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
          />
          <label htmlFor="oilCheck" className="ms-2 text-sm font-medium text-heading-color dark:text-gray-300">{t('Oil Change?')}</label>
        </div>

        {isOilChange && (
          <div className="mb-10 mt-10">
            <div className="mb-5">
              <label htmlFor="car_mileage" className="block mb-2 text-sm font-medium">{t('Car Mileage')}</label>
              <input
                type="text"
                id="car_mileage"
                name="car_mileage"
                value={formData.car_mileage}
                onChange={handleInputChange}
                className="rounded-lg rounded-e-lg text-gray-900 focus:outline-none focus:border-secondary-color focus:ring focus:ring-secondary-color focus:ring-opacity-100 text-sm block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder={t('Enter car mileage')}
                required
              />
            </div>           
          </div>
        )}

        <div className="flex items-center h-5 mt-8 mb-5">
          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            {status === 'loading' ? t('Submitting...') : t('Submit')}
          </button>
          <button type="button" className="bg-gray-500 text-white m-5 rounded-md opacity-100 font-medium text-sm w-full sm:w-auto px-5 py-2.5 text-center" onClick={handleGoBack}>{t('Go Back')}</button>
        </div>
        {status === 'success' && (
          <div className="text-green-500">
            {t('Maintenance Record updated successfully! Redirecting...')}
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

export default EditCarMaintenanceForm;
