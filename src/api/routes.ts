const getRouteBySlug = (slug: string | null, route: string) => {
  if (!slug) return null;
  return `/${route}/${slug}`;
};

export const ROUTES = {
  home: "/",
  notFound: "/not-found",
  project: {
    en: (slug: string | null) => getRouteBySlug(slug, "projects"),
    ro: (slug: string | null) => getRouteBySlug(slug, "proiecte"),
  },
  projects: {
    en: "projects",
    ro: "proiecte",
  },
} as const;
