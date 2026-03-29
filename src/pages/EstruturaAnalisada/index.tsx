import { useLocation, useNavigate } from 'react-router-dom';
import styles from './EstruturaAnalisada.module.css';
import type { BriefingResult } from '../../types';
import PageLayout from '../../components/PageLayout';
import PageHeader from '../../components/PageHeader';
import Button from '../../components/Button';
import InfoCard, { infoCardStyles } from '../../components/InfoCard';
import CardGrid from '../../components/CardGrid';

function EstruturaAnalisada() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const result: BriefingResult = state?.result ?? {};

  if (!state?.result) {
    return (
      <PageLayout>
        <p className={styles.empty}>Nenhuma análise encontrada.</p>
        <Button onClick={() => navigate('/')}>Voltar</Button>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <PageHeader
        badge="Resultado"
        title={result.titulo ?? 'Briefing Analisado'}
        subtitle={result.resumo}
      />

      <CardGrid>
        {result.objetivo && (
          <InfoCard title="Objetivo">
            <p className={infoCardStyles.cardText}>{result.objetivo}</p>
          </InfoCard>
        )}
        {result.publico_alvo && (
          <InfoCard title="Público-Alvo">
            <p className={infoCardStyles.cardText}>{result.publico_alvo}</p>
          </InfoCard>
        )}
        {result.canal && (
          <InfoCard title="Canal">
            <p className={infoCardStyles.cardText}>{result.canal}</p>
          </InfoCard>
        )}
        {result.prazo && (
          <InfoCard title="Prazo">
            <p className={infoCardStyles.cardText}>{result.prazo}</p>
          </InfoCard>
        )}
        {result.prioridade && (
          <InfoCard title="Prioridade">
            <p className={infoCardStyles.cardText}>{result.prioridade}</p>
          </InfoCard>
        )}
      </CardGrid>

      {result.entregaveis && (
        <InfoCard title="Entregáveis">
          {Array.isArray(result.entregaveis) ? (
            <ul className={infoCardStyles.list}>
              {result.entregaveis.map((item, i) => (
                <li key={i} className={infoCardStyles.listItem}>{item}</li>
              ))}
            </ul>
          ) : (
            <p className={infoCardStyles.cardText}>{result.entregaveis}</p>
          )}
        </InfoCard>
      )}

      {result.checklist && result.checklist.length > 0 && (
        <InfoCard title="Checklist">
          <ul className={infoCardStyles.list}>
            {result.checklist.map((item, i) => (
              <li key={i} className={infoCardStyles.listItem}>
                <span className={infoCardStyles.checkIcon}>✓</span> {item}
              </li>
            ))}
          </ul>
        </InfoCard>
      )}

      {result.informacoes_faltantes && result.informacoes_faltantes.length > 0 && (
        <InfoCard title="Informações Faltantes" warning>
          <ul className={infoCardStyles.list}>
            {result.informacoes_faltantes.map((item, i) => (
              <li key={i} className={infoCardStyles.listItem}>{item}</li>
            ))}
          </ul>
        </InfoCard>
      )}

      {result.perguntas_de_alinhamento && result.perguntas_de_alinhamento.length > 0 && (
        <InfoCard title="Perguntas de Alinhamento">
          <ol className={infoCardStyles.list}>
            {result.perguntas_de_alinhamento.map((item, i) => (
              <li key={i} className={infoCardStyles.listItem}>{item}</li>
            ))}
          </ol>
        </InfoCard>
      )}

      <div className={styles.actions}>
        <Button variant="secondary" onClick={() => navigate('/')}>
          Novo Briefing
        </Button>
        <Button onClick={() => navigate('/acoes', { state: { result, briefing: state?.briefing } })}>
          Ver Ações
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Button>
      </div>
    </PageLayout>
  );
}

export default EstruturaAnalisada;
