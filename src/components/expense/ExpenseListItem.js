"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseListItem = void 0;
var react_1 = require("react");
var ExpenseListItem = function (_a) {
    var expense = _a.expense;
    return (<tr>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {expense.date.toLocaleDateString()}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {expense.merchant}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: expense.currency
        }).format(expense.amount)}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {expense.category}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {expense.status}
      </td>
      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
        <button className="text-indigo-600 hover:text-indigo-900">
          Edit
        </button>
      </td>
    </tr>);
};
exports.ExpenseListItem = ExpenseListItem;
