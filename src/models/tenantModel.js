export class Tenant {
    constructor(tenantData) {
      this.tenantName = tenantData.tenant_name || '';
      this.idNumber = tenantData.id_number || '';
      this.address = tenantData.address || '';
      this.phoneNumber = tenantData.phone_number || '';
      this.bloodType = tenantData.blood_type || '';
      this.birthDate = tenantData.birth_date || '';
      this.licenseNumber = tenantData.license_number || '';
      this.licenseStartDate = tenantData.license_start_date || '';
      this.licenseEndDate = tenantData.license_end_date || '';
      this.idImage = tenantData.id_image_path || null;
      this.licenseImage = tenantData.license_image_path || null;
    }
  }
  