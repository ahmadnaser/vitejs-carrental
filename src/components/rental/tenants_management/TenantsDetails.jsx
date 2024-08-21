import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getTenantById, getTenants, getAccountStatmentById } from '../../../controller/TenantController';
import Select from 'react-select';

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
  console.error(t("Failed to load configuration:"), error);
});

const TenantsDetails = ({ tenantId }) => {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState(t('Summary'));
  const [accountData, setaccountData] = useState([]);
  const [tenant, setTenant] = useState(null);
  const [selectedTenant, setSelectedTenant] = useState(null);
  const [tenants, setTenants] = useState([]);

  useEffect(() => {
    const fetchTenants = async () => {
      try {
        const tenantsList = await getTenants();
        setTenants(tenantsList);

        const initialTenant = tenantsList.find(tenant => tenant.id_number === tenantId);
        if (initialTenant) {
          setSelectedTenant({
            value: initialTenant.id_number,
            label: `${initialTenant.tenant_name} - ${initialTenant.id_number}`
          });
          setTenant(initialTenant);
        }
      } catch (error) {
        console.error(t('Error fetching tenants:'), error);
      }
    };

    fetchTenants();
  }, [tenantId]);

  useEffect(() => {
    const fetchTenantData = async () => {
      if (selectedTenant) {
        try {
          const tenantData = await getTenantById(selectedTenant.value);
          setTenant(tenantData);
          const account = await getAccountStatmentById(selectedTenant.value, '', '');
          setaccountData(account);
        } catch (error) {
          console.error(t('Error fetching tenant data:'), error);
        }
      }
    };

    fetchTenantData();
  }, [selectedTenant]);

  if (!tenant) {
    return <div>{t('Loading...')}</div>;
  }

  const handleTenantChange = (selectedOption) => {
    setSelectedTenant(selectedOption);
  };

  const tenantOptions = tenants.map(tenant => ({
    value: tenant.id_number,
    label: `${tenant.tenant_name} - ${tenant.id_number}`
  }));

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: '#ffffff',
      color: '#000000',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#000000',
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: '#ffffff',
      color: '#000000',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#cccccc' : '#ffffff',
      color: '#000000',
    }),
  };

  return (
    <div className={`flex flex-col items-center min-h-screen bg-bodyBg-color text-heading-color ${i18n.language === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className={`w-full ${i18n.language === 'ar' ? 'text-right' : 'text-left'} p-10 mt-20`}>
        <h1 className="text-3xl font-bold text-secondary-color">{t('Tenant Profile')}</h1>
        <div className="mb-1 mt-5 max-w-[250px]">
          <Select
            id="tenants"
            value={selectedTenant}
            onChange={handleTenantChange}
            options={tenantOptions}
            placeholder={t('Name of Tenants or ID Number')}
            className=" rounded-none text-gray-900 focus:outline-none focus:border-secondary-color focus:ring focus:ring-secondary-color focus:ring-opacity-100 text-sm block dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            isDisabled={false}
            styles={customStyles}
            required
          />
        </div>
      </div>

      <div className="flex flex-col items-center">
        <nav className="border-b border-gray-100 mb-8">
          <div className="flex flex-wrap justify-around sm:justify-start sm:space-x-8" aria-label="Tabs">
            {[t('Summary'), t('Transactions'), t('Id Image'), t('License Image')].map(tab => (
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
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">{t('Account Status')}</label>
            <div className="mt-1 p-2 border border-yellow-500 rounded-md bg-yellow-100">
              {t('The owner of this account has not yet signed up with an email address')}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6">
            <div className='bg-white p-4 rounded-xl flex-1'>
              <h3 className="text-lg font-bold mb-2">{t('Client Information')}</h3>
              <div className="space-y-2">
                <div><strong>{t('Id Number')}:</strong> {tenant.id_number}</div>
                <div><strong>{t('Name')}:</strong> {tenant.tenant_name}</div>
                <div><strong>{t('Address')}:</strong> {tenant.address}</div>
                <div><strong>{t('Blood Type')}:</strong> {tenant.blood_type}</div>
                <div><strong>{t('Birth Date')}:</strong> {tenant.birth_date}</div>
                <div><strong>{t('License Start Date')}:</strong> {tenant.license_start_date}</div>
                <div><strong>{t('License End Date')}:</strong> {tenant.license_end_date}</div>
              </div>
            </div>
            <div className='bg-white p-4 rounded-xl flex-1'>
              <h3 className="text-lg font-bold mb-2">{t('Invoices/Billing')}</h3>
              <div className="space-y-2">
                <div><strong>{t('Number of invoices')}:</strong> {accountData?.billingSummary?.num_invoices ?? 0} ({(parseFloat(accountData?.billingSummary?.total_bills) || 0).toFixed(2)} {t('Shekel')})</div>
                <div>
                  <strong>{t('Paid')}: </strong>
                  <span className="text-green-500">
                    {(parseFloat(accountData?.billingSummary?.total_paid) || 0).toFixed(2)} {t('Shekel')}
                  </span>
                </div>
                <div>
                  <strong>{t('Unpaid/Due')}: </strong>
                  <span className="text-red-500">
                    {(parseFloat(accountData?.billingSummary?.unpaid_due) || 0).toFixed(2)} {t('Shekel')}
                  </span>
                </div>
                <div><strong>{t('Collections')}:</strong> {(parseFloat(accountData?.billingSummary?.collections) || 0).toFixed(2)} {t('Shekel')}</div>
                <div><strong>{t('Gross Revenue')}:</strong> {(parseFloat(accountData?.billingSummary?.gross_revenue) || 0).toFixed(2)} {t('Shekel')}</div>
                <div><strong>{t('Credit Balance')}:</strong> {(parseFloat(accountData?.billingSummary?.credit_balance) || 0).toFixed(2)} {t('Shekel')}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === t('Transactions') && (
        <div className="w-full max-w-screen-lg px-4 sm:px-6 lg:px-8 mb-6 text-black">
          <div className="relative overflow-x-auto shadow-md w-full max-w-7xl px-4 sm:px-5 lg:px-8 md:px-8 mb-10 rounded-lg mt-1">
            <table dir={i18n.language === 'ar' ? 'rtl' : 'ltr'} className="w-full text-sm text-left text-gray-800 dark:text-gray-100 rounded-lg bg-white">
              <thead className="text-xs text-gray-900 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-3 py-3 text-center">{t('Description')}</th>
                  <th scope="col" className="px-3 py-3 text-center">{t('Reservation Id')}</th>
                  <th scope="col" className="px-5 py-3 text-center">{t('Date')}</th>
                  <th scope="col" className="px-2 py-3 text-center">{t('Debit')}</th>
                  <th scope="col" className="px-5 py-3 text-center">{t('Credit')}</th>
                  <th scope="col" className="px-4 py-3 text-center">{t('Payment Method')}</th>
                </tr>
              </thead>
              <tbody>
                {accountData?.accountStatement?.length === 0 ? (
                  <tr>
                    <td colSpan="13" className="text-center py-4 text-white">{t('No records found')}</td>
                  </tr>
                ) : (
                  accountData?.accountStatement?.map((item, index) => (
                    <tr
                      key={index}
                      className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700 ${index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-900' : ''}`}
                    >
                      <td className="px-1 py-4 text-center">{item.description}</td>
                      <td className="px-1 py-4 text-center">{item.reservation_id}</td>
                      <td className="px-2 py-4 text-center">{item.date}</td>
                      <td className="px-1 py-4 text-center text-red-500">{item.debit}</td>
                      <td className="px-2 py-4 text-center text-green-500">{item.credit}</td>
                      <td className="px-1 py-4 text-center">{item.payment_method}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === t('Id Image') && (
        <div className="w-full max-w-screen-lg px-4 sm:px-6 lg:px-8 mb-6 text-black flex items-center justify-center" style={{ height: '100%' }}>
          {tenant.id_image_path ? (
            <img src={`${config.BaseURL}${tenant.id_image_path}`} alt={t('Tenant ID')} className="max-w-full h-auto" />
          ) : (
            <p className="text-white text-2xl text-center">{t('No ID image available')}</p>
          )}
        </div>
      )}

      {activeTab === t('License Image') && (
        <div className="w-full max-w-screen-lg px-4 sm:px-6 lg:px-8 mb-6 text-black flex items-center justify-center" style={{ height: '100%' }}>
          {tenant.license_image_path ? (
            <img src={`${config.BaseURL}${tenant.license_image_path}`} alt={t('Tenant License')} className="max-w-full h-auto" />
          ) : (
            <p className="text-white text-2xl text-center">{t('No license image available')}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default TenantsDetails;
