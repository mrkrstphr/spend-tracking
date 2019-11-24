import React from 'react';
import { Link } from 'react-router-dom';
import NetIncomeChart from './components/NetIncomeChart';
import Statistics from './components/Statistics';
import { useMonthsQuery } from 'query';

const Dashboard = () => {
  const { loading, months } = useMonthsQuery();

  if (loading) {
    return null;
  }

  return (
    <>
      <h2 style={{ flex: 1, margin: '0 0 10px 0' }}>Dashboard</h2>

      <Statistics statistics={{}} />

      <h3>Net Income by Month</h3>
      <div style={{ width: '100%', height: 320 }}>
        <NetIncomeChart months={months} />
      </div>
    </>
  );
};

export default Dashboard;
