export const ROUTES = {
  home: '/',
  projects: {
    en: 'projects',
    ro: 'proiecte',
  },
  project: {
    en: (slug: string) => `/en/projects/${slug}`,
    ro: (slug: string) => `/ro/proiecte/${slug}`,
  },
};
