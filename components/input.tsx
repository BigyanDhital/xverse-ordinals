"use client";

import React, { useId } from "react";

interface InputProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  id?: string;
  placeholder?: string;
}

const Input: React.FC<InputProps> = ({ label, type = "text", placeholder, value, onChange, ...props }) => {
  const inputId = useId();
  const id = inputId || props?.id;
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-gray-700 dark:text-gray-50">
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="px-3 py-2 border border-gray-300/50 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      />
    </div>
  );
};

export default Input;
