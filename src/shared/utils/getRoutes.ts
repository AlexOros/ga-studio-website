const getRouteBySlug = (
  slug: string | null | undefined,
  route: string
): string | null | undefined => {
  if (!slug) return slug;

  return `/${route}/${slug}`;
};

export const getRoutes = () =>
  ({
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
  } as const);
