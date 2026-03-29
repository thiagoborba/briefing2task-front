import styles from './ActionCard.module.css';

interface ActionCardProps {
  title: string;
  description: string;
  copied: boolean;
  onClick: () => void;
  disabled?: boolean;
}

function ActionCard({ title, description, copied, onClick, disabled }: ActionCardProps) {
  return (
    <button
      className={`${styles.card}${copied ? ` ${styles.cardCopied}` : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      <span className={styles.actionTitle}>{title}</span>
      <span className={styles.actionDesc}>{description}</span>
      <span className={styles.copyLabel}>
        {copied ? '✓ Copiado!' : 'Clique para copiar'}
      </span>
    </button>
  );
}

export default ActionCard;
