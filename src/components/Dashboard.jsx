import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SingleCard from "./reuseable/SingleCard";
import RentalChart from "../charts/RentalCharts";
import FinancialStatsChart from "../charts/FinancialStatsChart";
import Cards from "../charts/Cards";
import cardsData from "../assets/dummy-data/cardsData";
import { getTenants } from '../controller/TenantController';
import { getAvailableCars } from '../controller/CarController';
import { getCars } from '../controller/CarController';
import { getContracts } from '../controller/RentedCarController';
import { useTranslation } from "react-i18next";
import GreenBackEnd from "../assets/images/GreenBackEnd.png";

const Dashboard = () => {
  const { t } = useTranslation();

  const [clientObj, setClientObj] = useState({
    title: t("Total Tenants"),
    totalNumber: "0",
    icon: "ri-user-line",
  });

  const [availableCarObj, setAvailableCarObj] = useState({
    title: t("Cars Available For Rent"),
    totalNumber: "0",
    icon: "ri-car-washing-line",
  });

  const [carObj, setCarObj] = useState({
    title: t("Total Cars"),
    totalNumber: "0",
    icon: "ri-police-car-line",
  });

  const [rentObj, setRentObj] = useState({
    title: t("Total Rentals"),
    totalNumber: "0",
    icon: "ri-steering-2-line",
  });

  useEffect(() => {
    const fetchTenantsAndCars = async () => {
      try {
        const tenants = await getTenants();
        const availableCars = await getAvailableCars();
        const cars = await getCars();
        const rentals = await getContracts();

        setClientObj((prevState) => ({
          ...prevState,
          totalNumber: tenants.length.toString(),
        }));

        setAvailableCarObj((prevState) => ({
          ...prevState,
          totalNumber: availableCars.length.toString(),
        }));

        setCarObj((prevState) => ({
          ...prevState,
          totalNumber: cars.length.toString(),
        }));

        setRentObj((prevState) => ({
          ...prevState,
          totalNumber: rentals.length.toString(),
        }));
      } catch (error) {
        console.error('Error fetching tenants or available cars:', error);
      }
    };

    fetchTenantsAndCars();
  }, []);

  return (
    <div className="relative px-8 bg-bodyBg-color text-heading-color min-h-screen flex flex-col">
      <div className="flex-grow pt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Link to="/cars">
            <SingleCard item={carObj} />
          </Link>
          <Link to="/renting/rental-contracts">
            <SingleCard item={rentObj} />
          </Link>
          <Link to="/tenants">
            <SingleCard item={clientObj} />
          </Link>
          <Link to="/cars">
            <SingleCard item={availableCarObj} />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <div className="bg-primary-color p-8 rounded-md h-80 pb-12">
            <h3 className="text-white text-lg font-medium mb-5">{t("Rentals Statistics")}</h3>
            <RentalChart />
          </div>

          <div className="bg-primary-color p-8 rounded-md h-80 pb-12">
            <h3 className="text-white text-lg font-medium mb-5">{t("Financial Statistics")}</h3>
            <FinancialStatsChart />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 pb-12 mb-10">
          {cardsData.map((item, index) => (
            <div
              key={item.id}
              className={`${
                cardsData.length % 3 === 1 && index === cardsData.length - 1
                  ? 'md:col-span-2 lg:col-start-2' 
                  : ''
              }`}
            >
              <Cards item={item} />
            </div>
          ))}
        </div>

      </div>

      <div className="absolute bottom-4 w-full text-center text-sm text-gray-600 flex justify-center items-center mt-10" dir="ltr">
        <span>Powered By</span>
        <a
          href="https://greenbackend.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center ml-1"
          style={{ textDecoration: 'none' }} 
        >
          <img
            src={GreenBackEnd}
            alt="GreenBackEnd Logo"
            className="mr-0 align-middle"  
            style={{
              width: '2em',
              height: '1.4em',
            }}
          />
          <span className="font-bold ml-1">Greenbackend</span> 
        </a>
        <span>&nbsp;Web Hosting 2024 <span className="font-bold">Scalable Cloud</span></span>
      </div>

    </div>
  );
};

export default Dashboard;
