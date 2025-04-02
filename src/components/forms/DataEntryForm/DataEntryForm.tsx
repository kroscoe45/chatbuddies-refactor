// TODO
// Would ideally like to create components for each INDIVIDUAL type of field like text or toggle or dropdown menu
// src/components/common/DataEntryForm/DataEntryForm.tsx
import React, { useState } from 'react';
import { TextInput } from '@components/common/Input/TextInput';
import { Button } from '@components/common/Button';
import { DataEntryFormProps, FieldConfig } from '@components/forms/DataEntryForm/forms.types.ts';
import './DataEntryForm.css';

export const DataEntryForm: React.FC<DataEntryFormProps> = ({
                                                              fields,
                                                              onSubmit,
                                                              submitButtonText = 'Submit',
                                                              cancelButtonText = 'Cancel',
                                                              onCancel,
                                                              showCancelButton = false,
                                                              title,
                                                              description,
                                                              layout = 'vertical',
                                                              className = '',
                                                              formId,
                                                              initialValues = {},
                                                              footer
                                                            }) => {
  // Initial state setup remains the same
  const getInitialFormState = () => {
    const initialState: Record<string, any> = {};
    fields.forEach(field => {
      initialState[field.name] = initialValues[field.name] !== undefined
        ? initialValues[field.name]
        : field.initialValue;
    });
    return initialState;
  };

  const [formData, setFormData] = useState<Record<string, any>>(getInitialFormState);
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Handle field change
  const handleChange = (name: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Validate field on change if it's been touched
    if (touched[name]) {
      validateField(name, value);
    }
  };

  // Mark field as touched on blur and validate
  const handleBlur = (name: string) => {
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    validateField(name, formData[name]);
  };

  // Validate a single field
  const validateField = (name: string, value: any) => {
    const field = fields.find(f => f.name === name);
    let error: string | null = null;

    if (field) {
      // Check required
      if (field.required && (value === '' || value === null || value === undefined)) {
        error = `${field.label} is required`;
      }
      // Run field-specific validation
      else if (field.validation) {
        error = field.validation(value);
      }
    }

    setErrors(prev => ({
      ...prev,
      [name]: error
    }));

    return error === null;
  };

  // Validate all fields
  const validateForm = () => {
    let isValid = true;
    const newTouched: Record<string, boolean> = {};

    fields.forEach(field => {
      newTouched[field.name] = true;
      const fieldIsValid = validateField(field.name, formData[field.name]);
      if (!fieldIsValid) {
        isValid = false;
      }
    });

    setTouched(newTouched);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render field based on type
  const renderField = (field: FieldConfig) => {
    const {name, label, type} = field;
    const value = formData[name]?.toString() || '';
    const error = errors[name];
    const hasError = !!error;

    // We only pass props that TextInput accepts
    return (
      <div key={name} className={`form-field ${hasError ? 'has-error' : ''} ${field.className || ''}`}>
        <TextInput
          name={name}
          label={label}
          value={value}
          onChange={handleChange}
          validation={field.validation}
          type={type === 'password' ? 'password' : type === 'email' ? 'email' : 'text'}
        />
        {field.help && !error && (
          <div className="field-help">{field.help}</div>
        )}
      </div>
    );
  };

  const formClasses = [
    'data-entry-form',
    `layout-${layout}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <form
      className={formClasses}
      onSubmit={handleSubmit}
      id={formId}
      noValidate
    >
      {title && <div className="form-header">
          <h3>{title}</h3>
        {description && <p>{description}</p>}
      </div>}

      <div className="form-fields">
        {fields.map(renderField)}
      </div>

      <div className="form-actions">
        <Button
          type="submit"
          variant="primary"
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          {submitButtonText}
        </Button>

        {showCancelButton && onCancel && (
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            {cancelButtonText}
          </Button>
        )}
      </div>

      {footer && <div className="form-footer">{footer}</div>}
    </form>
  );
};

export default DataEntryForm;