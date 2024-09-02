import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getTenants, deleteTenantById } from '../../../controller/TenantController';
import { useTranslation } from 'react-i18next';

const TenantTable = () => {
  const { t, i18n } = useTranslation();
  const [tenants, setTenants] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const fetchTenants = async () => {
    const data = await getTenants();
    setTenants(data);
  };

  useEffect(() => {
    fetchTenants();
  }, []);

  const handleAddNewTenant = () => {
    navigate('/tenants/add-tenants');
  };

  const handleTenantDetails = (tenantId) => {
    navigate('/tenants/details', { state: { tenantId } });
  };

  const handlePayment = (tenantId) => {
    navigate('/tenants/payment', { state: { tenant_id: tenantId } });
  };

  const handleDelete = async (tenantId, tenantName) => {
    const deleteConfirmation = window.confirm(
      `${t('Are you sure you want to delete the tenant')} ` +
      `${tenantName} (${tenantId})?`,
      'color: red; font-weight: bold;'
    );
  
    if (deleteConfirmation) {
      try {
        const result = await deleteTenantById(tenantId);
        if (result.success) {
          alert(t('Tenant deleted successfully'));
          fetchTenants();
        } else {
          alert(t(`Failed to delete tenant: ${result.message}`));
        }
      } catch (error) {
        console.error('Error deleting tenant:', error);
        alert(t('An error occurred while trying to delete the tenant.'));
      }
    }
  };
  

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedTenants = React.useMemo(() => {
    let sortableTenants = [...tenants];
    if (sortConfig.key) {
      sortableTenants.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        if (aValue < bValue) return sortConfig.direction === 'ascending' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'ascending' ? 1 : -1;
        return 0;
      });
    }
    return sortableTenants;
  }, [tenants, sortConfig]);

  const filteredTenants = React.useMemo(() => {
    if (!searchTerm) return sortedTenants;
    return sortedTenants.filter(tenant =>
      tenant.tenant_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.phone_number.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, sortedTenants]);

  const getClassNamesFor = (name) => {
    if (!sortConfig.key) return;
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  return (
    <div className={`flex flex-col items-center min-h-screen bg-bodyBg-color text-heading-color ${i18n.language === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className={`w-full ${i18n.language === 'ar' ? 'text-right' : 'text-left'} p-10 mt-20 mb-10`}>
        <h1 className="text-3xl font-bold text-secondary-color">{t('Tenants')}</h1>
        <h3 className="font-bold text-l mt-3 cursor-pointer text-blue-400" onClick={handleAddNewTenant}>
          {t('Add New')}
        </h3>
      </div>
      <div className="relative overflow-x-auto shadow-md w-full max-w-7xl px-4 sm:px-5 lg:px-8 md:px-8 mb-10 rounded-lg mt-12">
        <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-center pb-4 mt-12">
          <div className="relative">
            <label htmlFor="table-search" className="sr-only">{t('Search')}</label>
            <div className="absolute inset-y-0 left-2 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
              </svg>
            </div>
            <input
              type="text"
              id="table-search"
              className="sm:mb-1 block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder={t('Search')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <table dir={i18n.language === 'ar' ? 'rtl' : 'ltr'} className="w-full text-sm text-left text-gray-800 dark:text-gray-100 rounded-lg">
          <thead className="text-xs text-gray-900 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-3 py-3 cursor-pointer text-center" onClick={() => requestSort('tenant_name')}>
                <div className="flex items-center justify-center">
                  {t('Tenant')}
                  <svg className={`w-4 h-3 ms-1.5 ${getClassNamesFor('tenant_name')}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                  </svg>
                </div>
              </th>
              <th scope="col" className="px-3 py-3 cursor-pointer text-center">
                <div className="flex items-center">
                  {t('Id Number')}
                </div>
              </th>
              <th scope="col" className="px-5 py-3 cursor-pointer text-center">
                <div className="flex items-center">
                  {t('Address')}
                </div>
              </th>
              <th scope="col" className="px-2 py-3 cursor-pointer text-center">
                <div className="flex items-center">
                  {t('Phone Number')}
                </div>
              </th>
              <th scope="col" className="px-5 py-3 cursor-pointer text-center">
                <div className="flex items-center">
                  {t('Birth Date')}
                </div>
              </th>
              <th scope="col" className="px-2 py-3 cursor-pointer text-center">
                <div className="flex items-center">
                  {t('License Number')}
                </div>
              </th>
              <th scope="col" className="px-4 py-3 cursor-pointer text-center">
                <div className="flex items-center">
                  {t('License Start Date')}
                </div>
              </th>
              <th scope="col" className="px-4 py-3 cursor-pointer text-center">
                <div className="flex items-center">
                  {t('License End Date')}
                </div>
              </th>
              <th scope="col" className="px-4 py-3 cursor-pointer text-center">
                <div className="flex items-center">
                  {t('Blood Type')}
                </div>
              </th>
              <th scope="col" className="px-2 py-3 text-center">{t('Payment')}</th>
              <th scope="col" className="px-3 py-3">
                <span className="sr-only">{t('Action')}</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredTenants.length === 0 ? (
              <tr>
                <td colSpan="12" className="text-center py-4">{t('No records found')}</td>
              </tr>
            ) : (
              filteredTenants.map((tenant, index) => (
                <tr
                  key={index}
                  className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700 ${index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-900' : ''}`}
                >
                  <td className="px-4 py-4 text-blue-500 cursor-pointer text-center text-lg font-bold" onClick={() => handleTenantDetails(tenant.id_number)}>{tenant.tenant_name}</td>
                  <td className="px-4 py-4 text-center">{tenant.id_number}</td>
                  <td className="px-4 py-4 text-center">{tenant.address}</td>
                  <td className="px-2 py-4 text-center">{tenant.phone_number}</td>
                  <td className="px-1 py-4 text-center">{tenant.birth_date}</td>
                  <td className="px-1 py-4 text-center">{tenant.license_number}</td>
                  <td className="px-1 py-4 text-center">{tenant.license_start_date}</td>
                  <td className="px-1 py-4 text-center">{tenant.license_end_date}</td>
                  <td className="px-4 py-4 text-center">{tenant.blood_type}</td>
                  <td className="px-4 py-4">
                    <span
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
                      onClick={() => handlePayment(tenant.id_number)}
                    >
                      {t('Payment')}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                  <Link 
                    to="/tenants/edit-tenant" 
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    state={{ tenantId: tenant.id_number }} 
                    >
                      {t('Edit')}
                    </Link>
                    <br />
                    <Link 
                    to="/tenants/details" 
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    state={{ tenantId: tenant.id_number }} 
                    >
                      {t('Details')}
                    </Link>
                    <br />
                    <a href="#" className="font-medium text-red-500 dark:text-red-500 hover:underline"
                      onClick={() => handleDelete(tenant.id_number, tenant.tenant_name)}
                    >
                      {t('Delete')}
                    </a>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TenantTable;
