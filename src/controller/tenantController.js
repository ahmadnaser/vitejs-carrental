import { Tenant } from '../models/tenantModel';

export const handleTenantFormSubmit = async (formData) => {
  const tenant = new Tenant(formData);
  
  const form = new FormData();
  for (const key in tenant) {
    form.append(key, tenant[key]);
  }

  try {
    const response = await fetch('http://localhost/CarRentalSystem/add_tenant.php', {
      method: 'POST',
      body: form,
      headers: {
        'Accept': 'application/json',
      },
    });

    const responseData = await response.json();

    if (!response.ok) {
      return { success: false, message: responseData.message };
    }

    return { success: true, message: responseData.message };

  } catch (error) {
    return { success: false, message: 'An unexpected error occurred' };
  }
};
