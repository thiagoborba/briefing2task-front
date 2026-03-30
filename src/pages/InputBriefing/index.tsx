import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './InputBriefing.module.css';
import { analyseBriefing } from '../../api';
import PageLayout from '../../components/PageLayout';
import PageHeader from '../../components/PageHeader';
import Button from '../../components/Button';
import TextareaField from '../../components/TextareaField';

function InputBriefing() {
  const [briefing, setBriefing] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const MAX_LENGTH = 5000;
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (briefing.trim().length > MAX_LENGTH) {
      setError(`O briefing não pode ultrapassar ${MAX_LENGTH} caracteres.`);
      return;
    }
    setLoading(true);
    try {
      const data = await analyseBriefing(briefing);
      navigate('/estrutura-analisada', { state: { result: data, briefing } });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Erro ao analisar briefing.',
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageLayout maxWidth="680">
      <button className={styles.backButton} onClick={() => navigate('/')}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M13 8H3M7 4l-4 4 4 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Voltar
      </button>
      <PageHeader
        badge="AI-Powered"
        title="Briefing to Tasks"
        subtitle="Cole seu briefing abaixo e transforme-o em tarefas estruturadas automaticamente."
      />

      <form className={styles.card} onSubmit={handleSubmit}>
        <TextareaField
          id="briefing"
          label="Briefing"
          placeholder="Descreva o projeto, objetivos, requisitos, restrições e qualquer contexto relevante..."
          value={briefing}
          onChange={(e) => setBriefing(e.target.value)}
        />
        {error && (
          <p className={styles.error} role="alert">
            {error}
          </p>
        )}
        <div className={styles.footer}>
          <span className={styles.charCount}>
            {briefing.length} / {MAX_LENGTH} caracteres
          </span>
          <Button
            type="submit"
            disabled={briefing.trim().length === 0 || loading}
            aria-busy={loading}
          >
            <span aria-live="polite">
              {loading ? 'Analisando...' : 'Analisar Briefing'}
            </span>
          </Button>
        </div>
      </form>
    </PageLayout>
  );
}

export default InputBriefing;
