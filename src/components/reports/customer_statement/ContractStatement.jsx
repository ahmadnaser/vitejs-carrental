import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getTenantById } from '../../../controller/tenantController'; // Ensure these functions are correctly imported
import { getContractsByTenantId } from '../../../controller/RentedCarController';
import PrintIcon from "../../../assets/images/print.png";

const ContractStatementTable = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const formData = location.state || {};
  const { t, i18n } = useTranslation();
  const { tenant_id, start_date, end_date } = formData;
  const [status, setStatus] = useState(null);
  const [tenantName, setTenantName] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [filterTerm, setFilterTerm] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const [rentedCarData, setRentedCarData] = useState([]);

  useEffect(() => {
    if (!tenant_id || !start_date || !end_date) {
      console.error('Required data is missing!');
      navigate(-1);
      return;
    }

    const fetchData = async () => {
      try {
        const data = await getContractsByTenantId(tenant_id,start_date, end_date); 
        setRentedCarData(data);
      } catch (error) {
        console.error('Error fetching contracts:', error);
      }
    };

    fetchData();
  }, [tenant_id, start_date, end_date, navigate]);

  useEffect(() => {
    const fetchTenantName = async () => {
      try {
        const tenant = await getTenantById(tenant_id); 
        setTenantName(tenant.tenant_name);
      } catch (error) {
        console.error('Error fetching tenant name:', error);
      }
    };

    if (tenant_id) {
      fetchTenantName();
    }
  }, [tenant_id]);

  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return '';
    }
    return sortConfig.key === name ? sortConfig.direction : '';
  };

  const handleRowSelect = (index) => {
    setSelectedRows((prevSelected) =>
      prevSelected.includes(index)
        ? prevSelected.filter((i) => i !== index)
        : [...prevSelected, index]
    );
  };

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedItems = useMemo(() => {
    let sortableItems = [...rentedCarData];
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
  }, [rentedCarData, sortConfig]);

  const filteredItems = useMemo(() => {
    if (!filterTerm) return sortedItems;
    return sortedItems.filter((item) =>
      item.customer.toLowerCase().includes(filterTerm.toLowerCase())
    );
  }, [sortedItems, filterTerm]);



  const handleCustomerClick = (tenantId) => {
    navigate('/tenants/details', { state: { tenantId } });
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handlePrintClick = (item) => {
   
  };

  return (
    <div className={`flex flex-col items-center min-h-screen bg-bodyBg-color text-heading-color ${i18n.language === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className={`w-full ${i18n.language === 'ar' ? 'text-right' : 'text-left'} p-10 mt-20 mb-10`}>
        <h1 className="text-3xl font-bold text-secondary-color">{t('Contract Statement')}</h1>
        <h3 className="font-bold text-l text-white-400 mt-10">
          {tenantName || t('Loading tenant name...')}
        </h3>
        <h3 className="font-bold text-l mt-3 text-white-400">
          <span className="text-secondary-color">{t('From')}:</span> {start_date}{' '}
          <span className="text-secondary-color">{t('To')}:</span> {end_date}
        </h3>
        <div className="mb-1 mt-10">
          <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            {status === 'loading' ? t('Printing...') : t('Print')}
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
      </div>

      <div className="relative overflow-x-auto shadow-md w-full max-w-7xl px-4 sm:px-5 lg:px-8 md:px-8 mb-10 rounded-lg mt-1">
        <table dir={i18n.language === 'ar' ? 'rtl' : 'ltr'} className="w-full text-sm text-left text-gray-800 dark:text-gray-100 rounded-lg">
          <thead className="text-xs text-gray-900 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-1 py-3 text-center">{t('Select')}</th>
              <th scope="col" className="px-1 py-3 cursor-pointer text-center" onClick={() => requestSort('rentalId')}>
                <div className="flex items-center">
                  {t('Number')}
                  <svg className={`w-3 h-3 ms-1.5 ${getClassNamesFor('rentalId')}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
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
              <th scope="col" className="px-3 py-3 cursor-pointer text-center" onClick={() => requestSort('customer')}>
                <div className="flex items-center">
                  {t('Customer')}
                  <svg className={`w-3 h-3 ms-1.5 ${getClassNamesFor('customer')}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                  </svg>
                </div>
              </th>
              <th scope="col" className="px-5 py-3 cursor-pointer text-center" onClick={() => requestSort('startDate')}>
                <div className="flex items-center">
                  {t('From Date')}
                  <svg className={`w-5 h-3 ms-1.5 ${getClassNamesFor('startDate')}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                  </svg>
                </div>
              </th>
              <th scope="col" className="px-2 py-3 cursor-pointer text-center" onClick={() => requestSort('dayNum')}>
                <div className="flex items-center">
                  {t('Days')}
                  <svg className={`w-3 h-3 ms-1.5 ${getClassNamesFor('dayNum')}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                  </svg>
                </div>
              </th>
              <th scope="col" className="px-5 py-3 cursor-pointer text-center" onClick={() => requestSort('endDate')}>
                <div className="flex items-center">
                  {t('To Date')}
                  <svg className={`w-5 h-3 ms-1.5 ${getClassNamesFor('endDate')}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                  </svg>
                </div>
              </th>
              <th scope="col" className="px-2 py-3 cursor-pointer text-center" onClick={() => requestSort('pricePerDay')}>
                <div className="flex items-center">
                  {t('Price/Day')}
                  <svg className={`w-3 h-3 ms-1.5 ${getClassNamesFor('pricePerDay')}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                  </svg>
                </div>
              </th>
              <th scope="col" className="px-4 py-3 cursor-pointer text-center" onClick={() => requestSort('totalAmount')}>
                <div className="flex items-center">
                  {t('Total Amount')}
                  <svg className={`w-5 h-3 ms-1.5 ${getClassNamesFor('totalAmount')}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                  </svg>
                </div>
              </th>
              <th scope="col" className="px-4 py-3 cursor-pointer text-center" onClick={() => requestSort('remainingAmount')}>
                <div className="flex items-center">
                  {t('Remaining Amount')}
                  <svg className={`w-5 h-3 ms-1.5 ${getClassNamesFor('remainingAmount')}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0-1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                  </svg>
                </div>
              </th>
              <th scope="col" className="px-1 py-3 text-center">{t('Has Returned?')}</th>
              <th scope="col" className="px-2 py-3 text-center">{t('Print')}</th>
              <th scope="col" className="px-3 py-3"><span className="sr-only">{t('Action')}</span></th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.length === 0 ? (
              <tr>
                <td colSpan="13" className="text-center py-4 text-white">{t('No records found')}</td>
              </tr>
            ) : (
              filteredItems.map((item, index) => (
                <tr
                  key={index}
                  className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700 ${selectedRows.includes(index) ? 'bg-gray-200 dark:bg-gray-600' : ''}`}
                >
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(index)}
                      onChange={() => handleRowSelect(index)}
                      className="cursor-pointer"
                    />
                  </td>
                  <td className="px-1 py-4 text-center">{item.rentalId}</td>
                  <td className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">{item.make} {item.model}</td>
                  <td className="px-4 py-4 text-blue-500 cursor-pointer text-center" onClick={() => handleCustomerClick(item.tenantID)}>{item.customer}</td>
                  <td className="px-1 py-4 text-center">{item.startDate}</td>
                  <td className="px-2 py-4 text-center">{item.dayNum}</td>
                  <td className="px-1 py-4 text-center">{item.endDate}</td>
                  <td className="px-2 py-4 text-center">{item.pricePerDay}</td>
                  <td className="px-1 py-4 text-center">{item.totalAmount}</td>
                  <td className="px-1 py-4 text-center">{item.remainingAmount}</td>
                  <td className="px-4 py-4 text-center">{item.hasReturned ? t('Yes') : t('No')}</td>
                  <td className="px-4 py-4 text-center" onClick={() => handlePrintClick(item)}>
                  <img src={PrintIcon} alt="Generate PDF" className="w-13 h-8 cursor-pointer" />
                  </td>
                  <td className="px-4 py-4">
                    <Link to="/renting/edit-rental-contract" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                      {t('Edit')}
                    </Link>
                    <br />
                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">{t('Extension')}</a><br />
                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">{t('Details')}</a><br />
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

export default ContractStatementTable;
