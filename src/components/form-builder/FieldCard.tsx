import type { FieldConfig, FieldType, FieldWidth } from '../../types';
import DropdownOptionsEditor from './DropdownOptionsEditor';
import styles from './FieldCard.module.css';

const FIELD_TYPES: { value: FieldType; label: string }[] = [
  { value: 'text',        label: 'Text' },
  { value: 'email',       label: 'Email' },
  { value: 'number',      label: 'Number' },
  { value: 'textarea',    label: 'Text Area' },
  { value: 'checkbox',    label: 'Checkbox (Yes / No)' },
  { value: 'select',      label: 'Dropdown' },
  { value: 'radio',       label: 'Single Radio' },
  { value: 'multi-radio', label: 'Multiple Radio' },
];

const NEEDS_OPTIONS: FieldType[] = ['select', 'radio', 'multi-radio'];

interface Props {
  field: FieldConfig;
  index: number;
  isFirst: boolean;
  isLast: boolean;
  onUpdate: (id: string, changes: Partial<Omit<FieldConfig, 'id'>>) => void;
  onRemove: (id: string) => void;
  onMoveUp: (id: string) => void;
  onMoveDown: (id: string) => void;
  errors?: { label?: string; type?: string };
}

export default function FieldCard({
  field, index, isFirst, isLast,
  onUpdate, onRemove, onMoveUp, onMoveDown, errors,
}: Props) {
  return (
    <div className={styles.card}>
      {/* Card header */}
      <div className={styles.header}>
        <span className={styles.badge}>{index + 1}</span>
        <span className={styles.fieldNum}>Field {index + 1}</span>
        <button
          type="button"
          onClick={() => onMoveUp(field.id)}
          disabled={isFirst}
          className={styles.iconBtn}
        >↑</button>
        <button
          type="button"
          onClick={() => onMoveDown(field.id)}
          disabled={isLast}
          className={styles.iconBtn}
        >↓</button>
        <button
          type="button"
          onClick={() => onRemove(field.id)}
          className={styles.removeBtn}
        >✕</button>
      </div>

      {/* Fields */}
      <div className={styles.grid}>
        {/* Type */}
        <div className={styles.fieldGroup}>
          <label className={styles.fieldLabel}>Input Type</label>
          <select
            value={field.type}
            onChange={(e) => {
              const t = e.target.value as FieldType;
              onUpdate(field.id, {
                type: t,
                options: NEEDS_OPTIONS.includes(t) ? field.options : [],
              });
            }}
            className={`${styles.select}${errors?.type ? ` ${styles.selectError}` : ''}`}
          >
            <option value="" disabled>— Select input type —</option>
            {FIELD_TYPES.map(({ value, label }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
          {errors?.type && (
            <p className={styles.errorMsg}><span>⚠</span> {errors.type}</p>
          )}
        </div>

        {/* Label */}
        <div className={styles.fieldGroup}>
          <label className={styles.fieldLabel}>Label / Name</label>
          <input
            type="text"
            value={field.label}
            onChange={(e) => onUpdate(field.id, { label: e.target.value })}
            placeholder="e.g. Full Name"
            className={`${styles.input}${errors?.label ? ` ${styles.inputError}` : ''}`}
          />
          {errors?.label && (
            <p className={styles.errorMsg}><span>⚠</span> {errors.label}</p>
          )}
        </div>
      </div>

      {/* Column width */}
      <div className={styles.widthRow}>
        <span className={styles.fieldLabel}>Column Width</span>
        <div className={styles.widthBtns}>
          {([['1/3', '1/3'], ['1/2', '1/2'], ['full', 'Full']] as [FieldWidth, string][]).map(([val, label]) => (
            <button
              key={val}
              type="button"
              onClick={() => onUpdate(field.id, { width: val })}
              className={`${styles.widthBtn}${field.width === val ? ` ${styles.widthBtnActive}` : ''}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Required toggle */}
      <label className={styles.toggleRow}>
        <div className={styles.toggleWrapper}>
          <input
            type="checkbox"
            checked={field.required}
            onChange={(e) => onUpdate(field.id, { required: e.target.checked })}
            className={styles.toggleInput}
          />
          <div className={styles.toggleTrack} />
          <div className={styles.toggleThumb} />
        </div>
        <span className={styles.toggleLabel}>Required field</span>
      </label>

      {NEEDS_OPTIONS.includes(field.type) && (
        <DropdownOptionsEditor
          options={field.options}
          onChange={(options) => onUpdate(field.id, { options })}
        />
      )}
    </div>
  );
}
