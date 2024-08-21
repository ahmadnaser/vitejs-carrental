import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getCars } from '../../../controller/CarController';
import { useTranslation } from 'react-i18next';

const CarTable = () => {
  const { t, i18n } = useTranslation();
  const [carsData, setCarsData] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [searchTerm, setSearchTerm] = useState('');

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

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedItems = React.useMemo(() => {
    let sortableItems = [...carsData];
    if (sortConfig.key) {
      sortableItems.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        if (aValue < bValue) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [carsData, sortConfig]);

  const filteredItems = React.useMemo(() => {
    let items = sortedItems;

    if (searchTerm) {
      items = items.filter(item =>
        item.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.color.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return items;
  }, [searchTerm, sortedItems]);

  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  return (
    <div className={`flex flex-col items-center min-h-screen bg-bodyBg-color text-heading-color ${i18n.language === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className={`w-full ${i18n.language === 'ar' ? 'text-right' : 'text-left'} p-10 mt-20 mb-10`}>
        <h1 className="text-3xl font-bold text-secondary-color">{t('Cars')}</h1>
        <h3 className="font-bold text-l mt-3  cursor-pointer text-blue-400" onClick={handleAddNewClick}>
          {t('Add New')}
        </h3>
      </div>
      <div className="relative overflow-x-auto shadow-md w-full max-w-7xl px-4 sm:px-5 lg:px-8 md:px-8 mb-10 rounded-lg mt-12">
        <div className={`flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-center pb-4 mt-12`}>
          <div className="relative">
            <label htmlFor="table-search" className="sr-only">Search</label>
            <div className="absolute inset-y-0 left-2 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
              </svg>
            </div>
            <input
              type="text"
              id="table-search"
              className="sm:mb-1 block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
              placeholder={t('Search')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <table dir={i18n.language === 'ar' ? 'rtl' : 'ltr'} className="w-full text-sm text-gray-800 dark:text-gray-100 rounded-lg">
          <thead className="text-xs text-gray-900 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-3 py-3 cursor-pointer text-center" onClick={() => requestSort('make')}>
                <div className="flex items-center">
                  {t('Cars')}
                  <svg className={`w-4 h-3 ms-1.5 ${getClassNamesFor('make')}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                  </svg>
                </div>
              </th>
              <th scope="col" className="px-3 py-3 cursor-pointer text-center" onClick={() => requestSort('year')}>
                <div className="flex items-center">
                  {t('Year')}
                </div>
              </th>
              <th scope="col" className="px-5 py-3 cursor-pointer text-center" onClick={() => requestSort('vehicle_id')}>
                <div className="flex items-center">
                  {t('Plate Number')}
                </div>
              </th>
              <th scope="col" className="px-2 py-3 cursor-pointer text-center" onClick={() => requestSort('color')}>
                <div className="flex items-center">
                  {t('Color')}
                </div>
              </th>
              <th scope="col" className="px-5 py-3 cursor-pointer text-center" onClick={() => requestSort('mileage')}>
                <div className="flex items-center">
                  {t('Mileage')}
                </div>
              </th>
              <th scope="col" className="px-2 py-3 cursor-pointer text-center" onClick={() => requestSort('last_oil_change_miles')}>
                <div className="flex items-center">
                  {t('Last Oil Change Mileage')}
                </div>
              </th>
              <th scope="col" className="px-4 py-3 cursor-pointer text-center" onClick={() => requestSort('last_oil_change_date')}>
                <div className="flex items-center">
                  {t('Last Oil Change Date')}
                </div>
              </th>
              <th scope="col" className="px-4 py-3 cursor-pointer text-center" onClick={() => requestSort('license_expiry_date')}>
                <div className="flex items-center">
                  {t('License Expiry Date')}
                </div>
              </th>
              <th scope="col" className="px-4 py-3 cursor-pointer text-center" onClick={() => requestSort('insurance_expiry_date')}>
                <div className="flex items-center">
                  {t('Insurance Expiry Date')}
                </div>
              </th>
              <th scope="col" className="px-4 py-3 cursor-pointer text-center" onClick={() => requestSort('change_oil_every_km')}>
                <div className="flex items-center">
                  {t('Oil Change Every (km)')}
                </div>
              </th>
              <th scope="col" className="px-4 py-3 cursor-pointer text-center" onClick={() => requestSort('change_oil_every_month')}>
                <div className="flex items-center">
                  {t('Oil Change Every (month)')}
                </div>
              </th>
              <th scope="col" className="px-3 py-3 text-center">
                <span className="sr-only">{t('Action')}</span>
              </th>
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
                  className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700 ${index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-900' : ''}`}
                >
                  <td className="px-4 py-4  text-blue-500 text-center">{item.make} {item.model}</td>
                  <td className="px-4 py-4 text-center">{item.year}</td>
                  <td className="px-4 py-4 text-center">{item.vehicle_id}</td>
                  <td className="px-2 py-4 text-center">{item.color}</td>
                  <td className="px-1 py-4 text-center">{item.mileage}</td>
                  <td className="px-1 py-4 text-center">{item.last_oil_change_miles}</td>
                  <td className="px-1 py-4 text-center">{item.last_oil_change_date}</td>
                  <td className="px-1 py-4 text-center">{item.license_expiry_date}</td>
                  <td className="px-4 py-4 text-center">{item.insurance_expiry_date}</td>
                  <td className="px-4 py-4 text-center">{item.change_oil_every_km}</td>
                  <td className="px-4 py-4 text-center">{item.change_oil_every_month}</td>
                  <td className="px-4 py-4">
                    <Link to="/renting/edit-rental-contract" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                      {t('Edit')}
                    </Link>
                    <br />
                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">{t('Extension')}</a>
                    <br />
                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">{t('Details')}</a>
                    <br />
                    <a href="#" className="font-medium text-red-500 dark:text-red-500 hover:underline">{t('Delete')}</a>
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

export default CarTable;
