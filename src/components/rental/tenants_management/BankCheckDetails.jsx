import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { geBankCheckById } from '../../../controller/PaymentController';

async function loadConfig() {
  const config = await import('../../../../config.json', {
    assert: { type: 'json' }
  });
  return config.default;
}

let config;

async function initializeConfig() {
  config = await loadConfig();
}

initializeConfig().catch(error => {
  console.error("Failed to load configuration:", error);
});

const BankCheckDetails = () => {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState(t('Summary'));
  const location = useLocation();
  const { check_id } = location.state || {};
  const [checkDetails, setCheckDetails] = useState(null);

  console.log("Stive", check_id)

  useEffect(() => {
    const fetchCheckDetails = async () => {
      try {
        const details = await geBankCheckById(check_id);
        console.log(details);
        setCheckDetails(details);
      } catch (error) {
        console.error(t('Error fetching check details:'), error);
      }
    };

    fetchCheckDetails();
  }, [check_id]);
  

  if (!checkDetails) {
    return <div>{t('Loading...')}</div>;
  }

  return (
    <div className={`flex flex-col items-center min-h-screen bg-bodyBg-color text-heading-color ${i18n.language === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className={`w-full ${i18n.language === 'ar' ? 'text-right' : 'text-left'} p-10 mt-20`}>
        <h1 className="text-3xl font-bold text-secondary-color">{t('Bank Check Details')}</h1>
      </div>

      <div className="flex flex-col items-center">
        <nav className="border-b border-gray-100 mb-8">
          <div className="flex flex-wrap justify-around sm:justify-start sm:space-x-8" aria-label="Tabs">
            {[t('Summary'), t('Check Image')].map(tab => (
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
          <div className="bg-white p-4 rounded-xl">
            <h3 className="text-lg font-bold mb-2">{t('Check Information')}</h3>
            <div className="space-y-2">
              <div><strong>{t('Check Number')}:</strong> {checkDetails.check_number}</div>
              <div><strong>{t('Account Number')}:</strong> {checkDetails.account_number}</div>
              <div><strong>{t('Check Holder')}:</strong> {checkDetails.check_holder}</div>
              <div><strong>{t('Bank Name')}:</strong> {checkDetails.bank_name}</div>
              <div><strong>{t('Check Date')}:</strong> {checkDetails.check_date}</div>
            </div>
          </div>
        </div>
      )}

      {activeTab === t('Check Image') && (
        <div className="w-full max-w-screen-lg px-4 sm:px-6 lg:px-8 mb-6 text-black flex items-center justify-center" style={{ height: '100%' }}>
          {checkDetails.check_image ? (
            <img src={`${config.BaseURL}${checkDetails.check_image}`} alt={t('Check Image')} className="max-w-full h-auto" />
          ) : (
            <p className="text-white text-2xl text-center">{t('No check image available')}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default BankCheckDetails;
