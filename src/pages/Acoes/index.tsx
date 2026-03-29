import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './Acoes.module.css';
import type { BriefingResult } from '../../types';
import { formatAsTask, formatForPM, formatAlignmentQuestions } from '../../utils';
import PageLayout from '../../components/PageLayout';
import PageHeader from '../../components/PageHeader';
import Button from '../../components/Button';
import ActionCard from '../../components/ActionCard';
import CardGrid from '../../components/CardGrid';

function Acoes() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const result: BriefingResult = state?.result ?? {};
  const [copied, setCopied] = useState<string | null>(null);

  if (!state?.result) {
    return (
      <PageLayout>
        <p className={styles.empty}>Nenhuma análise encontrada.</p>
        <Button onClick={() => navigate('/')}>Voltar ao início</Button>
      </PageLayout>
    );
  }

  async function copyToClipboard(text: string, key: string) {
    if (!text) return;
    await navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  }

  const actions: { key: string; title: string; description: string; text: string }[] = [
    {
      key: 'task',
      title: 'Copiar como Task',
      description: 'Formata o briefing como uma tarefa pronta para atribuição, com objetivo e checklist.',
      text: formatAsTask(result),
    },
    {
      key: 'resumo',
      title: 'Copiar Resumo',
      description: 'Copia o resumo executivo da análise para usar em apresentações ou e-mails.',
      text: result.resumo ?? '',
    },
    {
      key: 'perguntas',
      title: 'Perguntas de Alinhamento',
      description: 'Lista de perguntas para alinhar expectativas com o cliente ou time antes de iniciar.',
      text: formatAlignmentQuestions(result),
    },
    {
      key: 'pm',
      title: 'Versão para Jira / Trello / Notion',
      description: 'Exporta o briefing em Markdown estruturado para colar em qualquer ferramenta de gestão.',
      text: formatForPM(result),
    },
  ];

  return (
    <PageLayout>
      <PageHeader
        badge="Ações"
        title={result.titulo ?? 'Ações'}
        subtitle={result.resumo}
      />

      <CardGrid>
        {actions.map(({ key, title, description, text }) => (
          <ActionCard
            key={key}
            title={title}
            description={description}
            copied={copied === key}
            onClick={() => copyToClipboard(text, key)}
            disabled={!text}
          />
        ))}
      </CardGrid>

      <div className={styles.actions}>
        <Button variant="secondary" onClick={() => navigate('/estrutura-analisada', { state })}>
          Voltar
        </Button>
        <Button onClick={() => navigate('/')}>Novo Briefing</Button>
      </div>
    </PageLayout>
  );
}

export default Acoes;
