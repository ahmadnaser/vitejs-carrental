import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getMaintenanceById } from '../../../controller/MaintenanceController'; 
import { useLocation } from 'react-router-dom';

const MaintenanceDetails = () => {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState('Summary');
  const [maintenance, setMaintenance] = useState(null);
  const location = useLocation();
  const { maintenanceId } = location.state || {};

  
  useEffect(() => {
    const fetchMaintenanceData = async () => {
      
      try {
        const maintenanceData = await getMaintenanceById(maintenanceId);
        setMaintenance(maintenanceData[0]);
      } catch (error) {
        console.error('Error fetching maintenance data:', error);
      }
      
    };

    fetchMaintenanceData();
  }, [maintenanceId]);

  if (!maintenance) {
    return <div>{t('Loading...')}</div>;
  }

  return (
    <div className={`flex flex-col items-center min-h-screen bg-bodyBg-color text-heading-color ${i18n.language === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className={`w-full ${i18n.language === 'ar' ? 'text-right' : 'text-left'} p-10 mt-20`}>
        <h1 className="text-3xl font-bold text-secondary-color">{t('Maintenance Details')}</h1>
      </div>

      <div className="flex flex-col items-center">
        <nav className="border-b border-gray-100 mb-8">
          <div className="flex flex-wrap justify-around sm:justify-start sm:space-x-8" aria-label="Tabs">
            {[t('Summary')].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === tab ? 'border-secondary-color text-secondary-color' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </nav>
      </div>

      {activeTab === t('Summary') && (
        <div className="w-full max-w-screen-lg px-4 sm:px-6 lg:px-8 text-black">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">

            <div className='bg-white p-4 rounded-xl'>
              <h3 className="text-lg font-bold mb-2">{t('Maintenance Information')}</h3>
              <div className="space-y-2">
                <div><strong>{t('Vehicle ID')}:</strong> {maintenance.vehicle_id}</div>
                <div><strong>{t('Maintenance date')}:</strong> {maintenance.maintenance_date}</div>
                <div><strong>{t('Details')}:</strong> {maintenance.details}</div>
                <div><strong>{t('Spare Parts')}:</strong> {maintenance.spare_parts}</div>
                <div><strong>{t('Cost')}:</strong> {maintenance.cost}</div>
                <div><strong>{t('Trader Name')}:</strong> {maintenance.trader_name}</div>
                <div><strong>{t('Trader Name')}:</strong> {maintenance.garage_name}</div>
              </div>
            </div>

            <div className='bg-white p-4 rounded-xl'>
              <h3 className="text-lg font-bold mb-2">{t('Billing Information')}</h3>
              <div className="space-y-2">
              <div><strong>{t('Garage Cost')}:</strong> {maintenance.cost} {t('Shekel')}</div>
                <div><strong>{t('Spare Parts Cost')}:</strong> {maintenance.spare_parts_price} {t('Shekel')}</div>
                <div><strong>{t('Garage Expenses')}:</strong> {maintenance.garage_expenses_amount} {t('Shekel')}</div>
                <div ><strong>{t('Spareb Part Expenses')}:</strong> {maintenance.total_expenses} {t('Shekel')}</div>
                <div><strong>{t('Total Expenses')}:</strong> {maintenance.total_expenses} {t('Shekel')}</div>
              </div>
            </div>
   
          <div className='bg-white p-4 rounded-xl'>
            <h3 className="text-lg font-bold mb-2">{t('Car')}</h3>
            <div className="space-y-2">
              <div><strong>{t('Car Make')}:</strong> {maintenance.make}</div>
              <div><strong>{t('Car Model')}:</strong> {maintenance.model}</div>
            </div>
          </div>

          <div className='bg-white p-4 rounded-xl'>
              <h3 className="text-lg font-bold mb-2">{t('Oil Change?')}</h3>
              <div className="space-y-2">
                <div><strong>{t('Car Mileage')}:</strong> {maintenance.car_mileage || 'Null'}</div>
              </div>
            </div>
          </div>
        
          </div>
        
      )}     
    </div>
  );
};

export default MaintenanceDetails;
