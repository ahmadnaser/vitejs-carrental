export class Tenant {
    constructor(tenantData) {
      this.tenantName = tenantData.tenantName || '';
      this.idNumber = tenantData.idNumber || '';
      this.address = tenantData.address || '';
      this.phoneNumber = tenantData.phoneNumber || '';
      this.bloodType = tenantData.bloodType || '';
      this.birthDate = tenantData.birthDate || '';
      this.licenseNumber = tenantData.licenseNumber || '';
      this.licenseStartDate = tenantData.licenseStartDate || '';
      this.licenseEndDate = tenantData.licenseEndDate || '';
      this.idImage = tenantData.idImage || null;
      this.licenseImage = tenantData.licenseImage || null;
    }
  }
  