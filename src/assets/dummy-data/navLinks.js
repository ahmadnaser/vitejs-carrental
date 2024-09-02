const navLinks = [
  {
    path: "/dashboard",
    icon: "ri-apps-2-line",
    display: "Dashboard",
    submenu: [],
  },
  {
    path: "",
    icon: "ri-taxi-line",
    display: "Renting",
    submenu: [
      { path: "/renting/rented-car", display: "Rented Cars" },
      { path: "/renting/rental-contracts", display: "Rental contracts" },
      { path: "/reservations", display: "Reservations" },
      { path: "/return-car", display: "Return Car" },
      { path: "/tenants", display: "Tenants" },
      { path: "/cars", display: "Cars" }
    ],
  },
  {
    path: "/expenses",
    icon: "ri-money-dollar-circle-line",
    display: "Expenses",
    submenu: [
      { path: "/expenses/car-maintenance", display: "Car Maintenance" },
      { path: "/expenses/general-expenses", display: "General Expenses" },
      { path: "/expenses/garages", display: "Garages" },
      { path: "/expenses/beneficiaries", display: "Beneficiaries" },
      { path: "/expenses/traders", display: "Traders" },
      { path: "/expenses/types-of-expenses", display: "Types of Expenses" }
    ],
  },
  {
    path: "/reports",
    icon: "ri-file-pdf-2-line",
    display: "Reports",
    submenu: [ { path: "", display: "Cars tracking" },
      { path: "/reports/car-statement", display: "Car Statement" },
      { path: "/reports/expensese-statement", display: "Expensese Statement" },
      { path: "/reports/customer-statement", display: "Customer Statement" },
      { path: "/reports/full-account-statement", display: "Full Account Statement" },
      { path: "/reports/garage-statement", display: "Garage Account Statement" },
      { path: "/reports/trader-statement", display: "Trader Account Statement" },
      { path: "/reports/ledger", display: "Ledger" }
    ],
  },
  {
    path: "/",
    icon: "ri-bubble-chart-line",
    display: "Car tracking",
    submenu: [],
  },
  {
    path: "/",
    icon: "ri-alarm-warning-line",
    display: "Traffic violations",
    submenu: [],
  },
  {
    path: "/",
    icon: "ri-message-3-line",
    display: "Messages",
    submenu: [],
  },
  {
    path: "/settings",
    icon: "ri-settings-2-line",
    display: "Settings",
    submenu: [],
  },
];

export default navLinks;
