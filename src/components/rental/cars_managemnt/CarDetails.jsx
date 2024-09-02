import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getCarById, getCars } from '../../../controller/CarController';
import Select from 'react-select';
import { useLocation } from 'react-router-dom';

async function loadConfig() {
  const config = await import('../../../../config.json', {
    assert: { type: 'json' }
  });
  return config.default;
}

let config;

async function initializeConfig() {
  config = await loadConfig();
}

initializeConfig().catch(error => {
  console.error("Failed to load configuration:", error);
});

const CarDetails = () => {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState('Summary');
  const [car, setCar] = useState(null);
  const [selectedCar, setSelectedCar] = useState(null);
  const [cars, setCars] = useState([]);
  const location = useLocation();
  const { carId } = location.state || {};

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const carsList = await getCars();
        setCars(carsList);
        const initialCar = carsList.find(car => car.vehicle_id === carId);
        if (initialCar) {
          setSelectedCar({
            value: initialCar.vehicle_id,
            label: `${initialCar.make} - ${initialCar.model}`
          });
          setCar(initialCar);
        }
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };

    fetchCars();
  }, [carId]);

  useEffect(() => {
    const fetchCarData = async () => {
      if (selectedCar) {
        try {
          const carData = await getCarById(selectedCar.value);
          setCar(carData);
          console.log(carData);
        } catch (error) {
          console.error('Error fetching car data:', error);
        }
      }
    };

    fetchCarData();
  }, [selectedCar]);

  if (!car) {
    return <div>{t('Loading...')}</div>;
  }

  const handleCarChange = (selectedOption) => {
    setSelectedCar(selectedOption);
  };

  const carOptions = cars.map(car => ({
    value: car.vehicle_id,
    label: `${car.make} - ${car.model}`
  }));

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
      <div className={`w-full ${i18n.language === 'ar' ? 'text-right' : 'text-left'} p-10 mt-20`}>
        <h1 className="text-3xl font-bold text-secondary-color">{t('Car Profile')}</h1>
        <div className="mb-1 mt-5 max-w-[250px]">
          <Select
            id="cars"
            value={selectedCar}
            onChange={handleCarChange}
            options={carOptions}
            placeholder={t('Make or Model')}
            className="rounded-none text-gray-900 focus:outline-none focus:border-secondary-color focus:ring focus:ring-secondary-color focus:ring-opacity-100 text-sm block dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            isDisabled={false}
            styles={customStyles}
            required
          />
        </div>
      </div>

      <div className="flex flex-col items-center">
        <nav className="border-b border-gray-100 mb-8">
          <div className="flex flex-wrap justify-around sm:justify-start sm:space-x-8" aria-label="Tabs">
            {[t('Summary'), t('Insurance Image'), t('License Image')].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === tab ? 'border-secondary-color text-secondary-color' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </nav>
      </div>

      {activeTab === t('Summary') && (
        <div className="w-full max-w-screen-lg px-4 sm:px-6 lg:px-8 text-black">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div className='bg-white p-4 rounded-xl'>
              <h3 className="text-lg font-bold mb-2">{t('Car Information')}</h3>
              <div className="space-y-2">
                <div><strong>{t('Make')}:</strong> {car.make}</div>
                <div><strong>{t('Model')}:</strong> {car.model}</div>
                <div><strong>{t('Year')}:</strong> {car.year}</div>
                <div><strong>{t('License Plate')}:</strong> {car.vehicle_id}</div>
                <div><strong>{t('Milage')}:</strong> {car.mileage}</div>
                <div><strong>{t('Color')}:</strong> {car.color}</div>
              </div>
            </div>

            <div className='bg-white p-4 rounded-xl'>
              <h3 className="text-lg font-bold mb-2">{t('Maintenance/Billing')}</h3>
              <div className="space-y-2">
                <div><strong>{t('Maintenance Costs')}:</strong> {car.maintenance_costs} {t('Shekel')}</div>
                <div><strong>{t('Insurance Cost')}:</strong> {car.insurance_cost} {t('Shekel')}</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className='bg-white p-4 rounded-xl'>
              <h3 className="text-lg font-bold mb-2">{t('About Insurance')}</h3>
              <div className="space-y-2">
                <div><strong>{t('Insurance start date')}:</strong> {car.insurance_start_date}</div>
                <div><strong>{t('Insurance expiry date')}:</strong> {car.insurance_expiry_date}</div>
              </div>
            </div>

            <div className='bg-white p-4 rounded-xl'>
              <h3 className="text-lg font-bold mb-2">{t('About License')}</h3>
              <div className="space-y-2">
                <div><strong>{t('License start date')}:</strong> {car.license_start_date}</div>
                <div><strong>{t('License expiry date')}:</strong> {car.license_expiry_date}</div>
              </div>
            </div>

            
            <div className="sm:col-span-2 flex justify-center">
              <div className='bg-white p-4 rounded-xl max-w-sm w-full'>
                <h3 className="text-lg font-bold mb-2">{t('About Oil Change')}</h3>
                <div className="space-y-2">
                  <div><strong>{t('Last oil change miles')}:</strong> {car.last_oil_change_miles}</div>
                  <div><strong>{t('Last oil change date')}:</strong> {car.last_oil_change_date}</div>
                  <div><strong>{t('Oil change every (km)')}:</strong> {car.change_oil_every_km}</div>
                  <div><strong>{t('Oil change every (month)')}:</strong> {car.change_oil_every_month}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}



      {activeTab === t('Insurance Image') && (
        <div className="w-full max-w-screen-lg px-4 sm:px-6 lg:px-8 mb-6 text-black flex items-center justify-center" style={{ height: '100%' }}>
          {car.insurance_image ? (
            <img src={`${config.BaseURL}${car.insurance_image}`} alt={t('Car Insurance')} className="max-w-full h-auto" />
          ) : (
            <p className="text-white text-2xl text-center">{t('No insurance image available')}</p>
          )}
        </div>
      )}

      {activeTab === t('License Image') && (
        <div className="w-full max-w-screen-lg px-4 sm:px-6 lg:px-8 mb-6 text-black flex items-center justify-center" style={{ height: '100%' }}>
          {car.license_image ? (
            <img src={`${config.BaseURL}${car.license_image}`} alt={t('Car License')} className="max-w-full h-auto" />
          ) : (
            <p className="text-white text-2xl text-center">{t('No license image available')}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CarDetails;
