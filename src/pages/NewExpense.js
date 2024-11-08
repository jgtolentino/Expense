"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewExpense = void 0;
var react_1 = require("react");
var ExpenseForm_1 = require("../components/expense/ExpenseForm");
var NewExpense = function () {
    return (<div className="py-6">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">New Expense</h2>
        <ExpenseForm_1.ExpenseForm />
      </div>
    </div>);
};
exports.NewExpense = NewExpense;
