export class Reservation {
  constructor({
    reservation_id = null,
    tenant_id,
    second_driver_id=null,
    vehicle_id,
    start_date,
    end_date,
    price_perday,
    total_amount,
    amount_paid,
    status = 'confirmed'
  }) {
    this.reservation_id = reservation_id;
    this.tenant_id = tenant_id;
    this.second_driver_id = second_driver_id;
    this.vehicle_id = vehicle_id;
    this.start_timestamp = start_date;
    this.end_timestamp = end_date;
    this.price_perday = price_perday;
    this.total_amount = total_amount;
    this.amount_paid = amount_paid;
    this.status = status;
  }
}
