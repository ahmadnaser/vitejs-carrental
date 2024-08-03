export class Contract {
    constructor({
      tenant_id,
      second_driver_id,
      vehicle_id,
      start_timestamp,
      end_timestamp,
      price_perday,
      total_amount,
      amount_paid,
      car_mileage,
      note,
      check_number,
      bank_name,
      check_amount,
      check_date,
      car_condition,
      car_damage
    }) {
      this.tenant_id = tenant_id;
      this.second_driver_id = second_driver_id;
      this.vehicle_id = vehicle_id;
      this.start_timestamp = start_timestamp;
      this.end_timestamp = end_timestamp;
      this.price_perday = price_perday;
      this.total_amount = total_amount;
      this.amount_paid = amount_paid;
      this.car_mileage = car_mileage;
      this.note = note;
      this.check_number = check_number;
      this.bank_name = bank_name;
      this.check_amount = check_amount;
      this.check_date = check_date;
      this.car_condition = car_condition;
      this.car_damage = car_damage;
    }
  }
  