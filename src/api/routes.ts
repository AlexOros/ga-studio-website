const getRouteBySlug = (slug: string | null, route: string) => {
  if (!slug) return null;
  return `/${route}/${slug}`;
};

export const ROUTES = {
  home: "/",
  notFound: "/not-found",
  project: {
    en: (slug: string | null) => getRouteBySlug(slug, "architecture"),
    ro: (slug: string | null) => getRouteBySlug(slug, "arhitectura"),
  },
  projects: {
    en: "architecture",
    ro: "arhitectura",
  },
} as const;
