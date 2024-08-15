export class Expense {
  constructor(expenses_id,expense_type_id,expense_type_name, expenses_amount, expenses_date, detail) {
    this.expenses_id = expenses_id;
    this.expense_type_id = expense_type_id;
    this.expense_type_name = expense_type_name;
    this.expenses_amount = expenses_amount;
    this.expenses_date = expenses_date;
    this.detail = detail;
  }
}
