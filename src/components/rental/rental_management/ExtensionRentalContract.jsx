import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getContractsByRentalId, updateEndDate } from '../../../controller/RentedCarController';

const ExtensionRentalContract = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { rentalId } = location.state || {}; 
  const { t, i18n } = useTranslation();
  const [contractData, setContractData] = useState(null);
  const [formData, setFormData] = useState({
    end_date: '', 
    return_time: '', 
  });
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);

  const fetchContractData = async () => {
    if (!rentalId) return;
    try {
      const contract = await getContractsByRentalId(rentalId);
      if (contract.length > 0) {
        const endDateTime = new Date(contract[0]?.end_date);
        const formattedDate = `${endDateTime.getFullYear()}-${String(endDateTime.getMonth() + 1).padStart(2, '0')}-${String(endDateTime.getDate()).padStart(2, '0')}`;
        const formattedTime = `${String(endDateTime.getHours()).padStart(2, '0')}:${String(endDateTime.getMinutes()).padStart(2, '0')}`;

        setContractData(contract[0]);
        setFormData({ 
          end_date: formattedDate,
          return_time: formattedTime,
        });
      }
    } catch (error) {
      console.error('Error fetching contract data:', error);
      setError(t('Error fetching contract data'));
    }
  };

  useEffect(() => {
    fetchContractData();
  }, [rentalId, t]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const timestamp = `${formData.end_date} ${formData.return_time}`;
      const response = await updateEndDate(rentalId, timestamp);
      if (response.success) {
        setStatus('success');
        fetchContractData();
      } else {
        setStatus('error');
        setError(response.message);
      }
    } catch (error) {
      console.error('Error updating end date:', error);
      setStatus('error');
      setError(t('An error occurred. Please try again.'));
    }
  };

  const handleGoBack = () => {
    navigate(-1); 
  };

  return (
    <div className={`flex flex-col items-center min-h-screen bg-bodyBg-color text-heading-color ${i18n.language === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className={`w-full ${i18n.language === 'ar' ? 'text-right' : 'text-left'} p-10 mt-20 mb-10`}>
        <h1 className="text-3xl font-bold text-secondary-color">{t('Extension of Rental Contract')}</h1>
        
        {contractData ? (
          <div>
            <h3 className="font-bold text-xl text-white-800 mt-20">
              {contractData.customer} - {contractData.rental_id}
            </h3>
            <div className="relative overflow-x-auto shadow-md w-full max-w-7xl px-4 sm:px-5 lg:px-8 md:px-8 mb-10 rounded-lg mt-10">
              <table dir={i18n.language === 'ar' ? 'rtl' : 'ltr'} className="w-full text-sm text-left mt-5 text-gray-800 dark:text-gray-100 rounded-lg bg-white">
                <thead className="text-xs text-gray-900 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th className="px-1 py-3 text-center">{t('Rental Id')}</th>
                    <th className="px-3 py-3 text-center">{t('Car')}</th>
                    <th className="px-3 py-3 text-center">{t('Customer')}</th>
                    <th className="px-5 py-3 text-center">{t('From Date')}</th>
                    <th className="px-2 py-3 text-center">{t('Days')}</th>
                    <th className="px-5 py-3 text-center">{t('To Date')}</th>
                    <th className="px-2 py-3 text-center">{t('Price/Day')}</th>
                    <th className="px-4 py-3 text-center">{t('Total Amount')}</th>
                    <th className="px-4 py-3 text-center">{t('Remaining Amount')}</th>
                    <th className="px-1 py-3 text-center">{t('Has Returned?')}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="px-1 py-4 text-center">{contractData.rental_id}</td>
                    <td className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">{contractData.make} {contractData.model}</td>
                    <td className="px-4 py-4 text-blue-500 cursor-pointer text-center">{contractData.customer}</td>
                    <td className="px-1 py-4 text-center">{contractData.start_date}</td>
                    <td className="px-2 py-4 text-center">{contractData.dayNum}</td>
                    <td className="px-1 py-4 text-center">{contractData.end_date}</td>
                    <td className="px-2 py-4 text-center">{contractData.price_perday}</td>
                    <td className="px-1 py-4 text-center">{contractData.total_amount}</td>
                    <td className="px-1 py-4 text-center">{(contractData.total_amount - contractData.amount_paid).toFixed(2)}</td>
                    <td className="px-4 py-4 text-center">{contractData.hasReturned ? t('Yes') : t('No')}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div>{t('Loading contract data...')}</div>
        )}
        <div className={`flex flex-col items-center bg-bodyBg-color text-heading-color mt-10`}>
          <div className="w-full max-w-lg bg-primary-color text-white p-5 mb-10 rounded-lg shadow-md">    
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="end_date" className="block mb-2 text-sm font-bold">
                  {t('New End Date')}
                </label>
                <input
                  type="date"
                  id="end_date"
                  value={formData.end_date}
                  onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="return_time" className="block mb-2 text-sm font-bold">
                  {t('Return Time')}
                </label>
                <input
                  type="time"
                  id="return_time"
                  value={formData.return_time}
                  onChange={(e) => setFormData({ ...formData, return_time: e.target.value })}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                >
                  {status === 'loading' ? t('Processing...') : t('Edit Contract')}
                </button>

                <button
                  onClick={handleGoBack}
                  className="bg-gray-500 text-white m-5 rounded-md opacity-100 font-medium text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                >
                  {t('Go Back')}
                </button>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                {status === 'success' && (
                  <div className="text-green-500 mt-4">
                    {t('Contract updated successfully!')}
                  </div>
                )}
                {status === 'error' && (
                  <div className="text-red-500 mt-4">
                    {t('An error occurred. Please try again.')}
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExtensionRentalContract;
