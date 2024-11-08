"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseFormFields = void 0;
var react_1 = require("react");
var expense_1 = require("../../types/expense");
var FormInput_1 = require("../ui/FormInput");
var FormSelect_1 = require("../ui/FormSelect");
var ProjectCodeSelect_1 = require("../ui/ProjectCodeSelect");
var ExpenseFormFields = function (_a) {
    var formData = _a.formData, onChange = _a.onChange, onProjectCodeChange = _a.onProjectCodeChange;
    return (<>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput_1.FormInput label="Date" type="date" name="date" value={formData.date} onChange={onChange} required/>

        <FormInput_1.FormInput label="Merchant" type="text" name="merchant" value={formData.merchant} onChange={onChange} required/>

        <FormInput_1.FormInput label="Amount" type="number" name="amount" value={formData.amount} onChange={onChange} step="0.01" required/>

        <FormSelect_1.FormSelect label="Currency" name="currency" value={formData.currency} onChange={onChange} required options={[
            { value: 'PHP', label: 'PHP' }
        ]}/>

        <FormSelect_1.FormSelect label="Category" name="category" value={formData.category} onChange={onChange} required options={Object.values(expense_1.ExpenseCategory).map(function (category) { return ({
            value: category,
            label: category
        }); })}/>

        <ProjectCodeSelect_1.ProjectCodeSelect value={formData.projectCode} onChange={onProjectCodeChange} required/>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea name="description" value={formData.description} onChange={onChange} rows={3} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"/>
      </div>
    </>);
};
exports.ExpenseFormFields = ExpenseFormFields;
