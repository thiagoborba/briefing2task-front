import type { TextareaHTMLAttributes } from 'react';
import styles from './TextareaField.module.css';

interface TextareaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

function TextareaField({ label, id, ...rest }: TextareaFieldProps) {
  return (
    <div className={styles.wrapper}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <textarea id={id} className={styles.textarea} {...rest} />
    </div>
  );
}

export default TextareaField;
