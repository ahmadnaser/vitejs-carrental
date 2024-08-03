export class ContractView {
    constructor(rentalId,vehicle_id, make, model, customer,tenantID, startDate, endDate, endDateAgreed, pricePerDay, dayNum, totalAmount, note, remainingAmount, timeReturned, paymentStatus) {
      this.rentalId = rentalId;
      this.vehicle_id = vehicle_id;
      this.make = make;
      this.model = model;
      this.customer = customer;
      this.tenantID = tenantID;
      this.startDate = startDate;
      this.endDate = endDate;
      this.endDateAgreed = endDateAgreed;
      this.pricePerDay = pricePerDay;
      this.dayNum = dayNum;
      this.totalAmount = totalAmount;
      this.note = note;
      this.remainingAmount = remainingAmount;
      this.timeReturned = timeReturned;
      this.paymentStatus = paymentStatus;
    }
  }
  