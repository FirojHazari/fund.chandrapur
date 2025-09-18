
import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

const Select: React.FC<SelectProps> = ({ children, ...props }) => {
  return (
    <select
      {...props}
      className="w-full bg-slate-900/50 border border-slate-600 text-cyan-200 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors duration-300 appearance-none disabled:opacity-50"
    >
      {children}
    </select>
  );
};

export default Select;
