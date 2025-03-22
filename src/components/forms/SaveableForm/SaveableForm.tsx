// src/components/forms/SaveableForm.tsx
import React, { useState } from 'react';
import { TextInput } from '@components/common/Input/TextInput';
import './SaveableForm.css';

interface FormField {
  name: string;
  label: string;
  initialValue: string;
  placeholder?: string;
  validation?: (value: string) => string | null;
}

interface SaveableFormProps {
  fields: FormField[];
  onSave: (formData: Record<string, string>) => Promise<void>;
  buttonText?: string;
}

export const SaveableForm: React.FC<SaveableFormProps> = ({
                                                            fields,
                                                            onSave,
                                                            buttonText = 'Save'
                                                          }) => {
  const [formData, setFormData] = useState<Record<string, string>>(
    fields.reduce((acc, field) => ({
      ...acc,
      [field.name]: field.initialValue
    }), {})
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await onSave(formData);
    } catch (error) {
      console.error('Error saving form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="saveable-form"
          onSubmit={handleSubmit}>
      {fields.map(field => (
        <TextInput
          key={field.name}
          name={field.name}
          label={field.label}
          value={formData[field.name]}
          placeholder={field.placeholder}
          onChange={handleChange}
          validation={field.validation}
        />
      ))}

      <button
        type="submit"
        className="save-button"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Saving...' : buttonText}
      </button>
    </form>
  );
};