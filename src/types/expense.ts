export interface Expense {
  id: string;
  date: Date;
  merchant: string;
  amount: number;
  tax?: number;
  currency: string;
  category: ExpenseCategory;
  projectCode?: string;
  description?: string;
  receiptUrl?: string;
  status: ExpenseStatus;
  submittedBy: string;
  submittedAt: Date;
  approvedBy?: string;
  approvedAt?: Date;
  paidAt?: Date;
  comments?: string[];
}

export enum ExpenseCategory {
  MEALS = 'Meals',
  TRAVEL = 'Travel',
  LODGING = 'Lodging',
  OFFICE_SUPPLIES = 'Office Supplies',
  ENTERTAINMENT = 'Entertainment',
  OTHER = 'Other'
}

export enum ExpenseStatus {
  DRAFT = 'Draft',
  PENDING = 'Pending',
  APPROVED = 'Approved',
  REJECTED = 'Rejected',
  PAID = 'Paid',
  NEEDS_INFO = 'Needs Information'
}