import type { ReactNode } from 'react';
import styles from './PageLayout.module.css';

interface PageLayoutProps {
  children: ReactNode;
  maxWidth?: '680' | '720';
}

function PageLayout({ children, maxWidth = '720' }: PageLayoutProps) {
  return (
    <div className={styles.page}>
      <div className={maxWidth === '680' ? styles.container680 : styles.container}>
        {children}
      </div>
    </div>
  );
}

export default PageLayout;
