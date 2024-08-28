import React, { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  Tooltip,
  CartesianGrid,
  Area,
} from "recharts";

import { getPayments } from "../controller/PaymentController";

const FinancialStatsChart = () => {
  const [paymentData, setPaymentData] = useState([]);

  useEffect(() => {
    const fetchPaymentData = async () => {
      try {
        const payments = await getPayments();
      
        const formattedData = payments.map(payment => {
          const dateObj = new Date(payment.payment_date);
          const formattedDate = `${String(dateObj.getMonth() + 1).padStart(2, '0')}-${String(dateObj.getDate()).padStart(2, '0')}`;
          
          return {
            date: formattedDate,
            amount: parseFloat(payment.amount),
          };
        });

        setPaymentData(formattedData);
      } catch (error) {
        console.error("Failed to fetch payment data:", error);
      }
    };

    fetchPaymentData();
  }, []);

  return (
    <ResponsiveContainer width="100%">
      <AreaChart
        data={paymentData}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="date" stroke="#ddd" />
        <CartesianGrid strokeDasharray="3 3" stroke="#b7ffe913" />
        <Tooltip wrapperClassName="tooltip__style" cursor={false} />
        <Area
          type="monotone"
          dataKey="amount"
          stroke="#8884d8"
          fillOpacity={1}
          fill="url(#colorAmount)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default FinancialStatsChart;
