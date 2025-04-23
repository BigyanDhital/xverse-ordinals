import React from "react";

interface ButtonProps {
  title: string;
  onClick: () => any;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ title, onClick, disabled = false, ...props }) => {
  return (
    <button
      className="px-3 py-2  bg-blue-800 text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {title}
    </button>
  );
};

export default Button;
