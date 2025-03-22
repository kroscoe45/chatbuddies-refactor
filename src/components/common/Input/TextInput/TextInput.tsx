// Modified TextInput.tsx
import React, { useState } from 'react';
import './TextInput.css';

interface TextInputProps {
  name: string;
  label?: string;
  value: string;
  onChange: (name: string, value: string) => void;
  validation?: (value: string) => string | null;
  type?: string;
}

export const TextInput: React.FC<TextInputProps> = ({
                                                      name,
                                                      label,
                                                      value,
                                                      onChange,
                                                      validation,
                                                      type = 'text'
                                                    }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(name, newValue);

    if (validation) {
      setError(validation(newValue));
    }
  };

  return (
    <div className="input-container">
      <div className={`input-field ${(isFocused || value) ? 'active' : ''} ${error ? 'error' : ''}`}>
        <input
          id={name}
          name={name}
          value={value}
          type={type}
          className="custom-input"
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder=""
        />
        {label && <label htmlFor={name} className="floating-label">{label}</label>}
      </div>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};