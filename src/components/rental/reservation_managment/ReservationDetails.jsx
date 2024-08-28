import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getContractsByRentalId } from '../../../controller/RentedCarController';

const ReservationDetails = () => {
  const location = useLocation();
  const { rentalId } = location.state || {}; 
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState('Summary');
  const [contractDetails, setContractDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContractDetails = async () => {
      try {
        const details = await getContractsByRentalId(rentalId);
        setContractDetails(details[0]);
        console.log(details[0]);
      } catch (error) {
        console.error('Error fetching contract details:', error);
        setError(t('Error fetching contract details.'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchContractDetails();
  }, [rentalId, t]);

  if (isLoading) {
    return <div>{t('Loading...')}</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className={`flex flex-col items-center min-h-screen bg-bodyBg-color text-heading-color ${i18n.language === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className={`w-full ${i18n.language === 'ar' ? 'text-right' : 'text-left'} p-10 mt-20`}>
        <h1 className="text-3xl font-bold text-secondary-color">{t('Rental Contract Details')}</h1>
      </div>

      <div className="flex flex-col items-center">
        <nav className="border-b border-gray-100 mb-8">
          <div className="flex flex-wrap justify-around sm:justify-start sm:space-x-8" aria-label="Tabs">
            {['Summary', 'Car Details'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === tab ? 'border-secondary-color text-secondary-color' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                {t(tab)}
              </button>
            ))}
          </div>
        </nav>
      </div>

      {activeTab === 'Summary' && contractDetails && (
        <div className="w-full max-w-screen-lg px-4 sm:px-6 lg:px-8 text-black">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">{t('Contract Status')}</label>
            <div className="mt-1 p-2 border border-yellow-500 rounded-md bg-yellow-100">
              {t(contractDetails.status ?? 'Pending')}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6">
            <div className='bg-white p-4 rounded-xl flex-1'>
              <h3 className="text-lg font-bold mb-2">{t('Rental Information')}</h3>
              <div className="space-y-2">
                <div><strong>{t('Rental ID')}:</strong> {contractDetails.reservation_id}</div>
                <div><strong>{t('Start Date')}:</strong> {contractDetails.start_date}</div>
                <div><strong>{t('End Date')}:</strong> {contractDetails.end_date}</div>
                <div><strong>{t('Total Amount')}:</strong> {contractDetails.total_amount}</div>
                <div><strong>{t('Amount Paid')}:</strong> {contractDetails.amount_paid}</div>
                <div><strong>{t('Remain Amount')}:</strong> {Number(contractDetails.total_amount) - Number(contractDetails.amount_paid)}</div>
                <div><strong>{t('Notes')}:</strong> {contractDetails.note}</div>
              </div>
            </div>
            <div className='bg-white p-4 rounded-xl flex-1'>
              <h3 className="text-lg font-bold mb-2">{t('Tenant Information')}</h3>
              <div className="space-y-2">
                <div><strong>{t('Tenant Name')}:</strong> {contractDetails.customer}</div>
                <div><strong>{t('ID Number')}:</strong> {contractDetails.tenantID}</div>
                <div><strong>{t('Address')}:</strong> {contractDetails.address}</div>
                <div><strong>{t('Contact Number')}:</strong> {contractDetails.phone_number}</div>
                <div><strong>{t('Second Driver Name')}:</strong> {contractDetails.second_driver_name}</div>
                <div><strong>{t('Second Drive ID Number')}:</strong> {contractDetails.second_driver_id}</div>
              </div>
            </div>
          </div>
        </div>

      )}

      {activeTab === 'Car Details' && contractDetails && (
        <div className="w-full max-w-screen-lg px-4 sm:px-6 lg:px-8 mb-6 text-black flex items-center justify-center">
          <div className="bg-white p-4 rounded-xl w-full">
            <h3 className="text-lg font-bold mb-2">{t('Car Details')}</h3>
            <div className="space-y-2">
              <div><strong>{t('Vehicle ID')}:</strong> {contractDetails.vehicle_id}</div>
              <div><strong>{t('Make')}:</strong> {contractDetails.make}</div>
              <div><strong>{t('Model')}:</strong> {contractDetails.model}</div>
              <div><strong>{t('Year')}:</strong> {contractDetails.year}</div>
              <div><strong>{t('Mileage')}:</strong> {contractDetails.car_mileage}</div>
              <div><strong>{t('Condition')}:</strong> {contractDetails.car_condition}</div>
              <div><strong>{t('Damage')}:</strong> {contractDetails.car_damage}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservationDetails;
