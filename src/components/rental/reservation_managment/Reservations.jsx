import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getReservations } from '../../../controller/ReservationsController';
import { getCarById } from '../../../controller/CarController';
import { getTenantById } from '../../../controller/TenantController';
import { useTranslation } from 'react-i18next';
import { deleteReservationById } from '../../../controller/ReservationsController';


const ReservationTable = () => {
  const { t, i18n } = useTranslation();
  const [reservationsData, setReservationsData] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [filterTerm, setFilterTerm] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [dropdownText, setDropdownText] = useState(t('Last 30 days'));
  const [tenantNames, setTenantNames] = useState({});
  const [vehicleDetails, setVehicleDetails] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  const fetchData = async () => {
    const data = await getReservations();
    setReservationsData(data);
  
    const tenants = {};
    const vehicles = {};

    for (const item of data) {
      if (!tenants[item.tenant_id]) {
        tenants[item.tenant_id] = await getTenantById(item.tenant_id);
      }
      if (!vehicles[item.vehicle_id]) {
        vehicles[item.vehicle_id] = await getCarById(item.vehicle_id);
      }
    }

    setTenantNames(tenants);
    setVehicleDetails(vehicles);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const navigate = useNavigate();

  const handleAddNewClick = () => {
    navigate('/reservations/add-reservations');
  };

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedItems = React.useMemo(() => {
    let sortableItems = [...reservationsData];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

       
        if (sortConfig.key === 'tenant_name') {
          aValue = `${ tenantNames[a.tenant_id]?.tenant_name} `;
          bValue = `${ tenantNames[b.tenant_id]?.tenant_name} `;
          return sortConfig.direction === 'ascending'
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }
        if (sortConfig.key === 'car') {
          aValue = `${vehicleDetails[a.vehicle_id]?.make} ${vehicleDetails[a.vehicle_id]?.model}`;
          bValue = `${vehicleDetails[b.vehicle_id]?.make} ${vehicleDetails[b.vehicle_id]?.model}`;
          return sortConfig.direction === 'ascending'
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }

     
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
  }, [reservationsData, sortConfig, vehicleDetails]);

  const filteredItems = React.useMemo(() => {
    let items = sortedItems;

    if (filterTerm) {
      const now = new Date();
      if (filterTerm === 'lastday') {
        const yesterday = new Date(now);
        yesterday.setDate(now.getDate() - 1);
        items = items.filter(item => new Date(item.start_timestamp) >= yesterday);
      } else if (filterTerm === 'last7days') {
        const lastWeek = new Date(now);
        lastWeek.setDate(now.getDate() - 7);
        items = items.filter(item => new Date(item.start_timestamp) >= lastWeek);
      } else if (filterTerm === 'last30days') {
        const lastMonth = new Date(now);
        lastMonth.setDate(now.getDate() - 30);
        items = items.filter(item => new Date(item.start_timestamp) >= lastMonth);
      } else if (filterTerm === 'lastyear') {
        const lastYear = new Date(now);
        lastYear.setFullYear(now.getFullYear() - 1);
        items = items.filter(item => new Date(item.start_timestamp) >= lastYear);
      }
    }

    if (searchTerm) {
      items = items.filter(item =>
        vehicleDetails[item.vehicle_id]?.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicleDetails[item.vehicle_id]?.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tenantNames[item.tenant_id]?.tenant_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return items;
  }, [filterTerm, searchTerm, sortedItems, vehicleDetails, tenantNames]);

  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  const handleCustomerClick = (tenantId) => {
    navigate('/tenants/details', { state: { tenantId } });
  };
  
  const handleDropdownToggle = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleFilterChange = (value, text) => {
    setFilterTerm(value);
    setDropdownText(text);
    setDropdownVisible(false);
  };

  const handleDelete = async (reservation_id) => {
    const deleteConfirmation = window.confirm(
      `${t('Are you sure you want to delete the Reservation')} ` +
      `(${reservation_id})?`,
      'color: red; font-weight: bold;'
    );
  
    if (deleteConfirmation) {
      try {
        const result = await deleteReservationById(reservation_id);
        if (result.success) {
          alert(t('Contract deleted successfully'));
          fetchData();
        } else {
          alert(t(`Failed to delete Contract: ${result.message}`));
        }
      } catch (error) {
        console.error('Error deleting Contract:', error);
        alert(t('An error occurred while trying to delete the Contract.'));
      }
    }
  };

  return (
    <div className={`flex flex-col items-center min-h-screen bg-bodyBg-color text-heading-color ${i18n.language === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className={`w-full ${i18n.language === 'ar' ? 'text-right' : 'text-left'} p-10 mt-20 mb-10`}>
        <h1 className="text-3xl font-bold text-secondary-color">{t('Reservations')}</h1>
        <h3 className="font-bold text-l mt-3 cursor-pointer text-blue-400" onClick={handleAddNewClick}>
          {t('Add New')}
        </h3>
      </div>
      <div className="relative overflow-x-auto shadow-md w-full max-w-7xl px-4 sm:px-5 lg:px-8 md:px-8 mb-10 rounded-lg mt-8">
        <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
          <div className='sm:mb-1'>
            <button id="dropdownRadioButton" onClick={handleDropdownToggle} className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
              <svg className="w-3 h-3 text-gray-500 dark:text-gray-400 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z"/>
              </svg>
              {t(dropdownText)}
              <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
              </svg>
            </button>
            {dropdownVisible && (
              <div id="dropdownRadio" className="z-10 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600">
                <ul className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownRadioButton">
                  <li>
                    <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                      <input id="filter-radio-example-1" type="radio" value="lastday" name="filter-radio" onChange={(e) => handleFilterChange(e.target.value, 'Last day')} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                      <label htmlFor="filter-radio-example-1" className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">{t('Last day')}</label>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                      <input id="filter-radio-example-2" type="radio" value="last7days" name="filter-radio" onChange={(e) => handleFilterChange(e.target.value, 'Last 7 days')} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                      <label htmlFor="filter-radio-example-2" className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">{t('Last 7 days')}</label>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                      <input id="filter-radio-example-3" type="radio" value="last30days" name="filter-radio" onChange={(e) => handleFilterChange(e.target.value, 'Last 30 days')} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                      <label htmlFor="filter-radio-example-3" className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">{t('Last 30 days')}</label>
                    </div>
                  </li>
                
                  <li>
                    <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                      <input id="filter-radio-example-5" type="radio" value="lastyear" name="filter-radio" onChange={(e) => handleFilterChange(e.target.value, 'Last year')} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                      <label htmlFor="filter-radio-example-5" className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">{t('Last year')}</label>
                    </div>
                  </li>
                </ul>
              </div>
            )}
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-2 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
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
              <th scope="col" className="px-3 py-3 cursor-pointer text-center" onClick={() => requestSort('tenant_name')}>
                <div className="flex items-center">
                  {t('Tenant')}
                  <svg className={`w-4 h-3 ms-1.5 ${getClassNamesFor('tenant_name')}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                  </svg>
                </div>
              </th>
              <th scope="col" className="px-3 py-3 cursor-pointer text-center" onClick={() => requestSort('car')}>
                <div className="flex items-center">
                  {t('Car')}
                  <svg className={`w-3 h-3 ms-1.5 ${getClassNamesFor('car')}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                  </svg>
                </div>
              </th>
              <th scope="col" className="px-5 py-3 cursor-pointer text-center">
                <div className="flex items-center">
                  {t('Start Date')}
                </div>
              </th>
              <th scope="col" className="px-2 py-3 cursor-pointer text-center" >
                <div className="flex items-center">
                  {t('End Date')}
                  
                </div>
              </th>
              <th scope="col" className="px-5 py-3 cursor-pointer text-center" >
                <div className="flex items-center">
                  {t('Price Per Day')}
                 
                </div>
              </th>
              <th scope="col" className="px-2 py-3 cursor-pointer text-center" >
                <div className="flex items-center">
                  {t('Total Amount')}
                 
                </div>
              </th>
              <th scope="col" className="px-4 py-3 cursor-pointer text-center">
                <div className="flex items-center">
                  {t('Amount Paid')}
                 
                </div>
              </th>
              <th scope="col" className="px-4 py-3 cursor-pointer text-center" >
                <div className="flex items-center">
                  {t('State')}
                  
                </div>
              </th>
              <th scope="col" className="px-3 py-3"><span className="sr-only">{t('Action')}</span></th>
              <th scope="col" className="px-3 py-3"><span className="sr-only">{t('Action')}</span></th>
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
                  <td className="px-4 py-4 text-blue-500 cursor-pointer text-center" onClick={() => handleCustomerClick(item.tenant_id)}>{tenantNames[item.tenant_id]?.tenant_name}</td>
                  <td className="px-4 py-4 text-center">{vehicleDetails[item.vehicle_id]?.make} {vehicleDetails[item.vehicle_id]?.model}</td>
                  <td className="px-4 py-4 text-center">{item.start_timestamp}</td>
                  <td className="px-2 py-4 text-center">{item.end_timestamp}</td>
                  <td className="px-1 py-4 text-center">{item.price_perday}</td>
                  <td className="px-1 py-4 text-center">{item.total_amount}</td>
                  <td className="px-1 py-4 text-center">{item.amount_paid}</td>
                  <td className="px-1 py-4 text-center">{item.status}</td>
                  <td className="px-1 py-4 text-center">
                  <Link 
                    to="/reservations/convert-reservations" 
                    className="font-sm text-green-500 dark:text-green-500 hover:underline"
                    state={{ reservationId: item.reservation_id }} 
                    >
                    {t('Convert to contract')}
                  </Link>

                  </td>
                  <td className="px-4 py-4 text-center">
                  <Link 
                    to="/reservations/edit-reservations" 
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    state={{ reservationId: item.reservation_id }} 
                    >
                    {t('Edit')}
                  </Link>
                  <br/>

                  <Link
                      to="/reservations/extension-reservations"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      state={{ reservationId: item.reservation_id }} 
                    >
                      {t('Extension')}
                    </Link>
                    <br/>

                    <Link
                      to="/reservations/details"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      state={{ reservationId: item.reservation_id }} 
                    >
                      {t('Details')}
                    </Link>
                    <br/>
                    <a href="#" className="font-medium text-red-500 dark:text-red-500 hover:underline"
                      onClick={() => handleDelete(item.reservation_id)}
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

export default ReservationTable;
