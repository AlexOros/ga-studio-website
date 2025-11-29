export const ROUTES = {
  home: '/',
  projects: {
    en: 'projects',
    ro: 'projects',
  },
  project: {
    en: (slug: string) => `/en/projects/${slug}`,
    ro: (slug: string) => `/ro/projects/${slug}`,
  },
};
