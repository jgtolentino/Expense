"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadingSpinner = void 0;
var react_1 = require("react");
var LoadingSpinner = function () {
    return (<div className="animate-pulse">
      <svg className="mx-auto h-12 w-12 text-indigo-500" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
      </svg>
      <p className="text-sm text-indigo-600">Processing receipt...</p>
    </div>);
};
exports.LoadingSpinner = LoadingSpinner;
