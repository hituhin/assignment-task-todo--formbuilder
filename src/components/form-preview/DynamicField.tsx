import type { FieldConfig } from '../../types';
import styles from './DynamicField.module.css';

interface Props {
  field: FieldConfig;
  value: string | boolean | string[];
  onChange: (id: string, value: string | boolean | string[]) => void;
  error: string | null;
}

export default function DynamicField({ field, value, onChange, error }: Props) {
  function renderInput() {
    switch (field.type) {

      case 'textarea':
        return (
          <textarea
            value={value as string}
            onChange={(e) => onChange(field.id, e.target.value)}
            rows={4}
            placeholder={`Enter ${field.label || 'value'}…`}
            className={`${styles.textarea}${error ? ` ${styles.textareaError}` : ''}`}
          />
        );

      case 'checkbox':
        return (
          <label className={styles.checkboxLabel}>
            <div className={styles.toggleWrapper}>
              <input
                type="checkbox"
                checked={value as boolean}
                onChange={(e) => onChange(field.id, e.target.checked)}
                className={styles.toggleInput}
              />
              <div className={styles.toggleTrack} />
              <div className={styles.toggleThumb} />
            </div>
            <span className={styles.toggleText}>{value ? 'Yes' : 'No'}</span>
          </label>
        );

      case 'select':
        return (
          <select
            value={value as string}
            onChange={(e) => onChange(field.id, e.target.value)}
            className={`${styles.select}${error ? ` ${styles.selectError}` : ''}`}
          >
            <option value="">— Select an option —</option>
            {field.options.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        );

      case 'radio':
        return (
          <div className={`${styles.radioGroup}${error ? ` ${styles.radioGroupError}` : ''}`}>
            {field.options.length === 0 ? (
              <p className={styles.noOptions}>No options defined.</p>
            ) : (
              field.options.map((opt) => (
                <label key={opt} className={styles.radioOption}>
                  <input
                    type="radio"
                    name={field.id}
                    value={opt}
                    checked={value === opt}
                    onChange={() => onChange(field.id, opt)}
                    className={styles.radioInput}
                  />
                  <span className={styles.radioText}>{opt}</span>
                </label>
              ))
            )}
          </div>
        );

      case 'multi-radio':
        return (
          <div className={`${styles.radioGroup}${error ? ` ${styles.radioGroupError}` : ''}`}>
            {field.options.length === 0 ? (
              <p className={styles.noOptions}>No options defined.</p>
            ) : (
              field.options.map((opt) => {
                const selected = (value as string[]).includes(opt);
                return (
                  <label key={opt} className={styles.radioOption}>
                    <input
                      type="checkbox"
                      checked={selected}
                      onChange={(e) => {
                        const arr = value as string[];
                        onChange(
                          field.id,
                          e.target.checked ? [...arr, opt] : arr.filter((o) => o !== opt)
                        );
                      }}
                      className={styles.radioInput}
                    />
                    <span className={styles.radioText}>{opt}</span>
                  </label>
                );
              })
            )}
          </div>
        );

      default:
        return (
          <input
            type={field.type}
            value={value as string}
            onChange={(e) => onChange(field.id, e.target.value)}
            placeholder={`Enter ${field.label || 'value'}…`}
            className={`${styles.input}${error ? ` ${styles.inputError}` : ''}`}
          />
        );
    }
  }

  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>
        {field.label || <span className={styles.unlabelled}>Unlabelled field</span>}
        {field.required && <span className={styles.required}>*</span>}
      </label>

      {renderInput()}

      {error && (
        <p className={styles.errorMsg}><span>⚠</span> {error}</p>
      )}
    </div>
  );
}
