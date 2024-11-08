"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Header = void 0;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var authStore_1 = require("../../store/authStore");
var Header = function () {
    var _a = (0, authStore_1.useAuthStore)(), user = _a.user, logout = _a.logout;
    return (<header className="bg-white shadow">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            TBWA Reimbursement App
          </h1>
          <div className="flex items-center space-x-4">
            <nav className="space-x-4">
              <react_router_dom_1.Link to="/" className="text-gray-600 hover:text-gray-900">
                Dashboard
              </react_router_dom_1.Link>
              <react_router_dom_1.Link to="/new-expense" className="text-gray-600 hover:text-gray-900">
                New Expense
              </react_router_dom_1.Link>
            </nav>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">{user === null || user === void 0 ? void 0 : user.name}</span>
              <button onClick={logout} className="text-gray-600 hover:text-gray-900">
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>);
};
exports.Header = Header;
