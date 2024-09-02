import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getGarageById } from '../../../controller/GarageController';
import { useLocation } from 'react-router-dom';

const GarageDetails = () => {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState('Summary');
  const [garage, setGarage] = useState(null);
  const location = useLocation();
  const { garageId } = location.state || {};

  useEffect(() => {
    const fetchGarageData = async () => {
      try {
        const garageData = await getGarageById(garageId);
        setGarage(garageData);  
      } catch (error) {
        console.error('Error fetching garage data:', error);
      }
    };

    fetchGarageData();
  }, [garageId]);

  if (!garage) {
    return <div>{t('Loading...')}</div>;
  }

  return (
    <div className={`flex flex-col items-center min-h-screen bg-bodyBg-color text-heading-color ${i18n.language === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className={`w-full ${i18n.language === 'ar' ? 'text-right' : 'text-left'} p-10 mt-20`}>
        <h1 className="text-3xl font-bold text-secondary-color">{t('Garage Details')}</h1>
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
         
            <div className='bg-white p-4 rounded-xl'>
              <h3 className="text-lg font-bold mb-2">{t('Garage Information')}</h3>
              <div className="space-y-2">
                <div><strong>{t('Name')}:</strong> {garage.name}</div>
                <div><strong>{t('Type')}:</strong> {garage.type}</div>
                <div><strong>{t('Location')}:</strong> {garage.location}</div>
                <div><strong>{t('Contact Info')}:</strong> {garage.contact_info}</div>
                <div><strong>{t('Garage Info')}:</strong> {garage.garage_info}</div>
              </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default GarageDetails;