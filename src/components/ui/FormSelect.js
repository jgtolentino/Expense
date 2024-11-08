"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormSelect = void 0;
var react_1 = require("react");
var FormSelect = function (_a) {
    var label = _a.label, options = _a.options, props = __rest(_a, ["label", "options"]);
    return (<div>
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <select {...props} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
        {options.map(function (option) { return (<option key={option.value} value={option.value}>
            {option.label}
          </option>); })}
      </select>
    </div>);
};
exports.FormSelect = FormSelect;
