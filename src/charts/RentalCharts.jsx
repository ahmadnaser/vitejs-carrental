import React, { useState, useEffect } from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip } from "recharts";
import { getContracts } from "../controller/RentedCarController";

const RentalCharts = () => {
  const [rentData, setRentalData] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const rental = await getContracts();

        const aggregatedData = [
          { name: "Sat", count: 0 },
          { name: "Sun", count: 0 },
          { name: "Mon", count: 0 },
          { name: "Tue", count: 0 },
          { name: "Wed", count: 0 },
          { name: "Thu", count: 0 },
          { name: "Fri", count: 0 },
        ];

        rental.forEach((rental) => {
          const startDate = new Date(rental.start_date);
          const dayName = startDate.toLocaleString("en-US", { weekday: "short" });

          const dayData = aggregatedData.find((d) => d.name === dayName);
          if (dayData) {
            dayData.count += 1; 
          }
        });

        setRentalData(aggregatedData); 
      } catch (error) {
        console.error("Error fetching rental data:", error);
      }
    };

    fetchReservations();
  }, []);

  return (
    <ResponsiveContainer width="100%">
      <BarChart data={rentData}>
        <XAxis dataKey="name" stroke="#2884ff" />
        <Bar dataKey="count" fill="#2884ff" stroke="#2882ff" barSize={30} />
        <Tooltip wrapperClassName="tooltip__style" cursor={false} />
      </BarChart>
    </ResponsiveContainer>
  );
};


export default RentalCharts;
