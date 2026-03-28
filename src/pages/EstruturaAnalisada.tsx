import { useLocation, useNavigate } from 'react-router-dom';
import styles from './EstruturaAnalisada.module.css';

interface BriefingResult {
  titulo?: string;
  resumo?: string;
  objetivo?: string;
  publico_alvo?: string;
  canal?: string;
  entregaveis?: string | string[];
  prazo?: string;
  prioridade?: string;
  checklist?: string[];
  informacoes_faltantes?: string[];
  perguntas_de_alinhamento?: string[];
}

function EstruturaAnalisada() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const result: BriefingResult = state?.result ?? {};

  if (!state?.result) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <p className={styles.empty}>Nenhuma análise encontrada.</p>
          <button className={styles.backButton} onClick={() => navigate('/')}>
            Voltar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.badge}>Resultado</div>
          <h1 className={styles.title}>{result.titulo ?? 'Briefing Analisado'}</h1>
          {result.resumo && <p className={styles.subtitle}>{result.resumo}</p>}
        </header>

        <div className={styles.grid}>
          {result.objetivo && (
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>Objetivo</h2>
              <p className={styles.cardText}>{result.objetivo}</p>
            </div>
          )}

          {result.publico_alvo && (
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>Público-Alvo</h2>
              <p className={styles.cardText}>{result.publico_alvo}</p>
            </div>
          )}

          {result.canal && (
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>Canal</h2>
              <p className={styles.cardText}>{result.canal}</p>
            </div>
          )}

          {result.prazo && (
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>Prazo</h2>
              <p className={styles.cardText}>{result.prazo}</p>
            </div>
          )}

          {result.prioridade && (
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>Prioridade</h2>
              <p className={styles.cardText}>{result.prioridade}</p>
            </div>
          )}
        </div>

        {result.entregaveis && (
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Entregáveis</h2>
            {Array.isArray(result.entregaveis) ? (
              <ul className={styles.list}>
                {result.entregaveis.map((item, i) => (
                  <li key={i} className={styles.listItem}>{item}</li>
                ))}
              </ul>
            ) : (
              <p className={styles.cardText}>{result.entregaveis}</p>
            )}
          </div>
        )}

        {result.checklist && result.checklist.length > 0 && (
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Checklist</h2>
            <ul className={styles.list}>
              {result.checklist.map((item, i) => (
                <li key={i} className={styles.listItem}>
                  <span className={styles.checkIcon}>✓</span> {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {result.informacoes_faltantes && result.informacoes_faltantes.length > 0 && (
          <div className={`${styles.card} ${styles.cardWarning}`}>
            <h2 className={styles.cardTitle}>Informações Faltantes</h2>
            <ul className={styles.list}>
              {result.informacoes_faltantes.map((item, i) => (
                <li key={i} className={styles.listItem}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {result.perguntas_de_alinhamento && result.perguntas_de_alinhamento.length > 0 && (
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Perguntas de Alinhamento</h2>
            <ol className={styles.list}>
              {result.perguntas_de_alinhamento.map((item, i) => (
                <li key={i} className={styles.listItem}>{item}</li>
              ))}
            </ol>
          </div>
        )}

        <div className={styles.actions}>
          <button className={styles.secondaryButton} onClick={() => navigate('/')}>
            Novo Briefing
          </button>
          <button
            className={styles.backButton}
            onClick={() => navigate('/acoes', { state: { result, briefing: state?.briefing } })}
          >
            Ver Ações
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default EstruturaAnalisada;
