import { Expense, ExpenseStatus } from '../types/expense';
import * as XLSX from 'xlsx';

export const exportExpensesToExcel = (expenses: Expense[]) => {
  // Filter expenses to only include those that are approved or paid
  const relevantExpenses = expenses.filter(expense => 
    expense.status === ExpenseStatus.APPROVED || 
    expense.status === ExpenseStatus.PAID
  );

  // Group expenses by status
  const groupedExpenses = relevantExpenses.reduce((acc, expense) => {
    if (!acc[expense.status]) {
      acc[expense.status] = [];
    }
    acc[expense.status].push({
      Date: expense.date.toLocaleDateString(),
      Merchant: expense.merchant,
      Amount: expense.amount,
      Currency: expense.currency,
      Category: expense.category,
      'Project Code': expense.projectCode || '',
      Description: expense.description || '',
      'Submitted By': expense.submittedBy,
      'Submitted At': expense.submittedAt.toLocaleDateString(),
      'Approved By': expense.approvedBy || '',
      'Approved At': expense.approvedAt ? expense.approvedAt.toLocaleDateString() : '',
      'Paid At': expense.paidAt ? expense.paidAt.toLocaleDateString() : '',
    });
    return acc;
  }, {} as Record<ExpenseStatus, any[]>);

  // Create workbook
  const wb = XLSX.utils.book_new();

  // Add worksheets for Approved and Paid expenses
  Object.entries(groupedExpenses).forEach(([status, expenses]) => {
    if (expenses.length > 0) {
      const ws = XLSX.utils.json_to_sheet(expenses);
      
      // Add column widths
      const colWidths = [
        { wch: 12 },  // Date
        { wch: 20 },  // Merchant
        { wch: 12 },  // Amount
        { wch: 8 },   // Currency
        { wch: 15 },  // Category
        { wch: 12 },  // Project Code
        { wch: 30 },  // Description
        { wch: 20 },  // Submitted By
        { wch: 12 },  // Submitted At
        { wch: 20 },  // Approved By
        { wch: 12 },  // Approved At
        { wch: 12 },  // Paid At
      ];
      ws['!cols'] = colWidths;

      XLSX.utils.book_append_sheet(wb, ws, status);
    }
  });

  // Add summary sheet
  const summary = Object.entries(groupedExpenses).map(([status, expenses]) => ({
    Status: status,
    Count: expenses.length,
    'Total Amount': expenses.reduce((sum, exp) => sum + exp.Amount, 0),
    'Currency': 'PHP',
  }));
  
  const summarySheet = XLSX.utils.json_to_sheet(summary);
  summarySheet['!cols'] = [
    { wch: 15 },  // Status
    { wch: 10 },  // Count
    { wch: 15 },  // Total Amount
    { wch: 10 },  // Currency
  ];
  
  XLSX.utils.book_append_sheet(wb, summarySheet, 'Summary');

  // Generate filename with current date and time
  const date = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
  const fileName = `TBWA_Expenses_Report_${date}.xlsx`;

  // Save the file
  XLSX.writeFile(wb, fileName);
};