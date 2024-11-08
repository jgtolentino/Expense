"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusBadge = void 0;
var react_1 = require("react");
var expense_1 = require("../../types/expense");
var StatusBadge = function (_a) {
    var status = _a.status;
    var getStatusStyles = function () {
        switch (status) {
            case expense_1.ExpenseStatus.APPROVED:
                return 'bg-green-100 text-green-800';
            case expense_1.ExpenseStatus.PAID:
                return 'bg-blue-100 text-blue-800';
            case expense_1.ExpenseStatus.REJECTED:
                return 'bg-red-100 text-red-800';
            case expense_1.ExpenseStatus.PENDING:
                return 'bg-yellow-100 text-yellow-800';
            case expense_1.ExpenseStatus.NEEDS_INFO:
                return 'bg-orange-100 text-orange-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };
    return (<span className={"inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ".concat(getStatusStyles())}>
      {status}
    </span>);
};
exports.StatusBadge = StatusBadge;
