import axios from 'axios';
import type { BriefingResult } from '../types';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:3000',
  headers: { 'Content-Type': 'application/json' },
});

export async function analyseBriefing(briefing: string): Promise<BriefingResult> {
  const { data } = await api.post<BriefingResult>('/analyse-briefing', { briefing });
  return data;
}
