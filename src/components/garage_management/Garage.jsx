import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getGarages } from '../../controller/GarageController';
import { useTranslation } from 'react-i18next';

const GarageTable = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [garageData, setGarageData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [filterTerm, setFilterTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getGarages();
        setGarageData(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAddNewClick = () => {
    navigate('/expenses/garages/add-garage');
  };

  const handleRowSelect = (index) => {
    setSelectedRows((prevSelectedRows) =>
      prevSelectedRows.includes(index)
        ? prevSelectedRows.filter((i) => i !== index)
        : [...prevSelectedRows, index]
    );
  };

  const requestSort = (key) => {
    setSortConfig((prevSortConfig) => {
      const direction =
        prevSortConfig.key === key && prevSortConfig.direction === 'ascending'
          ? 'descending'
          : 'ascending';
      return { key, direction };
    });
  };

  const sortedItems = useMemo(() => {
    if (!sortConfig.key) return garageData;

    const sortedData = [...garageData].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'ascending' ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'ascending' ? 1 : -1;
      return 0;
    });
    return sortedData;
  }, [garageData, sortConfig]);

  const filteredItems = useMemo(() => {
    const dateFilterMap = {
      lastday: () => {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        return yesterday;
      },
      last7days: () => {
        const lastWeek = new Date();
        lastWeek.setDate(lastWeek.getDate() - 7);
        return lastWeek;
      },
      last30days: () => {
        const lastMonth = new Date();
        lastMonth.setDate(lastMonth.getDate() - 30);
        return lastMonth;
      },
      lastmonth: () => {
        const lastMonth = new Date();
        lastMonth.setMonth(lastMonth.getMonth() - 1);
        return lastMonth;
      },
      lastyear: () => {
        const lastYear = new Date();
        lastYear.setFullYear(lastYear.getFullYear() - 1);
        return lastYear;
      },
    };

    const filterDate = dateFilterMap[filterTerm]?.();
    return filterDate
      ? sortedItems.filter((item) => new Date(item.start_date) >= filterDate)
      : sortedItems;
  }, [filterTerm, sortedItems]);

  const getClassNamesFor = (name) => (sortConfig.key === name ? sortConfig.direction : undefined);

  return (
    <div
      className={`flex flex-col items-center min-h-screen bg-bodyBg-color text-heading-color ${
        i18n.language === 'ar' ? 'rtl' : 'ltr'
      }`}
    >
      <div className={`w-full ${i18n.language === 'ar' ? 'text-right' : 'text-left'} p-10 mt-20 mb-10`}>
        <h1 className="text-3xl font-bold text-secondary-color">{t('Garages')}</h1>
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
              className="sm:mb-1 block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder={t('Search for items')}
            />
          </div>
        </div>
        <table
          dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
          className="w-full text-sm text-center text-gray-800 dark:text-gray-100 rounded-lg"
        >
          <thead className="text-xs text-gray-900 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-1 py-3">
                {t('Select')}
              </th>
              {['name', 'type', 'location', 'contact_info', 'garage_info'].map((field) => (
                <th
                  key={field}
                  scope="col"
                  className="px-3 py-3 cursor-pointer"
                  onClick={() => requestSort(field)}
                >
                  <div className="flex items-center justify-center">
                    {t(field.charAt(0).toUpperCase() + field.slice(1).replace('_', ' '))}
                    <svg
                      className={`w-3 h-3 ms-1.5 ${getClassNamesFor(field)}`}
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                    </svg>
                  </div>
                </th>
              ))}
              <th scope="col" className="px-3 py-3">
                <span className="sr-only">{t('Action')}</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  {t('No records found')}
                </td>
              </tr>
            ) : (
              filteredItems.map((item, index) => (
                <tr
                  key={index}
                  className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700 ${
                    selectedRows.includes(index) ? 'bg-gray-200 dark:bg-gray-600' : ''
                  }`}
                  onClick={() => handleRowSelect(index)}
                >
                  <td className="px-6 py-4 text-center">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(index)}
                      onChange={() => handleRowSelect(index)}
                      className="cursor-pointer"
                    />
                  </td>
                  <td className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                    {item.name}
                  </td>
                  <td className="px-4 py-4 text-center">{item.type}</td>
                  <td className="px-4 py-4 text-center">{item.location}</td>
                  <td className="px-4 py-4 text-center">{item.contact_info}</td>
                  <td className="px-4 py-4 text-center">{item.garage_info}</td>
                  <td className="px-4 py-4 text-center">
                    <Link
                      to="/renting/edit-garage"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      {t('Edit')}
                    </Link>
                    <br />
                    <Link to="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                      {t('Details')}
                    </Link>
                    <br />
                    <Link to="#" className="font-medium text-red-500 dark:text-red-500 hover:underline">
                      {t('Delete')}
                    </Link>
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

export default GarageTable;
