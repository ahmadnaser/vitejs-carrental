export class Tenant {
  constructor(tenantData) {
      this.id_number = tenantData.id_number || '';
      this.tenant_name = tenantData.tenant_name || '';
      this.address = tenantData.address || '';
      this.phone_number = tenantData.phone_number || '';
      this.blood_type = tenantData.blood_type || '';
      this.birth_date = tenantData.birth_date || '';
      this.license_number = tenantData.license_number || '';
      this.license_start_date = tenantData.license_start_date || '';
      this.license_end_date = tenantData.license_end_date || '';
      this.license_image_path = tenantData.license_image_path || null; 
      this.id_image_path = tenantData.id_image_path || null; 
  }
}
