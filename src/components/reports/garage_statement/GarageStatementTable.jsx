import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getGarageById } from '../../../controller/GarageController';
import { getMaintenanceByGarageId } from '../../../controller/MaintenanceController';
import { pdf } from '@react-pdf/renderer';
import GarageStatement from '../../paper_documents/GarageStatement';

const GarageStatementTable = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { garage_id, start_date, end_date } = location.state || {};
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [garageName, setGarageName] = useState('');
  const [maintenanceData, setMaintenanceData] = useState([]);
  const [status, setStatus] = useState(null);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (!garage_id ) {
      console.error('Required data is missing!');
      navigate(-1);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const garage = await getGarageById(garage_id);
        setGarageName(garage.name);

        const maintenance = await getMaintenanceByGarageId(garage_id, start_date, end_date);
        setMaintenanceData(maintenance);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [garage_id, start_date, end_date, navigate]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handlePrintClick = async () => {
    setLoading(true);
    try {
     
      const blob = await pdf(
        <GarageStatement
          data={maintenanceData}
          startDate={start_date}
          endDate={end_date}
          garageName={garageName}
        />
      ).toBlob();
      
   
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `garage_statement_${garageName}.pdf`;
      document.body.appendChild(a);
      a.click();
      
     
      URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      setStatus('success');
    } catch (err) {
      console.error('Printing error:', err);
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };
  

  const calculateTotals = () => {
    return maintenanceData.reduce(
      (totals, item) => {
        const totalAmount = parseFloat(item.cost) || 0;
        const amountPaid = parseFloat(item.amount_paid) || 0;
        totals.totalAmount += totalAmount;
        totals.amountPaid += amountPaid;
        return totals;
      },
      { totalAmount: 0, amountPaid: 0 }
    );
  };

  const { totalAmount, amountPaid } = calculateTotals();
  const remainingAmount = totalAmount - amountPaid;

  return (
    <div
      className={`flex flex-col items-center min-h-screen bg-bodyBg-color text-heading-color ${
        i18n.language === 'ar' ? 'rtl' : 'ltr'
      }`}
    >
      <div
        className={`w-full ${
          i18n.language === 'ar' ? 'text-right' : 'text-left'
        } p-10 mt-20 mb-10`}
      >
        <h1 className="text-3xl font-bold text-secondary-color">
          {t('Garage Statement')}
        </h1>
        <h3 className="font-bold text-l text-white-400 mt-10">
          {garageName || t('Loading garage name...')}
        </h3>
        {start_date && end_date && (
          <h3 className="font-bold text-l mt-3 text-white-400">
            <span className="text-secondary-color">{t('From')}:</span> {start_date}{' '}
            <span className="text-secondary-color">{t('To')}:</span> {end_date}
          </h3>
        )}
        <div className="mb-1 mt-10">
          <button
            type="button"
            onClick={handlePrintClick}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {status === 'loading' ? t('Printing...') : t('Print')}
          </button>
          <button
            type="button"
            className="bg-gray-500 text-white m-5 rounded-md opacity-100 font-medium text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            onClick={handleGoBack}
          >
            {t('Go Back')}
          </button>
        </div>
        {status === 'success' && (
          <div className="text-green-500">{t('Printing Done!')}</div>
        )}
        {status === 'error' && (
          <div className="text-red-500">
            {errors.form ? t(errors.form) : t('An error occurred. Please try again.')}
          </div>
        )}
      </div>

      <div className="relative overflow-x-auto shadow-md w-full max-w-7xl px-4 sm:px-5 lg:px-8 md:px-8 mb-10 rounded-lg mt-1">
        <h3 className="font-bold text-l mt-3 align-middle text-center text-white-400">
          {t('Balance: ')} <span className="text-red-500">{remainingAmount.toFixed(2)} {t('Shekels')}</span>
        </h3>
        <table
          dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
          className="w-full text-sm text-left mt-5 text-gray-800 dark:text-gray-100 rounded-lg bg-white"
        >
          <thead className="text-xs text-gray-900 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-3 py-3 text-center">{t('Car')}</th>
              <th scope="col" className="px-3 py-3 text-center">{t('Car ID')}</th>
              <th scope="col" className="px-3 py-3 text-center">{t('Maintenance')}</th>
              <th scope="col" className="px-5 py-3 text-center">{t('Total Amount')}</th>
              <th scope="col" className="px-5 py-3 text-center">{t('Amount Paid')}</th>
              <th scope="col" className="px-5 py-3 text-center">{t('Remain Amount')}</th>
              <th scope="col" className="px-5 py-3 text-center">{t('Date')}</th>
            </tr>
          </thead>
          <tbody>
            {maintenanceData.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-4 text-black">
                  {t('No records found')}
                </td>
              </tr>
            ) : (
              maintenanceData.map((item, index) => {
                const totalAmount = parseFloat(item.cost) || 0;
                const amountPaid = parseFloat(item.amount_paid) || 0;
                const remainAmount = totalAmount - amountPaid;
                return (
                  <tr key={index}
                  className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700 ${index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-900' : ''}`}>
                    <td className="px-1 py-4 text-center">{item.make} {item.model}</td>
                    <td className="px-1 py-4 text-center">{item.vehicle_id}</td>
                    <td className="px-1 py-4 text-center">{item.details}</td>
                    <td className="px-2 py-4 text-center text-red-500">{totalAmount.toFixed(2)}</td>
                    <td className="px-2 py-4 text-center text-green-500">{amountPaid.toFixed(2)}</td>
                    <td className="px-2 py-4 text-center">{remainAmount.toFixed(2)}</td>
                    <td className="px-2 py-4 text-center">{item.maintenance_date}</td>
                  </tr>
                );
              })
            )}
          </tbody>
          <tfoot>
            <tr className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:bg-gray-900' : ''}`}>
              <td colSpan="3" className="px-2 py-4 text-center font-bold">{t('Total')}</td>
              <td className="px-2 py-4 text-center text-red-500 font-bold">{totalAmount.toFixed(2)}</td>
              <td className="px-2 py-4 text-center text-green-500 font-bold">{amountPaid.toFixed(2)}</td>
              <td className="px-2 py-4 text-center font-bold">{remainingAmount.toFixed(2)}</td>
              <td className="px-2 py-4 text-center"></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default GarageStatementTable;