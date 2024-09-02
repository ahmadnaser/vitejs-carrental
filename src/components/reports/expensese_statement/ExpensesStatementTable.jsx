import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getExpenses } from '../../../controller/ExpensesController';
import { pdf } from '@react-pdf/renderer';
import ExpenseStatement from '../../paper_documents/ExpensesStatement';

const ExpenseseStatementTable = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { start_date, end_date } = location.state || {};
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [expensesData, setExpensesData] = useState([]);
  const [status, setStatus] = useState(null);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const expenses = await getExpenses(start_date || '', end_date || '');
        setExpensesData(expenses);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [start_date, end_date]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handlePrintClick = async () => {
    setLoading(true);
    try {
      const blob = await pdf(
        <ExpenseStatement
          data={expensesData}
          startDate={start_date }
          endDate={end_date }
        />
      ).toBlob();
      
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `expense_statement.pdf`;
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
    return expensesData.reduce(
      (totals, item) => {
        const expenseAmount = parseFloat(item.expenses_amount) || 0;
        totals.totalAmount += expenseAmount;
        return totals;
      },
      { totalAmount: 0 }
    );
  };

  const { totalAmount } = calculateTotals();

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
          {t('Expense Statement')}
        </h1>
        {start_date && end_date && (
          <h3 className="font-bold text-l mt-3 text-white-400">
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
          {t('Total Expenses: ')} <span className="text-red-500">{totalAmount.toFixed(2)} {t('Shekels')}</span>
        </h3>
        <table
          dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
          className="w-full text-sm text-left mt-5 text-gray-800 dark:text-gray-100 rounded-lg bg-white"
        >
          <thead className="text-xs text-gray-900 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-3 py-3 text-center">{t('Expense Type')}</th>
              <th scope="col" className="px-3 py-3 text-center">{t('Amount')}</th>
              <th scope="col" className="px-5 py-3 text-center">{t('Date')}</th>
              <th scope="col" className="px-5 py-3 text-center">{t('Detail')}</th>
            </tr>
          </thead>
          <tbody>
            {expensesData.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-4 text-white">
                  {t('No records found')}
                </td>
              </tr>
            ) : (
              expensesData.map((item, index) => (
                <tr key={index}
                className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700 ${index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-900' : ''}`}>
                  <td className="px-1 py-4 text-center">{item.expense_type_name||t('Maintenance')}</td>
                  <td className="px-1 py-4 text-center text-red-500">{parseFloat(item.expenses_amount).toFixed(2)}</td>
                  <td className="px-2 py-4 text-center">{item.expenses_date}</td>
                  <td className="px-2 py-4 text-center">{item.detail}</td>
                </tr>
              ))
            )}
          </tbody>
          <tfoot>
            <tr  className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700  dark:bg-gray-900' : ''}`}>
              <td colSpan="1" className="px-2 py-4 text-center font-bold">{t('Total')}</td>
              <td className="px-2 py-4 text-center  font-bold">{totalAmount.toFixed(2)}</td>
              <td className="px-2 py-4 text-center"></td>
              <td className="px-2 py-4 text-center"></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default ExpenseseStatementTable;
