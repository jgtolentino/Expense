"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dashboard = void 0;
var react_1 = require("react");
var ExpenseList_1 = require("../components/ExpenseList");
var Dashboard = function () {
    return (<div>
      <h2 className="text-2xl font-semibold mb-6">Your Expenses</h2>
      <ExpenseList_1.ExpenseList />
    </div>);
};
exports.Dashboard = Dashboard;
