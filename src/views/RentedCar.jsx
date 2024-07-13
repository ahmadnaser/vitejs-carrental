import React, { useState } from 'react';

const rentedCarData = [
  {
    car: 'Toyota Camry',
    customer: 'John Doe',
    fromDate: '2024-07-01',
    dayNum: 5,
    toDateExpected: '2024-07-06',
    toDate: '2024-07-05',
    timeReturned: '10:00 AM',
    pricePerDay: 50,
    totalAmount: 250,
    remainingAmount: 0,
    note: 'Returned on time',
  },
  {
    car: 'Honda Civic',
    customer: 'Jane Smith',
    fromDate: '2024-07-03',
    dayNum: 3,
    toDateExpected: '2024-07-06',
    toDate: '2024-07-06',
    timeReturned: '2:00 PM',
    pricePerDay: 40,
    totalAmount: 120,
    remainingAmount: 20,
    note: 'Returned late',
  },
  // Add more data as needed
];

const RentedCarTable = () => {
  const [selectedRows, setSelectedRows] = useState([]);

  const handleRowSelect = (index) => {
    if (selectedRows.includes(index)) {
      setSelectedRows(selectedRows.filter((i) => i !== index));
    } else {
      setSelectedRows([...selectedRows, index]);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-bodyBg-color text-heading-color">
      <h1 className="text-3xl font-bold text-white mb-8">Rented Cars</h1>
      <div className="w-full max-w-6xl p-4">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white text-black">
            <thead>
              <tr className="w-full bg-secondary-color text-sm uppercase leading-normal">
                <th className="py-3 px-6 text-left">Select</th>
                <th className="py-3 px-6 text-left">Car</th>
                <th className="py-3 px-6 text-left">Customer</th>
                <th className="py-3 px-6 text-left">From Date</th>
                <th className="py-3 px-6 text-left">Days</th>
                <th className="py-3 px-6 text-left">To Date (Expected)</th>
                <th className="py-3 px-6 text-left">To Date</th>
                <th className="py-3 px-6 text-left">Time Returned</th>
                <th className="py-3 px-6 text-left">Price/Day</th>
                <th className="py-3 px-6 text-left">Total Amount</th>
                <th className="py-3 px-6 text-left">Remaining Amount</th>
                <th className="py-3 px-6 text-left">Note</th>
              </tr>
            </thead>
            <tbody className="text-sm font-light">
              {rentedCarData.map((item, index) => (
                <tr
                  key={index}
                  className={`border-b border-gray-300 hover:bg-gray-100 ${selectedRows.includes(index) ? 'bg-gray-200' : ''}`}
                  onClick={() => handleRowSelect(index)}
                >
                  <td className="py-3 px-6">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(index)}
                      onChange={() => handleRowSelect(index)}
                      className="cursor-pointer"
                    />
                  </td>
                  <td className="py-3 px-6">{item.car}</td>
                  <td className="py-3 px-6">{item.customer}</td>
                  <td className="py-3 px-6">{item.fromDate}</td>
                  <td className="py-3 px-6">{item.dayNum}</td>
                  <td className="py-3 px-6">{item.toDateExpected}</td>
                  <td className="py-3 px-6">{item.toDate}</td>
                  <td className="py-3 px-6">{item.timeReturned}</td>
                  <td className="py-3 px-6">{item.pricePerDay}</td>
                  <td className="py-3 px-6">{item.totalAmount}</td>
                  <td className="py-3 px-6">{item.remainingAmount}</td>
                  <td className="py-3 px-6">{item.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RentedCarTable;
