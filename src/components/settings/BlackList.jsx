import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getTraders } from '../../controller/TraderController'; 
import { useTranslation } from 'react-i18next';

const BlackListTable = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [traderData, setTraderData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTraders();
        setTraderData(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAddNewClick = () => {
    navigate('/expenses/traders/add-trader');
  };

  const filteredItems = useMemo(() => {
    return traderData.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.contact_info.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, traderData]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div
      className={`flex flex-col items-center min-h-screen bg-bodyBg-color text-heading-color ${
        i18n.language === 'ar' ? 'rtl' : 'ltr'
      }`}
    >
      <div className={`w-full ${i18n.language === 'ar' ? 'text-right' : 'text-left'} p-10 mt-20 mb-10`}>
        <h1 className="text-3xl font-bold text-red-500">{t('Black List')}</h1>
        <h3
          className="font-bold text-l mt-3 cursor-pointer text-blue-400"
          onClick={handleAddNewClick}
        >
          {t('Add New')}
        </h3>
      </div>
      {loading && <div className="text-secondary-color">{t('Loading...')}</div>}
      {error && <div className="text-red-500">{t(`Error: ${error.message}`)}</div>}
      <div className="relative overflow-x-auto shadow-md w-full max-w-7xl px-4 sm:px-5 lg:px-8 md:px-8 mb-10 rounded-lg mt-12">
        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center pb-4 mt-12">
          <label htmlFor="table-search" className="sr-only">
            {t('Search')}
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              id="table-search"
              value={searchTerm}
              onChange={handleSearchChange}
              className="sm:mb-1 block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder={t('Search')}
            />
          </div>
        </div>
        <table
          dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
          className="w-full text-sm text-center text-gray-800 dark:text-gray-100 rounded-lg"
        >
          <thead className="text-xs text-gray-900 uppercase bg-red-400 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-3 py-3">
                {t('Customer Name')}
              </th>
              <th scope="col" className="px-3 py-3">
                {t('Id Number')}
              </th>
              <th scope="col" className="px-3 py-3">
                {t('Company')}
              </th>
              <th scope="col" className="px-3 py-3">
                {t('Address')}
              </th>
              <th scope="col" className="px-3 py-3">
                {t('Note')}
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  {t('No records found')}
                </td>
              </tr>
            ) : (
              filteredItems.map((item, index) => (
                <tr
                  key={index}
                  className={`bg-red-200 border-b dark:bg-gray-800 dark:border-gray-700 ${index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-900' : ''}`}
                >
                  <td className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                    {item.name}
                  </td>
                  <td className="px-4 py-4 text-center">{item.type}</td>
                  <td className="px-4 py-4 text-center">{item.contact_info}</td>
                  <td className="px-4 py-4 text-center">{item.contact_info}</td>
                  <td className="px-4 py-4 text-center">{item.contact_info}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BlackListTable;
