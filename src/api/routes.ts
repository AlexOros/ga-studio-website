const getRouteBySlug = (slug: string, route: string): string =>
  `/${route}/${slug}`;

export const ROUTES = {
  home: "/",
  notFound: "/not-found",
  about: {
    en: "/about",
    ro: "/despre",
  },
  project: {
    en: (slug: string) => getRouteBySlug(slug, "architecture"),
    ro: (slug: string) => getRouteBySlug(slug, "arhitectura"),
  },
} as const;
