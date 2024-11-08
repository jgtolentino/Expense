"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseStatus = exports.ExpenseCategory = void 0;
var ExpenseCategory;
(function (ExpenseCategory) {
    ExpenseCategory["MEALS"] = "Meals";
    ExpenseCategory["TRAVEL"] = "Travel";
    ExpenseCategory["LODGING"] = "Lodging";
    ExpenseCategory["OFFICE_SUPPLIES"] = "Office Supplies";
    ExpenseCategory["ENTERTAINMENT"] = "Entertainment";
    ExpenseCategory["OTHER"] = "Other";
})(ExpenseCategory || (exports.ExpenseCategory = ExpenseCategory = {}));
var ExpenseStatus;
(function (ExpenseStatus) {
    ExpenseStatus["DRAFT"] = "Draft";
    ExpenseStatus["PENDING"] = "Pending";
    ExpenseStatus["APPROVED"] = "Approved";
    ExpenseStatus["REJECTED"] = "Rejected";
    ExpenseStatus["PAID"] = "Paid";
    ExpenseStatus["NEEDS_INFO"] = "Needs Information";
})(ExpenseStatus || (exports.ExpenseStatus = ExpenseStatus = {}));
