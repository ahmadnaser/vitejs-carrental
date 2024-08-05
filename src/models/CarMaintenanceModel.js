export class CarMaintenance {
    constructor({
      maintenance_id,
      vehicle_id,
      maintenance_date,
      details,
      cost,
      amount_paid,
      trader,
      spare_parts,
      spare_parts_price,
      amount_paid_of_spare_parts,
      garage_id
    }) {
      this.maintenance_id = maintenance_id;
      this.vehicle_id = vehicle_id;
      this.maintenance_date = maintenance_date;
      this.details = details;
      this.cost = cost;
      this.amount_paid = amount_paid;
      this.trader = trader;
      this.spare_parts = spare_parts;
      this.spare_parts_price = spare_parts_price;
      this.amount_paid_of_spare_parts = amount_paid_of_spare_parts;
      this.garage_id = garage_id;
    }
  }
  