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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useExpenseStore = void 0;
var zustand_1 = require("zustand");
var expense_1 = require("../types/expense");
exports.useExpenseStore = (0, zustand_1.create)(function (set) { return ({
    expenses: [],
    addExpense: function (expense) { return set(function (state) { return ({
        expenses: __spreadArray(__spreadArray([], state.expenses, true), [__assign(__assign({}, expense), { id: crypto.randomUUID(), submittedAt: new Date() })], false),
    }); }); },
    updateExpense: function (id, expense) { return set(function (state) { return ({
        expenses: state.expenses.map(function (e) {
            return e.id === id ? __assign(__assign({}, e), expense) : e;
        }),
    }); }); },
    deleteExpense: function (id) { return set(function (state) { return ({
        expenses: state.expenses.filter(function (e) { return e.id !== id; }),
    }); }); },
    submitExpense: function (id) { return set(function (state) { return ({
        expenses: state.expenses.map(function (e) {
            return e.id === id ? __assign(__assign({}, e), { status: expense_1.ExpenseStatus.PENDING }) : e;
        }),
    }); }); },
}); });
