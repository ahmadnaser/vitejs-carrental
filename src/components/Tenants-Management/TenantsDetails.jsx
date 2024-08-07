import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getTenantById, getTenants } from '../../controller/tenantController';
import Select from 'react-select';

const TenantsDetails = ({ tenantId }) => {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState('Summary');
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
        console.error('Error fetching tenants:', error);
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
        } catch (error) {
          console.error('Error fetching tenant data:', error);
        }
      }
    };

    fetchTenantData();
  }, [selectedTenant]);

  if (!tenant) {
    return <div>Loading...</div>;
  }

  const handleTenantChange = (selectedOption) => {
    setSelectedTenant(selectedOption);
  };

  const tenantOptions = tenants.map(tenant => ({
    value: tenant.idNumber,
    label: `${tenant.tenantName} - ${tenant.idNumber}`
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
            {['Summary', 'Profile', 'Contacts', 'Invoices', 'Transactions'].map(tab => (
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

      {activeTab === 'Summary' && (
      <div className="w-full max-w-screen-lg px-4 sm:px-6 lg:px-8 text-black">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Account Status</label>
          <div className="mt-1 p-2 border border-yellow-500 rounded-md bg-yellow-100">
            The owner of this account has not yet sign up with email address
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-6">
          <div className='bg-white p-4 rounded-xl flex-1'>
            <h3 className="text-lg font-bold mb-2">Client Information</h3>
            <div className="space-y-2">
              <div><strong>Id Number:</strong> {tenant.id_number}</div>
              <div><strong>Name:</strong> {tenant.tenant_name}</div>
              <div><strong>Address :</strong> {tenant.address}</div>
              <div><strong>Blood Type:</strong> {tenant.blood_type}</div>
              <div><strong>Birth Date:</strong> {tenant.birth_date}</div>
              <div><strong>License Start Date:</strong> {tenant.license_start_date}</div>
              <div><strong>License End Date:</strong> {tenant.license_end_date}</div>
            </div>
          </div>
          <div className='bg-white p-4 rounded-xl flex-1'>
            <h3 className="text-lg font-bold mb-2">Invoices/Billing</h3>
            <div className="space-y-2">
              <div><strong>Number of invoices:</strong> 1 ($900.00 USD)</div>
              <div><strong>Total Bills:</strong> 1 ($900.00 USD)</div>
              <div><strong>Paid:</strong> 0 ($0.00 USD)</div>
              <div><strong>Unpaid/Due:</strong> 0 ($0.00 USD)</div>
              <div><strong>Cancelled:</strong> 0 ($0.00 USD)</div>
              <div><strong>Refunded:</strong> 0 ($0.00 USD)</div>
              <div><strong>Collections:</strong> 0 ($0.00 USD)</div>
              <div><strong>Gross Revenue:</strong> $0.00 USD</div>
              <div><strong>Client Expenses:</strong> $0.00 USD</div>
              <div><strong>Net Income:</strong> $0.00 USD</div>
              <div><strong>Credit Balance:</strong> $0.00 USD</div>
            </div>
          </div>
          <div className='bg-white p-4 rounded-xl flex-1'>
            <h3 className="text-lg font-bold mb-2">Products/Services</h3>
            <div className="space-y-2">
              {/* Add product/service details here */}
            </div>
          </div>
        </div>
      </div>
    )}

      {activeTab === 'Profile' && (
        <div className="w-full max-w-screen-lg px-4 sm:px-6 lg:px-8 mb-6 text-black">
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="bg-white p-4 rounded-xl flex-1">
              <h3 className="text-lg font-bold mb-2">Client Information</h3>
              <div className="space-y-2">
                <div><strong>First Name:</strong> Belal</div>
                <div><strong>Last Name:</strong> Hammad</div>
                <div><strong>Email Address:</strong> belalhammad1998@gmail.com</div>
                <div><strong>Address 1:</strong> Silwad Ramallah</div>
                <div><strong>City:</strong> Ramallah</div>
                <div><strong>State/Region:</strong> Westbank</div>
                <div><strong>Country:</strong> PS - Palestine, State Of</div>
                <div><strong>Phone Number:</strong> +970.568198950</div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl flex-1">
              <h3 className="text-lg font-bold mb-2">Invoices/Billing</h3>
              <div className="space-y-2">
                <div><strong>Paid:</strong> 1 ($900.00 USD)</div>
                <div><strong>Draft:</strong> 0 ($0.00 USD)</div>
                <div><strong>Unpaid/Due:</strong> 0 ($0.00 USD)</div>
                <div><strong>Cancelled:</strong> 0 ($0.00 USD)</div>
                <div><strong>Refunded:</strong> 0 ($0.00 USD)</div>
                <div><strong>Collections:</strong> 0 ($0.00 USD)</div>
                <div><strong>Gross Revenue:</strong> $0.00 USD</div>
                <div><strong>Client Expenses:</strong> $0.00 USD</div>
                <div><strong>Net Income:</strong> $0.00 USD</div>
                <div><strong>Credit Balance:</strong> $0.00 USD</div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl flex-1">
              <h3 className="text-lg font-bold mb-2">Products/Services</h3>
              <div className="space-y-2">
                <div><strong>Shared Hosting:</strong> 1 (1 Total)</div>
                <div><strong>Reseller Hosting:</strong> 0 (0 Total)</div>
                <div><strong>VPS/Server:</strong> 0 (0 Total)</div>
                <div><strong>Domains:</strong> 1 (1 Total)</div>
              </div>
            </div>
          </div>
        </div>
      )}

    {activeTab === 'Contacts' && (
            <div className="w-full max-w-screen-lg px-4 sm:px-6 lg:px-8 mb-6 text-black">
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="bg-white p-4 rounded-xl flex-1">
                  <h3 className="text-lg font-bold mb-2">Contact Information</h3>
                  <div className="space-y-2">
                    <div><strong>First Name:</strong> Belal</div>
                    <div><strong>Last Name:</strong> Hammad</div>
                    <div><strong>Email Address:</strong> belalhammad1998@gmail.com</div>
                    <div><strong>Address 1:</strong> Silwad Ramallah</div>
                    <div><strong>City:</strong> Ramallah</div>
                    <div><strong>State/Region:</strong> Westbank</div>
                    <div><strong>Country:</strong> PS - Palestine, State Of</div>
                    <div><strong>Phone Number:</strong> +970.568198950</div>
                  </div>
                </div>
               
              </div>
            </div>
          )}

    </div>
  );
};

export default TenantsDetails;
