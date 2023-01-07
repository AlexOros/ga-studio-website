import { ProjectEntity } from "@models";
import { api } from "api/axios";
import { QueryParams } from "api/shared/types";

export const getProjectBySlug = async ({
  slug,
  params = {},
}: {
  slug: string;
  params?: QueryParams;
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
