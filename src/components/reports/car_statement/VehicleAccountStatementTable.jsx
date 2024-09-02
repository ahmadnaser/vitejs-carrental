import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getCarById } from '../../../controller/CarController';
import { getMaintenanceByVehicleId } from '../../../controller/MaintenanceController';
import { getReservationByVehicleId } from '../../../controller/ReservationsController';
import { pdf } from '@react-pdf/renderer';
import VehicleAccountStatement from '../../paper_documents/VehicleAccountStatement';

const VehicleAccountStatementTable = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { vehicle_id, start_date, end_date } = location.state || {};
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [vehicleName, setVehicleName] = useState('');
  const [maintenanceData, setMaintenanceData] = useState([]);
  const [reservationData, setReservationData] = useState([]);
  const [status, setStatus] = useState(null);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (!vehicle_id) {
      console.error('Required data is missing!');
      navigate(-1);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const vehicle = await getCarById(vehicle_id);
        setVehicleName(`(${vehicle.vehicle_id}) ${vehicle.make} ${vehicle.model} `);

        const maintenance = await getMaintenanceByVehicleId(vehicle_id, start_date, end_date);
        setMaintenanceData(maintenance);

        const reservations = await getReservationByVehicleId(vehicle_id);
        setReservationData(reservations);

      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [vehicle_id, start_date, end_date, navigate]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handlePrintClick = async () => {
    setLoading(true);
    try {
      const blob = await pdf(
        <VehicleAccountStatement
          data={maintenanceData}
          reservationData={reservationData}
          startDate={start_date}
          endDate={end_date}
          vehicleName={vehicleName}
        />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `vehicle_account_statement_${vehicleName}.pdf`;
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
    const maintenanceTotals = maintenanceData.reduce(
      (totals, item) => {
        const totalExpenses = parseFloat(item.total_expenses) || 0;
        totals.totalExpenses += totalExpenses;
        return totals;
      },
      { totalExpenses: 0 }
    );

    const reservationTotals = reservationData.reduce(
      (totals, item) => {
        const amountPaid = parseFloat(item.total_amount) || 0;
        totals.totalIncome += amountPaid;
        return totals;
      },
      { totalIncome: 0 }
    );

    return {
      totalDebit: maintenanceTotals.totalExpenses,
      totalCredit: reservationTotals.totalIncome,
    };
  };

  const { totalDebit, totalCredit } = calculateTotals();
  const totalAmount = totalCredit - totalDebit;

  let runningTotal = 0;

  const reservationRows = reservationData.map((item) => {
    const debit = 0;
    const credit = parseFloat(item.total_amount) || 0;
    runningTotal += credit - debit;
    return { ...item, debit, credit, runningTotal };
  });

  const maintenanceRows = maintenanceData.map((item) => {
    const debit = parseFloat(item.total_expenses) || 0;
    const credit = 0;
    runningTotal += credit - debit;
    return { ...item, debit, credit, runningTotal };
  });

  const finalRunningTotal = runningTotal; 

  return (
    <div className={`flex flex-col items-center min-h-screen bg-bodyBg-color text-heading-color ${i18n.language === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className={`w-full ${i18n.language === 'ar' ? 'text-right' : 'text-left'} p-10 mt-20 mb-10`}>
        <h1 className="text-3xl font-bold text-secondary-color">{t('Vehicle Account Statement')}</h1>
        <h3 className="font-bold text-l text-white-400 mt-10">
          {vehicleName || t('Loading vehicle name...')}
        </h3>
        {start_date && end_date && (
          <h3 className="font-bold text-xl mt-3 text-white-400">
            <span className="text-secondary-color">{t('From')}:</span> {start_date}{' '}
            <span className="text-secondary-color">{t('To')}:</span> {end_date}
          </h3>
        )}
        <div className="mb-1 mt-10 flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
          <button
            type="button"
            onClick={handlePrintClick}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {status === 'loading' ? t('Printing...') : t('Print')}
          </button>
          <button
            type="button"
            className="bg-gray-500 text-white rounded-lg opacity-100 font-medium text-sm w-full sm:w-auto px-5 py-2.5 text-center"
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
          {t('Balance: ')} <span className='text-red-500'>{finalRunningTotal.toFixed(2)} {t('Shekels')}</span>
        </h3>
        <table dir={i18n.language === 'ar' ? 'rtl' : 'ltr'} className="w-full text-sm text-left mt-5 text-gray-800 dark:text-gray-100 rounded-lg bg-white">
          <thead className="text-xs text-gray-900 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-3 py-3 text-center">{t('Description')}</th>
              <th scope="col" className="px-3 py-3 text-center">{t('Reservation Id')}</th>
              <th scope="col" className="px-5 py-3 text-center">{t('Date')}</th>
              <th scope="col" className="px-5 py-3 text-center">{t('Price Per Day')}</th>
              <th scope="col" className="px-5 py-3 text-center">{t('Contract Duration')}</th>
              <th scope="col" className="px-2 py-3 text-center">{t('Debit')}</th>
              <th scope="col" className="px-5 py-3 text-center">{t('Credit')}</th>
              <th scope="col" className="px-5 py-3 text-center">{t('Total')}</th>
            </tr>
          </thead>
          <tbody>
            {reservationRows.map((item, index) => (
              <tr key={index} className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700 ${index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-900' : ''}`}>
                <td className="px-1 py-4 text-center">{t('Rental Contract')}</td>
                <td className="px-1 py-4 text-center">{item.reservation_id}</td>
                <td className="px-2 py-4 text-center">{new Date(item.end_date).toLocaleDateString('en-GB')}</td>
                <td className="px-2 py-4 text-center">{parseFloat(item.price_perday).toFixed(2)}</td>
                <td className="px-2 py-4 text-center">{item.dayNum} {t('Days')}</td>
                <td className="px-1 py-4 text-center text-red-500">{item.debit.toFixed(2)}</td>
                <td className="px-2 py-4 text-center text-green-500">{item.credit.toFixed(2)}</td>
                <td className="px-2 py-4 text-center">{item.runningTotal.toFixed(2)}</td>
              </tr>
            ))}
            {maintenanceRows.map((item, index) => (
              <tr key={index + reservationData.length} className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700 ${index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-900' : ''}`}>
                <td className="px-1 py-4 text-center">{item.details}</td>
                <td className="px-1 py-4 text-center">-</td>
                <td className="px-2 py-4 text-center">{item.maintenance_date}</td>
                <td className="px-2 py-4 text-center">-</td>
                <td className="px-2 py-4 text-center">-</td>
                <td className="px-1 py-4 text-center text-red-500">{item.debit.toFixed(2)}</td>
                <td className="px-2 py-4 text-center text-green-500">{item.credit.toFixed(2)}</td>
                <td className="px-2 py-4 text-center">{item.runningTotal.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700`}>
              <td colSpan="5" className="px-2 py-4 text-center font-bold">{t('Total')}</td>
              <td className="px-2 py-4 text-center text-red-500 font-bold">{totalDebit.toFixed(2)}</td>
              <td className="px-2 py-4 text-center text-green-500 font-bold">{totalCredit.toFixed(2)}</td>
              <td className="px-2 py-4 text-center font-bold">{finalRunningTotal.toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default VehicleAccountStatementTable;
