import { createHighlighter } from 'shiki';

const HIGHLIGHTER_LANGUAGES = [
  'plaintext',
  'jsx',
  'tsx',
  'html',
  'css',
  'markdown',
] satisfies Parameters<typeof createHighlighter>[0]['langs'];

type HighLightLanguage = (typeof HIGHLIGHTER_LANGUAGES)[number];

const highlighter = await createHighlighter({
  themes: ['github-dark-default', 'github-light-default'],
  langs: HIGHLIGHTER_LANGUAGES,
});

function getHighlighterLanguage(lang: string): HighLightLanguage {
  switch (lang) {
    case 'javascript':
      return 'jsx';
    case 'typescript':
      return 'tsx';
    case 'html':
      return 'html';
    case 'css':
      return 'css';
    default:
      return 'plaintext';
  }
}

export function highlightCodeToHtml(text: string, language: string) {
  return highlighter.codeToHtml(text, {
    lang: getHighlighterLanguage(language),
    themes: { dark: 'github-dark-default', light: 'github-light-default' },
  });
}
