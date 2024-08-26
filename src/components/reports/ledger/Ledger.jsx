import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import 'flatpickr/dist/themes/airbnb.css';
import { getConfigCode } from '../../../controller/CodeController';

const LedgerForm = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [status, setStatus] = useState(null);
  const [errors, setErrors] = useState({});
  const [retrievedCode, setRetrievedCode] = useState(''); 
  const [enteredCode, setEnteredCode] = useState(''); 

  useEffect(() => {

    const fetchConfigCode = async () => {
      try {
        const [config] = await getConfigCode();
        setRetrievedCode(config.code);
      } catch (error) {
        console.error('Error fetching config code:', error);
      }
    };
    fetchConfigCode();
  }, []);


  const handleCodeChange = (event) => {
    setEnteredCode(event.target.value);
  };

  const handleNavigation = (path) => {
    const validationErrors = {};
    console.log('Validation errors:', enteredCode);
    console.log('Validation errors:', retrievedCode);
    if (enteredCode !== retrievedCode) validationErrors.code = t('The code you entered is incorrect.');

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    navigate(path);
  };

  return (
    <div className={`flex flex-col items-center min-h-screen bg-bodyBg-color text-heading-color ${i18n.language === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className={`w-full ${i18n.language === 'ar' ? 'text-right' : 'text-left'} p-10 mt-20 mb-10`}>
        <h1 className="text-3xl font-bold text-secondary-color">{t('Ledger')}</h1>
      </div>

      <form className={`w-full ${i18n.language === 'ar' ? 'text-right' : 'text-left'} p-10 mt-15 mb-10 max-w-md mx-auto items-center align-middle `}>
        
      <div className="bg-white p-3 rounded-md mb-5">
              <h2 className="text-black font-medium mb-1 text-xl">
                {t("Ledger Statment")}
              </h2>
              <p className="text-small-text-color mb-8">
                {t("Here you are informed of all your store statements, including profits, expenses and costs.")}<span className='text-blue-500'>{t(" Go with admin code")}</span>
              </p>
            </div>

        <div className="mt-10">
          <label htmlFor="code" className="block mb-2 text-sm font-medium">{t('Code')}</label>
          <input
            type="password"
            id="code"
            value={enteredCode}
            onChange={handleCodeChange}
            className="rounded-lg text-gray-900 focus:outline-none focus:border-secondary-color focus:ring focus:ring-secondary-color focus:ring-opacity-100 text-sm block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder={t('Code')}
            required
          />
          {errors.code && <span className="text-red-500 mt-2 text-sm">{errors.code}</span>}
        </div>

        <div className="mb-5 mt-10 flex flex-col justify-center sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
          
          <button
            type="button"
            onClick={() => handleNavigation('/reports/ledger/ledger-tables')}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {status === 'loading' ? t('Submitting...') : t('Show Statement')}
          </button>
          
        </div>

        {status === 'success' && (
          <div className="text-green-500">
            {t('Rental Contract added successfully! Redirecting...')}
          </div>
        )}
        {status === 'error' && (
          <div className="text-red-500">
            {t('An error occurred. Please try again.')}
          </div>
        )}
      </form>
    </div>
  );
};

export default LedgerForm;
