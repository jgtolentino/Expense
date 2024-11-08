import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

export const Header: React.FC = () => {
  const { user, logout } = useAuthStore();

  return (
    <header className="bg-white shadow">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            TBWA Reimbursement App
          </h1>
          <div className="flex items-center space-x-4">
            <nav className="space-x-4">
              <Link to="/" className="text-gray-600 hover:text-gray-900">
                Dashboard
              </Link>
              <Link to="/new-expense" className="text-gray-600 hover:text-gray-900">
                New Expense
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">{user?.name}</span>
              <button
                onClick={logout}
                className="text-gray-600 hover:text-gray-900"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};