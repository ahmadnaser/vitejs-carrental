import React, { useState, useEffect } from "react";
import SingleCard from "./reuseable/SingleCard";
import MileChart from "../charts/MileCharts";
import CarStatsChart from "../charts/CarStatsChart";
import RecommendCarCard from "./UI/RecommendCarCard";
import recommendCarsData from "../assets/dummy-data/recommendCars";
import { getTenants } from '../controller/TenantController';
import { getAvailableCars } from '../controller/CarController';
import { getCars } from '../controller/CarController';
import { getContracts } from '../controller/RentedCarController';
import { useTranslation } from "react-i18next";

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

        setClientObj(prevState => ({
          ...prevState,
          totalNumber: tenants.length.toString(),
        }));

        setAvailableCarObj(prevState => ({
          ...prevState,
          totalNumber: availableCars.length.toString(),
        }));

        setCarObj(prevState => ({
          ...prevState,
          totalNumber: cars.length.toString(),
        }));

        setRentObj(prevState => ({
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
    <div className="px-8 bg-bodyBg-color text-heading-color">
      <div className="pt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <SingleCard item={carObj} />
          <SingleCard item={rentObj} />
          <SingleCard item={clientObj} />
          <SingleCard item={availableCarObj} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <div className="bg-primary-color p-8 rounded-md h-80 pb-12">
            <h3 className="text-white text-lg font-medium mb-5">{t("Rentals Statistics")}</h3>
            <MileChart />
          </div>

          <div className="bg-primary-color p-8 rounded-md h-80 pb-12">
            <h3 className="text-white text-lg font-medium mb-5">{t("Car Statistics")}</h3>
            <CarStatsChart />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 pb-12">
          {recommendCarsData.map((item) => (
            <RecommendCarCard item={item} key={item.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
