import { ReactNode } from 'react';

// Field types supported by the form
export type FieldType = 'text' | 'email' | 'password' | 'number' | 'textarea' | 'select' | 'checkbox' | 'radio';

// Base field configuration
export interface BaseFieldConfig {
  name: string;
  label: string;
  type: FieldType;
  initialValue: any;
  placeholder?: string;
  validation?: (value: any) => string | null;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  help?: string;
}

// Text field specific props
export interface TextFieldConfig extends BaseFieldConfig {
  type: 'text' | 'email' | 'password';
  minLength?: number;
  maxLength?: number;
}

// Number field specific props
export interface NumberFieldConfig extends BaseFieldConfig {
  type: 'number';
  min?: number;
  max?: number;
  step?: number;
}

// Select field specific props
export interface SelectFieldConfig extends BaseFieldConfig {
  type: 'select';
  options: Array<{ value: string; label: string }>;
}

// Checkbox field specific props
export interface CheckboxFieldConfig extends BaseFieldConfig {
  type: 'checkbox';
  label: string;
}

// Radio field specific props
export interface RadioFieldConfig extends BaseFieldConfig {
  type: 'radio';
  options: Array<{ value: string; label: string }>;
}

// Textarea field specific props
export interface TextareaFieldConfig extends BaseFieldConfig {
  type: 'textarea';
  rows?: number;
  minLength?: number;
  maxLength?: number;
}

// Union type for all field configurations
export type FieldConfig =
  | TextFieldConfig
  | NumberFieldConfig
  | SelectFieldConfig
  | CheckboxFieldConfig
  | RadioFieldConfig
  | TextareaFieldConfig;

// Form submission handler type
export type SubmitHandler<T = Record<string, any>> = (formData: T) => Promise<void> | void;

// DataEntryForm props
export interface DataEntryFormProps {
  fields: FieldConfig[];
  onSubmit: SubmitHandler;
  submitButtonText?: string;
  cancelButtonText?: string;
  onCancel?: () => void;
  showCancelButton?: boolean;
  title?: string;
  description?: string;
  layout?: 'vertical' | 'horizontal' | 'inline';
  className?: string;
  formId?: string;
  initialValues?: Record<string, any>;
  footer?: ReactNode;
}