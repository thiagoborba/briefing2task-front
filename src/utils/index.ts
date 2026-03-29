import type { BriefingResult } from '../types';

export function formatAsTask(result: BriefingResult): string {
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

export function formatForPM(result: BriefingResult): string {
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

export function formatAlignmentQuestions(result: BriefingResult): string {
  if (!result.perguntas_de_alinhamento?.length) return '';
  const lines = ['Perguntas de Alinhamento:\n'];
  result.perguntas_de_alinhamento.forEach((q, i) =>
    lines.push(`${i + 1}. ${q}`),
  );
  return lines.join('\n');
}
