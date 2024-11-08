import React from 'react';
import { ExpenseStatus } from '../../types/expense';

interface StatusBadgeProps {
  status: ExpenseStatus;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusStyles = () => {
    switch (status) {
      case ExpenseStatus.APPROVED:
        return 'bg-green-100 text-green-800';
      case ExpenseStatus.PAID:
        return 'bg-blue-100 text-blue-800';
      case ExpenseStatus.REJECTED:
        return 'bg-red-100 text-red-800';
      case ExpenseStatus.PENDING:
        return 'bg-yellow-100 text-yellow-800';
      case ExpenseStatus.NEEDS_INFO:
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyles()}`}>
      {status}
    </span>
  );
};