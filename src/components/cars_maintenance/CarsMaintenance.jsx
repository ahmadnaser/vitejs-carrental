import React, { useState, useEffect } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import { getCars } from '../../controller/carController';
import { useTranslation } from 'react-i18next';
import Select from 'react-select';

const CarsMaintenanceTable = () => {
  const { t, i18n } = useTranslation();
  const [carsData, setCarsData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [filterTerm, setFilterTerm] = useState('');
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);



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

  const handleCarChange = (selectedOption) => {
    setSelectedCar(selectedOption);
    // Further actions can be taken here when a car is selected
  };

  const carOptions = cars.map(car => ({
    value: car.vehicle_id,
    label: `${car.make} ${car.model} ${car.year} - ${car.vehicle_id}`
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


  useEffect(() => {
    const fetchData = async () => {
      const data = await getCars();
      setCarsData(data);
    };
    fetchData();
  }, []);

  const navigate = useNavigate();

  const handleAddNewClick = () => {
    navigate('/cars/add-car');
  };

  const handleRowSelect = (index) => {
    if (selectedRows.includes(index)) {
      setSelectedRows(selectedRows.filter((i) => i !== index));
    } else {
      setSelectedRows([...selectedRows, index]);
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
    let sortableItems = [...carsData];
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
  }, [carsData, sortConfig]);

  const filteredItems = React.useMemo(() => {
    if (filterTerm === 'lastday') {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      return sortedItems.filter(item => new Date(item.start_date) >= yesterday);
    } else if (filterTerm === 'last7days') {
      const lastWeek = new Date();
      lastWeek.setDate(lastWeek.getDate() - 7);
      return sortedItems.filter(item => new Date(item.start_date) >= lastWeek);
    } else if (filterTerm === 'last30days') {
      const lastMonth = new Date();
      lastMonth.setDate(lastMonth.getDate() - 30);
      return sortedItems.filter(item => new Date(item.start_date) >= lastMonth);
    } else if (filterTerm === 'lastmonth') {
      const lastMonth = new Date();
      lastMonth.setMonth(lastMonth.getMonth() - 1);
      return sortedItems.filter(item => new Date(item.start_date) >= lastMonth);
    } else if (filterTerm === 'lastyear') {
      const lastYear = new Date();
      lastYear.setFullYear(lastYear.getFullYear() - 1);
      return sortedItems.filter(item => new Date(item.start_date) >= lastYear);
    } else {
      return sortedItems;
    }
  }, [filterTerm, sortedItems]);

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
        <h3 className="font-bold text-l mt-3  cursor-pointer text-blue-400" onClick={handleAddNewClick}>
          {t('Add New')}
        </h3>
      </div>
      <div className="relative overflow-x-auto shadow-md w-full max-w-8xl px-4 sm:px-5 lg:px-8 md:px-8 mb-10 rounded-lg mt-8">
        <div className="flex items-center justify-center pb-4 mb-5">
          <Select
            id="car"
            value={selectedCar}
            onChange={handleCarChange}
            options={carOptions}
            placeholder={t('Select Car')}
            className="text-gray-900 focus:outline-none focus:border-secondary-color focus:ring focus:ring-secondary-color focus:ring-opacity-100 text-sm block w-1/3 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            styles={customStyles}
            isDisabled={false}
            required
          />
        </div>
        <table dir={i18n.language === 'ar' ? 'rtl' : 'ltr'} className="w-full text-sm text-gray-800 dark:text-gray-100 rounded-lg">
          <thead className="text-xs text-gray-900 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              
              <th scope="col" className="px-3 py-3 cursor-pointer" onClick={() => requestSort('car')}>
                <div className="flex items-center">
                  {t('Car')}
                  <svg className={`w-4 h-3 ms-1.5 ${getClassNamesFor('car')}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                  </svg>
                </div>
              </th>
              <th scope="col" className="px-3 py-3 cursor-pointer" onClick={() => requestSort('customer')}>
                <div className="flex items-center">
                  {t('Garage')}
                  <svg className={`w-3 h-3 ms-1.5 ${getClassNamesFor('customer')}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                  </svg>
                </div>
              </th>
              <th scope="col" className="px-5 py-3 cursor-pointer" onClick={() => requestSort('fromDate')}>
                <div className="flex items-center">
                  {t('Maintenance')}
                  <svg className={`w-5 h-3 ms-1.5 ${getClassNamesFor('fromDate')}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                  </svg>
                </div>
              </th>
              <th scope="col" className="px-2 py-3 cursor-pointer" onClick={() => requestSort('dayNum')}>
                <div className="flex items-center">
                  {t('Garage Cost')}
                  <svg className={`w-3 h-3 ms-1.5 ${getClassNamesFor('dayNum')}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                  </svg>
                </div>
              </th>
              <th scope="col" className="px-5 py-3 cursor-pointer" onClick={() => requestSort('toDateExpected')}>
                <div className="flex items-center">
                  {t('Amount Paid')}
                  <svg className={`w-5 h-3 ms-1.5 ${getClassNamesFor('toDateExpected')}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                  </svg>
                </div>
              </th>
            
              <th scope="col" className="px-2 py-3 cursor-pointer" onClick={() => requestSort('pricePerDay')}>
                <div className="flex items-center">
                  {t('Traders')}
                  <svg className={`w-3 h-3 ms-1.5 ${getClassNamesFor('pricePerDay')}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                  </svg>
                </div>
              </th>
              <th scope="col" className="px-4 py-3 cursor-pointer" onClick={() => requestSort('totalAmount')}>
                <div className="flex items-center">
                  {t('Spare Parts')}
                  <svg className={`w-5 h-3 ms-1.5 ${getClassNamesFor('totalAmount')}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                  </svg>
                </div>
              </th>
              <th scope="col" className="px-4 py-3 cursor-pointer" onClick={() => requestSort('remainingAmount')}>
                <div className="flex items-center">
                  {t('Spare Parts Price')}
                  <svg className={`w-5 h-3 ms-1.5 ${getClassNamesFor('remainingAmount')}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                  </svg>
                </div>
              </th>

              <th scope="col" className="px-4 py-3 cursor-pointer" onClick={() => requestSort('remainingAmount')}>
                <div className="flex items-center">
                  {t('Amount Paid For Spare Parts')}
                  <svg className={`w-5 h-3 ms-1.5 ${getClassNamesFor('remainingAmount')}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                  </svg>
                </div>
              </th>

              <th scope="col" className="px-4 py-3 cursor-pointer" onClick={() => requestSort('remainingAmount')}>
                <div className="flex items-center">
                  {t('Date Of Maintenance')}
                  <svg className={`w-5 h-3 ms-1.5 ${getClassNamesFor('remainingAmount')}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                  </svg>
                </div>
              </th>
              
              <th scope="col" className="px-3 py-3"><span class="sr-only">{t('Action')}</span></th>
            
            </tr>
          </thead>
          <tbody>
            {filteredItems.length === 0 ? (
              <tr>
                <td colSpan="12" className="text-center py-4">{t('No records found')}</td>
              </tr>
                ) : (
              filteredItems.map((item, index) => (
                <tr
                  key={index}
                  className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700 ${selectedRows.includes(index) ? 'bg-gray-200 dark:bg-gray-600' : ''}`}
                  onClick={() => handleRowSelect(index)}
                >
                  <td className="px-4 py-4">{item.make} {item.model}</td>
                  <td className="px-4 py-4">{item.year}</td>
                  <td className="px-4 py-4">{item.vehicle_id}</td>
                  <td className="px-2 py-4">{item.color}</td>
                  <td className="px-1 py-4">{item.mileage}</td>
                  <td className="px-1 py-4">{item.last_oil_change_miles}</td>
                  <td className="px-1 py-4">{item.last_oil_change_date}</td>
                  <td className="px-1 py-4">{item.license_expiry_date}</td>
                  <td className="px-4 py-4">{item.insurance_expiry_date}</td>
                  <td className="px-4 py-4">{item.change_oil_every_km}</td>
                  <td class="px-4 py-4">
                  <Link to="/renting/edit-rental-contract" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                    {t('Edit')}
                  </Link>
                  <br/>
                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">{t('Extension')}</a><br/>
                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">{t('Details')}</a><br/>
                    <a href="#" class="font-medium text-red-500 dark:text-red-500 hover:underline">{t('Delete')}</a>
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
