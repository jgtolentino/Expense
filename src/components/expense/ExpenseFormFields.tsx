import React, { ChangeEvent } from 'react';
import { ExpenseCategory, Option } from '../../types/expense';
import { FormInput } from '../ui/FormInput';
import { FormSelect } from '../ui/FormSelect';
import { ProjectCodeSelect } from '../ui/ProjectCodeSelect';

interface ExpenseFormFieldsProps {
  formData: {
    date: string;
    merchant: string;
    amount: string;
    currency: string;
    category: ExpenseCategory;
    description: string;
    projectCode: string;
  };
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  onProjectCodeChange: (value: string) => void;
}

export const ExpenseFormFields: React.FC<ExpenseFormFieldsProps> = ({
  formData,
  onChange,
  onProjectCodeChange
}) => {
  const categoryOptions: Option[] = Object.values(ExpenseCategory).map(category => ({
    value: category,
    label: category
  }));

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput
          label="Date"
          type="date"
          name="date"
          value={formData.date}
          onChange={onChange}
          required
        />

        <FormInput
          label="Merchant"
          type="text"
          name="merchant"
          value={formData.merchant}
          onChange={onChange}
          required
        />

        <FormInput
          label="Amount"
          type="number"
          name="amount"
          value={formData.amount}
          onChange={onChange}
          step="0.01"
          required
        />

        <FormSelect
          label="Currency"
          name="currency"
          value={formData.currency}
          onChange={onChange}
          required
          options={[
            { value: 'PHP', label: 'PHP' }
          ]}
        />

        <FormSelect
          label="Category"
          name="category"
          value={formData.category}
          onChange={onChange}
          required
          options={categoryOptions}
        />

        <ProjectCodeSelect
          value={formData.projectCode}
          onChange={onProjectCodeChange}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={onChange}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
    </>
  );
};