// src/components/common/Button/Button.tsx
import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import './Button.css';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success' | 'outline' | 'text';
export type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Content to display inside the button */
  children: ReactNode;
  /** Button visual variant */
  variant?: ButtonVariant;
  /** Button size */
  size?: ButtonSize;
  /** Full width button */
  fullWidth?: boolean;
  /** Shows loading spinner and disables button */
  isLoading?: boolean;
  /** Adds left icon */
  startIcon?: ReactNode;
  /** Adds right icon */
  endIcon?: ReactNode;
  /** Additional CSS class names */
  className?: string;
}

export const Button: React.FC<ButtonProps> = (
  {
    children,
    variant = 'primary',
    size = 'medium',
    fullWidth = false,
    isLoading = false,
    startIcon,
    endIcon,
    className = '',
    disabled,
    type = 'button',
    ...rest
  }) => {
  const baseClass = 'btn';
  const classes = [
    baseClass,
    `${baseClass}--${variant}`,
    `${baseClass}--${size}`,
    fullWidth ? `${baseClass}--full-width` : '',
    isLoading ? `${baseClass}--loading` : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      className={classes}
      disabled={disabled || isLoading}
      type={type}
      {...rest}
    >
      {isLoading && <span className="btn__spinner"/>}

      {startIcon && !isLoading && (
        <span className="btn__icon btn__icon--start">
          {startIcon}
        </span>
      )}

      <span className="btn__text">{children}</span>

      {endIcon && !isLoading && (
        <span className="btn__icon btn__icon--end">
          {endIcon}
        </span>
      )}
    </button>
  );
};