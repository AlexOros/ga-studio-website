import { Pagination, ProjectEntity } from "@models";
import { QueryParams } from "api/shared/types";
import { api } from "api/axios";

async function getProjects<T extends ProjectEntity[]>(
  params: QueryParams = {}
) {
  return api.get<{
    data: T;
    meta: Pagination;
  }>("/projects", {
    params,
  });
}

export { getProjects };
