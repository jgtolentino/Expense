import React, { useState } from 'react';
import { ExpenseCategory, ExpenseStatus } from '../types/expense';
import { useExpenseStore } from '../store/expenseStore';
import { ReceiptUploader } from './expense/ReceiptUploader';
import { ExpenseFormFields } from './expense/ExpenseFormFields';

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

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    addExpense({
      date: new Date(formData.date),
      merchant: formData.merchant,
      amount: parseFloat(formData.amount),
      currency: formData.currency,
      category: formData.category as ExpenseCategory,
      description: formData.description,
      projectCode: formData.projectCode,
      status: ExpenseStatus.DRAFT,
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
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto p-6">
      <ReceiptUploader 
        onDataExtracted={handleDataExtracted}
        onError={handleError}
      />

      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      <ExpenseFormFields 
        formData={formData}
        onChange={handleChange}
      />

      <div className="flex justify-end">
        <button
          type="submit"
          className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Submit Expense
        </button>
      </div>
    </form>
  );
};