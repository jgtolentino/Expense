"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Layout = void 0;
var react_1 = require("react");
var Header_1 = require("./Header");
var Layout = function (_a) {
    var children = _a.children;
    return (<div className="min-h-screen bg-gray-100">
      <Header_1.Header />
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            {children}
          </div>
        </div>
      </main>
    </div>);
};
exports.Layout = Layout;
