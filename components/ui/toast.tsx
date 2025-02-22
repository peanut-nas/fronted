import React, { useEffect, useState } from 'react';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  isExiting: boolean;
  duration?: number;
}

const Toast: React.FC<ToastProps> = ({ message, type, isExiting }) => {
  return (
    <div className={`fixed top-6 left-1/2 z-50 transform -translate-x-1/2 ${isExiting ? 'animate-slide-up' : 'animate-slide-down'}`}>
      <div className={`bg-white bg-opacity-80 px-6 py-3 rounded-xl border border-${type === 'success' ? 'green' : 'red'}-100 shadow-lg min-w-[380px]`}>
        <div className="flex items-center">
          <div className={`text-${type === 'success' ? 'green' : 'red'}-500 absolute left-6`}>{type === 'success' ? '✅' : '❌'}</div>
          <span className={`text-sm text-${type === 'success' ? 'green' : 'red'}-600 font-medium w-full text-center`}>{message}</span>
        </div>
      </div>
    </div>
  );
};

export default Toast;