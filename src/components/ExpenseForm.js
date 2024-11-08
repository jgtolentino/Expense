"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseForm = void 0;
var react_1 = require("react");
var expense_1 = require("../types/expense");
var expenseStore_1 = require("../store/expenseStore");
var ReceiptUploader_1 = require("./expense/ReceiptUploader");
var ExpenseFormFields_1 = require("./expense/ExpenseFormFields");
var ExpenseForm = function () {
    var addExpense = (0, expenseStore_1.useExpenseStore)(function (state) { return state.addExpense; });
    var _a = (0, react_1.useState)({
        date: '',
        merchant: '',
        amount: '',
        currency: 'PHP',
        category: expense_1.ExpenseCategory.MEALS,
        description: '',
        projectCode: '',
    }), formData = _a[0], setFormData = _a[1];
    var _b = (0, react_1.useState)(null), error = _b[0], setError = _b[1];
    var handleDataExtracted = function (data) {
        setFormData(function (prev) { return (__assign(__assign(__assign(__assign({}, prev), (data.date && { date: data.date })), (data.amount && { amount: data.amount.toString() })), (data.merchant && { merchant: data.merchant }))); });
        setError(null);
    };
    var handleError = function (errorMessage) {
        setError(errorMessage);
    };
    var handleChange = function (e) {
        var _a = e.target, name = _a.name, value = _a.value;
        setFormData(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[name] = value, _a)));
        });
    };
    var handleSubmit = function (e) {
        e.preventDefault();
        addExpense({
            date: new Date(formData.date),
            merchant: formData.merchant,
            amount: parseFloat(formData.amount),
            currency: formData.currency,
            category: formData.category,
            description: formData.description,
            projectCode: formData.projectCode,
            status: expense_1.ExpenseStatus.DRAFT,
            submittedBy: 'current-user',
        });
        setFormData({
            date: '',
            merchant: '',
            amount: '',
            currency: 'PHP',
            category: expense_1.ExpenseCategory.MEALS,
            description: '',
            projectCode: '',
        });
    };
    return (<form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto p-6">
      <ReceiptUploader_1.ReceiptUploader onDataExtracted={handleDataExtracted} onError={handleError}/>

      {error && (<div className="bg-red-50 border-l-4 border-red-400 p-4">
          <p className="text-red-700">{error}</p>
        </div>)}

      <ExpenseFormFields_1.ExpenseFormFields formData={formData} onChange={handleChange}/>

      <div className="flex justify-end">
        <button type="submit" className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          Submit Expense
        </button>
      </div>
    </form>);
};
exports.ExpenseForm = ExpenseForm;
