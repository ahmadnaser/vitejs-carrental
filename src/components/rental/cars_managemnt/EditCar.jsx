import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getCarById, updateCar } from '../../../controller/CarController';

// Load and initialize configuration
async function loadConfig() {
    const config = await import('../../../../config.json', { assert: { type: 'json' } });
    return config.default;
}

let config;
async function initializeConfig() {
    config = await loadConfig();
}
initializeConfig().catch(error => {
    console.error("Failed to load configuration:", error);
});

// Convert Arabic numbers to English
const convertArabicNumbers = (input) => {
    const arabicNumbers = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    const englishNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    return input.replace(/[٠-٩]/g, (d) => englishNumbers[arabicNumbers.indexOf(d)]);
};

const EditCarForm = () => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const { carId } = location.state || {};
    const [formData, setFormData] = useState({
        make: '',
        model: '',
        year: '',
        vehicle_id: carId,
        color: '',
        mileage: '',
        last_oil_change_miles: '',
        last_oil_change_date: '',
        license_start_date: '',
        insurance_start_date: '',
        license_expiry_date: '',
        insurance_expiry_date: '',
        change_oil_every_km: '',
        change_oil_every_month: '',
        active: false,
        license_image: null,
        insurance_image: null,
    });
    const [status, setStatus] = useState(null);
    const [errors, setErrors] = useState({});
    const [currentImages, setCurrentImages] = useState({
        license_image: null,
        insurance_image: null,
    });

    useEffect(() => {
        if (carId) {
            const fetchCarData = async () => {
                try {
                    const carData = await getCarById(carId);
                    setFormData({
                        make: carData.make || '',
                        model: carData.model || '',
                        year: carData.year || '',
                        vehicle_id: carData.vehicle_id || '',
                        color: carData.color || '',
                        mileage: carData.mileage || '',
                        last_oil_change_miles: carData.last_oil_change_miles || '',
                        last_oil_change_date: carData.last_oil_change_date || '',
                        license_start_date: carData.license_start_date || '',
                        insurance_start_date: carData.insurance_start_date || '',
                        license_expiry_date: carData.license_expiry_date || '',
                        insurance_expiry_date: carData.insurance_expiry_date || '',
                        change_oil_every_km: carData.change_oil_every_km || '',
                        change_oil_every_month: carData.change_oil_every_month || '',
                        active: carData.active,
                        license_image: null,
                        insurance_image: null,
                    });
                    setCurrentImages({
                        license_image: carData.license_image || null,
                        insurance_image: carData.insurance_image || null,
                    });
                } catch (error) {
                    console.error('Error fetching car data:', error);
                    setStatus('error');
                    setErrors({ form: 'An error occurred while fetching car data' });
                }
            };
            fetchCarData();
        }
    }, [carId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
    };

    const handleNumericInputChange = (e) => {
        const { name, value } = e.target;
        const convertedValue = convertArabicNumbers(value);
        setFormData(prevFormData => ({ ...prevFormData, [name]: convertedValue }));
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setFormData(prevFormData => ({ ...prevFormData, [name]: checked }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (files && files.length > 0) {
            setFormData(prevFormData => ({ ...prevFormData, [name]: files[0] }));
        }
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.make.trim()) errors.make = t('Car make is required');
        if (!formData.model.trim()) errors.model = t('Car model is required');
        if (!formData.color.trim()) errors.color = t('Color is required');
        if (!formData.mileage.trim()) errors.mileage = t('Mileage is required');
        if (!formData.last_oil_change_miles.trim()) errors.last_oil_change_miles = t('Last oil change miles is required');
        if (!formData.last_oil_change_date.trim()) errors.last_oil_change_date = t('Last oil change date is required');
        if (!formData.license_start_date.trim()) errors.license_start_date = t('License start date is required');
        if (!formData.license_expiry_date.trim()) errors.license_expiry_date = t('License expiry date is required');
        if (!formData.insurance_start_date.trim()) errors.insurance_start_date = t('Insurance start date is required');
        if (!formData.insurance_expiry_date.trim()) errors.insurance_expiry_date = t('Insurance expiry date is required');
        if (!formData.change_oil_every_km.trim()) errors.change_oil_every_km = t('Change oil every (km) is required');
        if (!formData.change_oil_every_month.trim()) errors.change_oil_every_month = t('Change oil every (month) is required');

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            setStatus('error');
            return;
        }

        const form = new FormData();
        Object.keys(formData).forEach(key => {
            if (key === 'active') {
                form.append(key, formData[key] ? '1' : '0');
            } else if (formData[key]) {
                form.append(key, formData[key]);
            }
        });

        console.log("111",form);
        setStatus('loading');

        try {
            const response = await updateCar(form);
            if (response.success) {
                setStatus('success');
                setTimeout(() => navigate(-1), 2000);
            } else {
                setStatus('error');
                setErrors({ form: response.message });
            }
        } catch (error) {
            setStatus('error');
            setErrors({ form: 'An unexpected error occurred' });
        }
    };

    return (
        <div className={`flex flex-col items-center min-h-screen bg-bodyBg-color text-heading-color ${i18n.language === 'ar' ? 'rtl' : 'ltr'}`}>
            <div className={`w-full ${i18n.language === 'ar' ? 'text-right' : 'text-left'} p-10 mt-20 mb-10`}>
                <h1 className="text-3xl font-bold text-secondary-color">{t('Edit')}</h1>
                <h3 className="font-bold text-xl mt-3 text-heading-color">{t('Car')}</h3>
            </div>

            <form onSubmit={handleSubmit} className={`w-full ${i18n.language === 'ar' ? 'text-right' : 'text-left'} p-10 mt-15 mb-10 max-w-md mx-auto`}>
                {Object.keys(formData).map((field) => (
                    field === 'active' ? null : // Exclude 'active' field
                    field.includes('_image') ? (
                        <div key={field} className="mb-5">
                            <label htmlFor={field} className="block mb-2 text-sm font-medium">{t(field.replace('_', ' '))}</label>
                            {currentImages[field] && (
                                <div className="mb-4">
                                    <img src={`${config.BaseURL}${currentImages[field]}`} alt="Current" className="w-32 h-32 object-cover mb-2" />
                                </div>
                            )}
                            <input
                                name={field}
                                onChange={handleFileChange}
                                className={`block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 ${i18n.language === 'ar' ? 'pr-4' : 'pl-4'}`}
                                type="file"
                            />
                        </div>
                    ) : (
                        <div key={field} className="mb-5">
                            <label htmlFor={field} className="block mb-2 text-sm font-medium">{t(field.replace('_', ' '))}</label>
                            <input
                                type={field.includes('date') ? 'date' : 'text'}
                                id={field}
                                name={field}
                                value={formData[field]}
                                onChange={field.includes('date') ? handleInputChange : handleNumericInputChange}
                                className="rounded-lg text-gray-900 focus:outline-none focus:border-secondary-color focus:ring focus:ring-secondary-color focus:ring-opacity-100 text-sm block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                required={!field.includes('vehicle_id')}
                            />
                        </div>
                    )
                ))}

                {/* Submit and Back buttons */}
                <div className="flex items-center h-5 mt-8 mb-5">
                    <button
                        type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        {status === 'loading' ? t('Submitting...') : t('Submit')}
                    </button>
                    <button
                        type="button"
                        className="bg-gray-500 text-white m-5 rounded-md opacity-100 font-medium text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                        onClick={() => navigate(-1)}
                    >
                        {t('Go Back')}
                    </button>
                </div>

                {/* Status messages */}
                {status === 'success' && (
                    <div className="text-green-500">
                        {t('Car updated successfully! Redirecting...')}
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

export default EditCarForm;
