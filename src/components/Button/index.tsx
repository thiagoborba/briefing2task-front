import type { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './Button.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: ReactNode;
}

function Button({ variant = 'primary', children, className, ...rest }: ButtonProps) {
  const base = variant === 'secondary' ? styles.secondary : styles.primary;
  return (
    <button className={className ? `${base} ${className}` : base} {...rest}>
      {children}
    </button>
  );
}

export default Button;
