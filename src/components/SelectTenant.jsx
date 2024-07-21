import React, { useEffect, useState } from 'react';
import { getTenants } from '../controller/tenantController';

const SelectTenant = ({ isOpen, onClose, onSelect }) => {
  const [tenants, setTenants] = useState([]);

  useEffect(() => {
    const fetchTenants = async () => {
      try {
        const tenantsList = await getTenants();
        setTenants(tenantsList);
      } catch (error) {
        console.error('Failed to fetch tenants', error);
      }
    };

    if (isOpen) {
      fetchTenants();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50  bg-bodyBg-color bg-opacity-40">
      <div className="bg-white text-black rounded-lg shadow-lg p-5 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Select Tenant</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-900">&times;</button>
        </div>
        <ul className="space-y-2">
          {tenants.map((tenant) => (
            <li
              key={tenant.idNumber}
              onClick={() => onSelect(`${tenant.tenantName}-${tenant.idNumber}`)}
              className="cursor-pointer hover:bg-gray-200 p-2 rounded-lg"
            >
              {tenant.tenantName} - {tenant.idNumber}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SelectTenant;
