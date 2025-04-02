import React, { useState } from 'react';
import './Toggle.css';

export interface ToggleProps {
  id?: string;
  label?: string;
  initialValue?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  activeColor?: string;
  inactiveColor?: string;
}

const Toggle: React.FC<ToggleProps> = ({
                                         id,
                                         label,
                                         initialValue = false,
                                         onChange,
                                         disabled = false,
                                         size = 'medium',
                                         activeColor,
                                         inactiveColor
                                       }) => {
  const [isChecked, setIsChecked] = useState(initialValue);

  const handleToggle = () => {
    if (disabled) return;

    const newValue = !isChecked;
    setIsChecked(newValue);

    if (onChange) {
      onChange(newValue);
    }
  };

  const toggleId = id || `toggle-${Math.random().toString(36).substring(2, 9)}`;

  const sizeClass = `toggle--${size}`;
  const stateClass = isChecked ? 'toggle--active' : 'toggle--inactive';
  const disabledClass = disabled ? 'toggle--disabled' : '';

  // Apply custom colors if provided
  const customStyle = {
    ...(activeColor && isChecked ? {'--toggle-active-color': activeColor} : {}),
    ...(inactiveColor && !isChecked ? {'--toggle-inactive-color': inactiveColor} : {})
  } as React.CSSProperties;

  return (
    <div className="toggle-container" style={customStyle}>
      {label && (
        <label
          htmlFor={toggleId}
          className={`toggle__label ${disabledClass}`}
        >
          {label}
        </label>
      )}

      <button
        id={toggleId}
        role="switch"
        aria-checked={isChecked}
        aria-label={label || "Toggle"}
        onClick={handleToggle}
        disabled={disabled}
        className={`toggle ${sizeClass} ${stateClass} ${disabledClass}`}
      >
        <div className="toggle__track"></div>
        <span className="toggle__thumb"></span>
      </button>
    </div>
  );
};

export { Toggle };