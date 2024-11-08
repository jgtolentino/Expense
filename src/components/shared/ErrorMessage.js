"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorMessage = void 0;
var react_1 = require("react");
var ErrorMessage = function (_a) {
    var message = _a.message;
    return (<div className="bg-red-50 border-l-4 border-red-400 p-4">
      <p className="text-red-700">{message}</p>
    </div>);
};
exports.ErrorMessage = ErrorMessage;
