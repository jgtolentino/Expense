import React from 'react';
import { useExpenseStore } from '../../store/expenseStore';
import { useAuthStore } from '../../store/authStore';
import { StatusBadge } from '../ui/StatusBadge';
import { exportExpensesToExcel } from '../../utils/exportUtils';
import { UserRole } from '../../types/user';

export const ExpenseList: React.FC = () => {
  const expenses = useExpenseStore((state) => state.expenses);
  const { user } = useAuthStore();

  const handleExport = () => {
    exportExpensesToExcel(expenses);
  };

  const canExport = user?.role === UserRole.FINANCE || user?.role === UserRole.ADMINISTRATOR;

  if (expenses.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No expenses submitted yet.
      </div>
    );
  }

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Recent Expenses</h2>
        {canExport && (
          <button
            onClick={handleExport}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Export to Excel
          </button>
        )}
      </div>
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Date</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Merchant</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Amount</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Category</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {expenses.map((expense) => (
              <tr key={expense.id} className="hover:bg-gray-50">
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {expense.date.toLocaleDateString()}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {expense.merchant}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {new Intl.NumberFormat('en-PH', {
                    style: 'currency',
                    currency: 'PHP'
                  }).format(expense.amount)}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {expense.category}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm">
                  <StatusBadge status={expense.status} />
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {expense.status === 'Approved' && expense.approvedAt && (
                    <div>
                      <p>Approved by: {expense.approvedBy}</p>
                      <p>On: {expense.approvedAt.toLocaleDateString()}</p>
                    </div>
                  )}
                  {expense.status === 'Paid' && expense.paidAt && (
                    <div>
                      <p>Paid on: {expense.paidAt.toLocaleDateString()}</p>
                    </div>
                  )}
                  {expense.comments && expense.comments.length > 0 && (
                    <button
                      className="text-indigo-600 hover:text-indigo-900"
                      title={expense.comments.join('\n')}
                    >
                      View Comments
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};