// src/components/common/Input/TextInput/TextInput.tsx
import React, { useState, useEffect, useMemo } from 'react';
import './TextInput.css';

interface TextInputProps {
  name: string;
  label?: string;
  value: string;
  onChange: (name: string, value: string, isValid: boolean) => void;
  error?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  pattern?: string; // Validation pattern as string only
  validationMessage?: string; // Custom validation error message
}

export const TextInput: React.FC<TextInputProps> = ({
                                                      name,
                                                      label,
                                                      value,
                                                      onChange,
                                                      error,
                                                      type = 'text',
                                                      placeholder = '',
                                                      required = false,
                                                      disabled = false,
                                                      pattern = '.*', // Default pattern matches everything
                                                      validationMessage = 'Invalid input format'
                                                    }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [touched, setTouched] = useState(false);

  // Create RegExp object from string pattern
  const validationRegex = useMemo(() => {
    return new RegExp(`^${pattern}$`);
  }, [pattern]);

  // Validate input whenever value changes
  useEffect(() => {
    // Empty is valid unless required
    if (value === '') {
      const emptyIsValid = !required;
      setIsValid(emptyIsValid);
      return;
    }

    // Test against validation pattern
    const valid = validationRegex.test(value);
    setIsValid(valid);
  }, [value, validationRegex, required]);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    // For empty input, check if required
    if (inputValue === '') {
      setIsValid(!required);
      onChange(name, inputValue, !required);
      return;
    }

    // Validate against pattern
    const valid = validationRegex.test(inputValue);
    setIsValid(valid);

    // Pass the input value to parent, along with validity state
    onChange(name, inputValue, valid);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setTouched(true);
  };

  // Class determination
  const inputClasses = [
    'text-input',
    isFocused ? 'focused' : '',
    !isValid ? 'invalid' : '',
    error ? 'error' : '',
    disabled ? 'disabled' : ''
  ].filter(Boolean).join(' ');

  return (
    <div className="input-container">
      {label && (
        <label htmlFor={name} className="input-label">
          {label}{required && <span className="required-mark">*</span>}
        </label>
      )}

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        disabled={disabled}
        className={inputClasses}
        required={required}
        aria-invalid={!isValid || !!error}
      />

      {error && <div className="input-error">{error}</div>}
      {!isValid && touched && !error && (
        <div className="input-error">
          {validationMessage}
        </div>
      )}
    </div>
  );
};