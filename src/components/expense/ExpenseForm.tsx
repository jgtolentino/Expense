import React, { useState } from 'react';
import { ExpenseCategory, ExpenseStatus } from '../../types/expense';
import { useExpenseStore } from '../../store/expenseStore';
import { ReceiptUploader } from './ReceiptUploader';
import { ExpenseFormFields } from './ExpenseFormFields';

export const ExpenseForm: React.FC = () => {
  const addExpense = useExpenseStore((state) => state.addExpense);
  const [formData, setFormData] = useState({
    date: '',
    merchant: '',
    amount: '',
    currency: 'PHP',
    category: ExpenseCategory.MEALS,
    description: '',
    projectCode: '',
  });
  const [error, setError] = useState<string | null>(null);

  const handleDataExtracted = (data: any) => {
    setFormData(prev => ({
      ...prev,
      ...(data.date && { date: data.date }),
      ...(data.amount && { amount: data.amount.toString() }),
      ...(data.merchant && { merchant: data.merchant }),
    }));
    setError(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleProjectCodeChange = (code: string) => {
    setFormData(prev => ({ ...prev, projectCode: code }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!formData.projectCode) {
      setError('Project code is required');
      return;
    }

    try {
      addExpense({
        date: new Date(formData.date),
        merchant: formData.merchant,
        amount: parseFloat(formData.amount),
        currency: formData.currency,
        category: formData.category as ExpenseCategory,
        description: formData.description,
        projectCode: formData.projectCode,
        status: ExpenseStatus.PENDING,
        submittedBy: 'current-user',
      });

      setFormData({
        date: '',
        merchant: '',
        amount: '',
        currency: 'PHP',
        category: ExpenseCategory.MEALS,
        description: '',
        projectCode: '',
      });
      setError(null);
    } catch (err) {
      setError('Failed to submit expense. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-lg shadow p-6">
      <ReceiptUploader 
        onDataExtracted={handleDataExtracted}
        onError={setError}
      />

      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      <ExpenseFormFields 
        formData={formData}
        onChange={handleChange}
        onProjectCodeChange={handleProjectCodeChange}
      />

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Submit Expense
        </button>
      </div>
    </form>
  );
};