import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getContracts } from "../controller/RentedCarController";

const Cards = (props) => {
  const { type, imgUrl } = props.item;
  const [contractData, setContractData] = useState([]);
  const [topRentals, setTopRentals] = useState([]);
  const [nearContracts, setNearContracts] = useState([]);
  const [carCountMap, setCarCountMap] = useState({});
  const { t } = useTranslation();

  useEffect(() => {
    if (type === "top_rentals" || type === "near_contracts") {
      fetchContractData();
    }
  }, [type]);

  const fetchContractData = async () => {
    try {
      const data = await getContracts();
      setContractData(data);

      if (type === "top_rentals") {
        const carCount = data.reduce((acc, contract) => {
          acc[contract.vehicle_id] = (acc[contract.vehicle_id] || 0) + 1;
          return acc;
        }, {});

        setCarCountMap(carCount);

        const sortedCars = Object.entries(carCount)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
          .map(([vehicle_id]) => data.find((contract) => contract.vehicle_id === vehicle_id));

        setTopRentals(sortedCars);
      }

      if (type === "near_contracts") {
        const today = new Date();
        const sortedContracts = data
          .sort((a, b) => new Date(a.end_date) - new Date(b.end_date))
          .filter((contract) => new Date(contract.end_date) >= today)
          .slice(0, 5);

        setNearContracts(sortedContracts);
      }
    } catch (error) {
      console.error("Error fetching contracts:", error);
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="text-black p-5 rounded-md cursor-pointer flex flex-col bg-white h-full justify-between">
      {type === "top_rentals" && (
        <div className="flex flex-col flex-grow">
          <h5 className="text-xl font-semibold mb-4">{t('Top 5 Car Rentals')}</h5>
          <div className="flex-grow overflow-y-auto">
            <table className="w-full table-auto border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-2 py-1 text-sm">#</th>
                  <th className="border border-gray-300 px-2 py-1 text-sm">{t("Vehicle ID")}</th>
                  <th className="border border-gray-300 px-2 py-1 text-sm">{t("Car Make")}</th>
                  <th className="border border-gray-300 px-2 py-1 text-sm">{t("Car Model")}</th>
                  <th className="border border-gray-300 px-2 py-1 text-sm">{t("Rental Count")}</th>
                </tr>
              </thead>
              <tbody>
                {topRentals.map((car, index) => (
                  <tr key={index} className="border-t border-gray-300">
                    <td className="border border-gray-300 px-2 py-1 text-center text-sm">{index + 1}</td>
                    <td className="border border-gray-300 px-2 py-1 text-sm" dir="ltr">{car.vehicle_id}</td>
                    <td className="border border-gray-300 px-2 py-1 text-sm">{car.make}</td>
                    <td className="border border-gray-300 px-2 py-1 text-sm">{car.model}</td>
                    <td className="border border-gray-300 px-2 py-1 text-center text-sm">{carCountMap[car.vehicle_id]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {type === "company_seal" && (
        <div className="flex justify-center items-center flex-grow">
          <img src={imgUrl} alt={t("Company Seal")} className="w-2/2 h-2/2" />
        </div>
      )}
      {type === "near_contracts" && (
        <div className="flex flex-col flex-grow">
          <h5 className="text-xl font-semibold mb-4">{t('Contracts Near to Finish')}</h5>
          <div className="flex-grow overflow-y-auto">
            <table className="w-full table-auto border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-2 py-1 text-sm">#</th>
                  <th className="border border-gray-300 px-2 py-1 text-sm">{t("Contract ID")}</th>
                  <th className="border border-gray-300 px-2 py-1 text-sm " dir="ltr">{t("Vehicle")}</th>
                  <th className="border border-gray-300 px-2 py-1 text-sm">{t("End Date")}</th>
                </tr>
              </thead>
              <tbody>
                {nearContracts.map((contract, index) => (
                  <tr key={index} className="border-t border-gray-300">
                    <td className="border border-gray-300 px-2 py-1 text-center text-sm">{index + 1}</td>
                    <td className="border border-gray-300 px-2 py-1 text-sm">{contract.rental_id}</td>
                    <td className="border border-gray-300 px-2 py-1 text-sm">{`${contract.vehicle_id} (${contract.make} ${contract.model})`}</td>
                    <td className="border border-gray-300 px-2 py-1 text-center text-sm">
                      {formatDate(contract.end_date)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cards;
