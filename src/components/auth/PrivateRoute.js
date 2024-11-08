"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrivateRoute = void 0;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var authStore_1 = require("../../store/authStore");
var PrivateRoute = function (_a) {
    var children = _a.children, requiredRoles = _a.requiredRoles;
    var _b = (0, authStore_1.useAuthStore)(), isAuthenticated = _b.isAuthenticated, user = _b.user;
    var location = (0, react_router_dom_1.useLocation)();
    if (!isAuthenticated) {
        return <react_router_dom_1.Navigate to="/login" state={{ from: location }} replace/>;
    }
    if (requiredRoles && user && !requiredRoles.includes(user.role)) {
        return <react_router_dom_1.Navigate to="/unauthorized" replace/>;
    }
    return <>{children}</>;
};
exports.PrivateRoute = PrivateRoute;
