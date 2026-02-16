import zh from './zh.json';
import en from './en.json';

export const translations: Record<string, Record<string, unknown>> = { zh, en };

export const languages = [
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'en', name: 'EN', flag: '🇺🇸' }
];
