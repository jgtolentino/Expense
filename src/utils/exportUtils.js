"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exportExpensesToExcel = void 0;
var expense_1 = require("../types/expense");
var XLSX = require("xlsx");
var exportExpensesToExcel = function (expenses) {
    // Filter expenses to only include those that are approved or paid
    var relevantExpenses = expenses.filter(function (expense) {
        return expense.status === expense_1.ExpenseStatus.APPROVED ||
            expense.status === expense_1.ExpenseStatus.PAID;
    });
    // Group expenses by status
    var groupedExpenses = relevantExpenses.reduce(function (acc, expense) {
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
    }, {});
    // Create workbook
    var wb = XLSX.utils.book_new();
    // Add worksheets for Approved and Paid expenses
    Object.entries(groupedExpenses).forEach(function (_a) {
        var status = _a[0], expenses = _a[1];
        if (expenses.length > 0) {
            var ws = XLSX.utils.json_to_sheet(expenses);
            // Add column widths
            var colWidths = [
                { wch: 12 }, // Date
                { wch: 20 }, // Merchant
                { wch: 12 }, // Amount
                { wch: 8 }, // Currency
                { wch: 15 }, // Category
                { wch: 12 }, // Project Code
                { wch: 30 }, // Description
                { wch: 20 }, // Submitted By
                { wch: 12 }, // Submitted At
                { wch: 20 }, // Approved By
                { wch: 12 }, // Approved At
                { wch: 12 }, // Paid At
            ];
            ws['!cols'] = colWidths;
            XLSX.utils.book_append_sheet(wb, ws, status);
        }
    });
    // Add summary sheet
    var summary = Object.entries(groupedExpenses).map(function (_a) {
        var status = _a[0], expenses = _a[1];
        return ({
            Status: status,
            Count: expenses.length,
            'Total Amount': expenses.reduce(function (sum, exp) { return sum + exp.Amount; }, 0),
            'Currency': 'PHP',
        });
    });
    var summarySheet = XLSX.utils.json_to_sheet(summary);
    summarySheet['!cols'] = [
        { wch: 15 }, // Status
        { wch: 10 }, // Count
        { wch: 15 }, // Total Amount
        { wch: 10 }, // Currency
    ];
    XLSX.utils.book_append_sheet(wb, summarySheet, 'Summary');
    // Generate filename with current date and time
    var date = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
    var fileName = "TBWA_Expenses_Report_".concat(date, ".xlsx");
    // Save the file
    XLSX.writeFile(wb, fileName);
};
exports.exportExpensesToExcel = exportExpensesToExcel;
