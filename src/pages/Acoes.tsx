import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './Acoes.module.css';

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

function formatAsTask(result: BriefingResult): string {
  const lines: string[] = [];
  if (result.titulo) lines.push(`# ${result.titulo}\n`);
  if (result.objetivo) lines.push(`Objetivo: ${result.objetivo}\n`);
  const meta: string[] = [];
  if (result.prazo) meta.push(`Prazo: ${result.prazo}`);
  if (result.prioridade) meta.push(`Prioridade: ${result.prioridade}`);
  if (meta.length) lines.push(meta.join(' | ') + '\n');
  if (result.checklist?.length) {
    lines.push('Tarefas:');
    result.checklist.forEach((item) => lines.push(`- [ ] ${item}`));
  }
  return lines.join('\n');
}

function formatForPM(result: BriefingResult): string {
  const lines: string[] = [];
  if (result.titulo) lines.push(`## ${result.titulo}\n`);
  if (result.resumo) lines.push(`**Resumo:** ${result.resumo}\n`);
  if (result.objetivo) lines.push(`**Objetivo:** ${result.objetivo}\n`);
  if (result.publico_alvo)
    lines.push(`**Público-Alvo:** ${result.publico_alvo}`);
  if (result.canal) lines.push(`**Canal:** ${result.canal}`);
  const meta: string[] = [];
  if (result.prazo) meta.push(`Prazo: ${result.prazo}`);
  if (result.prioridade) meta.push(`Prioridade: ${result.prioridade}`);
  if (meta.length) lines.push(meta.join(' | ') + '\n');

  const entregaveis = result.entregaveis;
  if (entregaveis) {
    lines.push('\n### Entregáveis');
    if (Array.isArray(entregaveis)) {
      entregaveis.forEach((item) => lines.push(`- ${item}`));
    } else {
      lines.push(`- ${entregaveis}`);
    }
  }

  if (result.checklist?.length) {
    lines.push('\n### Checklist');
    result.checklist.forEach((item) => lines.push(`- [ ] ${item}`));
  }

  if (result.perguntas_de_alinhamento?.length) {
    lines.push('\n### Perguntas de Alinhamento');
    result.perguntas_de_alinhamento.forEach((q, i) =>
      lines.push(`${i + 1}. ${q}`),
    );
  }

  return lines.join('\n');
}

function formatAlignmentQuestions(result: BriefingResult): string {
  if (!result.perguntas_de_alinhamento?.length) return '';
  const lines = ['Perguntas de Alinhamento:\n'];
  result.perguntas_de_alinhamento.forEach((q, i) =>
    lines.push(`${i + 1}. ${q}`),
  );
  return lines.join('\n');
}

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
