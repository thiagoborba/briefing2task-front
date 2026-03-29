import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './InputBriefing.module.css';
import { analyseBriefing } from '../../api';
import PageLayout from '../../components/PageLayout';
import PageHeader from '../../components/PageHeader';
import Button from '../../components/Button';

function InputBriefing() {
  const [briefing, setBriefing] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const data = await analyseBriefing(briefing);
      navigate('/estrutura-analisada', { state: { result: data, briefing } });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao analisar briefing.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageLayout maxWidth="680">
      <PageHeader
        badge="AI-Powered"
        title="Briefing to Tasks"
        subtitle="Cole seu briefing abaixo e transforme-o em tarefas estruturadas automaticamente."
      />

      <form className={styles.card} onSubmit={handleSubmit}>
        <label htmlFor="briefing" className={styles.label}>
          Briefing
        </label>
        <textarea
          id="briefing"
          className={styles.textarea}
          placeholder="Descreva o projeto, objetivos, requisitos, restrições e qualquer contexto relevante..."
          value={briefing}
          onChange={(e) => setBriefing(e.target.value)}
        />
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.footer}>
          <span className={styles.charCount}>{briefing.length} caracteres</span>
          <Button type="submit" disabled={briefing.trim().length === 0 || loading}>
            <span>{loading ? 'Analisando...' : 'Analisar Briefing'}</span>
            {!loading && (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </Button>
        </div>
      </form>
    </PageLayout>
  );
}

export default InputBriefing;
