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
      { path: "/tenants", display: "Tenants" },
      { path: "/cars", display: "Cars" }
    ],
  },
  {
    path: "/expenses",
    icon: "ri-money-dollar-circle-line",
    display: "Expenses",
    submenu: [
      { path: "/expenses/car-maintenance", display: "Car maintenance" },
      { path: "/expenses/general-expenses", display: "General expenses" },
      { path: "/expenses/garages", display: "Garages" },
      { path: "/expenses/beneficiaries", display: "Beneficiaries" },
      { path: "/expenses/traders", display: "Traders" },
      { path: "/expenses/types-of-expenses", display: "Types of expenses" }
    ],
  },
  {
    path: "/reports",
    icon: "ri-file-pdf-2-line",
    display: "Reports",
    submenu: [ { path: "/reports/car-maintenance", display: "Cars tracking" },
      { path: "/reports/car-statement", display: "Car statment" },
      { path: "/reports/expensese-statement", display: "Expensese statment" },
      { path: "/reports/customer-statement", display: "Customer statment" },
      { path: "/reports/full-account-statement", display: "Full account statement" },
      { path: "/reports/garage-statement", display: "Garage account statement" },
      { path: "/reports/trader-statement", display: "Meerchant account statement" }
    ],
  },
  {
    path: "/car-tracking",
    icon: "ri-bubble-chart-line",
    display: "Car tracking",
    submenu: [],
  },
  {
    path: "/traffic-violations",
    icon: "ri-alarm-warning-line",
    display: "Traffic violations",
    submenu: [],
  },
  {
    path: "/messages",
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
