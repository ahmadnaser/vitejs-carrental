export class CarMaintenance {
  constructor({
    maintenance_id = null,
    vehicle_id = '',
    make = '',
    model = '',
    maintenance_date = '',
    details = '',
    cost = 0,
    trader_id = null,
    spare_parts = '',
    spare_parts_price = 0,
    car_mileage = '',
    garage_id = null,
    garage_expensese_id = null,
    spare_part_expensese_id = null,
    garage_name = '',
    trader_name = '',
    garage_expenses_amount = 0,
    spare_parts_expenses_amount = 0,
    total_expenses = 0
  } = {}) {
    this.maintenance_id = maintenance_id;
    this.vehicle_id = vehicle_id;
    this.make = make;
    this.model = model;
    this.maintenance_date = maintenance_date;
    this.details = details;
    this.cost = parseFloat(cost);
    this.trader_id = trader_id;
    this.spare_parts = spare_parts;
    this.spare_parts_price = parseFloat(spare_parts_price);
    this.car_mileage = car_mileage;
    this.garage_id = garage_id;
    this.garage_expensese_id = garage_expensese_id;
    this.spare_part_expensese_id = spare_part_expensese_id;
    this.garage_name = garage_name;
    this.trader_name = trader_name;
    this.garage_expenses_amount = parseFloat(garage_expenses_amount);
    this.spare_parts_expenses_amount = parseFloat(spare_parts_expenses_amount);
    this.total_expenses = parseFloat(total_expenses);
  }

  calculateOutstandingBalance() {
    const totalPaid = this.garage_expenses_amount + this.spare_parts_expenses_amount;
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
      amountPaid: (this.garage_expenses_amount + this.spare_parts_expenses_amount).toFixed(2),
      trader_name: this.trader_name,
      spareParts: this.spare_parts,
      sparePartsPrice: this.spare_parts_price.toFixed(2),
      amountPaidOfSpareParts: this.spare_parts_expenses_amount.toFixed(2),
      outstandingBalance: this.calculateOutstandingBalance().toFixed(2),
      fullyPaid: this.isFullyPaid()
    };
  }
}
