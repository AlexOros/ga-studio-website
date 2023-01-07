import { getProjects } from "./getProjects";

const getProjectsPathsByLocale = async (locale: string) => {
  const {
    data: { data },
  } = await getProjects({
    locale,
    fields: ["locale", "slug"],
  });

  return {
    data: data.map(({ attributes }) => ({
      params: {
        slug: attributes?.slug,
      },
      locale: attributes?.locale,
    })),
  };
};

export { getProjectsPathsByLocale };
