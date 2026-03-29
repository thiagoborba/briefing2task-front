import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';
import Button from '../../components/Button';

function Home() {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <img
          src="/favicon.svg"
          alt="Briefing to Tasks logo"
          className={styles.logo}
        />

        <div className={styles.badge}>AI-Powered</div>

        <h1 className={styles.title}>Briefing to Tasks</h1>

        <p className={styles.description}>
          Transforme briefings em tarefas estruturadas com inteligência
          artificial. Cole seu briefing e receba automaticamente uma estrutura
          de projeto organizada, com tarefas, perguntas de alinhamento e ações
          prontas para execução.
        </p>

        <ul className={styles.features}>
          <li>
            <span className={styles.featureIcon}>⚡</span>
            Análise automática do briefing
          </li>
          <li>
            <span className={styles.featureIcon}>📋</span>
            Tarefas estruturadas e organizadas
          </li>
          <li>
            <span className={styles.featureIcon}>🎯</span>
            Perguntas de alinhamento geradas
          </li>
        </ul>

        <Button onClick={() => navigate('/briefing')}>
          Começar
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M3 8h10M9 4l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Button>
      </div>
    </div>
  );
}

export default Home;
