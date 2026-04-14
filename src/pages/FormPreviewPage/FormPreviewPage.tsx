import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFormConfig } from '../../hooks/useFormConfig';
import DynamicField from '../../components/form-preview/DynamicField';
import type { FieldConfig, FormValues, FormErrors } from '../../types';
import styles from './FormPreviewPage.module.css';

import type { FieldWidth } from '../../types';

const WIDTH_CLASS: Record<FieldWidth, string> = {
  '1/3': 'span1of3',
  '1/2': 'span1of2',
  'full': 'spanFull',
};

function buildInitialValues(fields: FieldConfig[]): FormValues {
  return Object.fromEntries(
    fields.map((f) => {
      if (f.type === 'checkbox') return [f.id, false];
      if (f.type === 'multi-radio') return [f.id, []];
      return [f.id, ''];
    })
  );
}

export default function FormPreviewPage() {
  const { savedConfig } = useFormConfig();
  const [values, setValues] = useState<FormValues>(() =>
    savedConfig ? buildInitialValues(savedConfig) : {}
  );
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  if (!savedConfig || savedConfig.length === 0) {
    return (
      <div className={styles.emptyState}>
        <span className={styles.emptyIcon}>📭</span>
        <p className={styles.emptyText}>No form saved yet.</p>
        <Link to="/form-builder" className={styles.goBuilderLink}>
          Go to Form Builder
        </Link>
      </div>
    );
  }

  function handleChange(id: string, value: string | boolean | string[]) {
    setValues((prev) => ({ ...prev, [id]: value }));
    if (errors[id]) setErrors((prev) => ({ ...prev, [id]: '' }));
  }

  function validate(): boolean {
    const newErrors: FormErrors = {};
    for (const field of savedConfig!) {
      if (!field.required) continue;
      const val = values[field.id];
      const label = `"${field.label || 'This field'}"`;
      if (field.type === 'checkbox' && val === false) {
        newErrors[field.id] = `${label} is required.`;
      } else if (field.type === 'multi-radio' && (val as string[]).length === 0) {
        newErrors[field.id] = `${label} requires at least one selection.`;
      } else if (field.type === 'radio' && !String(val).trim()) {
        newErrors[field.id] = `${label} is required.`;
      } else if (!['checkbox', 'multi-radio', 'radio'].includes(field.type) && !String(val).trim()) {
        newErrors[field.id] = `${label} is required.`;
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    const output = Object.fromEntries(
      savedConfig!.map((f) => [f.label || f.id, values[f.id]])
    );
    console.log('📋 Form submitted:', output);
    setSubmitted(true);
  }

  function handleReset() {
    setValues(buildInitialValues(savedConfig!));
    setErrors({});
    setSubmitted(false);
  }

  return (
    <div className={styles.page}>

      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.headerTitle}>Form Preview</h1>
          <p className={styles.headerSub}>
            {savedConfig.length} field{savedConfig.length !== 1 ? 's' : ''} · Fill and submit below.
          </p>
        </div>
        <Link to="/form-builder" className={styles.editLink}>← Edit Form</Link>
      </div>

      {/* Success banner */}
      {submitted && (
        <div className={styles.successBanner}>
          <span className={styles.successIcon}>✅</span>
          <div className={styles.successBody}>
            <p className={styles.successTitle}>Form submitted!</p>
            <p className={styles.successSub}>Check the browser console for the output.</p>
          </div>
          <button onClick={handleReset} className={styles.successReset}>Reset</button>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          {savedConfig.map((field) => (
            <div
              key={field.id}
              className={styles[WIDTH_CLASS[field.width ?? '1/2']]}
            >
              <DynamicField
                field={field}
                value={
                  values[field.id] ??
                  (field.type === 'checkbox' ? false : field.type === 'multi-radio' ? [] : '')
                }
                onChange={handleChange}
                error={errors[field.id] ?? null}
              />
            </div>
          ))}
        </div>

        <div className={styles.formActions}>
          <button type="submit" className={styles.submitBtn}>Submit</button>
          <button type="button" onClick={handleReset} className={styles.resetBtn}>Reset</button>
        </div>
      </form>
    </div>
  );
}
