import type { ReactNode } from 'react';
import styles from './InfoCard.module.css';

interface InfoCardProps {
  title: string;
  children: ReactNode;
  warning?: boolean;
}

function InfoCard({ title, children, warning = false }: InfoCardProps) {
  return (
    <div className={`${styles.card}${warning ? ` ${styles.cardWarning}` : ''}`}>
      <h2 className={styles.cardTitle}>{title}</h2>
      {children}
    </div>
  );
}

export { InfoCard as default };
export { styles as infoCardStyles };
