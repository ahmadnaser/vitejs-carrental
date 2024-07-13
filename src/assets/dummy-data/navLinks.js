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
      { path: "/renting/rented-car", display: "Rented car" },
      { path: "/renting/rental-contracts", display: "Rental contracts" },
      { path: "/renting/reservations", display: "Reservations" },
      { path: "/renting/tenants", display: "Tenants" },
      { path: "/renting/cars", display: "Cars" }
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
      { path: "/expenses/types-of-expenses", display: "Types of expenses" }
    ],
  },
  {
    path: "/reports",
    icon: "ri-file-pdf-2-line",
    display: "Reports",
    submenu: [],
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
