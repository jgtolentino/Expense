import { create } from 'zustand';
import { Expense, ExpenseStatus } from '../types/expense';

interface ExpenseStore {
  expenses: Expense[];
  addExpense: (expense: Omit<Expense, 'id' | 'submittedAt'>) => void;
  updateExpense: (id: string, expense: Partial<Expense>) => void;
  deleteExpense: (id: string) => void;
  submitExpense: (id: string) => void;
}

export const useExpenseStore = create<ExpenseStore>((set) => ({
  expenses: [],
  addExpense: (expense) => set((state) => ({
    expenses: [...state.expenses, {
      ...expense,
      id: crypto.randomUUID(),
      submittedAt: new Date(),
    }],
  })),
  updateExpense: (id, expense) => set((state) => ({
    expenses: state.expenses.map((e) =>
      e.id === id ? { ...e, ...expense } : e
    ),
  })),
  deleteExpense: (id) => set((state) => ({
    expenses: state.expenses.filter((e) => e.id !== id),
  })),
  submitExpense: (id) => set((state) => ({
    expenses: state.expenses.map((e) =>
      e.id === id ? { ...e, status: ExpenseStatus.PENDING } : e
    ),
  })),
}));