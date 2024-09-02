import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/themes/airbnb.css';
import { addTenants } from '../../../controller/TenantController';

const AddTenantsForm = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    tenant_name: '',
    id_number: '',
    address: '',
    phone_number: '',
    blood_type: '',
    birth_date: '',
    license_number: '',
    license_start_date: '',
    license_end_date: '',
    id_image: null,
    license_image: null,
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
          birth_date: formattedDate,
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
          license_start_date: formattedDate,
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
          license_end_date: formattedDate,
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
    if (!formData.tenant_name.trim()) errors.tenant_name = t('Tenant Name is required');
    if (!formData.id_number.trim()) errors.id_number = t('ID Number is required');
    if (!formData.address.trim()) errors.address = t('Address is required');
    if (!formData.phone_number) errors.phone_number = t('Phone Number is required');
    if (!formData.blood_type.trim()) errors.blood_type = t('Blood Type is required');
    if (!formData.birth_date.trim()) errors.birth_date = t('Date Of Birth is required');
    if (!formData.license_number) errors.license_number = t('Driving license number is required');
    if (!formData.license_start_date.trim()) errors.license_start_date = t('License start date is required');
    if (!formData.license_end_date.trim()) errors.license_end_date = t('License end date is required');


    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const form = new FormData();
  
    form.append('tenant_name', formData.tenant_name);
    form.append('id_number', formData.id_number);
    form.append('address', formData.address);
    form.append('phone_number', formData.phone_number);
    form.append('blood_type', formData.blood_type);
    form.append('birth_date', formData.birth_date);
    form.append('license_number', formData.license_number);
    form.append('license_start_date', formData.license_start_date);
    form.append('license_end_date', formData.license_end_date);
    
    if (formData.id_image) {
      form.append('id_image', formData.id_image);
    }
    
    if (formData.license_image) {
      form.append('license_image', formData.license_image);
    }

    setStatus('loading');
    try {
      const response = await addTenants(form);
      if (response.success) {
        setStatus('success');
        setTimeout(() => navigate(-1), 2000);
      } else {
        setStatus('error');
        if (response.message) {
          setErrors({form:response.message});
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
          <label htmlFor="tenant_name" className="block mb-2 text-sm font-medium">{t('Tenant Name')}</label>
          <input type="text" name="tenant_name" value={formData.tenant_name} onChange={handleChange} className="rounded-lg text-gray-900 focus:outline-none focus:border-secondary-color focus:ring focus:ring-secondary-color focus:ring-opacity-100 text-sm block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder={t('Name of Tenants')} required />
          {errors.tenant_name && <div className="text-red-500">{errors.tenant_name}</div>}
        </div>
        <div className="mb-5">
          <label htmlFor="id_number" className="block mb-2 text-sm font-medium">{t('ID Number')}</label>
          <input type="text" name="id_number" value={formData.id_number} onChange={handleChange} className="rounded-lg text-gray-900 focus:outline-none focus:border-secondary-color focus:ring focus:ring-secondary-color focus:ring-opacity-100 text-sm block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder={t('ID Number')} required />
          {errors.id_number && <div className="text-red-500">{errors.id_number}</div>}
        </div>
        <div className="mb-5">
          <label htmlFor="address" className="block mb-2 text-sm font-medium">{t('Address')}</label>
          <input type="text" name="address" value={formData.address} onChange={handleChange} className="rounded-lg text-gray-900 focus:outline-none focus:border-secondary-color focus:ring focus:ring-secondary-color focus:ring-opacity-100 text-sm block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder={t('Address')} required />
          {errors.address && <div className="text-red-500">{errors.address}</div>}
        </div>
        <div className="mb-5">
          <label htmlFor="phone_number" className="block mb-2 text-sm font-medium">{t('Phone')}</label>
          <input type="tel" name="phone_number" value={formData.phone_number} onChange={handleChange} className="rounded-lg text-gray-900 focus:outline-none focus:border-secondary-color focus:ring focus:ring-secondary-color focus:ring-opacity-100 text-sm block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder={t('Phone')} required />
          {errors.phone_number && <div className="text-red-500">{errors.phone_number}</div>}
        </div>
        <div className="mb-5">
          <label htmlFor="blood_type" className="block mb-2 text-sm font-medium">{t('Blood Type')}</label>
          <select name="blood_type" value={formData.blood_type} onChange={handleChange} className="text-gray-900 focus:outline-none focus:border-secondary-color focus:ring focus:ring-secondary-color focus:ring-opacity-100 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" required>
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
          {errors.blood_type && <div className="text-red-500">{errors.blood_type}</div>}
        </div>
        <div className="mb-5">
          <label htmlFor="birthDate" className="block mb-2 text-sm font-medium">{t('Date Of Birth')}</label>
          <input type="text" id="birthDate" name="birth_date" value={formData.birth_date} onChange={handleChange} className="rounded-lg text-gray-900 focus:outline-none focus:border-secondary-color focus:ring focus:ring-secondary-color focus:ring-opacity-100 text-sm block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder={t('Date Of Birth')} required />
          {errors.birth_date && <div className="text-red-500">{errors.birth_date}</div>}
        </div>
        <div className="mb-5">
          <label htmlFor="license_number" className="block mb-2 text-sm font-medium">{t('Driving License Number')}</label>
          <input type="text" name="license_number" value={formData.license_number} onChange={handleChange} className="rounded-lg text-gray-900 focus:outline-none focus:border-secondary-color focus:ring focus:ring-secondary-color focus:ring-opacity-100 text-sm block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder={t('Driving License Number')} required />
          {errors.license_number && <div className="text-red-500">{errors.license_number}</div>}
        </div>
        <div className="mb-5">
          <label htmlFor="licenseStartDate" className="block mb-2 text-sm font-medium">{t('License Start Date')}</label>
          <input type="text" id="licenseStartDate" name="license_start_date" value={formData.license_start_date} onChange={handleChange} className="rounded-lg text-gray-900 focus:outline-none focus:border-secondary-color focus:ring focus:ring-secondary-color focus:ring-opacity-100 text-sm block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder={t('License Start Date')} required />
          {errors.license_start_date && <div className="text-red-500">{errors.license_start_date}</div>}
        </div>
        <div className="mb-5">
          <label htmlFor="licenseEndDate" className="block mb-2 text-sm font-medium">{t('License End Date')}</label>
          <input type="text" id="licenseEndDate" name="license_end_date" value={formData.license_end_date} onChange={handleChange} className="rounded-lg text-gray-900 focus:outline-none focus:border-secondary-color focus:ring focus:ring-secondary-color focus:ring-opacity-100 text-sm block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder={t('License End Date')} required />
          {errors.license_end_date && <div className="text-red-500">{errors.license_end_date}</div>}
        </div>
        <div className="mb-5">
          <label
            htmlFor="id_image"
            className={`block mb-2 text-sm font-medium ${i18n.language === 'ar' ? 'text-right pr-4' : 'text-left'}`}
          >
            {t('Copy of personal ID')}
          </label>
          <div className={`flex ${i18n.language === 'ar' ? 'flex-row-reverse' : 'flex-row'}`}>
            <input
              name="id_image"
              onChange={handleChange}
              className={`block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 ${
                i18n.language === 'ar' ? 'pr-4' : 'pl-4'
              }`}
              type="file"
            />
          </div>
          </div>

          <div className="mb-5">
            <label
              htmlFor="license_image"
              className={`block mb-2 text-sm font-medium ${i18n.language === 'ar' ? 'text-right pr-4' : 'text-left'}`}
            >
              {t('Copy of personal Driving license')}
            </label>
            <div className={`flex ${i18n.language === 'ar' ? 'flex-row-reverse' : 'flex-row'}`}>
              <input
                name="license_image"
                onChange={handleChange}
                className={`block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 ${
                  i18n.language === 'ar' ? 'pr-4' : 'pl-4'
                }`}
                type="file"
              />
            </div>
          </div>


        <div className="flex items-center h-5 mt-8 mb-5">
          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            {status === 'loading' ? t('Submitting...') : t('Submit')}
          </button>
          <button type="button" className="bg-gray-500 text-white m-5 rounded-md opacity-100 font-medium text-sm w-full sm:w-auto px-5 py-2.5 text-center" onClick={handleGoBack}>{t('Go Back')}</button>
        </div>
        {status === 'success' && (
          <div className="text-green-500">
            {t('Tenant added successfully! Redirecting...')}
          </div>
        )}
        {status === 'error' && (
          <div className="text-red-500">
            {errors.form ? t(errors.form) : t('An error occurred. Please try again.')}
          </div>
        )}
      </form>
    </div>
  );
};

export default AddTenantsForm;



