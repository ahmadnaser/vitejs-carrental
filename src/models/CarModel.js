export class Car {
  constructor(
    vehicle_id,
    make,
    model,
    year,
    color,
    status,
    mileage,
    last_oil_change_miles,
    last_oil_change_date,
    license_expiry_date,
    insurance_expiry_date,
    change_oil_every_month,
    change_oil_every_km,
    insurance_image,
    license_image,
    insurance_start_date,
    license_start_date,
    active
  ) {
    this.vehicle_id = vehicle_id;
    this.make = make;
    this.model = model;
    this.year = year;
    this.color = color;
    this.status = status;
    this.mileage = mileage;
    this.last_oil_change_miles = last_oil_change_miles;
    this.last_oil_change_date = last_oil_change_date;
    this.license_expiry_date = license_expiry_date;
    this.insurance_expiry_date = insurance_expiry_date;
    this.change_oil_every_month = change_oil_every_month;
    this.change_oil_every_km = change_oil_every_km;
    this.insurance_image = insurance_image;
    this.license_image = license_image;
    this.insurance_start_date = insurance_start_date;
    this.license_start_date = license_start_date;
    this.active = active;
  }
}
