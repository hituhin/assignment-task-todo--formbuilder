import { useState } from 'react';
import styles from './DropdownOptionsEditor.module.css';

interface Props {
  options: string[];
  onChange: (options: string[]) => void;
}

export default function DropdownOptionsEditor({ options, onChange }: Props) {
  const [input, setInput] = useState('');

  function addOption() {
    const trimmed = input.trim();
    if (!trimmed || options.includes(trimmed)) return;
    onChange([...options, trimmed]);
    setInput('');
  }

  function removeOption(opt: string) {
    onChange(options.filter((o) => o !== opt));
  }

  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>Options</p>

      {options.length > 0 && (
        <div className={styles.pills}>
          {options.map((opt) => (
            <span key={opt} className={styles.pill}>
              {opt}
              <button
                type="button"
                onClick={() => removeOption(opt)}
                className={styles.pillRemove}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}

      <div className={styles.addRow}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addOption())}
          placeholder="Type option and press Enter"
          className={styles.addInput}
        />
        <button type="button" onClick={addOption} className={styles.addBtn}>
          Add
        </button>
      </div>
    </div>
  );
}
