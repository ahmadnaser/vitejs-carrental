import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getContractsByRentalId, returnCar } from '../../../controller/RentedCarController';

const ReturnForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { rentalId } = location.state || {};
  const [loading, setLoading] = useState(true);
  const [rentalData, setRentalData] = useState([]);
  const [returnDate, setReturnDate] = useState(new Date().toISOString().split('T')[0]);
  const [carMileage, setCarMileage] = useState('');
  const [status, setStatus] = useState(null);
  const [errors, setErrors] = useState({});
  const { t, i18n } = useTranslation();

  const fetchRentalData = async () => {
    try {
      const data = await getContractsByRentalId(rentalId);
      setRentalData(data);
    } catch (error) {
      console.error('Error fetching rental data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (rentalId) {
      fetchRentalData();
    }
  }, [rentalId]);

  const validateForm = () => {
    const errors = {};
    if (!returnDate.trim()) errors.return_date = t('Return date is required');
    if (!carMileage.trim()) errors.car_mileage = t('Car mileage is required');
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleReturnSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setStatus('error');
      setErrors({ form: 'Invalid Form, please fill in all required fields' });
      return;
    }

    const submissionData = {
      rental_id:rentalId,
      return_date: returnDate,
      car_mileage: carMileage,
    };

    setStatus('loading');
    try {
      const response = await returnCar(submissionData);
      if (response.success) {
        setStatus('success');
        fetchRentalData(); 
        setReturnDate(new Date().toISOString().split('T')[0]);
        setCarMileage('');
        setTimeout(() => navigate(-1), 2000);
      } else {
        setStatus('error');
        setErrors({ form: response.message });
      }
    } catch (error) {
      setStatus('error');
      setErrors({ form: error.message });
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className={`flex flex-col items-center min-h-screen bg-bodyBg-color text-heading-color ${i18n.language === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className={`w-full ${i18n.language === 'ar' ? 'text-right' : 'text-left'} p-10 mt-20 mb-10`}>
        <h1 className="text-3xl font-bold text-secondary-color">{t('Return Car')}</h1>
      </div>

      {loading ? (
        <div>{t('Loading...')}</div>
      ) : (
        <div className="relative overflow-x-auto shadow-md w-full max-w-7xl px-4 sm:px-5 lg:px-8 md:px-8 mb-10 rounded-lg mt-1">
          <table dir={i18n.language === 'ar' ? 'rtl' : 'ltr'} className="w-full text-sm text-left mt-5 text-gray-800 dark:text-gray-100 rounded-lg bg-white">
          <thead className="text-xs text-gray-900 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              
              <th scope="col" className="px-1 py-3 cursor-pointer text-center">
                <div className="flex items-center">
                  {t('Rental Id')}
                </div>
              </th>
              
              <th scope="col" className="px-3 py-3 cursor-pointer text-center" >
                <div className="flex justify-center items-center">
                  {t('Car')}
                  
                </div>
              </th>
              <th scope="col" className="px-3 py-3 cursor-pointer text-center" >
                <div className="flex justify-center items-center">
                  {t('Customer')}
                  
                </div>
              </th>
              <th scope="col" className="px-5 py-3 cursor-pointer text-center" >
                <div className="flex items-center">
                  {t('From Date')}
                  
                </div>
              </th>
              <th scope="col" className="px-2 py-3 cursor-pointer" >
                <div className="flex items-center">
                  {t('Days')}
                  
                </div>
              </th>
              <th scope="col" className="px-5 py-3 cursor-pointer" >
                <div className="flex items-center">
                  {t('To Date')}
                
                </div>
              </th>
            
              <th scope="col" className="px-2 py-3 cursor-pointer" >
                <div className="flex items-center">
                  {t('Price/Day')}
                 
                </div>
              </th>
              <th scope="col" className="px-4 py-3 cursor-pointer text-center" >
                <div className="flex items-center">
                  {t('Total Amount')}
                 
                </div>
              </th>
              <th scope="col" className="px-4 py-3 cursor-pointer text-center" >
                <div className="flex items-center">
                  {t('Remaining Amount')}
                
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
              {rentalData.length === 0 ? (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td colSpan="5" className="text-center py-4 text-white">
                    {t('No records found')}
                  </td>
                </tr>
              ) : (
                rentalData.map((item, index) => (
                  <tr key={index} className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700 ${index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-900' : ''}`}>
                   <td className="px-1 py-4 text-center">{item.rental_id}</td>
                  <td className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">{item.make} {item.model}</td>
                  <td className="px-4 py-4 text-blue-500 cursor-pointer text-center" onClick={() => handleCustomerClick(item.tenantID)}>{item.customer}</td>
                  <td className="px-1 py-4 text-center">{item.start_date}</td>
                  <td className="px-2 py-4 text-center">{item.dayNum}</td>
                  <td className="px-1 py-4 text-center">{item.end_date}</td>
                  <td className="px-2 py-4 text-center">{item.price_perday}</td>
                  <td className="px-1 py-4 text-center">{item.total_amount}</td>
                  <td className="px-1 py-4 text-center text-red-500">{(item.total_amount - item.amount_paid).toFixed(2)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      <div className="w-full max-w-lg bg-primary-color text-white p-5 mb-10 rounded-lg shadow-md">
        <form onSubmit={handleReturnSubmit}>
          <div className="mb-4">
            <label htmlFor="returnDate" className="block mb-2 text-sm font-bold">{t('Return Date')}</label>
            <input
              type="date"
              id="returnDate"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="carMileage" className="block mb-2 text-sm font-bold">{t('Car Mileage')}</label>
            <input
              type="number"
              id="carMileage"
              value={carMileage}
              onChange={(e) => setCarMileage(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder='Car Mileage'
              required
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              {status === 'loading' ? t('Processing...') : t('Submit Return')}
            </button>

            <button type="button" className="bg-gray-500 text-white m-5 rounded-md opacity-100 font-medium text-sm w-full sm:w-auto px-5 py-2.5 text-center" onClick={handleGoBack}>{t('Go Back')}</button>
          </div>
          {status === 'success' && (
            <div className="text-green-500 mt-4">
              {t('Car returned successfully!')}
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

export default ReturnForm;
