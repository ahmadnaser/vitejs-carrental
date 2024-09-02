import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getCars } from '../../../controller/CarController';
import { getMaintenanceRecords, getMaintenanceByVehicleId,deleteMaintenanceById } from '../../../controller/MaintenanceController';
import { useTranslation } from 'react-i18next';
import Select from 'react-select';

const CarsMaintenanceTable = () => {
  const { t, i18n } = useTranslation();
  const [maintenanceData, setMaintenanceData] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState({ value: 'all', label: t('All Cars') });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const carsList = await getCars();
        setCars([
          { value: 'all', label: t('All Cars') },
          ...carsList.map(car => ({
            value: car.vehicle_id,
               label: `(${car.vehicle_id}) - ${car.make} ${car.model} `
          }))
        ]);
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };

    fetchCars();
  }, [t]);

  const fetchMaintenanceRecords = async () => {
    try {
      let records;
      if (selectedCar.value !== 'all') {
        records = await getMaintenanceByVehicleId(selectedCar.value);
        if (records.message === 'No maintenance records found for the given vehicle ID') {
          records = [];
        }
      } else {
        records = await getMaintenanceRecords();
      }
      setMaintenanceData(records);
    } catch (error) {
      console.error('Error fetching maintenance records:', error);
      setMaintenanceData([]); 
    }
  };

  useEffect(() => {
    fetchMaintenanceRecords();
  }, [selectedCar]);

  const handleCarChange = (selectedOption) => {
    setSelectedCar(selectedOption);
  };

  const handleAddNewClick = () => {
    navigate('/expenses/car-maintenance/add-maintenance');
  };

  const handleDelete = async (maintenance_id) => {
    const deleteConfirmation = window.confirm(
      `${t('Are you sure you want to delete the maintenance')} ` +
      `(${maintenance_id})?`,
      'color: red; font-weight: bold;'
    );
  
    if (deleteConfirmation) {
      try {
        const result = await deleteMaintenanceById(maintenance_id);
        if (result.success) {
          alert(t('Maintenance deleted successfully'));
          fetchMaintenanceRecords();
        } else {
          alert(t(`Failed to delete Maintenance: ${result.message}`));
        }
      } catch (error) {
        console.error('Error deleting Maintenance:', error);
        alert(t('An error occurred while trying to delete the Maintenance.'));
      }
    }
  };

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedItems = React.useMemo(() => {
    let sortableItems = [...maintenanceData];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [maintenanceData, sortConfig]);

  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  return (
    <div className={`flex flex-col items-center min-h-screen bg-bodyBg-color text-heading-color ${i18n.language === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className={`w-full ${i18n.language === 'ar' ? 'text-right' : 'text-left'} p-10 mt-20 mb-10`}>
        <h1 className="text-3xl font-bold text-secondary-color">{t('Cars Maintenance')}</h1>
        <h3 className="font-bold text-l mt-3 cursor-pointer text-blue-400" onClick={handleAddNewClick}>
          {t('Add New')}
        </h3>
      </div>
      <div className="relative overflow-x-auto shadow-md w-full max-w-8xl px-4 sm:px-5 lg:px-8 md:px-8 mb-10 rounded-lg mt-8">
        <div className="flex items-center justify-center pb-4 mb-10">
        <Select
            id="car"
            value={selectedCar}
            onChange={handleCarChange}
            options={cars}
            placeholder={t('Select Car')}
            className="text-gray-900 focus:outline-none focus:border-secondary-color focus:ring focus:ring-secondary-color focus:ring-opacity-100 text-sm block w-1/3 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            styles={{
              control: (provided) => ({
                ...provided,
                backgroundColor: '#ffffff',
                color: '#000000',
                border: '1px solid #ccc',
                boxShadow: 'none',
                '&:hover': {
                  border: '1px solid #888',
                },
              }),
              singleValue: (provided) => ({
                ...provided,
                color: '#000000',
              }),
              menu: (provided) => ({
                ...provided,
                backgroundColor: '#ffffff',
                color: '#000000',
                zIndex: 9999, 
              }),
              option: (provided, state) => ({
                ...provided,
                backgroundColor: state.isSelected ? '#cccccc' : state.isFocused ? '#f0f0f0' : '#ffffff',
                color: '#000000',
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: '#f0f0f0',
                },
              }),
              menuList: (provided) => ({
                ...provided,
                maxHeight: '200px',
                overflowY: 'auto',
              }),
            }}
            isDisabled={false}
            required
          />

        </div>
        <table dir={i18n.language === 'ar' ? 'rtl' : 'ltr'} className="w-full text-sm text-gray-800 dark:text-gray-100 rounded-lg">
          <thead className="text-xs text-gray-900 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-3 py-3 cursor-pointer" onClick={() => requestSort('vehicle_id')}>
                <div className="flex items-center justify-center">
                  {t('Car')}
                  <svg className={`w-4 h-3 ms-1.5 ${getClassNamesFor('vehicle_id')}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                  </svg>
                </div>
              </th>
              <th scope="col" className="px-3 py-3 cursor-pointer" >
                <div className="flex items-center  justify-center">
                  {t('Garage')}
                </div>
              </th>
              <th scope="col" className="px-5 py-3 cursor-pointer" >
                <div className="flex items-center  justify-center">
                  {t('Maintenance')}
              
                </div>
              </th>
              <th scope="col" className="px-2 py-3 cursor-pointer" >
                <div className="flex items-center  justify-center">
                  {t('Garage Cost')}
                 
                </div>
              </th>
              <th scope="col" className="px-5 py-3 cursor-pointer" >
                <div className="flex items-center  justify-center">
                  {t('Amount Paid')}
                  
                </div>
              </th>
              <th scope="col" className="px-2 py-3 cursor-pointer" >
                <div className="flex items-center  justify-center">
                  {t('Traders')}
                 
                </div>
              </th>
              <th scope="col" className="px-4 py-3 cursor-pointer" >
                <div className="flex items-center  justify-center">
                  {t('Spare Parts')}
                 
                </div>
              </th>
              <th scope="col" className="px-4 py-3 cursor-pointer" >
                <div className="flex items-center  justify-center">
                  {t('Spare Parts Price')}
                  
                </div>
              </th>
              <th scope="col" className="px-4 py-3 cursor-pointer" >
                <div className="flex items-center  justify-center">
                  {t('Amount Paid For Spare Parts')}
                  
                </div>
              </th>
              <th scope="col" className="px-4 py-3 cursor-pointer" >
                <div className="flex items-center  justify-center">
                  {t('Date Of Maintenance')}
                  
                </div>
              </th>
              <th scope="col" className="px-3 py-3"><span className="sr-only">{t('Action')}</span></th>
            </tr>
          </thead>
          <tbody>
            {sortedItems.length === 0 ? (
              <tr>
                <td colSpan="12" className="text-center py-4">{t('No records found')}</td>
              </tr>
            ) : (
              sortedItems.map((item, index) => (
                <tr
                  key={index}
                  className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700 ${index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-900' : ''}`}
                 
                >
                  <td className="px-4 py-4 items-center  justify-center">{`${item.make} ${item.model}`}</td>
                  <td className="px-4 py-4 items-center  justify-center">{item.garage_name}</td>
                  <td className="px-4 py-4 items-center  justify-center">{item.maintenance_date}</td>
                  <td className="px-2 py-4 items-center  justify-center">{item.cost}</td>
                  <td className="px-1 py-4 items-center  justify-center">{item.garage_expenses_amount}</td>
                  <td className="px-1 py-4 items-center  justify-center">{item.trader_name}</td>
                  <td className="px-1 py-4 items-center  justify-center">{item.spare_parts}</td>
                  <td className="px-1 py-4 items-center  justify-center">{item.spare_parts_price}</td>
                  <td className="px-1 py-4 items-center  justify-center">{item.spare_parts_expenses_amount}</td>
                  <td className="px-1 py-4 items-center  justify-center">{item.maintenance_date}</td>
                  <td className="px-4 py-4">

                   <Link to="/expenses/car-maintenance/edit" className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                     state={{ maintenanceId: item.maintenance_id }} >
                      {t('Edit')}
                    </Link>
                    <br/>
                    <Link 
                    to="/expenses/car-maintenance/details" 
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    state={{ maintenanceId: item.maintenance_id }} 
                    >
                      {t('Details')}
                    </Link>
                    <br/>
                    <a href="#" className="font-medium text-red-500 dark:text-red-500 hover:underline"
                      onClick={() => handleDelete(item.maintenance_id)}
                    >
                      {t('Delete')}
                    </a>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CarsMaintenanceTable;
