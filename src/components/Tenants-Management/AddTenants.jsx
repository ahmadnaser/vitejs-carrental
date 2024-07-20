import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/themes/airbnb.css';
import { handleTenantFormSubmit } from '../../controller/tenantController';

const AddTenantsForm = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    tenantName: '',
    idNumber: '',
    address: '',
    phoneNumber: '',
    bloodType: '',
    birthDate: '',
    licenseNumber: '',
    licenseStartDate: '',
    licenseEndDate: '',
    idImage: null,
    licenseImage: null,
  });
  const [status, setStatus] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    flatpickr('#birthDate', {
      dateFormat: 'Y-m-d',
      onChange: (selectedDates) => {
        const date = selectedDates[0];
        const formattedDate = date ? flatpickr.formatDate(date, 'Y-m-d') : '';
        setFormData((prevState) => ({
          ...prevState,
          birthDate: formattedDate,
        }));
      },
    });

    flatpickr('#licenseStartDate', {
      dateFormat: 'Y-m-d',
      onChange: (selectedDates) => {
        const date = selectedDates[0];
        const formattedDate = date ? flatpickr.formatDate(date, 'Y-m-d') : '';
        setFormData((prevState) => ({
          ...prevState,
          licenseStartDate: formattedDate,
        }));
      },
    });

    flatpickr('#licenseEndDate', {
      dateFormat: 'Y-m-d',
      onChange: (selectedDates) => {
        const date = selectedDates[0];
        const formattedDate = date ? flatpickr.formatDate(date, 'Y-m-d') : '';
        setFormData((prevState) => ({
          ...prevState,
          licenseEndDate: formattedDate,
        }));
      },
    });
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.tenantName) errors.tenantName = t('Tenant Name is required');
    if (!formData.idNumber) errors.idNumber = t('ID Number is required');
    if (!formData.address) errors.address = t('Address is required');
    if (!formData.phoneNumber) errors.phoneNumber = t('Phone Number is required');
    if (!formData.bloodType) errors.bloodType = t('Blood Type is required');
    if (!formData.birthDate) errors.birthDate = t('Date Of Birth is required');
    if (!formData.licenseNumber) errors.licenseNumber = t('Driving license number is required');
    if (!formData.licenseStartDate) errors.licenseStartDate = t('License start date is required');
    if (!formData.licenseEndDate) errors.licenseEndDate = t('License end date is required');
    if (!formData.idImage) errors.idImage = t('Copy of personal ID is required');
    if (!formData.licenseImage) errors.licenseImage = t('Copy of personal Driving license is required');

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus('loading');
    try {
      const response = await handleTenantFormSubmit(formData);
      if (response.success) {
        setStatus('success');
        setTimeout(() => navigate('/renting/add-rental-contract', { state: { tenantName: formData.tenantName, idNumber: formData.idNumber } }), 2000);
      } else {
        setStatus('error');
        if (response.message) {
          setErrors(response.message);
        } else {
          setErrors({ form: 'An unexpected error occurred' });
        }
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
        <h1 className="text-3xl font-bold text-secondary-color">{t('Add')}</h1>
        <h3 className="font-bold text-l mt-3 text-heading-color cursor-pointer">{t('New Tenant')}</h3>
      </div>

      <form onSubmit={handleSubmit} className={`w-full ${i18n.language === 'ar' ? 'text-right' : 'text-left'} p-10 mt-15 mb-10 max-w-md mx-auto`} encType="multipart/form-data">
        <div className="mb-5">
          <label htmlFor="tenantName" className="block mb-2 text-sm font-medium">{t('Tenant Name')}</label>
          <input type="text" name="tenantName" value={formData.tenantName} onChange={handleChange} className="rounded-lg text-gray-900 focus:outline-none focus:border-secondary-color focus:ring focus:ring-secondary-color focus:ring-opacity-100 text-sm block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder={t('Name of Tenants')} required />
          {errors.tenantName && <div className="text-red-500">{errors.tenantName}</div>}
        </div>
        <div className="mb-5">
          <label htmlFor="idNumber" className="block mb-2 text-sm font-medium">{t('ID Number')}</label>
          <input type="text" name="idNumber" value={formData.idNumber} onChange={handleChange} className="rounded-lg text-gray-900 focus:outline-none focus:border-secondary-color focus:ring focus:ring-secondary-color focus:ring-opacity-100 text-sm block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder={t('ID Number')} required />
          {errors.idNumber && <div className="text-red-500">{errors.idNumber}</div>}
        </div>
        <div className="mb-5">
          <label htmlFor="address" className="block mb-2 text-sm font-medium">{t('Address')}</label>
          <input type="text" name="address" value={formData.address} onChange={handleChange} className="rounded-lg text-gray-900 focus:outline-none focus:border-secondary-color focus:ring focus:ring-secondary-color focus:ring-opacity-100 text-sm block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder={t('Address')} required />
          {errors.address && <div className="text-red-500">{errors.address}</div>}
        </div>
        <div className="mb-5">
          <label htmlFor="phoneNumber" className="block mb-2 text-sm font-medium">{t('Phone')}</label>
          <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className="rounded-lg text-gray-900 focus:outline-none focus:border-secondary-color focus:ring focus:ring-secondary-color focus:ring-opacity-100 text-sm block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder={t('Phone')} required />
          {errors.phoneNumber && <div className="text-red-500">{errors.phoneNumber}</div>}
        </div>
        <div className="mb-5">
          <label htmlFor="bloodType" className="block mb-2 text-sm font-medium">{t('Blood Type')}</label>
          <select name="bloodType" value={formData.bloodType} onChange={handleChange} className="text-gray-900 focus:outline-none focus:border-secondary-color focus:ring focus:ring-secondary-color focus:ring-opacity-100 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" required>
            <option value="" disabled>{t('Select your blood type')}</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>
          {errors.bloodType && <div className="text-red-500">{errors.bloodType}</div>}
        </div>
        <div className="mb-5">
          <label htmlFor="birthDate" className="block mb-2 text-sm font-medium">{t('Date Of Birth')}</label>
          <div className="relative max-w-sm">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
              </svg>
            </div>
            <input name="birthDate" id="birthDate" value={formData.birthDate} onChange={handleChange} data-datepicker data-datepicker-buttons data-datepicker-autoselect-today type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={t('Select date')} />
          </div>
          {errors.birthDate && <div className="text-red-500">{errors.birthDate}</div>}
        </div>
        <div className="mb-5">
          <label htmlFor="licenseNumber" className="block mb-2 text-sm font-medium">{t('Driving license number')}</label>
          <input type="text" name="licenseNumber" value={formData.licenseNumber} onChange={handleChange} className="rounded-lg text-gray-900 focus:outline-none focus:border-secondary-color focus:ring focus:ring-secondary-color focus:ring-opacity-100 text-sm block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder={t('Driving license number')} required />
          {errors.licenseNumber && <div className="text-red-500">{errors.licenseNumber}</div>}
        </div>
        <div className="mb-5">
          <label htmlFor="licenseStartDate" className="block mb-2 text-sm font-medium">{t('License start date')}</label>
          <div className="relative max-w-sm">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
              </svg>
            </div>
            <input name="licenseStartDate" id="licenseStartDate" value={formData.licenseStartDate} onChange={handleChange} data-datepicker data-datepicker-buttons data-datepicker-autoselect-today type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={t('Select date')} />
          </div>
          {errors.licenseStartDate && <div className="text-red-500">{errors.licenseStartDate}</div>}
        </div>
        <div className="mb-5">
          <label htmlFor="licenseEndDate" className="block mb-2 text-sm font-medium">{t('License end date')}</label>
          <div className="relative max-w-sm">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
              </svg>
            </div>
            <input name="licenseEndDate" id="licenseEndDate" value={formData.licenseEndDate} onChange={handleChange} data-datepicker data-datepicker-buttons data-datepicker-autoselect-today type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={t('Select date')} />
          </div>
          {errors.licenseEndDate && <div className="text-red-500">{errors.licenseEndDate}</div>}
        </div>
        <div className="mb-5">
          <label htmlFor="idImage" className="block mb-2 text-sm font-medium">{t('Copy of personal ID')}</label>
          <input name="idImage" onChange={handleChange} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" type="file" required />
          {errors.idImage && <div className="text-red-500">{errors.idImage}</div>}
        </div>
        <div className="mb-5">
          <label htmlFor="licenseImage" className="block mb-2 text-sm font-medium">{t('Copy of personal Driving licence')}</label>
          <input name="licenseImage" onChange={handleChange} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" type="file" required />
          {errors.licenseImage && <div className="text-red-500">{errors.licenseImage}</div>}
        </div>
        <div className="mb-5">
          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            {status === 'loading' ? t('Submitting...') : t('Submit')}
          </button>
          <button type="button" className="bg-gray-500 text-white ml-5 mr-5 rounded-md opacity-100 font-medium text-sm w-full sm:w-auto px-5 py-2.5 text-center" onClick={handleGoBack}>{t('Go Back')}</button>
        </div>
        {status === 'success' && (
          <div className="text-green-500">
            {t('Tenant added successfully! Redirecting...')}
          </div>
        )}
        {status === 'error' && (
          <div className="text-red-500">
            {errors ? t(errors) : t('An error occurred. Please try again.')}
          </div>
        )}
      </form>
    </div>
  );
};

export default AddTenantsForm;


