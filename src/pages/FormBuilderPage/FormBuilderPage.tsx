import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormBuilderStore } from '../../store/formBuilderStore';
import { useFormConfig } from '../../hooks/useFormConfig';
import FieldCard from '../../components/form-builder/FieldCard';
import styles from './FormBuilderPage.module.css';

type FieldErrors = Record<string, { label?: string; type?: string }>;

export default function FormBuilderPage() {
  const navigate = useNavigate();
  const { fields, addField, removeField, updateField, moveFieldUp, moveFieldDown, setFields } =
    useFormBuilderStore();
  const { savedConfig, saveConfig } = useFormConfig();
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  useEffect(() => {
    if (fields.length === 0 && savedConfig && savedConfig.length > 0) {
      setFields(savedConfig);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function clearFieldError(id: string, key: 'label' | 'type') {
    setFieldErrors((prev) => {
      const entry = prev[id];
      if (!entry) return prev;
      const updated = { ...entry, [key]: undefined };
      return { ...prev, [id]: updated };
    });
  }

  function handleUpdate(id: string, changes: Parameters<typeof updateField>[1]) {
    updateField(id, changes);
    if ('label' in changes) clearFieldError(id, 'label');
    if ('type' in changes) clearFieldError(id, 'type');
  }

  function handleSave() {
    if (fields.length === 0) return;

    const errors: FieldErrors = {};
    for (const field of fields) {
      const entry: { label?: string; type?: string } = {};
      if (!field.label.trim()) entry.label = 'Label is required.';
      if (!field.type) entry.type = 'Please select an input type.';
      if (entry.label || entry.type) errors[field.id] = entry;
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    saveConfig(fields);
    navigate('/form-preview');
  }

  return (
    <div className={styles.page}>

      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.headerTitle}>Form Builder</h1>
        <p className={styles.headerSub}>Define your form fields, input types, and options below.</p>
      </div>

      {/* Field list */}
      {fields.length === 0 ? (
        <div className={styles.empty}>
          <span className={styles.emptyIcon}>📋</span>
          <p className={styles.emptyText}>No fields yet. Add your first field below.</p>
        </div>
      ) : (
        <div className={styles.fieldList}>
          {fields.map((field, idx) => (
            <FieldCard
              key={field.id}
              field={field}
              index={idx}
              isFirst={idx === 0}
              isLast={idx === fields.length - 1}
              onUpdate={handleUpdate}
              onRemove={removeField}
              onMoveUp={moveFieldUp}
              onMoveDown={moveFieldDown}
              errors={fieldErrors[field.id]}
            />
          ))}
        </div>
      )}

      {/* Actions */}
      <div className={styles.actions}>
        <button type="button" onClick={addField} className={styles.addBtn}>
          + Add Field
        </button>
        <button
          type="button"
          onClick={handleSave}
          disabled={fields.length === 0}
          className={styles.saveBtn}
        >
          Save & Preview →
        </button>
      </div>
    </div>
  );
}
