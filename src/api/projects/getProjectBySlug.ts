import { ProjectEntity } from "@/models";
import { api } from "api/axios";

type Params = {
  locale?: string;
  populate?: string | string[] | Record<string, any>;
  sort?: string | string[];
  filters?: any;
  fields?: string | string[];
};

export const getProjectBySlug = async ({
  slug,
  params = {},
}: {
  slug: string;
  params?: Params;
}) => {
  const {
    data: { data },
  } = await api.get<{
    data: Omit<ProjectEntity, "__typename">;
  }>(`/slugify/slugs/project/${slug}`, {
    params,
  });

  return data;
};
