import React from 'react';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="bg-red-50 border-l-4 border-red-400 p-4">
      <p className="text-red-700">{message}</p>
    </div>
  );
};