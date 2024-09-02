import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { pdf } from '@react-pdf/renderer';
import { getFullAccountStatment } from '../../../controller/FullAccountController';
import FullAccountStatement from '../../paper_documents/FullAccountStatement';

const LedgerTable = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { start_date, end_date } = location.state || {};
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [accountData, setAccountData] = useState([]);
  const [status, setStatus] = useState(null);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const account = await getFullAccountStatment(start_date, end_date);
        setAccountData(account);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate, start_date, end_date]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handlePrintClick = async () => {
    setLoading(true);
    try {
      const blob = await pdf(
        <FullAccountStatement
          data={accountData}
          startDate={start_date}
          endDate={end_date}
        />
      ).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `full_account_statement_${start_date||''}_${end_date||''}.pdf`;
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
    return accountData.reduce(
      (totals, item) => {
        const payment = parseFloat(item.payment_amount) || 0;
        const expense = parseFloat(item.expense_amount) || 0;
        const requiredOfHim = parseFloat(item.required_of_him) || 0;
        const requiredOfMe = parseFloat(item.required_of_me) || 0;
        totals.requiredOfHim += requiredOfHim;
        totals.requiredOfMe += requiredOfMe;
        totals.totalPayment += payment;
        totals.totalExpense += expense;
        totals.runningTotal += payment - expense;
        return totals;
      },
      { requiredOfHim: 0, requiredOfMe: 0, totalPayment: 0, totalExpense: 0, runningTotal: 0 }
    );
  };

  const {
    requiredOfHim: totalRequiredOfHim,
    requiredOfMe: totalRequiredOfMe,
    totalPayment,
    totalExpense,
    runningTotal: finalRunningTotal,
  } = calculateTotals();

  let runningTotal = 0;

  return (
    <div className={`flex flex-col items-center min-h-screen bg-bodyBg-color text-heading-color ${i18n.language === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className={`w-full ${i18n.language === 'ar' ? 'text-right' : 'text-left'} p-10 mt-20 mb-10`}>
        <h1 className="text-3xl font-bold text-secondary-color">{t('Ledger')}</h1>
        
        {start_date && end_date && (
          <h3 className="font-bold text-l mt-3 text-white-400">
            <span className="text-secondary-color">{t('From')}:</span> {start_date}{' '}
            <span className="text-secondary-color">{t('To')}:</span> {end_date}
          </h3>
        )}
        
        <div className="mb-1 mt-10 flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
          <button type="button" onClick={handlePrintClick} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            {status === 'loading' ? t('Printing...') : t('Print')}
          </button>
          <button type="button" className="bg-gray-500 text-white m-5 rounded-md opacity-100 font-medium text-sm w-full sm:w-auto px-5 py-2.5 text-center" onClick={handleGoBack}>{t('Go Back')}</button>
        </div>
        {status === 'success' && (
          <div className="text-green-500">
            {t('Printing Done!')}
          </div>
        )}
        {status === 'error' && (
          <div className="text-red-500">
            {errors.form ? t(errors.form) : t('An error occurred. Please try again.')}
          </div>
        )}
      </div>

      <div className="relative overflow-x-auto shadow-md w-full max-w-7xl px-4 sm:px-5 lg:px-8 md:px-8 mb-10 rounded-lg mt-1">
        <div className="bg-white p-4 rounded-xl shadow-md w-full max-w-screen-lg mx-auto">
          <h3 className="font-bold text-l mt-3 align-middle text-center text-gray-700">
            <div className="flex justify-between mb-3">
              <div>
                <span>{t('Total Required Balance:')} </span>
                <span className="text-green-500">{totalRequiredOfHim.toFixed(2)} {t('Shekels')}</span>
              </div>
              <div>
                <span>{t('Total Payment:')} </span>
                <span className="text-green-500">{totalPayment.toFixed(2)} {t('Shekels')}</span>
              </div>
            </div>

            <div className="flex justify-between mb-3">
              <div>
                <span>{t('Total Required Expenses:')} </span>
                <span className="text-red-500">{totalRequiredOfMe.toFixed(2)} {t('Shekels')}</span>
              </div>
              <div>
                <span>{t('Total Expenses Paid:')} </span>
                <span className="text-red-500">{totalExpense.toFixed(2)} {t('Shekels')}</span>
              </div>
            </div>

            <div className="flex justify-between mb-3">
              <div>
                <span>{t('Debts Due:')} </span>
                <span className="text-green-700">{(totalRequiredOfHim - totalPayment).toFixed(2)} {t('Shekels')}</span>
              </div>
              <div>
                <span>{t('Total Balance:')} </span>
                <span className="text-green-700">{finalRunningTotal.toFixed(2)} {t('Shekels')}</span>
              </div>
            </div>
          </h3>
        </div>


        <table dir={i18n.language === 'ar' ? 'rtl' : 'ltr'} className="w-full text-sm text-left mt-5 text-gray-800 dark:text-gray-100 rounded-lg bg-white">
          <thead className="text-xs text-gray-900 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-3 py-3 text-center">{t('Description')}</th>
              <th scope="col" className="px-5 py-3 text-center">{t('Date')}</th>
              <th scope="col" className="px-2 py-3 text-center">{t('Required of him')}</th>
              <th scope="col" className="px-2 py-3 text-center">{t('Required of me')}</th>
              <th scope="col" className="px-5 py-3 text-center">{t('Payment')}</th>
              <th scope="col" className="px-5 py-3 text-center">{t('Expenses')}</th>
              <th scope="col" className="px-5 py-3 text-center">{t('Total')}</th>
            </tr>
          </thead>
          <tbody>
            {accountData.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-4 text-white">{t('No records found')}</td>
              </tr>
            ) : (
              accountData.map((item, index) => {
                const payment = parseFloat(item.payment_amount) || 0;
                const expense = parseFloat(item.expense_amount) || 0;
                runningTotal += payment - expense;
                return (
                  <tr
                    key={index}
                    className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700 ${index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-900' : ''}`}
                  >
                    <td className="px-3 py-4 text-center">{item.description}</td>
                    <td className="px-5 py-4 text-center">{item.date}</td>
                    <td className="px-2 py-4 text-center text-green-500">{item.required_of_him}</td>
                    <td className="px-2 py-4 text-center text-red-500">{item.required_of_me}</td>
                    <td className="px-5 py-4 text-center">{payment.toFixed(2)}</td>
                    <td className="px-5 py-4 text-center">{expense.toFixed(2)}</td>
                    <td className="px-5 py-4 text-center">{runningTotal.toFixed(2)}</td>
                  </tr>
                );
              })
            )}
          </tbody>
          <tfoot>
            <tr className={`bg-white border-b  dark:border-gray-700 dark:bg-gray-900`}>
              <td colSpan="2" className="px-2 py-4 text-center font-bold">{t('Total')}</td>
              <td className="px-2 py-4 text-center text-green-500 font-bold">{totalRequiredOfHim.toFixed(2)}</td>
              <td className="px-2 py-4 text-center text-red-500 font-bold">{totalRequiredOfMe.toFixed(2)}</td>
              <td className="px-2 py-4 text-center font-bold">{totalPayment.toFixed(2)}</td>
              <td className="px-2 py-4 text-center font-bold">{totalExpense.toFixed(2)}</td>
              <td className="px-2 py-4 text-center font-bold">{finalRunningTotal.toFixed(2)}</td>
            </tr>
          </tfoot>

        </table>
      </div>
    </div>
  );
};

export default LedgerTable;
