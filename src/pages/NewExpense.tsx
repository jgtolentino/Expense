import React from 'react';
import { ExpenseForm } from '../components/expense/ExpenseForm';

export const NewExpense: React.FC = () => {
  return (
    <div className="py-6">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">New Expense</h2>
        <ExpenseForm />
      </div>
    </div>
  );
};