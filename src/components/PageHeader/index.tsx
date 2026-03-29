import styles from './PageHeader.module.css';

interface PageHeaderProps {
  badge: string;
  title: string;
  subtitle?: string;
}

function PageHeader({ badge, title, subtitle }: PageHeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.badge}>{badge}</div>
      <h1 className={styles.title}>{title}</h1>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </header>
  );
}

export default PageHeader;
