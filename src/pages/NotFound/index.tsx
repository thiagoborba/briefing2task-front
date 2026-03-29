import { useNavigate } from 'react-router-dom';
import PageLayout from '../../components/PageLayout';
import Button from '../../components/Button';
import styles from './NotFound.module.css';

function NotFound() {
  const navigate = useNavigate();

  return (
    <PageLayout maxWidth="680">
      <div className={styles.container}>
        <span className={styles.code}>404</span>
        <h1 className={styles.title}>Página não encontrada</h1>
        <p className={styles.description}>
          A página que você está procurando não existe ou foi movida.
        </p>
        <Button type="button" onClick={() => navigate('/')}>
          Voltar ao início
        </Button>
      </div>
    </PageLayout>
  );
}

export default NotFound;
