import React from 'react';
import { Expense } from '../../types/expense';

interface ExpenseListItemProps {
  expense: Expense;
}

export const ExpenseListItem: React.FC<ExpenseListItemProps> = ({ expense }) => {
  return (
    <tr>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {expense.date.toLocaleDateString()}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {expense.merchant}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: expense.currency
        }).format(expense.amount)}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {expense.category}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {expense.status}
      </td>
      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
        <button className="text-indigo-600 hover:text-indigo-900">
          Edit
        </button>
      </td>
    </tr>
  );
};