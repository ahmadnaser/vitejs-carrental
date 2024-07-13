import React from "react";
import SingleCard from "../components/reuseable/SingleCard";

import MileChart from "../charts/MileCharts";
import CarStatsChart from "../charts/CarStatsChart";
import RecommendCarCard from "../components/UI/RecommendCarCard";
import recommendCarsData from "../assets/dummy-data/recommendCars";

const carObj = {
  title: "Total Cars",
  totalNumber: 750,
  icon: "ri-police-car-line",
};

const tripObj = {
  title: "Daily Trips",
  totalNumber: 1697,
  icon: "ri-steering-2-line",
};

const clientObj = {
  title: "Clients Annually",
  totalNumber: "85k",
  icon: "ri-user-line",
};

const distanceObj = {
  title: "Kilometers Daily",
  totalNumber: 2167,
  icon: "ri-timer-flash-line",
};

const Dashboard = () => {
  return (
    <div className="px-8 bg-bodyBg-color text-heading-color">
      <div className="pt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <SingleCard item={carObj} />
          <SingleCard item={tripObj} />
          <SingleCard item={clientObj} />
          <SingleCard item={distanceObj} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <div className="bg-primary-color p-8 rounded-md h-80 pb-12">
            <h3 className="text-white text-lg font-medium mb-5">Miles Statistics</h3>
            <MileChart />
          </div>

          <div className="bg-primary-color p-8 rounded-md h-80 pb-12">
            <h3 className="text-white text-lg font-medium mb-5">Car Statistics</h3>
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
