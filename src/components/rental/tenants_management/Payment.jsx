import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getTenantById, getAccountStatmentById } from '../../../controller/TenantController';
import { addPayment } from '../../../controller/PaymentController';
import AccountStatement from '../../paper_documents/AccountStatement';
import { pdf } from '@react-pdf/renderer';

const PaymentForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { tenant_id } = location.state || {};
  const [loading, setLoading] = useState(true);
  const [tenantName, setTenantName] = useState('');
  const [accountData, setAccountData] = useState([]);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentDate, setPaymentDate] = useState(new Date().toISOString().split('T')[0]); 
  const [status, setStatus] = useState(null);
  const [errors, setErrors] = useState({});
  const [isBankCheck, setIsBankCheck] = useState(false);
  const [bankDetails, setBankDetails] = useState({
    check_number: '',
    bank_name: '',
    check_holder: '',
    account_number: '',
    check_date: '',
    check_image: null,
  });
  const { t, i18n } = useTranslation();
  const [startDate, setStartDate] = useState('2012-01-01'); 
  const [endDate, setEndDate] = useState('2029-05-05');   

  const fetchAccountData = async () => {
    try {
      const account = await getAccountStatmentById(tenant_id, startDate, endDate);
      setAccountData(account);
    } catch (error) {
      console.error('Error fetching account data:', error);
    }
  };

  useEffect(() => {
    if (!tenant_id) {
      console.error('Tenant ID is missing!');
      navigate(-1);
      return;
    }

    const fetchTenantData = async () => {
      try {
        const tenant = await getTenantById(tenant_id);
        setTenantName(tenant.tenant_name);
      } catch (error) {
        console.error('Error fetching tenant data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTenantData();
    fetchAccountData();
  }, [tenant_id, startDate, endDate, navigate]);

  const validateForm = () => {
    const errors = {};
    if (!paymentDate.trim()) errors.payment_date = t('Payment date is required');
    if (!paymentAmount) errors.payment_amount = t('Payment amount is required');

    if (isBankCheck) {
      if (!bankDetails.check_number.trim()) errors.check_number = t('Check number is required');
      if (!bankDetails.bank_name.trim()) errors.bank_name = t('Bank name is required');
      if (!bankDetails.check_holder.trim()) errors.check_holder = t('Check holder is required');
      if (!bankDetails.account_number.trim()) errors.account_number = t('Account number is required');
      if (!bankDetails.check_date.trim()) errors.check_date = t('Check date is required');
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setStatus('error');
      setErrors({ form: 'Invalid Form, please fill in all required fields' });
      return;
    }

    const submissionData = new FormData();

    submissionData.append('tenant_id', tenant_id);
    submissionData.append('payment_amount', paymentAmount);
    submissionData.append('payment_date', paymentDate);

    if (isBankCheck) {
      Object.keys(bankDetails).forEach((key) => {
        submissionData.append(key, bankDetails[key]);
      });
    }

    const formDataEntries = Array.from(submissionData.entries());
    const formDataObject = {};
    formDataEntries.forEach(([key, value]) => {
      formDataObject[key] = value;
    });

    console.log('Form Data before submission:', formDataObject);

    setStatus('loading');
    try {
      const response = await addPayment(submissionData);
      if (response.success) {
        setStatus('success');
        await fetchAccountData(); 
        setPaymentAmount('');
        setPaymentDate(new Date().toISOString().split('T')[0]);
        setIsBankCheck(false);
        setBankDetails({
          check_number: '',
          bank_name: '',
          check_holder: '',
          account_number: '',
          check_date: '',
          check_image: null,
        });
      } else {
        setStatus('error');
        setErrors({ form: response.message });
      }
    } catch (error) {
      setStatus('error');
      setErrors({ form: error.message });
    }
  };

  const handleBankDetailsChange = (e) => {
    const { name, value, files } = e.target;
    setBankDetails(prevDetails => ({
      ...prevDetails,
      [name]: files ? files[0] : value
    }));
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handlePrintClick = async () => {
    setLoading(true);
    try {
      const blob = await pdf(<AccountStatement data={accountData?.accountStatement} startDate={startDate} endDate={endDate} />).toBlob();
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
        <h1 className="text-3xl font-bold text-secondary-color">{t('Payment')}</h1>
        <h3 className="font-bold text-3xl text-white-800 mt-10">
          {tenantName || t('Loading tenant name...')} - {tenant_id}
        </h3>
       
        <div className="mb-1 mt-10">
          <button type="button" onClick={handlePrintClick} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            {status === 'loading' ? t('Printing...') : t('Print')}
          </button>
          <button type="button" className="bg-gray-500 text-white m-5 rounded-md opacity-100 font-medium text-sm w-full sm:w-auto px-5 py-2.5 text-center" onClick={handleGoBack}>{t('Go Back')}</button>
        </div>
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
              <th scope="col" className="px-5 py-3 text-center">{t('Total')}</th>
            </tr>
          </thead>
          <tbody>
              {accountData?.accountStatement?.length === 0 ? (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td colSpan="6" className="text-center py-4 text-white">
                    {t('No records found')}
                  </td>
                </tr>
              ) : (
                accountData?.accountStatement?.map((item, index) => {
                const debit = parseFloat(item.debit) || 0;
                const credit = parseFloat(item.credit) || 0;
                runningTotal += debit - credit;
                return (
                  <tr key={index} 
                  className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700 ${index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-900' : ''}`}>
                    <td className="px-1 py-4 text-center">{item.description}</td>
                    <td className="px-1 py-4 text-center">{item.reservation_id}</td>
                    <td className="px-2 py-4 text-center">{item.date}</td>
                    <td className="px-1 py-4 text-center text-red-500">{item.debit}</td>
                    <td className="px-2 py-4 text-center text-green-500">{item.credit}</td>
                    <td className="px-2 py-4 text-center">{runningTotal.toFixed(2)}</td>
                  </tr>
                );
              })
            )}
          </tbody>
          <tfoot>
            <tr   className={` border-b dark:bg-gray-800 dark:border-gray-700  bg-gray-50 dark:bg-gray-900' : ''}`}> 
              
              <td colSpan="3" className="px-2 py-4 text-center font-bold">{t('Total')}</td>
              <td className="px-2 py-4 text-center text-red-500 font-bold">{totalDebit}</td>
              <td className="px-2 py-4 text-center text-green-500 font-bold">{totalCredit}</td>
              <td className="px-2 py-4 text-center font-bold">{totalAmount}</td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="w-full max-w-lg bg-primary-color text-white p-5 mb-10 rounded-lg shadow-md">
        <form onSubmit={handlePaymentSubmit}>
          <div className="mb-4">
            <label htmlFor="paymentDate" className="block mb-2 text-sm font-bold">{t('Payment Date')}</label>
            <input
              type="date"
              id="paymentDate"
              value={paymentDate}
              onChange={(e) => setPaymentDate(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="paymentAmount" className="block mb-2 text-sm font-bold">{t('Payment Amount')}</label>
            <input
              type="number"
              id="paymentAmount"
              value={paymentAmount}
              onChange={(e) => setPaymentAmount(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="flex items-center h-5 mt-8 mb-5">
            <input
              id="bankCheck"
              type="checkbox"
              checked={isBankCheck}
              onChange={(e) => setIsBankCheck(e.target.checked)}
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
            />
            <label htmlFor="bankCheck" className="ms-2 text-sm font-medium text-heading-color dark:text-gray-300">{t('Bank Check?')}</label>
          </div>

          {isBankCheck && (
            <div className="mb-10 mt-10">
              <div className="mb-5">
                <label htmlFor="check_number" className="block mb-2 text-sm font-medium">{t('Check Number')}</label>
                <input
                  type="text"
                  id="check_number"
                  name="check_number"
                  value={bankDetails.check_number}
                  onChange={handleBankDetailsChange}
                  className="rounded-lg rounded-e-lg text-gray-900 focus:outline-none focus:border-secondary-color focus:ring focus:ring-secondary-color focus:ring-opacity-100 text-sm block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder={t('Enter check number')}
                  required
                />
              </div>

              <div className="mb-5">
                <label htmlFor="bank_name" className="block mb-2 text-sm font-medium">{t('Bank Name')}</label>
                <input
                  type="text"
                  id="bank_name"
                  name="bank_name"
                  value={bankDetails.bank_name}
                  onChange={handleBankDetailsChange}
                  className="rounded-lg rounded-e-lg text-gray-900 focus:outline-none focus:border-secondary-color focus:ring focus:ring-secondary-color focus:ring-opacity-100 text-sm block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder={t('Enter bank name')}
                  required
                />
              </div>

              <div className="mb-5">
                <label htmlFor="account_number" className="block mb-2 text-sm font-medium">{t('Account Number')}</label>
                <input
                  type="text"
                  id="account_number"
                  name="account_number"
                  value={bankDetails.account_number}
                  onChange={handleBankDetailsChange}
                  className="rounded-lg rounded-e-lg text-gray-900 focus:outline-none focus:border-secondary-color focus:ring focus:ring-secondary-color focus:ring-opacity-100 text-sm block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder={t('Account Number')}
                  required
                />
              </div>

              <div className="mb-5">
                <label htmlFor="check_holder" className="block mb-2 text-sm font-medium">{t('Check Holder')}</label>
                <input
                  type="text"
                  id="check_holder"
                  name="check_holder"
                  value={bankDetails.check_holder}
                  onChange={handleBankDetailsChange}
                  className="rounded-lg rounded-e-lg text-gray-900 focus:outline-none focus:border-secondary-color focus:ring focus:ring-secondary-color focus:ring-opacity-100 text-sm block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder={t('Check holder')}
                  required
                />
              </div>

              <div className="mb-5">
                <label htmlFor="check_date" className="block mb-2 text-sm font-medium">{t('Due Date')}</label>
                <input
                  type="date"
                  id="check_date"
                  name="check_date"
                  value={bankDetails.check_date}
                  onChange={handleBankDetailsChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>

              <div className="mb-5">
                <label htmlFor="check_image" className="block mb-2 text-sm font-medium">{t('Copy of Check')}</label>
                <input
                  name="check_image"
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  type="file"
                  onChange={handleBankDetailsChange}
                />
              </div>
            </div>
          )}

          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              {status === 'loading' ? t('Processing...') : t('Submit Payment')}
            </button>
          </div>
          {status === 'success' && (
            <div className="text-green-500 mt-4">
              {t('Payment submitted successfully!')}
            </div>
          )}
          {status === 'error' && (
            <div className="text-red-500 mt-4">
              {errors.form ? t(errors.form) : t('An error occurred. Please try again.')}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default PaymentForm;
