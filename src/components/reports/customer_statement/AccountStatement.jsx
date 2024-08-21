import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getTenantById, getAccountStatmentById } from '../../../controller/TenantController';
import { pdf } from '@react-pdf/renderer';
import AccountStatement from '../../paper_documents/AccountStatement';

const AccountStatementTable = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { tenant_id, start_date, end_date } = location.state || {};
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [tenantName, setTenantName] = useState('');

  const [accountData, setAccountData] = useState([]);
  const [status, setStatus] = useState(null);
  const { t, i18n } = useTranslation();

  useEffect(() => {
   
    const fetchData = async () => {
      setLoading(true);
      try {
        const tenant = await getTenantById(tenant_id);
        const account = await getAccountStatmentById(tenant_id, start_date, end_date);
        setTenantName(tenant.tenant_name);
        setAccountData(account);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [tenant_id, start_date, end_date, navigate]);


  const handleGoBack = () => {
    navigate(-1);
  };

  const handlePrintClick = async () => {
    setLoading(true);
    try {
      const blob = await pdf(<AccountStatement data={accountData?.accountStatement} startDate={start_date} endDate={end_date} />).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `account_statement_${tenantName}.pdf`;
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
    if (!accountData?.accountStatement) {
      return { debit: 0, credit: 0 };
    }
  
    return accountData.accountStatement.reduce(
      (totals, item) => {
        const debit = parseFloat(item.debit) || 0;
        const credit = parseFloat(item.credit) || 0;
        totals.debit += debit;
        totals.credit += credit;
        return totals;
      },
      { debit: 0, credit: 0 }
    );
  };
  
  const { debit: totalDebit = 0, credit: totalCredit = 0 } = calculateTotals();
  const totalAmount = totalDebit - totalCredit;
  
  let runningTotal = 0;
  

  return (
    <div className={`flex flex-col items-center min-h-screen bg-bodyBg-color text-heading-color ${i18n.language === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className={`w-full ${i18n.language === 'ar' ? 'text-right' : 'text-left'} p-10 mt-20 mb-10`}>
        <h1 className="text-3xl font-bold text-secondary-color">{t('Account Statement')}</h1>
        <h3 className="font-bold text-2xl text-white-400 mt-10">
          {tenantName || t('Loading tenant name...')}
        </h3>
        {start_date && end_date && (
          <h3 className="font-bold text-l mt-3 text-white-400">
            <span className="text-secondary-color">{t('From')}:</span> {start_date}{' '}
            <span className="text-secondary-color">{t('To')}:</span> {end_date}
          </h3>
        )}
         <div className="flex items-center h-5 mt-8 mb-5">
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
        <h3 className="font-bold text-l mt-3 align-middle text-center text-white-400">
          {t('Balance: ')} <span className='text-red-500'>{totalAmount} {t('Shekels')}</span>
        </h3>
        <table dir={i18n.language === 'ar' ? 'rtl' : 'ltr'} className="w-full text-sm text-left mt-5 text-gray-800 dark:text-gray-100 rounded-lg bg-white">
          <thead className="text-xs text-gray-900 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-3 py-3 text-center">{t('Description')}</th>
              <th scope="col" className="px-3 py-3 text-center">{t('Reservation Id')}</th>
              <th scope="col" className="px-5 py-3 text-center">{t('Date')}</th>
              <th scope="col" className="px-2 py-3 text-center">{t('Debit')}</th>
              <th scope="col" className="px-5 py-3 text-center">{t('Credit')}</th>
              <th scope="col" className="px-5 py-3 text-center">{t('Payment Method')}</th>
              <th scope="col" className="px-5 py-3 text-center">{t('Total')}</th>
            </tr>
          </thead>
          <tbody>
            {accountData?.accountStatement?.length === 0 ? (
              <tr>
                <td colSpan="13" className="text-center py-4 text-white">{t('No records found')}</td>
              </tr>
            ) : (
              accountData?.accountStatement?.map((item, index) => {
                const debit = parseFloat(item.debit) || 0;
                const credit = parseFloat(item.credit) || 0;
                runningTotal += debit - credit;
                return (
                  <tr 
                  key={index}
                  className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700 ${index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-900' : ''}`}>
                    <td className="px-1 py-4 text-center">{item.description}</td>
                    <td className="px-1 py-4 text-center">{item.reservation_id}</td>
                    <td className="px-2 py-4 text-center">{item.date}</td>
                    <td className="px-1 py-4 text-center text-red-500">{item.debit}</td>
                    <td className="px-2 py-4 text-center text-green-500">{item.credit}</td>
                    <td className="px-1 py-4 text-center">{item.payment_method}</td>
                    <td className="px-2 py-4 text-center">{runningTotal.toFixed(2)}</td>
                  </tr>
                );
              })
            )}
          </tbody>
          <tfoot>
            <tr className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700  dark:bg-gray-900' : ''}`}>
              <td colSpan="3" className="px-2 py-4 text-center font-bold">{t('Total')}</td>
              <td className="px-2 py-4 text-center text-red-500 font-bold">{totalDebit}</td>
              <td className="px-2 py-4 text-center text-green-500 font-bold">{totalCredit}</td>
              <td className="px-2 py-4 text-center font-bold"></td>
              <td className="px-2 py-4 text-center font-bold">{totalAmount}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default AccountStatementTable;
