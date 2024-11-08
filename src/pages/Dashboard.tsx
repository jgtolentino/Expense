import React from 'react';
import { ExpenseList } from '../components/ExpenseList';

export const Dashboard: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Your Expenses</h2>
      <ExpenseList />
    </div>
  );
};