import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getGarageById, updateGarage } from '../../../controller/GarageController';

const EditGarageForm = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { garageId } = location.state || {};
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    location: '',
    contact_info: '',
    garage_info: '',
  });
  const [status, setStatus] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchGarageData = async () => {
      try {
        const garageData = await getGarageById(garageId);;
        setFormData({
          name: garageData.name || '',
          type: garageData.type || '',
          location: garageData.location || '',
          contact_info: garageData.contact_info || '',
          garage_info: garageData.garage_info || '',
        });
      } catch (error) {
        console.error('Error fetching garage data:', error);
        setErrors({ form: t('Error fetching garage data') });
      }
    };

    if (garageId) {
      fetchGarageData();
    }
  }, [garageId, t]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = t('Garage Name is required');
    if (!formData.type.trim()) errors.type = t('Garage Type is required');
    if (!formData.location.trim()) errors.location = t('Location is required');
    if (!formData.contact_info.trim()) errors.contact_info = t('Contact Information is required');
    if (!formData.garage_info.trim()) errors.garage_info = t('Garage Information is required');

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus('loading');
    try {
      const response = await updateGarage(garageId, formData);
      if (response.success) {
        setStatus('success');
        setTimeout(() => navigate(-1), 2000);
      } else {
        setStatus('error');
        setErrors({ form: response.message || 'An unexpected error occurred' });
      }
    } catch (error) {
      setStatus('error');
      setErrors({ form: 'An unexpected error occurred' });
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className={`flex flex-col items-center min-h-screen bg-bodyBg-color text-heading-color ${i18n.language === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className={`w-full ${i18n.language === 'ar' ? 'text-right' : 'text-left'} p-10 mt-20 mb-10`}>
        <h1 className="text-3xl font-bold text-secondary-color">{t('Edit')}</h1>
        <h3 className="font-bold text-l mt-3 text-heading-color cursor-pointer">{t('Garage Details')}</h3>
      </div>

      <form onSubmit={handleSubmit} className={`w-full ${i18n.language === 'ar' ? 'text-right' : 'text-left'} p-10 mt-15 mb-10 max-w-md mx-auto`}>
        <div className="mb-5">
          <label htmlFor="name" className="block mb-2 text-sm font-medium">{t('Garage Name')}</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} className="rounded-lg text-gray-900 focus:outline-none focus:border-secondary-color focus:ring focus:ring-secondary-color focus:ring-opacity-100 text-sm block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder={t('Name of Garage')} required />
          {errors.name && <div className="text-red-500">{errors.name}</div>}
        </div>
        <div className="mb-5">
          <label htmlFor="type" className="block mb-2 text-sm font-medium">{t('Garage Type')}</label>
          <input type="text" name="type" value={formData.type} onChange={handleChange} className="rounded-lg text-gray-900 focus:outline-none focus:border-secondary-color focus:ring focus:ring-secondary-color focus:ring-opacity-100 text-sm block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder={t('Garage Type')} required />
          {errors.type && <div className="text-red-500">{errors.type}</div>}
        </div>
        <div className="mb-5">
          <label htmlFor="location" className="block mb-2 text-sm font-medium">{t('Location')}</label>
          <input type="text" name="location" value={formData.location} onChange={handleChange} className="rounded-lg text-gray-900 focus:outline-none focus:border-secondary-color focus:ring focus:ring-secondary-color focus:ring-opacity-100 text-sm block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder={t('Location')} required />
          {errors.location && <div className="text-red-500">{errors.location}</div>}
        </div>
        <div className="mb-5">
          <label htmlFor="contact_info" className="block mb-2 text-sm font-medium">{t('Contact Information')}</label>
          <input type="text" name="contact_info" value={formData.contact_info} onChange={handleChange} className="rounded-lg text-gray-900 focus:outline-none focus:border-secondary-color focus:ring focus:ring-secondary-color focus:ring-opacity-100 text-sm block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder={t('Contact Information')} required />
          {errors.contact_info && <div className="text-red-500">{errors.contact_info}</div>}
        </div>
        <div className="mb-5">
          <label htmlFor="garage_info" className="block mb-2 text-sm font-medium">{t('Garage Information')}</label>
          <textarea name="garage_info" value={formData.garage_info} onChange={handleChange} className="rounded-lg text-gray-900 focus:outline-none focus:border-secondary-color focus:ring focus:ring-secondary-color focus:ring-opacity-100 text-sm block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder={t('Garage Information')} required />
          {errors.garage_info && <div className="text-red-500">{errors.garage_info}</div>}
        </div>
        <div className="flex items-center justify-center h-5 mt-8 mb-5">
          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            {status === 'loading' ? t('Submitting...') : t('Submit')}
          </button>
          <button type="button" className="bg-gray-500 text-white ml-5 mr-5 rounded-md opacity-100 font-medium text-sm w-full sm:w-auto px-5 py-2.5 text-center" onClick={handleGoBack}>{t('Go Back')}</button>
        </div>
        {status === 'success' && (
          <div className="text-green-500 mt-4 flex items-center justify-center h-5">
            {t('Garage updated successfully!')}
          </div>
        )}
        {status === 'error' && (
          <div className="text-red-500 flex items-center justify-center h-5 mt-4">
            {errors.form ? t(errors.form) : t('An error occurred. Please try again.')}
          </div>
        )}
      </form>
    </div>
  );
};

export default EditGarageForm;
