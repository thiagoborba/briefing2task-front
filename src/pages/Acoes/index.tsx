import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './Acoes.module.css';
import type { BriefingResult } from '../../types';
import {
  formatAsTask,
  formatForPM,
  formatAlignmentQuestions,
} from '../../utils';

function Acoes() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const result: BriefingResult = state?.result ?? {};
  const [copied, setCopied] = useState<string | null>(null);

  if (!state?.result) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <p className={styles.empty}>Nenhuma análise encontrada.</p>
          <button
            className={styles.primaryButton}
            onClick={() => navigate('/')}
          >
            Voltar ao início
          </button>
        </div>
      </div>
    );
  }

  async function copyToClipboard(text: string, key: string) {
    if (!text) return;
    await navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  }

  const actions: {
    key: string;
    title: string;
    description: string;
    text: string;
  }[] = [
    {
      key: 'task',
      title: 'Copiar como Task',
      description:
        'Formata o briefing como uma tarefa pronta para atribuição, com objetivo e checklist.',
      text: formatAsTask(result),
    },
    {
      key: 'resumo',
      title: 'Copiar Resumo',
      description:
        'Copia o resumo executivo da análise para usar em apresentações ou e-mails.',
      text: result.resumo ?? '',
    },
    {
      key: 'perguntas',
      title: 'Perguntas de Alinhamento',
      description:
        'Lista de perguntas para alinhar expectativas com o cliente ou time antes de iniciar.',
      text: formatAlignmentQuestions(result),
    },
    {
      key: 'pm',
      title: 'Versão para Jira / Trello / Notion',
      description:
        'Exporta o briefing em Markdown estruturado para colar em qualquer ferramenta de gestão.',
      text: formatForPM(result),
    },
  ];

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.badge}>Ações</div>
          <h1 className={styles.title}>{result.titulo ?? 'Ações'}</h1>
          {result.resumo && <p className={styles.subtitle}>{result.resumo}</p>}
        </header>

        <div className={styles.grid}>
          {actions.map(({ key, title, description, text }) => (
            <button
              key={key}
              className={`${styles.card} ${copied === key ? styles.cardCopied : ''}`}
              onClick={() => copyToClipboard(text, key)}
              disabled={!text}
            >
              <span className={styles.actionTitle}>{title}</span>
              <span className={styles.actionDesc}>{description}</span>
              <span className={styles.copyLabel}>
                {copied === key ? '✓ Copiado!' : 'Clique para copiar'}
              </span>
            </button>
          ))}
        </div>

        <div className={styles.actions}>
          <button
            className={styles.secondaryButton}
            onClick={() => navigate('/estrutura-analisada', { state })}
          >
            Voltar
          </button>
          <button
            className={styles.primaryButton}
            onClick={() => navigate('/')}
          >
            Novo Briefing
          </button>
        </div>
      </div>
    </div>
  );
}

export default Acoes;
