export class CarMaintenance {
  constructor({
    maintenance_id = null,
    vehicle_id = '',
    make = '',
    model = '',
    maintenance_date = '',
    details = '',
    cost = 0,
    amount_paid = 0,
    trader_name = '',
    spare_parts = '',
    spare_parts_price = 0,
    amount_paid_of_spare_parts = 0,
    garage_name = '',
  } = {}) {
    this.maintenance_id = maintenance_id;
    this.vehicle_id = vehicle_id;
    this.make = make;
    this.model = model;
    this.maintenance_date = maintenance_date;
    this.details = details;
    this.cost = cost;
    this.amount_paid = amount_paid;
    this.trader_name = trader_name;
    this.spare_parts = spare_parts;
    this.spare_parts_price = spare_parts_price;
    this.amount_paid_of_spare_parts = amount_paid_of_spare_parts;
    this.garage_name = garage_name;
  }

  calculateOutstandingBalance() {
    const totalPaid = this.amount_paid + this.amount_paid_of_spare_parts;
    const totalCost = this.cost + this.spare_parts_price;
    return totalCost - totalPaid;
  }

  isFullyPaid() {
    return this.calculateOutstandingBalance() === 0;
  }

  getFormattedDate() {
    const date = new Date(this.maintenance_date);
    return date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
  }

  getCarDescription() {
    return `${this.make} ${this.model} (${this.vehicle_id})`;
  }

  getFormattedDetails() {
    return {
      maintenanceId: this.maintenance_id,
      car: this.getCarDescription(),
      garage: this.garage_name,
      maintenanceDate: this.getFormattedDate(),
      cost: this.cost.toFixed(2),
      amountPaid: this.amount_paid.toFixed(2),
      trader_name: this.trader_name,
      spareParts: this.spare_parts,
      sparePartsPrice: this.spare_parts_price.toFixed(2),
      amountPaidOfSpareParts: this.amount_paid_of_spare_parts.toFixed(2),
      outstandingBalance: this.calculateOutstandingBalance().toFixed(2),
      fullyPaid: this.isFullyPaid()
    };
  }
}
