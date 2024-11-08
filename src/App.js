"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var ExpenseList_1 = require("./components/expense/ExpenseList");
var NewExpense_1 = require("./pages/NewExpense");
function App() {
    return (<div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            TBWA Reimbursement App
          </h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <NewExpense_1.NewExpense />
          <ExpenseList_1.ExpenseList />
        </div>
      </main>
    </div>);
}
exports.default = App;
