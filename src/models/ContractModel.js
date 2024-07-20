export class Contract {
    constructor(rentalId, make, model, customer, startDate, endDate, endDateAgreed, pricePerDay, dayNum, totalAmount, note, remainingAmount, timeReturned, paymentStatus) {
      this.rentalId = rentalId;
      this.make = make;
      this.model = model;
      this.customer = customer;
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
  