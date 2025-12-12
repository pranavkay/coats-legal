import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, className = '', ...props }) => {
  return (
    <button
      className={`bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-sm text-lg uppercase tracking-wide shadow-lg transform transition-transform hover:-translate-y-0.5 active:translate-y-0 brand-font ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
